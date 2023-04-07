import {
	useState,
	useEffect,
	createRef,
	Dispatch,
	SetStateAction,
	useReducer
} from "react"
import imagesjson from "./images.json"

type imageType = {
	id: number
	h: string
	bg: string
	ref: React.RefObject<HTMLDivElement>
}

type imageBoundingRect = { ref: React.RefObject<HTMLDivElement>; br: DOMRect }

type AnimatedLayoutHookType = [
	imageType[],
	Dispatch<SetStateAction<imageType[]>>
]

function useAnimatedImage(
	imagesProp: imageType[] | null
): AnimatedLayoutHookType {
	const [images, setImages] = useState<imageType[]>(imagesProp || [])
	const [domRects, setDomRects] = useState<imageBoundingRect[]>()

	useEffect(() => {
		const dr = images.map(item => {
			return { ref: item.ref, br: item.ref.current!.getBoundingClientRect() }
		})
		if (domRects != null) {
			domRects.forEach(oldItem => {
				const newItem = dr.find(
					item => item.ref.current === oldItem.ref.current
				)
				if (newItem != null) {
					const domNode = newItem.ref.current!
					const deltaX = oldItem.br.left - newItem.br.left
					const deltaY = oldItem.br.top - newItem.br.top

					if (deltaX !== 0 || deltaY !== 0) {
						domNode.style.transform = `translate(${deltaX}px, ${deltaY}px)`
						domNode.style.transition = "transform 0s"
						requestAnimationFrame(() => {
							// In order to get the animation to play, we'll need to wait for
							// the 'invert' animation frame to finish, so that its inverted
							// position has propagated to the DOM.
							//
							// Then, we just remove the transform, reverting it to its natural
							// state, and apply a transition so it does so smoothly.
							domNode.style.transform = ""
							domNode.style.transition = "transform 500ms"
						})
					}
				}
			})
		}
		setDomRects(dr)
	}, [images])

	return [images, setImages]
}

export default function MasonryLayout() {
	const [images, setImages] = useAnimatedImage(
		imagesjson.images.map(item => {
			return { ...item, ref: createRef<HTMLDivElement>() }
		})
	)
	const [isLoading, setIsLoading] = useState(false)

	function addFiveImage() {
		if (isLoading) return
		setIsLoading(true)

		const maxId = Math.max(...images.map(item => item.id))
		const result: any = []
		for (let i = 0; i < 5; i++) {
			result.push(addImage(maxId + i))
		}

		// simulate 1 seconds delay
		setTimeout(() => {
			setIsLoading(false)
			setImages([...images, ...result])
		}, 1000)
	}

	useEffect(() => {
		const scroller = document.querySelector(".scroller")
		const obCallback = (entries: IntersectionObserverEntry[]) => {
			if (scroller == null || scroller.scrollHeight <= scroller.clientHeight)
				return
			for (const e of entries) {
				if (e.isIntersecting) {
					// Scrolled to bottom
					// This could potentially replaced by useEffectEvent which is an experienmental API in React 18
					// Or use reducer for managing the state and dispatch an event here
					addFiveImage()
				}
			}
		}
		const ob = new IntersectionObserver(obCallback, {
			root: scroller,
			threshold: 0
		})

		ob?.observe(scroller?.lastChild as HTMLElement)
		return () => {
			ob?.unobserve(scroller?.lastChild as HTMLElement)
			ob?.disconnect()
		}
	}, [images, isLoading])

	return (
		<div>
			<p className='text-center'>
				masonry in grid layout only implemented by firefox
			</p>
			<div className='flex gap-x-4 justify-center my-6'>
				<button
					className='bg-slate-700 rounded-full py-2 px-8 text-white'
					onClick={() => setImages(randomize(images))}
				>
					Randomize
				</button>
				<button
					className='bg-red-500 rounded-full py-2 px-8 text-white'
					onClick={addFiveImage}
				>
					Add 5
				</button>
			</div>
			<div className='scroller w-full max-h-[50rem] relative overflow-y-scroll bg-gray-400'>
				{isLoading && (
					<div className='sticky top-0 w-full h-12 leading-[3rem] backdrop-blur text-center text-white font-bold text-lg z-20'>
						Loading
					</div>
				)}
				<div
					className={`scroller-item columns-3 sm:columns-7 gap-2 w-full rounded-md p-6 ${
						isLoading ? "mt-[-3rem]" : ""
					}`}
				>
					{images.map(item => {
						return (
							<div
								key={item.id}
								ref={item.ref}
								className='flex justify-center items-center relative mb-2 hover:scale-110 hover:z-10 cursor-pointer'
							>
								<div className='absolute text-5xl font-bold text-white'>
									{item.id}
								</div>
								<img
									className={`w-full aspect-video`}
									style={{
										height: `${item.h}`,
										backgroundColor: `${item.bg}`
									}}
								/>
							</div>
						)
					})}
				</div>
				{/* We must do this because of animation of scroller-item may trigger intersection, h-0 would not trigger */}
				<div className='w-full h-[1px]'></div>
			</div>
		</div>
	)
}

function randomize(images: any[]) {
	const newImages = [...images]

	for (let n = 0; n < newImages.length - 1; n++) {
		const k = n + Math.floor(Math.random() * (newImages.length - n))

		const temp = newImages[k]
		newImages[k] = newImages[n]
		newImages[n] = temp
	}

	return newImages
}

function addImage(maxId: number) {
	const randomHeight = `${Math.floor(Math.random() * (18 - 8 + 1)) + 8}rem`
	const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
		Math.random() * 256
	)}, ${Math.floor(Math.random() * 256)})`

	return {
		id: maxId + 1,
		h: randomHeight,
		bg: randomColor,
		ref: createRef<HTMLDivElement>()
	}
}
