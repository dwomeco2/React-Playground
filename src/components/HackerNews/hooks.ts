import {useEffect} from 'react';

type UseScrollToBottomProps = {
	options: {
		scrollerClass: string;
		threshold: number | number[] | undefined;
		observeElement?: HTMLElement;
	};
	reachBottomCallback: () => void;
	dependencies: unknown[];
};

export function useScrollToBottom(params: UseScrollToBottomProps) {
	const {options, reachBottomCallback, dependencies} = params;

	useEffect(() => {
		const {scrollerClass, threshold, observeElement} = options;
		const scroller = document.querySelector(scrollerClass);

		const obCallback = (entries: IntersectionObserverEntry[]) => {
			if (!scroller || scroller.scrollHeight <= scroller.clientHeight) {
				return;
			}

			for (const e of entries) {
				// Console.log(e.intersectionRatio, e.isIntersecting)
				// e.intersectionRatio
				if (e.intersectionRatio === 1 && e.isIntersecting) {
					// Scrolled to bottom
					// This could potentially replaced by useEffectEvent which is an experienmental API in React 18
					// Or use reducer for managing the state and dispatch an event here
					reachBottomCallback();
				}
			}
		};

		const ob = new IntersectionObserver(obCallback, {
			root: scroller,
			threshold,
		});

		if (!observeElement) {
			ob?.observe(scroller?.lastChild as HTMLElement);
		} else {
			ob?.observe(observeElement);
		}

		return () => {
			if (!observeElement) {
				ob?.unobserve(scroller?.lastChild as HTMLElement);
			} else {
				ob?.unobserve(observeElement);
			}

			ob?.disconnect();
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reachBottomCallback, options, ...dependencies]);
}
