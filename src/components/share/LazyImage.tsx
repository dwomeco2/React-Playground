import {useImage} from 'react-image';

type LazyImageProps = Record<string, unknown>;

export function LazyImage(props: LazyImageProps) {
	const {src: pSrc, ...rest} = props;
	const {src} = useImage({
		srcList: (pSrc as string) ?? '',
		useSuspense: true,
	});
	return (
		<img src={src} {...rest}/>
	);
}
