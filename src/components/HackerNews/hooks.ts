import { useEffect } from "react"

interface UseScrollToBottomProps {
	options: {
		scrollerClass: string
		threshold: number | number[] | undefined
		observeElement?: HTMLElement
	}
	reachBottomCallback: () => void
	dependencies: any[]
}

export function useScrollToBottom(params: UseScrollToBottomProps) {
	const { options, reachBottomCallback, dependencies } = params
	const { scrollerClass, threshold } = options

	useEffect(() => {
		const scroller = document.querySelector(scrollerClass)

		const obCallback = (entries: IntersectionObserverEntry[]) => {
			if (scroller == null || scroller.scrollHeight <= scroller.clientHeight)
				return
			for (const e of entries) {
				// console.log(e.intersectionRatio, e.isIntersecting)
				// e.intersectionRatio
				if (e.intersectionRatio == 1 && e.isIntersecting) {
					// Scrolled to bottom
					// This could potentially replaced by useEffectEvent which is an experienmental API in React 18
					// Or use reducer for managing the state and dispatch an event here
					reachBottomCallback()
				}
			}
		}

		const ob = new IntersectionObserver(obCallback, {
			root: scroller,
			threshold: threshold
		})

		if (options.observeElement == null) {
			ob?.observe(scroller?.lastChild as HTMLElement)
		} else {
			ob?.observe(options.observeElement)
		}

		return () => {
			if (options.observeElement == null) {
				ob?.unobserve(scroller?.lastChild as HTMLElement)
			} else {
				ob?.unobserve(options.observeElement)
			}

			ob?.disconnect()
		}
	}, dependencies)
}
