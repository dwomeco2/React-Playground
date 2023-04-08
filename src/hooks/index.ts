import { useRef, useState, useEffect, useMemo } from "react"
import { atom } from "jotai"
import { debounce } from "../utils"

export const useDebounce = (callback: () => void, ms: number) => {
	const ref = useRef(() => {})

	useEffect(() => {
		ref.current = callback
	}, [callback])

	const debouncedCallback = useMemo(() => {
		const func = () => {
			ref.current?.()
		}

		return debounce(func, ms)
	}, [])

	return debouncedCallback
}

export const useGlobalKeyDownEffect = <T extends unknown>(
	keys: string[],
	callbacks: ((deps: T[]) => void)[],
	dependencies: T[]
) => {
	const keyDownCallback = (e: KeyboardEvent) => {
		keys.forEach((key, index) => {
			if (e.key == key) {
				callbacks[index](dependencies)
			}
		})
	}
	useEffect(() => {
		window.addEventListener("keydown", keyDownCallback)
		return () => {
			window.removeEventListener("keydown", keyDownCallback)
		}
	}, [dependencies])
}

type UseClientSizeDetectorParams = {
	sizes: {
		minSize: number
		key: string
	}[]
}

export const useClientSizeDetector = (params: UseClientSizeDetectorParams) => {
	const [size, setSize] = useState<string | null>(null)

	if (params && params.sizes.length < 1) {
		throw Error("invalid params")
	}

	let sizes = params.sizes.sort((a, b) => b.minSize - a.minSize)

	const resizeCallback = () => {
		let clientWidth = window.innerWidth
		for (let i = 0; i < sizes.length; i++) {
			if (clientWidth >= sizes[i].minSize) {
				setSize(sizes[i].key)
				break
			}
		}
	}

	useEffect(() => {
		resizeCallback()

		window.addEventListener("resize", resizeCallback)
		return () => {
			window.removeEventListener("resize", resizeCallback)
		}
	}, [])

	return size
}

// Atom creator
export const toggleAtom = () => {
	const booleanAtom = atom(false)

	return atom(
		get => get(booleanAtom),
		(_get, set) => {
			set(booleanAtom, (prev: boolean) => !prev)
		}
	)
}
