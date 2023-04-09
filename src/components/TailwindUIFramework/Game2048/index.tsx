import styles from "./index.module.css"
import {
	useMediaQuery,
	useDelayedState,
	useGlobalKeyDownEffect
} from "../../../hooks"

import { useSpring, animated } from "@react-spring/web"
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

interface CellNumberProps {
	val: string
}

const CellNumber = (props: CellNumberProps) => {
	const { val } = props
	const [prevVal, setPrevVal] = useDelayedState(val)

	if (!!val && !!prevVal == false) {
		// spawn
		setPrevVal(val)
	} else if (val !== prevVal) {
		// merge
		setPrevVal(val, 60)
	}

	return <div>{prevVal}</div>
}

interface CellProps {
	cor: {
		row: number
		col: number
	}
	prevCor?: {
		row: number
		col: number
	}
	children?: React.ReactNode
	[x: string]: any
}

const Cell = (props: CellProps) => {
	const { cor, prevCor, children, style, className, ...rest } = props

	const mediaMatches = useMediaQuery("(min-width: 640px)")

	let cellSize = (index: number) =>
		(mediaMatches ? 8 : 4) + (mediaMatches ? 118 : 76.75) * index

	let newTop = cellSize(cor.row)
	let newLeft = cellSize(cor.col)
	const springProps = useSpring({
		from: {
			top: cellSize(prevCor?.row ?? cor.row),
			left: cellSize(prevCor?.col ?? cor.col)
		},
		to: {
			top: newTop,
			left: newLeft
		},
		config: {
			tension: 210,
			friction: 22,
			precision: 0.01,
			mass: 1
		}
	})

	return (
		<animated.div
			className={`absolute w-[72.75px] h-[72.75px] sm:w-[110px] sm:h-[110px] bg-slate-700 flex justify-center items-center select-none ${className}`}
			style={{
				...style,
				...(prevCor
					? springProps
					: {
							top: `${newTop}px`,
							left: `${newLeft}px`
					  })
			}}
			{...rest}
		>
			{children}
		</animated.div>
	)
}

export default function Game2048() {
	const [cells, dispatch] = use2048Reducer()
	const isEnd = useIsGameEnd()

	const swipeHandlers = useRegisterControlInterface(dispatch)

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
					return <Cell key={index} cor={cell.cor} />
				})}
				{cells.map(cell => {
					const val = cell.val !== 0 ? cell.val + "" : ""
					return (
						<Cell
							key={cell.id}
							className={` font-extrabold sm:text-4xl text-xl ${
								styles["cell-animation"]
							}  ${cell.val !== 0 ? "z-10" : "z-0"} `}
							style={{
								backgroundColor: `${
									+cell.val === 0 ? "" : colors[Math.log2(+cell.val)]
								}`
							}}
							cor={cell.cor}
							prevCor={cell.prevCor}
						>
							<div className='flex flex-col'>
								<CellNumber val={val} />
							</div>
						</Cell>
					)
				})}
			</div>
			{isEnd && (
				<div
					className={`${
						isEnd && styles["end-toast"]
					} absolute top-1/2 left-1/2 flex flex-col justify-center items-center gap-6 w-64 h-36 z-10 text-gray-800 bg-gray-300 bg-opacity-75 rounded-md p-2 shadow-md shadow-gray-800 `}
				>
					<div className='select-none font-bold'>End of game</div>
					<div
						className=' font-medium text-gray-200 bg-green-800 rounded-md px-10 py-2 cursor-pointer'
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
