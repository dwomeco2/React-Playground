import {useState, cloneElement, Suspense, useEffect} from 'react';
import {initializeImageSliderState} from './ImageSliderState';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {SuspenseImage} from '../share/SuspenseImage';

export default function ImageSlider() {
	const [imageSliderState, setImageSliderState] = useState(
		initializeImageSliderState(),
	);

	useEffect(() => {
		const resizeCallback = () => {
			const el = document.querySelector('.image_slide_item:nth-child(3)');
			if (el) {
				el.scrollIntoView({
					behavior: 'auto',
					block: 'center',
					inline: 'center',
				});
			}
		};

		resizeCallback();

		window.addEventListener('resize', resizeCallback);
		return () => {
			window.removeEventListener('resize', resizeCallback);
		};
	}, []);

	if (imageSliderState.total_images < imageSliderState.visible_no_image) {
		return <div>Not enought Images</div>;
	}

	function next() {
		const cid
			= (imageSliderState.current_imageId + 1) % imageSliderState.total_images;
		const newImages = imageSliderState.images;
		const newBackImages = imageSliderState.back_images;

		if (
			imageSliderState.back_images.length > 0
			&& imageSliderState.images.length > 0
		) {
			// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
			newImages.push(newBackImages.pop()!);
			// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
			newBackImages.unshift(newImages.shift()!);
		}

		setImageSliderState(prev => ({
			...prev,
			direction: 'rtl',
			currentImageId: cid,
			images: newImages,
			backImages: newBackImages,
		}));
	}

	function before() {
		const c = imageSliderState.current_imageId;
		const t = imageSliderState.total_images;
		const newImages = imageSliderState.images;
		const newBackImages = imageSliderState.back_images;

		if (
			imageSliderState.back_images.length > 0
			&& imageSliderState.images.length > 0
		) {
			// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
			newBackImages.push(newImages.pop()!);
			// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
			newImages.unshift(newBackImages.shift()!);
		}

		setImageSliderState(prev => ({
			...prev,
			direction: 'ltr',
			currentImageId: c === 1 ? t : c - 1,
			images: newImages,
			backImages: newBackImages,
		}));
	}

	return (
		<div className='relative w-full'>
			<div className='absolute-center-xy mt-[120px] flex w-[600px] sm:w-[720px] justify-center scale-50 xs:scale-75 sm:scale-100 transition-all'>
				<TransitionGroup
					className='image_slider no-scrollbar overflow-hidden'
					// The exiting component is already detached and therefore does not get any updates.
					// https://stackoverflow.com/questions/48655213/react-csstransition-wrong-class-used-on-exit
					childFactory={child =>
						cloneElement(child, {classNames: `${imageSliderState.direction}`})}
				>
					{imageSliderState.images.map((image, index) => {
						const {type, imageSize} = mapImageSliderStateStyle();
						const navOnClick = index === 1 ? before : index === 3 ? next : null;

						return (
							<CSSTransition
								key={image.id}
								timeout={200}
								classNames={`${imageSliderState.direction}`}
								addEndListener={() => {
									// Image.nodeRef.current?.classList.toggle(`${dir}`)
								}}
							>
								<div
									className={`image_slide_item ${type[index]} ${
										(index === 1 || index === 3) ? 'cursor-pointer' : ''
									}`}
									onClick={() => {
										if (navOnClick) {
											navOnClick();
										}
									}}
								>
									<Suspense
										fallback={
											<div className='w-full h-full flex justify-center items-center'>
												Loading...
											</div>
										}
									>
										<SuspenseImage
											src={image.src}
											width={imageSize[index]}
											height={imageSize[index]}
										/>
									</Suspense>
									<img
										src={image.src}
										width={imageSize[index]}
										height={imageSize[index]}
									/>
									{/* Hidden class for tailwindcss to not remove it from bundle */}
									<div className='hidden ltr-enter ltr-enter-active rtl-enter rtl-enter-active ltr-exit ltr-exit-active rtl-exit rtl-exit-active'/>
								</div>
							</CSSTransition>
						);
					})}
				</TransitionGroup>
			</div>
			<div className='absolute-center-xy mt-[240px] sm:mt-[300px] flex justify-center gap-x-8'>
				<button
					type='button'
					className='text-center py-2 px-4 sm:px-6 rounded-full bg-emerald-600 text-white'
					onClick={() => {
						before();
					}}
				>
					Prev
				</button>
				<button
					type='button'
					className='text-center py-2 px-4 sm:px-6 rounded-full bg-emerald-600 text-white'
					onClick={() => {
						next();
					}}
				>
					Next
				</button>
			</div>
		</div>
	);
}

const mapImageSliderStateStyle = () => {
	const type = [
		'carousel-2',
		'carousel-1',
		'carousel0',
		'carousel1',
		'carousel2',
	];
	const imageSize = [150, 200, 250, 200, 150];
	return {type, imageSize};
};
