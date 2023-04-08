import styles from "./index.module.css"
import { useClientSizeDetector, useGlobalKeyDownEffect } from "../../../hooks"

import { useSwipeable } from "react-swipeable"
import { ActionType, useIsGameEnd, use2048Reducer } from "./backend/backend"
import {
	rightSequence,
	leftSequence,
	upSequence,
	downSequence,
	indexToRowCol
} from "./backend/utils"

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
	const [cells, dispatch] = use2048Reducer()
	const isEnd = useIsGameEnd()
	const size = useClientSizeDetector({
		sizes: [
			{ minSize: 640, key: "sm" },
			{ minSize: 0, key: "xs" }
		]
	})

	const swipeHandlers = useRegisterControlInterface(dispatch)

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
						onClick={() => dispatch({ type: "restart" } as ActionType)}
					>
						Restart
					</div>
				</div>
			)}
		</div>
	)
}

const useRegisterControlInterface = (
	dispatch: (action: ActionType) => void
) => {
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

	return swipeHandlers
}

const onArrowKeyDown = (
	sequence: (i: number) => number[],
	dispatch: React.Dispatch<ActionType>
) => {
	return () => {
		let arr = [0, 1, 2, 3].map(i => sequence(i).map(indexToRowCol))

		dispatch({ type: "arrowkey", payload: { lines: arr } })
	}
}
