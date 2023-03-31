import { atom } from 'jotai'
import { HackerNewsItemType } from './zod.schema'

export default {
  maxPageItems: 10,
  maxCommentsPerPage: 20,
  hackerNewsStoryContentAtom: atom({} as HackerNewsItemType)
}
