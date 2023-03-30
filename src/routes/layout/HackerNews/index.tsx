import { useQuery, useQueries, UseQueryResult } from '@tanstack/react-query'
import { useState } from 'react'
import { fetchTopStories, queryItem } from './apis'
// {
//   "by" : "dhouston",
//   "descendants" : 71,
//   "id" : 8863,
//   "kids" : [ 8952, 9224, 8917],
//   "score" : 111,
//   "time" : 1175714200,
//   "title" : "My YC app: Dropbox - Throw away your USB drive",
//   "type" : "story",
//   "url" : "http://www.getdropbox.com/u/2/screencast.html"
// }

function HackerNewsItemStory({ item }: { item: any }) {
  const { by, score, title, url, time, descendants } = item

  return (
    <div className="bg-gray-900 text-gray-200 pl-8 pr-2 cursor-pointer" onClick={() => {}}>
      <div className="w-full inline-block py-2">
        <div className="float-left">
          <span className="text-blue-400">{by}&nbsp;</span>
          <span className="">ago&nbsp;</span>
          <span>{score}</span>
        </div>
        <span className="float-right">&nbsp;page</span>
      </div>
      <div className="pb-4 border-b-2 border-gray-200">
        <span className="inline-block w-full text-left text-xl text-gray-100">
          {title}&nbsp;
          <a href={`${url}`} target="_blank">
            LINK
          </a>
        </span>
      </div>
    </div>
  )
}

function HackerNewsItem({ status, error, data: item }: UseQueryResult<any, unknown>) {
  if (status === 'loading') {
    return <div>Item Loading...</div>
  }
  if (status === 'error') {
    return <div>Item Error: {JSON.stringify(error)}</div>
  }

  if (item.type === 'story') {
    return <HackerNewsItemStory item={item} />
  }

  // return <div>Unsupported type: {item?.type}</div>
  return <></>
}

// Min value for page is 1
function usePaginatedQueries(currentPage: number, maxQueriesPerPage: number, queries: any[]) {
  const divisor = Math.floor(queries.length / maxQueriesPerPage)
  const remainder = queries.length % maxQueriesPerPage
  const totalPages = remainder === 0 ? divisor : divisor + 1

  let currentQueriesCount = maxQueriesPerPage
  if (currentPage > totalPages) {
    // Here when queries is undefined or ...
    currentQueriesCount = 0
  } else if (currentPage == totalPages) {
    currentQueriesCount = remainder
  }

  const currentQueries = queries.slice((currentPage - 1) * maxQueriesPerPage, (currentPage - 1) * maxQueriesPerPage + currentQueriesCount)

  return useQueries({
    queries: currentQueries
  })
}

const maxPageItems = 10

export default function HackerNews() {
  const [page, setPage] = useState(1)
  const {
    status: statusTopStories,
    error: errorTopStories,
    data: topStoriesIDs
  } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories,
    cacheTime: 12 * 5 * 60 * 1000 // 1 hour
  })

  const topStoriesQueries = usePaginatedQueries(
    page,
    maxPageItems,
    topStoriesIDs?.map(itemID => {
      return {
        queryKey: ['item', itemID],
        queryFn: () => queryItem(itemID),
        cacheTime: 6 * 5 * 60 * 1000, // 30 minutes
        enabled: !!itemID
      }
    }) ?? []
  )

  if (statusTopStories === 'loading') {
    return <div>Loading...</div>
  }
  if (statusTopStories === 'error') {
    return <div>Error: {JSON.stringify(errorTopStories)}</div>
  }

  return (
    <div className="flex w-full h-screen">
      <div className="w-96">
        {topStoriesQueries.map((item, index) => {
          return <HackerNewsItem key={index} {...item} />
        })}
      </div>
      <div className="grow">content</div>
    </div>
  )
}
