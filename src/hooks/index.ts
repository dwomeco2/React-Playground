import {useRef, useState, useEffect, useMemo} from 'react';
import {atom} from 'jotai';
import {debounce} from '../utils';

export const useDebounce = (callback: () => void, ms: number) => {
	const ref = useRef<() => void | undefined >();

	useEffect(() => {
		ref.current = callback;
	}, [callback]);

	const debouncedCallback = useMemo(() => {
		const func = () => {
			ref.current?.();
		};

		return debounce(func, ms);
	}, [ms]);

	return debouncedCallback;
};

export const useGlobalKeyDownEffect = <T>(
	keys: string[],
	callbacks: Array<(deps: T[]) => void>,
	dependencies: T[],
) => {
	const keyDownCallback = (e: KeyboardEvent) => {
		keys.forEach((key, index) => {
			if (e.key === key) {
				callbacks[index](dependencies);
			}
		});
	};

	useEffect(() => {
		window.addEventListener('keydown', keyDownCallback);
		return () => {
			window.removeEventListener('keydown', keyDownCallback);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dependencies]);
};

type UseClientSizeDetectorParams = {
	sizes: Array<{
		minSize: number;
		key: string;
	}>;
};

export function useMediaQuery(query: string): boolean {
	const getMatches = (query: string): boolean => {
		// Prevents SSR issues
		if (typeof window !== 'undefined') {
			return window.matchMedia(query).matches;
		}

		return false;
	};

	const [matches, setMatches] = useState<boolean>(getMatches(query));

	function handleChange() {
		setMatches(getMatches(query));
	}

	useEffect(() => {
		const matchMedia = window.matchMedia(query);

		// Triggered at the first client-side load and if query changes
		handleChange();

		// Listen matchMedia
		matchMedia.addEventListener('change', handleChange);
		return () => {
			matchMedia.removeEventListener('change', handleChange);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	return matches;
}

export const useClientSizeDetector = (params: UseClientSizeDetectorParams) => {
	const [size, setSize] = useState<string | undefined>();

	if (params && params.sizes.length < 1) {
		throw Error('invalid params');
	}

	const sizes = params.sizes.sort((a, b) => b.minSize - a.minSize);

	useEffect(() => {
		const resizeCallback = () => {
			const clientWidth = window.innerWidth;
			for (const size of sizes) {
				if (clientWidth >= size.minSize) {
					setSize(size.key);
					break;
				}
			}
		};

		resizeCallback();

		window.addEventListener('resize', resizeCallback);
		return () => {
			window.removeEventListener('resize', resizeCallback);
		};
	}, [sizes]);

	return size;
};

// Atom creator
export const atomWithToggle = (initialValue?: boolean) => {
	const booleanAtom = atom(
		initialValue ?? false,
		(get, set, update?: boolean) => {
			set(booleanAtom, update ?? !get(booleanAtom));
		},
	);
	return booleanAtom;
};

export const useDelayedState = <T>(initialState: T) => {
	const [state, setState] = useState(initialState);
	const timeoutRef = useRef<number | undefined>(undefined);

	const setDelayedState = (update: T, delayms?: number) => {
		if (!delayms) {
			setState(update);
			return;
		}

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			setState(initialState);
		}, delayms);
	};

	useEffect(() => () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	}, [state]);

	return [state, setDelayedState] as const;
};
