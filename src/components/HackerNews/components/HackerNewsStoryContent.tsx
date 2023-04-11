import {useState, type RefObject, Suspense} from 'react';
import {useAtomValue} from 'jotai';
import {type UseQueryResult} from '@tanstack/react-query';
import {useContentQuery, useItemQueries} from '../query';
import {timeAgo} from '../util';
import {type HackerNewsItemType} from '../zod.schema';
import {useBottomScrollListener} from 'react-bottom-scroll-listener';
import global from '../global';
import {nanoid} from 'nanoid';
import PuffLoader from '../../share/PuffLoader';

export default function HackerNewsStoryContent() {
	const [page, setPage] = useState(1);

	const data = useAtomValue(global.hackerNewsStoryContentAtom);

	const {totalPages, originPostData, itemIds, kidsQueries} = useContentQuery({
		data,
		page,
	});

	const scrollRef = useBottomScrollListener(
		() => {
			setPage(prev => (prev < totalPages ? prev + 1 : prev));
		},
		{
			offset: 20,
			debounce: 300,
			triggerOnNoScroll: true,
		},
	);

	return (
		<div
			ref={scrollRef as RefObject<HTMLDivElement>}
			className='bg-gray-900 text-gray-200 p-2 h-full overflow-y-scroll'
		>
			<div className='h-12'>
				<StoryComment key={1} queryResult={originPostData} floor={1}/>
				{kidsQueries.map((queryResult, index) => (
					<StoryComment
						key={itemIds[index]}
						queryResult={queryResult}
						floor={index + 2}
					/>
				))}
			</div>
		</div>
	);
}

type StoryCommentProps = {
	queryResult: UseQueryResult<HackerNewsItemType>;
	floor?: number;
};

function StoryComment(props: StoryCommentProps) {
	const [loadChild, setLoadChild] = useState(false);
	const {queryResult, floor} = props;

	if (queryResult.status === 'loading') {
		return <PuffLoader/>;
	}

	if (queryResult.status === 'error') {
		return <div>Error: {JSON.stringify(queryResult.error)}</div>;
	}

	const {by, time, text, kids} = queryResult.data;

	if (by === '') {
		return <div/>;
	}

	return (
		<div className='bg-gray-800 text-gray-200 px-2 my-2 py-1'>
			<div className='flex'>
				{floor ? <div>#{floor}&nbsp;</div> : <div/>}
				<div className='text-blue-400'>{by}</div>&nbsp;
				<div>{timeAgo(time)}</div>
				<div>
					{floor !== 1 && kids && kids.length > 0 && (
						<button
							type='button'
							className='px-2' onClick={() => {
								setLoadChild(!loadChild);
							}}
						>
							&nbsp;▾
						</button>
					)}
				</div>
			</div>
			<div>
				<div
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{__html: text}}
					className='text-left mb-3'/>
				<div className='pl-4'>
					{floor !== 1 && (
						<Suspense fallback={<PuffLoader/>}>
							{loadChild && <StoryCommentChildren kids={kids}/>}
						</Suspense>
					)}
				</div>
			</div>
		</div>
	);
}

function StoryCommentChildren({kids}: {kids: number[]}) {
	const childQueries = useItemQueries(kids);
	return (
		<>
			{childQueries.map(childQueryResult => <StoryComment key={nanoid()} queryResult={childQueryResult}/>)}
		</>
	);
}
