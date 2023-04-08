import { z } from "zod"

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

export const CellsZod = z.array(cellZ)
export type CellsType = z.infer<typeof CellsZod>

export type ArrayElementType<
	ArrayType extends Array<T>,
	T = any
> = ArrayType[number]
