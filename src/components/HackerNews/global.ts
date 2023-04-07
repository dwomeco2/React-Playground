import { atom } from "jotai"
import { HackerNewsItemType } from "./zod.schema"

export default {
	maxPageItems: 9,
	maxCommentsPerPage: 20,
	hackerNewsStoryContentAtom: atom({} as HackerNewsItemType),
	toggleSideBarAtom: atomWithToggle(true)
}

export function atomWithToggle(initialValue: boolean = false) {
	const anAtom = atom(initialValue, (get, set, nextValue?: boolean) => {
		const update = nextValue ?? !get(anAtom)
		set(anAtom, update)
	})

	return anAtom
}
