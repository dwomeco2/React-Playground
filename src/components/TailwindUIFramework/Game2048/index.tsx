import { useState, useEffect, useMemo, useReducer } from "react"
import { nanoid } from "nanoid"
import { z } from "zod"

const colors = [
	"#392A1A",
	"#473616",
	"#7f410b",
	"#8D3608",
	"#912107",
	"#A62507",
	"#4E3E0A",
	"#69530C",
	"#715A0C",
	"#EDC53F",
	"#EEC12E"
]

export default function Game2048() {
	const [cells, dispatch] = useReducer(reducer, initializeGame())
	const [isEnd, setEnd] = useState(false)

	useGlobalKeyDownEffect(
		["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"],
		[
			onArrowKeyDown(rightSequence, dispatch),
			onArrowKeyDown(leftSequence, dispatch),
			onArrowKeyDown(upSequence, dispatch),
			onArrowKeyDown(downSequence, dispatch)
		],
		[]
	)

	useEffect(() => {
		if (cells.every(cell => cell.val !== 0)) {
			let horizontal = [0, 1, 2, 3].map(i => leftSequence(i).map(indexToRowCol))
			let vertical = [0, 1, 2, 3].map(i => upSequence(i).map(indexToRowCol))
			const horizontalChanges = filterNoChange(horizontal, cells)
			const verticalChanges = filterNoChange(vertical, cells)
			if (horizontalChanges.length === 0 && verticalChanges.length === 0) {
				setEnd(true)
			}
		}
	}, [cells])

	return (
		<div>
			<div className='relative mx-auto sm:h-[480px] sm:w-[480px] w-[311px] aspect-square p-1 sm:p-2 rounded-md bg-emerald-200 sm:gap-2 gap-1'>
				{cells.map(cell => (
					<div
						key={cell.id}
						className={`absolute w-[70.75px] h-[70.75px] sm:w-[110px] sm:h-[110px] bg-slate-700 flex justify-center items-center font-extrabold sm:text-4xl text-xl select-none`}
						style={{
							backgroundColor: `${
								+cell.val === 0 ? "" : colors[Math.log2(+cell.val)]
							}`,
							top: `${8 + 118 * cell.cor.row}px`,
							left: `${8 + 118 * cell.cor.col}px`
						}}
					>
						<div className='flex flex-col'>
							<div className='text-center text-[8px]'>{cell.id}</div>
							<div>{cell.val != 0 ? cell.val : ""}</div>
						</div>
					</div>
				))}
			</div>
			{isEnd && <div>End</div>}
		</div>
	)
}

type ActionType = {
	type: "arrowkey"
	payload: {
		lines: {
			row: number
			col: number
		}[][]
	}
}

function reducer(state: CellsType, action: ActionType) {
	let cells = state
	if (action.type === "arrowkey") {
		// preprocess
		const result = filterNoChange(action.payload.lines, cells)
			.map(l => {
				let line = l.map(deepClone)
				return moveOrMerge(line as CellsType)
			})
			.flat()

		if (result.length === 0) return state

		let newState = deepClone(state) as CellsType
		result.forEach(({ merged, unmount }) => {
			// merge
			merged.forEach(m => {
				let index = newState.findIndex(cell => cell.id === m.id)
				if (index !== -1) {
					newState[index] = m
				} else {
					newState.push(m)
				}
			})
			// unmount
			unmount.forEach(id => {
				newState = newState.filter(cell => cell.id !== id)
			})
		})

		// Arrow key with no changes
		if (equalityCompare(state, newState)) {
			console.log("no changes")
			return state
		}

		// respwan
		if (newState.findIndex(cell => cell.val === 0) !== -1) {
			newState = spawn(newState)
		}

		return newState
	}
	throw Error("Unknown action")
}

type moveOrMergeReturnType = {
	merged: CellsType
	unmount: string[]
}

