import { z } from 'zod'

export const topStoriesSchema = z.array(z.number()).default([])

export const StorySchema = z.object({
  id: z.number(),
  deleted: z.boolean().optional().default(false),
  type: z.string(),
  by: z.string().optional().default(''),
  time: z.number().optional(),
  dead: z.boolean().optional().default(false),
  kids: z.array(z.number()).optional().default([]),
  descendants: z.number().optional(),
  score: z.number().optional(),
  title: z.string().optional().default(''),
  url: z.string().optional().default('')
})

export const CommentSchema = z.object({
  id: z.number(),
  deleted: z.boolean().optional().default(false),
  type: z.string(),
  by: z.string().optional().default(''),
  time: z.number().optional(),
  kids: z.array(z.number()).optional().default([]),
  parent: z.number().optional(),
  text: z.string().optional().default('')
})

export const ItemSchema = StorySchema.merge(CommentSchema)

export type HackerNewsItemType = z.infer<typeof ItemSchema>
