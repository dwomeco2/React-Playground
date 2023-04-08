export const equalityCompare = <T extends any>(
	a: T[],
	b: T[],
	mapFunc: (item: T) => any
): boolean => {
	let aSubset = a.map(mapFunc)
	let bSubset = b.map(mapFunc)
	return JSON.stringify(aSubset) === JSON.stringify(bSubset)
}

export const leftSequence = (i: number) => [
	i * 4,
	i * 4 + 1,
	i * 4 + 2,
	i * 4 + 3
]
export const rightSequence = (i: number) => leftSequence(i).reverse()
export const upSequence = (i: number) => [i, i + 4, i + 8, i + 12]
export const downSequence = (i: number) => upSequence(i).reverse()

export const indexToRowCol = (i: number) => ({
	row: Math.floor(i / 4),
	col: i % 4
})
