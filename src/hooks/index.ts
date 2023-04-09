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

export function useMediaQuery(query: string): boolean {
	const getMatches = (query: string): boolean => {
		// Prevents SSR issues
		if (typeof window !== "undefined") {
			return window.matchMedia(query).matches
		}
		return false
	}

	const [matches, setMatches] = useState<boolean>(getMatches(query))

	function handleChange() {
		setMatches(getMatches(query))
	}

	useEffect(() => {
		const matchMedia = window.matchMedia(query)

		// Triggered at the first client-side load and if query changes
		handleChange()

		// Listen matchMedia
		matchMedia.addEventListener("change", handleChange)
		return () => {
			matchMedia.removeEventListener("change", handleChange)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query])

	return matches
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
export const atomWithToggle = (initialValue?: boolean) => {
	const booleanAtom = atom(
		initialValue ?? false,
		(get, set, update?: boolean) => {
			set(booleanAtom, update ?? !get(booleanAtom))
		}
	)
	return booleanAtom
}

export const useDelayedState = <T extends any>(initialState: T) => {
	const [state, setState] = useState(initialState)
	const timeoutRef = useRef<number | undefined>(undefined)

	const setDelayedState = (update: T, delayms?: number) => {
		if (!delayms) {
			setState(update)
		} else {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
			timeoutRef.current = setTimeout(() => {
				setState(initialState)
			}, delayms)
		}
	}

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
		}
	}, [state])

	return [state, setDelayedState] as const
}
