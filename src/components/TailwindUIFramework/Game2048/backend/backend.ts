import { atom, useAtom } from "jotai"
import { useReducerAtom } from "jotai/utils"
import { nanoid } from "nanoid"
import { deepClone } from "../../../../utils"
import {
	equalityCompare,
	indexToRowCol,
	leftSequence,
	upSequence
} from "./utils"
import { toggleAtom } from "../../../../hooks"
import { CellsType, CellsZod } from "./types"

const isEndAtom = toggleAtom()
const isEndReadOnlyAtom = atom(get => get(isEndAtom))
const toggleEndAtom = atom(null, (_get, set) => {
	set(isEndAtom)
})

export function useIsGameEnd() {
	const [isEnd] = useAtom(isEndReadOnlyAtom)
	return isEnd
}

const gameDataAtom = atom(initializeGame())

export function use2048Reducer() {
	const [, toggleEnd] = useAtom(toggleEndAtom)
	return useReducerAtom(
		gameDataAtom,
		(prevState: CellsType, action: ActionType) => {
			const newState = reducer(prevState, action)

			if (action.type === "restart" || checkIfGameEnd(newState)) {
				toggleEnd()
			}

			return newState
		}
	)
}

function cellAt(cells: CellsType, row: number, col: number) {
	return cells.find(cell => cell.cor.row === row && cell.cor.col === col)
}

function sequenceToCellsLine(
	cells: CellsType,
	sequence: (i: number) => number[]
) {
	return [0, 1, 2, 3]
		.map(i => sequence(i).map(indexToRowCol))
		.map(lines => lines.map(({ row, col }) => cellAt(cells, row, col)))
}

// This function assumes there are no zero
function equalConsecutiveVal(cells: ReturnType<typeof sequenceToCellsLine>) {
	for (let i = 0; i < cells.length; i++) {
		for (let j = 0; j < cells[i].length - 1; j++) {
			let prev = cells[i][j]
			let curr = cells[i][j + 1]
			if (prev !== null && curr !== null && prev!.val === curr!.val) {
				return curr!.val
			}
		}
	}
	return -1
}

const checkIfGameEnd = (cells: CellsType) => {
	// Game End Requirement:
	// 1. All cells is not zero
	// 2. No consecutive cells are equal value

	const hasCellZero = !cells.every(cell => cell.val !== 0)

	let horizontal = sequenceToCellsLine(cells, leftSequence)
	let vertical = sequenceToCellsLine(cells, upSequence)

	let noConsecutiveSame =
		equalConsecutiveVal(horizontal) === -1 &&
		equalConsecutiveVal(vertical) === -1

	return !hasCellZero && noConsecutiveSame
}

export type ActionType = {
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

function arrTrailingZeroCount<T>(arr: T[]): number {
	let count = 0
	for (let i = arr.length - 1; i >= 0; i--) {
		if (arr[i] === 0) {
			count++
		} else {
			break
		}
	}
	return count
}

const filterNoChange = (
	lines: ActionType["payload"]["lines"],
	cells: CellsType
) => {
	return lines
		.map(l => l.map(({ row, col }) => cellAt(cells, row, col)!))
		.filter(l => !l.every(cell => cell.val === 0))
		.filter(l => {
			const zeroCount = l.filter(cell => cell.val === 0).length
			const trailingZeroCount = arrTrailingZeroCount(l.map(cell => cell.val))
			const hasLeadingOrMiddleZero = zeroCount !== trailingZeroCount

			const consecutiveVal = equalConsecutiveVal([l])

			const wouldMove = hasLeadingOrMiddleZero || consecutiveVal > 0
			return wouldMove
		})
}

function initializeGame() {
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

function spawnVal() {
	return Math.random() <= 0.9 ? 2 : 4
}

function spawn(arr: CellsType) {
	let index
	do {
		index = Math.floor(Math.random() * 16)
	} while (arr[index].val !== 0)
	arr[index].val = spawnVal()
	return arr
}
