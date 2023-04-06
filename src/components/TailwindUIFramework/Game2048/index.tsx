import { useState, useEffect, useMemo, useReducer } from "react"
import { nanoid } from "nanoid"
import { z } from "zod"

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

type ActionsType = {
	type: "batch"
	payload: {
		actions: ActionType[]
	}
}

type ActionType = {
	type: "move" | "merge"
	payload: {
		cellID: string
		from?: {
			row: number
			col: number
		}
		to?: {
			row: number
			col: number
		}
		unmountCellID?: string
	}
}

function reducer(state: cellsType, actions: ActionsType) {
	console.log(actions)
	if (actions.type === "batch") {
		let newState = state
		actions.payload.actions.forEach(action => {
			let cell = newState.find(cell => cell.id === action.payload.cellID)
			let unmountCell = newState.find(
				cell => cell.id === action.payload.unmountCellID
			)
			if (cell) {
				cell.prevCor = action.payload.from
				cell.cor = action.payload.to!
				if (action.type === "merge") {
					cell.val *= 2
				}
			}
			if (unmountCell && unmountCell.val === 0) {
				unmountCell.unmount = true
			}
		})
		newState = newState.filter(cell => !cell.unmount)

		let seq = [...Array(16).keys()]
		seq.forEach(item => {
			let { row, col } = indexToRowCol(item)
			let cell = newState.find(
				cell => cell.cor.row === row && cell.cor.col === col
			)
			if (!cell) {
				let newCell = { val: 0, cor: { row, col }, id: nanoid() }
				newState.push(newCell as cellType)
			}
		})

		let index
		do {
			index = Math.floor(Math.random() * 16)
		} while (newState[index].val != 0)
		newState[index].val = spawnVal()

		// setCells(arr)

		return newState
	}
	throw Error("Unknown action")
}

export default function Game2048() {
	const [cells, dispatch] = useReducer(reducer, initializeGame())
	const endState = useState(false)

	useGlobalKeyDownEffect(
		["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"],
		[
			onArrowRightKeyDown(dispatch),
			onArrowLeftKeyDown(dispatch),
			onArrowUpKeyDown(dispatch),
			onArrowDownKeyDown(dispatch)
		],
		[cells, endState]
	)

	const isEnd = endState[0]

	// let sortedCells = useMemo(
	// 	() =>
	// 		cells.sort(
	// 			(a, b) => a.cor.row * 4 + a.cor.col - (b.cor.row * 4 + b.cor.col)
	// 		),
	// 	[cells]
	// )

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
const CordinateZod = z.object({
	row: z.number().max(3),
	col: z.number().max(3)
})

const cellZ = z.object({
	id: z.string(),
	val: z.number().default(0),
	cor: CordinateZod,
	prevCor: CordinateZod.optional(),
	unmount: z.boolean().default(false)
})

const cellsZ = z.array(cellZ)
type cellType = z.infer<typeof cellZ>
type cellsType = z.infer<typeof cellsZ>

const spawnVal = () => (Math.random() <= 0.9 ? 2 : 4)

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
	arr = cellsZ.parse(arr)

	let index, index2
	do {
		index = Math.floor(Math.random() * 16)
		index2 = Math.floor(Math.random() * 16)
	} while (index2 == index)
	arr[index].val = spawnVal()
	arr[index2].val = spawnVal()

	return arr as cellsType
}

// Expecting all line move to the left
const moveOrMerge = (arr: cellType[]) => {
	// Deep clone
	let tmp = (JSON.parse(JSON.stringify(arr)) as cellType[])
		.map((cell, index) => ({
			cell,
			index
		}))
		.filter(item => item.cell.val != 0)
	let actions = []
	if (tmp[0] && tmp[0].index != 0) {
		actions.push({
			type: "move",
			payload: {
				cellID: tmp[0].cell.id,
				from: tmp[0].cell.cor,
				to: arr[0].cor,
				unmountCellID: arr[0].id
			}
		})
		tmp[0].cell.cor = arr[0].cor
	}
	let prev = tmp[0]
	for (let i = 1; i < tmp.length; i++) {
		let curr = tmp[i]

		if (prev.cell.val === curr.cell.val) {
			actions.push({
				type: "merge",
				payload: {
					cellID: curr.cell.id,
					from: curr.cell.cor,
					to: prev.cell.cor,
					unmountCellID: prev.cell.id
				}
			})
			curr.cell.cor = prev.cell.cor
		} else {
			let cr = curr.cell.cor.row
			let cc = curr.cell.cor.col
			let pr = prev.cell.cor.row
			let pc = prev.cell.cor.col
			let to =
				cr == pr
					? { row: pr, col: pc + (cc - pc > 0 ? 1 : -1) }
					: { col: pc, row: pr + (cr - pr > 0 ? 1 : -1) }
			const old = arr.find(
				item => item.cor.row == to.row && item.cor.col == to.col
			)!
			if (curr.cell.cor != to) {
				actions.push({
					type: "move",
					payload: {
						cellID: curr.cell.id,
						from: curr.cell.cor,
						to: to,
						unmountCellID: old.id
					}
				})
				curr.cell.cor = to
			}
		}

		prev = curr
	}
	return actions
}

const merge = (from: cellType, to: cellType) => {
	move(from, to)
	to.val *= 2
}

const move = (from: cellType, to: cellType) => {
	to.val = from.val
	from.val = 0
}

const leftSequence = (i: number) => [i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 3]
const rightSequence = (i: number) => leftSequence(i).reverse()
const upSequence = (i: number) => [i, i + 4, i + 8, i + 12]
const downSequence = (i: number) => upSequence(i).reverse()

const indexToRowCol = (i: number) => {
	const row = Math.floor(i / 4)
	const col = i % 4
	return { row, col }
}

const onArrowKeyDown = (
	sequence: (i: number) => number[],
	dispatch: React.Dispatch<ActionsType>
) => {
	return (deps: unknown[]) => {
		const [cells, endState] = deps as [
			cellsType,
			[boolean, React.Dispatch<React.SetStateAction<boolean>>]
		]

		const [, setIsEnd] = endState as [
			boolean,
			React.Dispatch<React.SetStateAction<boolean>>
		]

		let arr = [0, 1, 2, 3]
			.map(i =>
				sequence(i)
					.map(indexToRowCol)
					.map(
						({ row, col }) =>
							cells.find(cell => cell.cor.row === row && cell.cor.col === col)!
					)
			)
			.map(arr => moveOrMerge(arr))
			.flat()

		dispatch({ type: "batch", payload: { actions: arr as ActionType[] } })
	}
}

const onArrowLeftKeyDown = (dispatch: React.Dispatch<ActionsType>) =>
	onArrowKeyDown(leftSequence, dispatch)
const onArrowRightKeyDown = (dispatch: React.Dispatch<ActionsType>) =>
	onArrowKeyDown(rightSequence, dispatch)
const onArrowUpKeyDown = (dispatch: React.Dispatch<ActionsType>) =>
	onArrowKeyDown(upSequence, dispatch)
const onArrowDownKeyDown = (dispatch: React.Dispatch<ActionsType>) =>
	onArrowKeyDown(downSequence, dispatch)
