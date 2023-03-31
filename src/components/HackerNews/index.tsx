import { useState } from 'react'
import { useTopStoriesList } from './query'

import HackerNewsListItem from './components/HackerNewsListItem'
import HackerNewsStoryContent from './components/HackerNewsStoryContent'

export default function HackerNews() {
  const [page, setPage] = useState(1)

  const topStoriesQueries = useTopStoriesList({ page })

  return (
    <div className="flex w-full h-screen">
      <div className="shrink-0 w-[28rem] h-full overflow-y-scroll">
        {topStoriesQueries.map((item, index) => {
          return <HackerNewsListItem key={index} item={item} />
        })}
      </div>
      <div className="grow">
        <HackerNewsStoryContent />
      </div>
    </div>
  )
}
