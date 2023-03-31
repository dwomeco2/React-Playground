import { useState } from 'react'
import { UseQueryResult } from '@tanstack/react-query'
import { useTopStoriesQuery, usePaginatedItemQueries, useContentQuery } from './query'
import { timeAgo } from './util'
import { HackerNewsItemType } from './zod.schema'
import { atom, useAtom } from 'jotai'

const maxPageItems = 10
const maxCommentsPerPage = 20
const hackerNewsStoryContentAtom = atom({} as HackerNewsItemType)

interface HackerNewsItemStoryProps {
  item: any
  onClick: () => void
}

function HackerNewsItemStory(props: HackerNewsItemStoryProps) {
  const { item: data, onClick } = props

  const kids = data.kids
  let page = Math.floor(kids.length / maxCommentsPerPage) + (kids.length % maxCommentsPerPage > 0 ? 1 : 0)
  const pagestr = page <= 1 ? '1 page' : `${page} pages`

  return (
    <div className="bg-gray-900 text-gray-200 pl-8 pr-2 cursor-pointer" onClick={onClick}>
      <div className="w-full inline-block py-2">
        <div className="float-left">
          <span className="text-blue-400">{data.by}&nbsp;</span>
          <span className="">{timeAgo(data.time)}&nbsp;</span>
          <span>🖒{data.score ?? ''}</span>
        </div>
        <span className="float-right">&nbsp;{pagestr}</span>
      </div>
      <div className="pb-4 border-b-2 border-gray-200">
        <span className="inline-block w-full text-left text-xl text-gray-100">
          {data.title}&nbsp;
          <a href={`${data.url}`} target="_blank" title={`${data.url}`}>
            🔗
          </a>
        </span>
      </div>
    </div>
  )
}

function HackerNewsItem({ item }: { item: any }) {
  const setContent = useAtom(hackerNewsStoryContentAtom)[1]
  const { status, error, data } = item
  if (status === 'loading') {
    return <div>Item Loading...</div>
  }
  if (status === 'error') {
    return <div>Item Error: {JSON.stringify(error)}</div>
  }

  if (data?.type === 'story') {
    return <HackerNewsItemStory item={data} onClick={() => setContent(data as HackerNewsItemType)} />
  }

  return <></>
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

function HackerNewsStoryContent() {
  const [page, setPage] = useState(1)

  const data = useAtom(hackerNewsStoryContentAtom)[0]

  const { originPostData, kidsQueries } = useContentQuery({ data, page, maxCommentsPerPage })

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

export default function HackerNews() {
  const [page, setPage] = useState(1)

  const topStoriesIDsQuery = useTopStoriesQuery()

  const topStoriesQueries = usePaginatedItemQueries(page, maxPageItems, topStoriesIDsQuery.data)

  let content = null
  if (topStoriesIDsQuery.status === 'loading') {
    content = <div>Loading...</div>
  }
  if (topStoriesIDsQuery.status === 'error') {
    content = <div>Error: {JSON.stringify(topStoriesIDsQuery.error)}</div>
  }

  if (topStoriesIDsQuery.data) {
    content = (
      <>
        <div className="shrink-0 w-[28rem] h-full overflow-y-scroll">
          {topStoriesQueries.map((item, index) => {
            return <HackerNewsItem key={index} item={item} />
          })}
        </div>
        <div className="grow">
          <HackerNewsStoryContent />
        </div>
      </>
    )
  }

  return <div className="flex w-full h-screen">{content}</div>
}
