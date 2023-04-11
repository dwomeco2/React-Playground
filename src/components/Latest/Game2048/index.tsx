import styles from './index.module.css';
import {
	useMediaQuery,
	useDelayedState,
	useGlobalKeyDownEffect,
} from '../../../hooks';

import {useSpring, animated} from '@react-spring/web';
import {useSwipeable} from 'react-swipeable';
import {type ActionType, useIsGameEnd, use2048Reducer} from './backend/backend';
import {Direction} from './backend/types';
import {type CSSProperties} from 'react';

const colors = [
	'#392A1A',
	'#473616',
	'#7f410b',
	'#8D3608',
	'#912107',
	'#A62507',
	'#4E3E0A',
	'#69530C',
	'#715A0C',
	'#EDC53F',
	'#EEC12E',
];

type CellNumberProps = {
	val: string;
};

function CellNumber(props: CellNumberProps) {
	const {val} = props;
	const [prevVal, setPrevVal] = useDelayedState(val);

	if (Boolean(val) && !prevVal) {
		// Spawn
		setPrevVal(val);
	} else if (val !== prevVal) {
		// Merge
		setPrevVal(val, 60);
	}

	return <div>{prevVal}</div>;
}

type CellProps = {
	[x: string]: unknown;
	cor: {
		row: number;
		col: number;
	};
	prevCor?: {
		row: number;
		col: number;
	};
	children?: React.ReactNode;
};

function Cell(props: CellProps) {
	const {cor, prevCor, children, style, className, ...rest} = props;

	const mediaMatches = useMediaQuery('(min-width: 640px)');

	const cellSize = (index: number) =>
		(mediaMatches ? 8 : 4) + ((mediaMatches ? 118 : 76.75) * index);

	const newTop = cellSize(cor.row);
	const newLeft = cellSize(cor.col);
	const springProps = useSpring({
		from: {
			top: cellSize(prevCor?.row ?? cor.row),
			left: cellSize(prevCor?.col ?? cor.col),
		},
		to: {
			top: newTop,
			left: newLeft,
		},
		config: {
			tension: 210,
			friction: 22,
			precision: 0.01,
			mass: 1,
		},
	});

	const posProps = prevCor ? springProps : {top: `${newTop}px`, left: `${newLeft}px`};

	return (
		<animated.div
			className={`absolute w-[72.75px] h-[72.75px] sm:w-[110px] sm:h-[110px] flex justify-center items-center select-none border border-emerald-200 border-solid ${className as string}`}
			style={{
				...style as CSSProperties,
				...(posProps),
			}}
			{...rest}
		>
			{children}
		</animated.div>
	);
}

export default function Game2048() {
	const [cells, dispatch] = use2048Reducer();
	const isEnd = useIsGameEnd();

	const swipeHandlers = useRegisterControlInterface(dispatch);

	return (
		<div className='relative'>
			<div className='py-2 px-4 text-sm font-semibold text-center'>
				Canvas-less created in react & css animation
			</div>
			<div
				{...swipeHandlers}
				className='relative mx-auto sm:h-[480px] sm:w-[480px] w-[311px] aspect-square p-1 sm:p-2 rounded-md bg-slate-800 bg-opacity-50'
			>
				{cells.map(cell => {
					const val = cell.val !== 0 ? String(cell.val) : '';
					return (
						<Cell
							key={cell.id}
							className={`font-extrabold sm:text-4xl text-xl ${styles['cell-animation']} ${cell.val !== 0 ? 'z-10' : 'z-0'} `}
							style={{
								backgroundColor: `${
									Number(cell.val) === 0 ? '' : colors[Math.log2(Number(cell.val))]
								}`,
							}}
							cor={cell.cor}
							prevCor={cell.prevCor}
						>
							<div className='flex flex-col'>
								<CellNumber val={val}/>
							</div>
						</Cell>
					);
				})}
			</div>
			{isEnd && (
				<div
					className={`${
						isEnd && styles['end-toast']
					} absolute top-1/2 left-1/2 flex flex-col justify-center items-center gap-6 w-64 h-36 z-10 text-gray-800 bg-gray-300 bg-opacity-75 rounded-md p-2 shadow-md shadow-gray-800 `}
				>
					<div className='select-none font-bold'>End of game</div>
					<div
						className=' font-medium text-gray-200 bg-green-800 rounded-md px-10 py-2 cursor-pointer'
						onClick={() => {
							dispatch({type: 'restart'} as ActionType);
						}}
					>
						Restart
					</div>
				</div>
			)}
		</div>
	);
}

const useRegisterControlInterface = (
	dispatch: (action: ActionType) => void,
) => {
	useGlobalKeyDownEffect(
		['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'],
		[
			onArrowKeyDown(Direction.Right, dispatch),
			onArrowKeyDown(Direction.Left, dispatch),
			onArrowKeyDown(Direction.Up, dispatch),
			onArrowKeyDown(Direction.Down, dispatch),
		],
		[],
	);

	const swipeHandlers = useSwipeable({
		onSwipedRight: onArrowKeyDown(Direction.Right, dispatch),
		onSwipedLeft: onArrowKeyDown(Direction.Left, dispatch),
		onSwipedUp: onArrowKeyDown(Direction.Up, dispatch),
		onSwipedDown: onArrowKeyDown(Direction.Down, dispatch),
	});

	return swipeHandlers;
};

function onArrowKeyDown(direction: ActionType['payload']['direction'],
	dispatch: React.Dispatch<ActionType>) {
	return () => {
		dispatch({type: 'arrowkey', payload: {direction}});
	};
}
