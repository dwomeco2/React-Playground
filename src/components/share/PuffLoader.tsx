import {type CSSProperties} from 'react';

type PuffLoaderProps = {
	[key: string]: unknown;
	style?: CSSProperties;
	className?: string;
};

export default function PuffLoader(props: PuffLoaderProps) {
	const {className, ...rest} = props;
	return (
		<div className='relative h-full'>
			<div className={`absolute-center-xy flex justify-center items-center w-12 h-12 ${className ? className : ''} `} {...rest}>
				<img src='puff.svg' width='100%' height='100%'/>
			</div>
		</div>
	);
}