// Expecting all line move to the left
const moveOrMerge = (arr: CellsType) => {
	let unmount = [] as string[]
	let i = 0
	let j = 1
	while (i < 3) {
		if (j >= 4) {
			i++
			j = i + 1
			continue
		}
		if (arr[i].val === arr[j].val && arr[i].val != 0) {
			// merge
			arr[j].prevCor = arr[j].cor
			arr[j].cor = arr[i].cor
			arr[j].val *= 2
			unmount.push(arr[i].id)
			arr[i] = arr[j]
			arr[j] = { id: "tombstone", val: 0, cor: arr[j].prevCor! }
			i++
		} else if (arr[i].val === 0 && arr[j].val != 0) {
			// move
			arr[j].prevCor = arr[j].cor
			arr[j].cor = arr[i].cor
			unmount.push(arr[i].id)
			arr[i] = arr[j]
			arr[j] = { id: "tombstone", val: 0, cor: arr[j].prevCor! }
		} else if (arr[i].val !== arr[j].val && arr[j].val != 0) {
			i++
			j = i + 1
			continue
		}
		j++
	}

	// replace all tombstone with new one
	arr.forEach(cell => {
		if (cell.id === "tombstone") {
			cell.id = nanoid()
		}
	})

	unmount = unmount.filter(id => !arr.find(cell => cell.id === id))

	return { merged: arr, unmount } as moveOrMergeReturnType
}

const indexToRowCol = (i: number) => ({ row: Math.floor(i / 4), col: i % 4 })

const onArrowKeyDown = (
	sequence: (i: number) => number[],
	dispatch: React.Dispatch<ActionType>
) => {
	return () => {
		let arr = [0, 1, 2, 3].map(i => sequence(i).map(indexToRowCol))

		dispatch({ type: "arrowkey", payload: { lines: arr } })
	}
}

const filterNoChange = (
	lines: ActionType["payload"]["lines"],
	cells: CellsType
) => {
	return lines
		.map(l =>
			l.map(
				({ row, col }) =>
					cells.find(cell => cell.cor.row === row && cell.cor.col === col)!
			)
		)
		.filter(l => !l.every(cell => cell.val === 0))
		.filter(l => {
			let hasZero = !l.every(cell => cell.val !== 0)
			let hasConsecutiveSameValue = false
			for (let i = 0; i < l.length - 1; i++) {
				if (l[i].val === l[i + 1].val) {
					hasConsecutiveSameValue = true
				}
			}
			return hasZero || hasConsecutiveSameValue
		})
}

const leftSequence = (i: number) => [i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 3]
const rightSequence = (i: number) => leftSequence(i).reverse()
const upSequence = (i: number) => [i, i + 4, i + 8, i + 12]
const downSequence = (i: number) => upSequence(i).reverse()

const deepClone = (obj: unknown) => JSON.parse(JSON.stringify(obj))

const equalityCompare = (
	a: { [key: string]: any },
	b: { [key: string]: any }
): boolean => JSON.stringify(a) === JSON.stringify(b)

const spawnVal = () => (Math.random() <= 0.9 ? 2 : 4)

const spawn = (arr: CellsType) => {
	let index
	do {
		index = Math.floor(Math.random() * 16)
	} while (arr[index].val !== 0)
	arr[index].val = spawnVal()
	return arr
}

const initializeGame = () => {
	let arr = Array(16).fill(null)
	for (let i = 0; i < 16; i++) {
		const cell = {
			val: 0,
			cor: { row: Math.floor(i / 4), col: i % 4 },
			id: nanoid()
		}
		arr[i] = cell
	}
	arr = CellsZod.parse(arr)

	arr = spawn(arr)
	arr = spawn(arr)

	return arr as CellsType
}

const CordinateZod = z.object({
	row: z.number().max(3),
	col: z.number().max(3)
})

const cellZ = z.object({
	id: z.string(),
	val: z.number().default(0),
	cor: CordinateZod,
	prevCor: CordinateZod.optional()
})

const CellsZod = z.array(cellZ)
type CellsType = z.infer<typeof CellsZod>

const useGlobalKeyDownEffect = <T extends unknown>(
	keys: string[],
	callbacks: ((deps: T[]) => void)[],
	dependencies: T[]
) => {
	const keyDownCallback = (e: KeyboardEvent) => {
		keys.forEach((key, index) => {
			if (e.key == key) {
				callbacks[index](dependencies)
			}
		})
	}
	useEffect(() => {
		window.addEventListener("keydown", keyDownCallback)
		return () => {
			window.removeEventListener("keydown", keyDownCallback)
		}
	}, [dependencies])
}
