export const fetchTopStories: () => Promise<number[]> = async () => {
  const res = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  if (res.status !== 200) {
    throw new Error('Failed to fetch top stories')
  }
  return res.json() as Promise<number[]>
}

export const queryItem = async (itemID: number) => {
  const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${itemID}.json`)
  if (res.status !== 200) {
    throw new Error('Failed to fetch top stories')
  }
  return res.json()
}
