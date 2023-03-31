import { useState } from 'react'
import { useAtom } from 'jotai'
import { UseQueryResult } from '@tanstack/react-query'
import { useContentQuery } from '../query'
import { timeAgo } from '../util'
import { HackerNewsItemType } from '../zod.schema'
import global from '../global'

export default function HackerNewsStoryContent() {
  const [page, setPage] = useState(1)

  const data = useAtom(global.hackerNewsStoryContentAtom)[0]

  const { originPostData, kidsQueries } = useContentQuery({ data, page })

  return (
    <div className="bg-gray-900 text-gray-200 p-2 h-full overflow-y-scroll">
      <div>
        <StoryComment queryResult={originPostData} key={1} floor={1} />
        {kidsQueries.map((queryResult, index) => {
          return <StoryComment queryResult={queryResult} key={index + 2} floor={index + 2} />
        })}
      </div>
    </div>
  )
}

interface StoryCommentProps {
  queryResult: UseQueryResult<HackerNewsItemType>
  floor: number
}

function StoryComment(props: StoryCommentProps) {
  const { queryResult, floor } = props

  if (queryResult.status === 'loading') {
    return <div>Loading...</div>
  }
  if (queryResult.status === 'error') {
    return <div>Error: {JSON.stringify(queryResult.error)}</div>
  }

  const { by, time, text } = queryResult.data
  if (by === '') {
    return <div></div>
  }

  return (
    <div className="bg-gray-800 text-gray-200 p-2 mb-4">
      <div className="flex">
        <div>#{floor}</div>&nbsp;
        <div className="text-blue-400">{by}</div>&nbsp;
        <div>{timeAgo(time)}</div>
      </div>
      <div>
        <div className="text-left" dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>
    </div>
  )
}
