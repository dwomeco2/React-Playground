import {useState, Suspense} from 'react';
import styles from './index.module.css';
import PuffLoader from '../share/PuffLoader';
import {LazyImage} from '../share/LazyImage';
import {imageSources} from '../share/ImageData';

export default function PreviewCardComponent() {
	const [onOpen, setOnOpen] = useState(false);
	return (
		<div className='w-full relative'>
			<div className='grid grid-cols-[repeat(auto-fit,_minmax(18rem,_1fr))] gap-4 place-items-center'>
				{[1, 2, 3, 4, 5, 6].map(n => {
					const src = `${imageSources[n % imageSources.length]}?sig=preview-${n}`;
					return (
						<div
							key={n}
							className={`w-72 h-128 rounded-lg overflow-clip bg-gray-50 bg-opacity-10 text-white py-2 ${styles.card_hover_shadow} cursor-pointer`}
							onClick={() => {
								if (window.innerWidth < 800) {
									return;
								}

								setOnOpen(!onOpen);
							}}
						>
							<div className='flex px-2 pb-2 items-center'>
								<img src='https://picsum.photos/50/50' className='w-6 h-6 rounded-full' loading='lazy'/>
								<div className='flex flex-col flex-1 text-start ml-2'>
									<span className='text-sm font-semibold'>Stuar Manson</span>
									<span className='text-xs'>published 2 hours ago</span>
								</div>
								<button type='button'>
									<span>
										<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
											<path d='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'/>
										</svg>
									</span>
								</button>
							</div>
							<figure className='bg-[#2f4f4f]'>
								<Suspense fallback={
									<div className='w-full h-52 flex justify-center items-center'>
										<PuffLoader/>
									</div>
								}
								>
									<LazyImage
										className='w-full h-52 object-cover'
										src={src}
										height='100%'
										width='100%'/>
								</Suspense>
							</figure>
							<div className='text-start p-2'>
								<div className='font-medium mb-0'>Flores</div>
								<span className='font-light text-xs'>by Stuar Manson</span>
								<p className='text-xs'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nihil aut sed facilis laudantium obcaecati architecto qui nobis impedit id commodi eveniet tempora asperiores sunt
									iste, ducimus reiciendis quae vitae?
								</p>
							</div>
						</div>
					);
				})}
			</div>
			{onOpen && (
				<div className='absolute-center-xy p-2 rounded-md bg-[var(--colar-gray-2)] text-[var(--colar-gray-2)] font-medium no-scrollbar'>
					<div className={`${styles['preview-content-grid']} w-full h-full no-scrollbar`}>
						<div className='inline text-start text-md'>
							<p className='inline text-9xl'>Lorem</p>
						</div>
						<div className='inline text-end'>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere aperiam rem veritatis, quaerat commodi vero possimus earum libero sit dicta facilis maiores fuga esse doloremque, iste
							adipisci similique nisi exercitationem. Architecto illo neque doloremque voluptate eos quos velit, placeat, iure asperiores sapiente necessitatibus tenetur ut? Nobis quibusdam aliquam
							sunt sed? Distinctio error dolorum laboriosam, numquam pariatur minima esse nam atque.
						</div>
						<div/>
						<div/>
						<div/>
						<img
							src='https://drscdn.500px.org/photo/1065848031/m%3D900/v2?sig=96566069619888852891868ed7ca49bdca25190570fec7866f32ce333ab1c737'
							alt='Sunset on Grand Canal  by Tommaso  Pessotto on 500px.com'
						/>
					</div>
					<div
						className='absolute w-4 h-4 right-10 top-4' onClick={() => {
							setOnOpen(false);
						}}
					>
						Close
					</div>
				</div>
			)}
		</div>
	);
}
