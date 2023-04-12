import {
	useState,
	useEffect,
	createRef,
	type Dispatch,
	type SetStateAction,
	useCallback,
	Suspense,
} from 'react';
import imagesjson from './images.json';
import {LazyImage} from '../share/LazyImage';
import PuffLoader from '../share/PuffLoader';
import {imageSources} from '../share/ImageData';

type ImageType = {
	id: number;
	h: string;
	bg: string;
	ref: React.RefObject<HTMLDivElement>;
};

type ImageBoundingRect = {ref: React.RefObject<HTMLDivElement>; br: DOMRect};

type AnimatedLayoutHookType = [
	ImageType[],
	Dispatch<SetStateAction<ImageType[]>>,
];

function useAnimatedImage(
	imagesProp: ImageType[] | undefined,
): AnimatedLayoutHookType {
	const [images, setImages] = useState<ImageType[]>(imagesProp ?? []);
	const [domRects, setDomRects] = useState<ImageBoundingRect[]>();

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const dr = images.map(item => ({ref: item.ref, br: item.ref.current!.getBoundingClientRect()}));

		if (domRects && dr) {
			domRects.forEach(oldItem => {
				const newItem = dr.find(
					item => item.ref.current === oldItem.ref.current,
				);
				if (newItem) {
					const domNode = newItem.ref.current;
					const deltaX = oldItem.br.left - newItem.br.left;
					const deltaY = oldItem.br.top - newItem.br.top;

					if (domNode && (deltaX !== 0 || deltaY !== 0)) {
						domNode.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
						domNode.style.transition = 'transform 0s';
						requestAnimationFrame(() => {
							// In order to get the animation to play, we'll need to wait for
							// the 'invert' animation frame to finish, so that its inverted
							// position has propagated to the DOM.
							//
							// Then, we just remove the transform, reverting it to its natural
							// state, and apply a transition so it does so smoothly.
							domNode.style.transform = '';
							domNode.style.transition = 'transform 500ms';
						});
					}
				}
			});
		}
	}, [images, domRects]);

	useEffect(() => {
		if (images.every(item => item.ref.current)) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const dr = images.map(item => ({ref: item.ref, br: item.ref.current!.getBoundingClientRect()}));
			setDomRects(dr);
		}
	}, [images]);

	return [images, setImages];
}

export default function MasonryLayout() {
	const [images, setImages] = useAnimatedImage(
		imagesjson.images.map(item => ({...item, ref: createRef<HTMLDivElement>()})),
	);
	const [isLoading, setIsLoading] = useState(false);

	const addFiveImage = useCallback(() => {
		if (isLoading) {
			return;
		}

		setIsLoading(true);

		const maxId = Math.max(...images.map(item => item.id));
		const result: ImageType[] = [];
		for (let i = 0; i < 5; i++) {
			result.push(addImage(maxId + i));
		}

		// Simulate 1 seconds delay
		setTimeout(() => {
			setIsLoading(false);
			setImages([...images, ...result]);
		}, 1000);
	}, [images, isLoading, setImages]);

	useEffect(() => {
		const scroller = document.querySelector('.scroller');
		const obCallback = (entries: IntersectionObserverEntry[]) => {
			if (!scroller || scroller.scrollHeight <= scroller.clientHeight) {
				return;
			}

			for (const e of entries) {
				if (e.isIntersecting) {
					// Scrolled to bottom
					// This could potentially replaced by useEffectEvent which is an experienmental API in React 18
					// Or use reducer for managing the state and dispatch an event here
					addFiveImage();
				}
			}
		};

		const ob = new IntersectionObserver(obCallback, {
			root: scroller,
			threshold: 0,
		});

		ob?.observe(scroller?.lastChild as HTMLElement);
		return () => {
			ob?.unobserve(scroller?.lastChild as HTMLElement);
			ob?.disconnect();
		};
	}, [images, isLoading, addFiveImage]);

	return (
		<div>
			<p className='text-center'>
				masonry in grid layout only implemented by firefox
			</p>
			<div className='flex gap-x-4 justify-center my-6'>
				<button
					type='button'
					className='cbtn cbtn-secondary'
					onClick={() => {
						setImages(randomize(images));
					}}
				>
					Shuffle
				</button>
				<button
					type='button'
					className='cbtn cbtn-primary'
					onClick={addFiveImage}
				>
					Add 5
				</button>
			</div>
			<div className='scroller w-full max-h-[50rem] relative overflow-y-scroll no-scrollbar bg-gray-200 bg-opacity-10 rounded-md'>
				{isLoading && (
					<div className='sticky top-0 w-full h-12 leading-[3rem] backdrop-blur text-center text-white font-bold text-lg z-20'>
						Loading
					</div>
				)}
				<div
					className={`scroller-item columns-3 sm:columns-4 gap-2 w-full rounded-md p-6 ${isLoading ? 'mt-[-3rem]' : ''}`}
				>
					{images.map(item => {
						const src = `${imageSources[item.id % imageSources.length]}?sig=masonry-${item.id}`;
						return (
							<div
								key={item.id}
								ref={item.ref}
								className='flex justify-center items-center relative mb-2 hover:scale-110 hover:z-10 cursor-pointer'
								style={{height: `${item.h}`}}
							>
								<Suspense fallback={
									<div className='w-full h-full flex justify-center items-center' style={{background: `${item.bg}`}}>
										<PuffLoader/>
									</div>
								}
								>
									<LazyImage
										className='w-full h-full object-cover'
										src={src}
										height='100%'
										width='100%'/>
								</Suspense>
							</div>
						);
					})}
				</div>
				{/* We must do this because of animation of scroller-item may trigger intersection, h-0 would not trigger */}
				<div className='w-full h-[1px]'/>
			</div>
		</div>
	);
}

function randomize(images: ImageType[]) {
	const newImages = [...images];

	for (let n = 0; n < newImages.length - 1; n++) {
		const k = n + Math.floor(Math.random() * (newImages.length - n));

		const temp = newImages[k];
		newImages[k] = newImages[n];
		newImages[n] = temp;
	}

	return newImages;
}

function addImage(maxId: number) {
	const randomHeight = `${Math.floor(Math.random() * (18 - 8 + 1)) + 8}rem`;
	const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
		Math.random() * 256,
	)}, ${Math.floor(Math.random() * 256)})`;

	return {
		id: maxId + 1,
		h: randomHeight,
		bg: randomColor,
		ref: createRef<HTMLDivElement>(),
	};
}
