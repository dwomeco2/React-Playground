import { useState, useRef } from "react"

import {
	FaTwitter,
	FaLinkedin,
	FaFacebookSquare,
	FaInstagram,
	FaPinterestSquare,
	FaGetPocket
} from "react-icons/fa"

interface SocialIconProps {
	icon: React.ReactNode
	link: string
}

function SocialIconsList(): JSX.Element {
	const [socialIcons, _setSocialIcons] = useState<SocialIconProps[]>([
		{
			icon: <FaTwitter size={"1.1rem"} />,
			link: "https://twitter.com/"
		},
		{
			icon: <FaFacebookSquare size={"1.1rem"} />,
			link: "https://twitter.com/"
		},
		{
			icon: <FaInstagram size={"1.1rem"} />,
			link: "https://www.instagram.com/"
		},
		{
			icon: <FaPinterestSquare size={"1.1rem"} />,
			link: "https://www.youtube.com/"
		},
		{
			icon: <FaLinkedin size={"1.1rem"} />,
			link: "https://www.linkedin.com/"
		},
		{
			icon: <FaGetPocket size={"1.1rem"} />,
			link: "https://github.com/"
		}
	])
	return (
		<div className='flex justify-between my-4 gap-2 text-sm'>
			{socialIcons.map(({ icon }, index) => (
				<button
					key={index}
					className=' shrink-0 w-8 h-8 flex justify-center items-center text-white bg-gray-300 rounded-full overflow-hidden hover:ring-1 ring-black'
				>
					{icon}
				</button>
			))}
		</div>
	)
}

function CopyInput({
	link,
	inputRef
}: {
	link: string
	inputRef: React.RefObject<HTMLInputElement>
}): JSX.Element {
	return (
		<div className='flex bg-gray-300 px-2 py-1 rounded-md text-xs'>
			<input
				ref={inputRef}
				type='text'
				value={link}
				className='grow bg-transparent outline-none'
				readOnly
			/>
			<button
				className='font-medium pl-2'
				onClick={() =>
					navigator.clipboard.writeText(inputRef.current?.value ?? "")
				}
			>
				Copy
			</button>
		</div>
	)
}

export default function ShareCard() {
	const [copyLink, _setCopyLink] = useState(
		"https://www.copymehaha.com/aslkdowce"
	)
	const inputRef =
		useRef<HTMLInputElement>() as React.MutableRefObject<HTMLInputElement>

	return (
		<div className='flex justify-center rounded-md overflow-hidden items-center w-[300px] transition-all'>
			<div className='w-full mx-auto'>
				<div className='h-full px-6 sm:px-8 py-6 bg-gray-100 rounded-xl shadow-md shadow-gray-400'>
					<div className='font-bold text-sm'>Share this challenge</div>
					<SocialIconsList />
					<div className='text-xs mb-2'>or copy link</div>
					<CopyInput link={copyLink} inputRef={inputRef} />
				</div>
			</div>
		</div>
	)
}
