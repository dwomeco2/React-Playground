import {useState, Suspense} from 'react';
import TodoList from './Todolist';
import Game2048 from './Game2048';
import {nanoid} from 'nanoid';
import PuffLoader from '../share/PuffLoader';

const Components = [
	[<TodoList key={nanoid()}/>, 'TodoList'] as const,
	[<Game2048 key={nanoid()}/>, '2048'] as const,
];

export default function Latest() {
	const [show, setShow] = useState(1);
	return (
		<div className='flex flex-col w-full'>
			<div className='flex flex-wrap w-full justify-center gap-2 text-center mb-2'>
				{Components.map(([, name], index) => (
					<div key={name}>
						<button
							type='button'
							className='py-2 px-8 w-full bg-green-500 text-white'
							onClick={() => {
								setShow(index);
							}}
						>
							{name}
						</button>
					</div>
				))}
			</div>
			<div className='w-full h-full'>
				<div>
					<Suspense fallback={<PuffLoader/>}>
						{Components[show][0]}
					</Suspense>
				</div>
			</div>
		</div>
	);
}
