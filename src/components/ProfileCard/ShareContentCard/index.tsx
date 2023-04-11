import {useRef} from 'react';

import {
	FaTwitter,
	FaLinkedin,
	FaFacebookSquare,
	FaInstagram,
	FaPinterestSquare,
	FaGetPocket,
} from 'react-icons/fa';

import styles from './index.module.css';

const socialIcons = [
	{
		icon: <FaTwitter size='1.1rem'/>,
		link: 'https://twitter.com/',
		name: 'twitter',
	},
	{
		icon: <FaFacebookSquare size='1.1rem'/>,
		link: 'https://facebook.com/',
		name: 'facebook',
	},
	{
		icon: <FaInstagram size='1.1rem'/>,
		link: 'https://www.instagram.com/',
		name: 'instagram',
	},
	{
		icon: <FaPinterestSquare size='1.1rem'/>,
		link: 'https://www.youtube.com/',
		name: 'youtube',
	},
	{
		icon: <FaLinkedin size='1.1rem'/>,
		link: 'https://www.linkedin.com/',
		name: 'linkedin',
	},
	{
		icon: <FaGetPocket size='1.1rem'/>,
		link: 'https://github.com/',
		name: 'github',
	},
];

function SocialIconsList(): JSX.Element {
	return (
		<div className={`${styles['social-icons']} flex justify-between my-4 gap-2 text-sm`}>
			{socialIcons.map(({icon, name}) => (
				<button
					key={name}
					name={name}
					type='button'
					className=' shrink-0 w-8 h-8 flex justify-center items-center text-white bg-gray-300 rounded-full overflow-hidden ring-black'
				>
					{icon}
				</button>
			))}
		</div>
	);
}

function CopyInput({
	link,
	inputRef,
}: {
	link: string;
	inputRef: React.RefObject<HTMLInputElement>;
}): JSX.Element {
	return (
		<div className='flex bg-gray-300 px-2 py-1 rounded-md text-xs'>
			<input
				ref={inputRef}
				readOnly
				type='text'
				value={link}
				className='grow bg-transparent outline-none'
			/>
			<button
				type='button'
				className='font-medium pl-2'
				onClick={async () =>
					navigator.clipboard.writeText(inputRef.current?.value ?? '')}
			>
				Copy
			</button>
		</div>
	);
}

export default function ShareCard() {
	const inputRef
		= useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>;

	return (
		<div className='flex justify-center rounded-md overflow-hidden items-center w-[300px] transition-all'>
			<div className='w-full mx-auto'>
				<div className='h-full px-6 sm:px-8 py-6 bg-gray-100 rounded-xl shadow-md shadow-gray-400'>
					<div className='font-bold text-sm'>Share this challenge</div>
					<SocialIconsList/>
					<div className='text-xs mb-2'>or copy link</div>
					<CopyInput link='https://www.copymehaha.com/aslkdowce' inputRef={inputRef}/>
				</div>
			</div>
		</div>
	);
}
