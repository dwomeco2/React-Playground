import { useState } from 'react'
import { useAtom } from 'jotai'
import { useTopStoriesList } from '../query'
import { timeAgo } from '../util'
import { HackerNewsItemType } from '../zod.schema'
import { useScrollToBottom, useDebounce } from '../hooks'
import global from '../global'

export default function HackerNewsList() {
  const [page, setPage] = useState(1)
  const [totalPages, topStoriesQueries] = useTopStoriesList({ page })

  const nextPage = useDebounce(() => {
    // wouldn't rerender if set to the same value as preve
    setPage(prev => (prev < totalPages ? prev + 1 : prev))
  }, 300)

  useScrollToBottom({
    options: {
      scrollerClass: '.list-scroller',
      threshold: 1
    },
    reachBottomCallback: () => {
      nextPage()
    },
    dependencies: []
  })

  return (
    <div className="list-scroller w-full h-full overflow-y-scroll">
      {topStoriesQueries.map((item, index) => {
        return <HackerNewsListItem key={index} item={item} />
      })}
      {/* Placeholder for scroll to bottom detector */}
      <div className="bottom-1 w-full h-[1px]"></div>
    </div>
  )
}

function HackerNewsListItem({ item }: { item: any }) {
  const setContent = useAtom(global.hackerNewsStoryContentAtom)[1]
  const { status, error, data } = item
  if (status === 'loading') {
    return <div className="bg-gray-900 text-gray-200 pl-8 pr-2">Item Loading...</div>
  }
  if (status === 'error') {
    return <div>Item Error: {JSON.stringify(error)}</div>
  }

  if (data?.type === 'story') {
    return <HackerNewsListItemStory item={data} onClick={() => setContent(data as HackerNewsItemType)} />
  }

  return <></>
}

interface HackerNewsListItemStoryProps {
  item: any
  onClick: () => void
}

function HackerNewsListItemStory(props: HackerNewsListItemStoryProps) {
  const { item: data, onClick } = props

  const kids = data.kids
  let page = Math.floor(kids.length / global.maxCommentsPerPage) + (kids.length % global.maxCommentsPerPage > 0 ? 1 : 0)
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
