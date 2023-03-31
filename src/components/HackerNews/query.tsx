import { useQueries, useQuery } from '@tanstack/react-query'
import { fetchTopStories, queryItem } from './apis'
import { HackerNewsItemType } from './zod.schema'
import { sortKidsOldestFirst } from './util'

export const useTopStoriesQuery = () => {
  return useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories,
    cacheTime: 12 * 5 * 60 * 1000, // 1 hour
    staleTime: 6 * 5 * 60 * 1000 // 30 minutes
  })
}

export const useItemQuery = (itemID: number, isSuspense = false) => {
  return useQuery({
    queryKey: ['item', itemID],
    queryFn: () => queryItem(itemID),
    cacheTime: 6 * 5 * 60 * 1000, // 30 minutes
    staleTime: 3 * 5 * 60 * 1000, // 15 minutes
    suspense: isSuspense,
    enabled: Boolean(itemID)
  })
}

export const useItemQueries = (itemIDs: number[] = []) => {
  return useQueries({
    queries: itemIDs.map(itemID => {
      return {
        queryKey: ['item', itemID],
        queryFn: () => queryItem(itemID),
        cacheTime: 6 * 5 * 60 * 1000, // 30 minutes
        staleTime: 3 * 5 * 60 * 1000 // 15 minutes
      }
    })
  })
}

// Min value for page is 1
export const usePaginatedItemQueries = (currentPage: number, maxQueriesPerPage: number, itemIDs: number[] | undefined = []) => {
  const divisor = Math.floor(itemIDs.length / maxQueriesPerPage)
  const remainder = itemIDs.length % maxQueriesPerPage
  const totalPages = remainder === 0 ? divisor : divisor + 1

  let currentQueriesCount = maxQueriesPerPage
  if (currentPage > totalPages) {
    // Here when queries is undefined or ...
    currentQueriesCount = 0
  } else if (currentPage == totalPages) {
    currentQueriesCount = remainder
  }

  const paginatedItemIDs = itemIDs.slice((currentPage - 1) * maxQueriesPerPage, (currentPage - 1) * maxQueriesPerPage + currentQueriesCount)

  return useItemQueries(paginatedItemIDs)
}

interface UseContentQueryProps {
  data: HackerNewsItemType
  page: number
  maxCommentsPerPage: number
}

export const useContentQuery = ({ data, page, maxCommentsPerPage }: UseContentQueryProps) => {
  const originPostData = useItemQuery(data.id)

  const sortedKids = sortKidsOldestFirst(data.kids)
  const kidsQueries = usePaginatedItemQueries(page, maxCommentsPerPage, sortedKids)

  return { originPostData, kidsQueries }
}

// experimental
// interface QueryBoundariesProps {
//   children: ReactNode
//   LoadingView: React.ComponentType<any>
// }

// export const QueryBoundaries = ({ children, LoadingView }: QueryBoundariesProps) => (
//   <QueryErrorResetBoundary>
//     {({ reset }) => (
//       <ErrorBoundary onReset={reset} FallbackComponent={ErrorView}>
//         <Suspense fallback={<LoadingView />}>{children}</Suspense>
//       </ErrorBoundary>
//     )}
//   </QueryErrorResetBoundary>
// )

// // Error + retry
// export const ErrorView = ({ error, resetErrorBoundary }: FallbackProps) => {
//   console.log('ErrorView: ', error)
//   return (
//     <div>
//       <div>{JSON.stringify(error ?? {})}</div>
//       <button title="Retry" onClick={resetErrorBoundary} />
//     </div>
//   )
// }
