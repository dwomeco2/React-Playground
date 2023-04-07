import { useState, useEffect, useReducer } from "react"
import { nanoid } from "nanoid"
import { z } from "zod"

import styles from "./index.module.css"
import { useClientSizeDetector, useGlobalKeyDownEffect } from "../../../hooks"
import { deepClone } from "../../../utils"
import { useSwipeable } from "react-swipeable"

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
	const size = useClientSizeDetector({
		sizes: [
			{ minSize: 640, key: "sm" },
			{ minSize: 0, key: "xs" }
		]
	})

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

	const swipeHandlers = useSwipeable({
		onSwipedRight: onArrowKeyDown(rightSequence, dispatch),
		onSwipedLeft: onArrowKeyDown(leftSequence, dispatch),
		onSwipedUp: onArrowKeyDown(upSequence, dispatch),
		onSwipedDown: onArrowKeyDown(downSequence, dispatch)
	})

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

	const restart = () => {
		dispatch({ type: "restart" } as ActionType)
		setEnd(false)
	}

	let cellSize = (index: number) =>
		(size === "sm" ? 8 : 4) + (size === "sm" ? 118 : 76.75) * index

	return (
		<div className='relative'>
			<div className='py-2 px-4 text-sm font-semibold text-center'>
				Canvas-less created in react & css animation
			</div>
			<div
				{...swipeHandlers}
				className='relative mx-auto sm:h-[480px] sm:w-[480px] w-[311px] aspect-square p-1 sm:p-2 rounded-md bg-emerald-200 sm:gap-2 gap-1'
			>
				{cells.map((cell, index) => {
					// This for the background
					return (
						<div
							key={index}
							className={`absolute w-[72.75px] h-[72.75px] sm:w-[110px] sm:h-[110px] bg-slate-700 flex justify-center items-center select-none}`}
							style={{
								top: `${cellSize(cell.cor.row)}px`,
								left: `${cellSize(cell.cor.col)}px`
							}}
						></div>
					)
				})}
				{cells.map(cell => {
					return (
						<div
							key={cell.id}
							className={`absolute w-[72.75px] h-[72.75px] sm:w-[110px] sm:h-[110px] bg-slate-700 flex justify-center items-center font-extrabold sm:text-4xl text-xl select-none ${
								styles["cell-animation"]
							} ${cell.prevCor ? styles["cell-move-animation"] : ""} ${
								cell.val !== 0 ? "z-10" : "z-0"
							}`}
							style={{
								backgroundColor: `${
									+cell.val === 0 ? "" : colors[Math.log2(+cell.val)]
								}`,
								top: `${cellSize(cell.cor.row)}px`,
								left: `${cellSize(cell.cor.col)}px`
							}}
						>
							<div className='flex flex-col'>
								<div>{cell.val !== 0 ? cell.val : ""}</div>
							</div>
						</div>
					)
				})}
			</div>
			{isEnd && (
				<div
					className={`${
						isEnd && styles["end-toast"]
					} absolute top-1/2 left-1/2 flex flex-col justify-center items-center gap-4 w-64 h-36 z-10 text-gray-800 bg-gray-300 bg-opacity-80 rounded-md p-2`}
				>
					<div className='select-none font-bold'>End of game</div>
					<div
						className='text-gray-200 bg-green-800 rounded-md px-10 py-2 cursor-pointer'
						onClick={() => restart()}
					>
						Restart
					</div>
				</div>
			)}
		</div>
	)
}

type ActionType = {
	type: "arrowkey" | "restart"
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
				let line = l.map(deepClone) as CellsType
				line.forEach(cell => {
					if (cell.prevCor) {
						cell.prevCor = undefined
					}
				})
				return moveOrMerge(line)
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
		if (
			equalityCompare(state, newState, item => ({
				id: item.id,
				val: item.val,
				cor: item.cor
			}))
		) {
			return state
		}

		// respawn
		if (newState.findIndex(cell => cell.val === 0) !== -1) {
			newState = spawn(newState)
		}

		return newState
	} else if (action.type === "restart") {
		return initializeGame()
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

const equalityCompare = <T extends any>(
	a: T[],
	b: T[],
	mapFunc: (item: T) => any
): boolean => {
	let aSubset = a.map(mapFunc)
	let bSubset = b.map(mapFunc)
	return JSON.stringify(aSubset) === JSON.stringify(bSubset)
}

const leftSequence = (i: number) => [i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 3]
const rightSequence = (i: number) => leftSequence(i).reverse()
const upSequence = (i: number) => [i, i + 4, i + 8, i + 12]
const downSequence = (i: number) => upSequence(i).reverse()

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
