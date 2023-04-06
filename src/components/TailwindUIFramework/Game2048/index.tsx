import { useState, useEffect, useMemo } from "react";
import { z } from "zod";

const useGlobalKeyDownEffect = <T extends unknown>(
	keys: string[],
	callbacks: ((deps: T[]) => void)[],
	dependencies: T[],
) => {
	const keyDownCallback = (e: KeyboardEvent) => {
		keys.forEach((key, index) => {
			if (e.key == key) {
				callbacks[index](dependencies);
			}
		});
	};
	useEffect(() => {
		window.addEventListener("keydown", keyDownCallback);
		return () => {
			window.removeEventListener("keydown", keyDownCallback);
		};
	}, [dependencies]);
};

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
	"#EEC12E",
];

export default function Game2048() {
	const cellState = useState(initializeGame());
	const endState = useState(false);

	useGlobalKeyDownEffect(
		["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"],
		[
			onArrowRightKeyDown,
			onArrowLeftKeyDown,
			onArrowUpKeyDown,
			onArrowDownKeyDown,
		],
		[cellState, endState],
	);

	const cells = cellState[0];
	const isEnd = endState[0];

	let sortedCells = useMemo(
		() =>
			cells.sort(
				(a, b) => a.cor.row * 4 + a.cor.col - (b.cor.row * 4 + b.cor.col),
			),
		[cells],
	);

	return (
		<div>
			<div className='sm:mx-auto w-[80vw] aspect-square sm:h-[30rem] sm:w-[30rem] p-2 rounded-md bg-emerald-200 grid grid-cols-4 grid-rows-4 gap-2'>
				{sortedCells.map((cell, index) => (
					<div
						key={index}
						className={`w-full h-full bg-slate-700 flex justify-center items-center font-extrabold text-4xl select-none`}
						style={{
							backgroundColor: `${
								+cell.val === 0 ? "" : colors[Math.log2(+cell.val)]
							}`,
						}}
					>
						{cell.val != 0 ? cell.val : ""}
					</div>
				))}
			</div>
			{isEnd && <div>End</div>}
		</div>
	);
}

const cellZ = z.object({
	val: z.number().default(0),
	cor: z.object({ row: z.number().max(3), col: z.number().max(3) }),
});
const cellsZ = z.array(cellZ);
type cellType = z.infer<typeof cellZ>;
type cellsType = z.infer<typeof cellsZ>;

const spawnVal = () => (Math.random() <= 0.9 ? 2 : 4);

const initializeGame = () => {
	let arr = Array(16).fill(null);
	for (let i = 0; i < 16; i++) {
		const cor = { row: Math.floor(i / 4), col: i % 4 };
		const cell = { val: 0, cor };
		arr[i] = cell;
	}
	arr = cellsZ.parse(arr);

	let index, index2;
	do {
		index = Math.floor(Math.random() * 16);
		index2 = Math.floor(Math.random() * 16);
	} while (index2 == index);
	arr[index].val = spawnVal();
	arr[index2].val = spawnVal();

	return arr as cellsType;
};

// Expecting all line move to the left
const moveOrMerge = (arr: cellType[]) => {
	let i = 0;
	let j = 1;
	let noChange = true;
	while (i < 3) {
		if (j >= 4) {
			i++;
			j = i + 1;
			continue;
		}
		if (arr[i].val === arr[j].val && arr[i].val != 0) {
			merge(arr[j], arr[i]);
			i++;
			noChange = false;
		} else if (arr[i].val === 0 && arr[j].val != 0) {
			move(arr[j], arr[i]);
			noChange = false;
		} else if (arr[i].val !== arr[j].val && arr[j].val != 0) {
			i++;
			j = i + 1;
			continue;
		}
		j++;
	}
	return { noChange, arr };
};

const merge = (from: cellType, to: cellType) => {
	move(from, to);
	to.val *= 2;
};

const move = (from: cellType, to: cellType) => {
	to.val = from.val;
	from.val = 0;
};

const leftSequence = (i: number) => [i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 3];
const rightSequence = (i: number) => leftSequence(i).reverse();
const upSequence = (i: number) => [i, i + 4, i + 8, i + 12];
const downSequence = (i: number) => upSequence(i).reverse();

const indexToRowCol = (i: number) => {
	const row = Math.floor(i / 4);
	const col = i % 4;
	return { row, col };
};

const onArrowKeyDown = (sequence: (i: number) => number[]) => {
	return (deps: unknown[]) => {
		const [cellsState, endState] = deps;

		const [cells, setCells] = cellsState as [
			cellsType,
			React.Dispatch<React.SetStateAction<cellsType>>,
		];

		const [, setIsEnd] = endState as [
			boolean,
			React.Dispatch<React.SetStateAction<boolean>>,
		];

		let result = [0, 1, 2, 3]
			.map(i =>
				sequence(i)
					.map(indexToRowCol)
					.map(
						({ row, col }) =>
							cells.find(cell => cell.cor.row === row && cell.cor.col === col)!,
					),
			)
			.map(moveOrMerge);

		let arr = result.map(({ arr }) => arr).flat();

		if (arr.every(cell => cell.val != 0)) {
			setIsEnd(true);
			return;
		}

		if (result.every(({ noChange }) => noChange)) return;

		let sortedCells = arr.sort(
			(a, b) => b.cor.row * 4 + a.cor.col - (b.cor.row * 4 + b.cor.col),
		);

		let index;
		do {
			index = Math.floor(Math.random() * 16);
		} while (sortedCells[index].val != 0);
		sortedCells[index].val = spawnVal();

		setCells(sortedCells);
	};
};

const onArrowLeftKeyDown = onArrowKeyDown(leftSequence);
const onArrowRightKeyDown = onArrowKeyDown(rightSequence);
const onArrowUpKeyDown = onArrowKeyDown(upSequence);
const onArrowDownKeyDown = onArrowKeyDown(downSequence);
