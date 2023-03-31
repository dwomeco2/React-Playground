import { topStoriesSchema, ItemSchema } from '../zod.schema'

export const fetchTopStories = async () => {
  const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  if (res.status !== 200) {
    return Promise.reject(`Failed to fetch top stories res.status:${res.status}`)
  }

  return res.json().then(json => {
    const safeParseResult = topStoriesSchema.safeParse(json)
    if (!safeParseResult.success) {
      return Promise.reject(`Failed to parse top stories json:${json}`)
    }
    return safeParseResult.data
  })
}

export const queryItem = async (itemID: number) => {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${itemID}.json`)
  if (res.status !== 200) {
    return Promise.reject(`Failed to fetch item ${itemID} res.status:${res.status}`)
  }

  return res.json().then(json => {
    const safeParseResult = ItemSchema.safeParse(json)
    if (!safeParseResult.success) {
      return Promise.reject(`Failed to parse item itemID:${itemID} json:${json}`)
    }
    return safeParseResult.data
  })
}
