import {type RefObject, useState} from 'react';
import {useSetAtom} from 'jotai';
import {useTopStoriesList} from '../query';
import {timeAgo} from '../util';
import {type HackerNewsItemType} from '../zod.schema';
import {useBottomScrollListener} from 'react-bottom-scroll-listener';
import global from '../global';
import {type UseQueryResult} from '@tanstack/react-query';
import PuffLoader from '../../share/PuffLoader';

export default function HackerNewsList() {
	const [page, setPage] = useState(1);
	const [totalPages, itemIds, topStoriesQueries] = useTopStoriesList({page});

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
			className='list-scroller w-full h-full overflow-y-scroll'
		>
			{topStoriesQueries.map((item, index) => <HackerNewsListItem key={itemIds[index]} item={item}/>)}
			{/* Placeholder for scroll to bottom detector */}
			<div className='bottom-1 w-full h-[1px]'/>
		</div>
	);
}

function HackerNewsListItem({item}: {item: UseQueryResult<HackerNewsItemType>}) {
	const setContent = useSetAtom(global.hackerNewsStoryContentAtom);
	const toggleSideBar = useSetAtom(global.toggleSideBarAtom);

	const {status, error, data} = item;
	if (status === 'loading') {
		return (
			<div className='h-12 bg-gray-900 text-gray-200 pl-2 sm:pl-8 pr-2'>
				<PuffLoader/>
			</div>
		);
	}

	if (status === 'error') {
		return <div>Item Error: {JSON.stringify(error)}</div>;
	}

	if (data?.type === 'story') {
		return (
			<HackerNewsListItemStory
				item={data}
				onClick={() => {
					setContent(data);
					toggleSideBar();
				}}
			/>
		);
	}

	return <div>-</div>;
}

type HackerNewsListItemStoryProps = {
	item: HackerNewsItemType;
	onClick: () => void;
};

function HackerNewsListItemStory(props: HackerNewsListItemStoryProps) {
	const {item: data, onClick} = props;

	const {kids} = data;
	const page
		= Math.floor(kids.length / global.maxCommentsPerPage)
		+ (kids.length % global.maxCommentsPerPage > 0 ? 1 : 0);
	const pagestr = page <= 1 ? '1 page' : `${page} pages`;

	return (
		<div
			className='bg-gray-900 text-gray-200 pl-2 sm:pl-8 pr-2 cursor-pointer'
			onClick={onClick}
		>
			<div className='w-full inline-block py-2'>
				<div className='float-left'>
					<span className='text-blue-400'>{data.by}&nbsp;</span>
					<span className=''>{timeAgo(data.time)}&nbsp;</span>
					<span>🖒{data.score ?? ''}</span>
				</div>
				<span className='float-right'>&nbsp;{pagestr}</span>
			</div>
			<div className='pb-4 border-b-2 border-gray-200'>
				<span className='inline-block w-full text-left text-xl text-gray-100'>
					{data.title}&nbsp;
					<a href={`${data.url}`} target='_blank' title={`${data.url}`} rel='noreferrer'>
						🔗
					</a>
				</span>
			</div>
		</div>
	);
}
