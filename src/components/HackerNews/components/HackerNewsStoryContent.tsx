import { useState, RefObject, Suspense } from "react"
import { useAtomValue } from "jotai"
import { UseQueryResult } from "@tanstack/react-query"
import { useContentQuery, useItemQueries } from "../query"
import { timeAgo } from "../util"
import { HackerNewsItemType } from "../zod.schema"
import { useBottomScrollListener } from "react-bottom-scroll-listener"
import global from "../global"

export default function HackerNewsStoryContent() {
	const [page, setPage] = useState(1)

	const data = useAtomValue(global.hackerNewsStoryContentAtom)

	const { totalPages, originPostData, kidsQueries } = useContentQuery({
		data,
		page
	})

	const scrollRef = useBottomScrollListener(
		() => {
			setPage(prev => (prev < totalPages ? prev + 1 : prev))
		},
		{
			offset: 20,
			debounce: 300,
			triggerOnNoScroll: true
		}
	)

	return (
		<div
			ref={scrollRef as RefObject<HTMLDivElement>}
			className='bg-gray-900 text-gray-200 p-2 h-full overflow-y-scroll'
		>
			<div>
				<StoryComment queryResult={originPostData} key={1} floor={1} />
				{kidsQueries.map((queryResult, index) => {
					return (
						<StoryComment
							queryResult={queryResult}
							key={index + 2}
							floor={index + 2}
						/>
					)
				})}
			</div>
		</div>
	)
}

interface StoryCommentProps {
	queryResult: UseQueryResult<HackerNewsItemType>
	floor?: number
}

function StoryComment(props: StoryCommentProps) {
	const [loadChild, setLoadChild] = useState(false)
	const { queryResult, floor } = props

	if (queryResult.status === "loading") {
		return <div>Loading...</div>
	}
	if (queryResult.status === "error") {
		return <div>Error: {JSON.stringify(queryResult.error)}</div>
	}
	const { by, time, text, kids } = queryResult.data

	if (by === "") {
		return <div></div>
	}

	return (
		<div className='bg-gray-800 text-gray-200 px-2 my-2 py-1'>
			<div className='flex'>
				{floor != null ? <div>#{floor}&nbsp;</div> : <div></div>}
				<div className='text-blue-400'>{by}</div>&nbsp;
				<div>{timeAgo(time)}</div>
				<div>
					{floor != 1 && kids != null && kids.length > 0 && (
						<button className='px-2' onClick={() => setLoadChild(!loadChild)}>
							&nbsp;▾
						</button>
					)}
				</div>
			</div>
			<div>
				<div
					className='text-left mb-3'
					dangerouslySetInnerHTML={{ __html: text }}
				></div>
				<div className='pl-4'>
					{floor != 1 && (
						<Suspense fallback={<></>}>
							{loadChild && <StoryCommentChildren kids={kids} />}
						</Suspense>
					)}
				</div>
			</div>
		</div>
	)
}

function StoryCommentChildren({ kids }: { kids: number[] }) {
	const childQueries = useItemQueries(kids)
	return (
		<>
			{childQueries.map((childQueryResult, index) => {
				return <StoryComment queryResult={childQueryResult} key={index} />
			})}
		</>
	)
}
