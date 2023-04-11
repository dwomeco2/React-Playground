import {useEffect, useState} from 'react';
import styles from './index.module.css';

function Slider() {
	const [sliderProgress, setSliderProgress] = useState(30);

	useEffect(() => {
		const slider = document.querySelector(
			`.${styles['slider-bar']}`,
		) as HTMLInputElement | undefined;

		const min = Number(slider?.min ?? 0);
		const max = Number(slider?.max ?? 0);
		const val = Number(slider?.value ?? 0);

		if (slider) {
			slider.style.backgroundSize = `${((val - min) * 100) / (max - min)}% 100%`;
		}
	}, [sliderProgress]);

	return (
		<div className='w-full h-1 rounded-lg relative mt-12 mb-16'>
			<input
				min={0}
				max={100}
				type='range'
				className={`${styles['slider-bar']} w-full appearance-none`}
				value={sliderProgress}
				onChange={e => {
					setSliderProgress(Number(e.target.value));
				}}
			/>
		</div>
	);
}

function Toggle({className = ''}: {className?: string}) {
	const [isMonthly, setIsMonthly] = useState(false);

	const discountBackgroundColor = 'bg-[var(--discount-background-color)]';
	const discountOnBackgroundColor
		= 'text-[var(--discount-on-background-color)]';

	return (
		<div className={className}>
			<div className='flex justify-center relative'>
				<div className='text-sm text-gray-600 mr-2'>Monthly Billing</div>
				<button
					type='button'
					className={`rounded-full
          ${styles.pricing_slider_toggle} 
          ${isMonthly ? `${styles.active}` : ''}`}
					onClick={() => {
						setIsMonthly(prev => !prev);
					}}
				/>
				<div className='text-sm text-gray-600 ml-2'>Yearly Billing</div>
				<div
					className={`absolute  top-6 right-2 sm:right-10 sm:top-[2px] font-medium text-xs px-2 rounded-full ${discountBackgroundColor} ${discountOnBackgroundColor}`}
				>
					25% discount
				</div>
			</div>
		</div>
	);
}

function Card({children}: {children?: JSX.Element | JSX.Element[]}) {
	return (
		<div className='min-w-[296px] w-[36rem] rounded-md bg-[var(--colar-gray-2)] p-4 sm:p-8 overflow-hidden'>
			{children}
		</div>
	);
}

export default function PriceSlider() {
	return (
		<div className='flex justify-center items-center transition-all'>
			<Card>
				<div className='flex items-center justify-between w-full'>
					<div className='font-bold text-gray-400'>100K PAGEVIEWS</div>
					<div className='flex items-center'>
						<span className='font-extrabold sm:text-3xl text-[var(--secondary-color)]'>
							$16.00
						</span>
						<span className='font-bold text-xs text-gray-400'>
							&nbsp;/ month
						</span>
					</div>
				</div>
				<Slider/>
				<Toggle className='my-8'/>
				<hr className='mb-8'/>
				<div className='flex items-center justify-between mb-2'>
					<ul className='flex flex-col gap-2 items-start text-start text-[var(--colar-gray-6)]'>
						<li>✅ Unlimited websites</li>
						<li>✅ 100% data ownership</li>
						<li>✅ Email reports</li>
					</ul>
					<div>
						<button
							type='button'
							className='py-2 px-2 sm:px-10 text-[0.6rem] sm:text-sm bg-[var(--secondary-color)] text-gray-50 rounded-full'
						>
							Start my trial
						</button>
					</div>
				</div>
			</Card>
		</div>
	);
}
