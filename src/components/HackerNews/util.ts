export function sortKidsOldestFirst(kids: number[] = []) {
	return kids.sort((a, b) => (a < b ? -1 : 1))
}

export function timeAgo(timestamp: number | undefined) {
	if (timestamp === undefined) {
		return ""
	}
	const now = Date.now()
	return timeDifference(now, timestamp)
}

function timeDifference(now: number, previous: number) {
	const seconds = Math.floor(now / 1000 - previous)

	let interval = seconds / 31536000
	if (interval > 1) {
		return Math.floor(interval) + " years"
	}
	interval = seconds / 2592000
	if (interval > 1) {
		return Math.floor(interval) + " months"
	}
	interval = seconds / 86400
	if (interval > 1) {
		return Math.floor(interval) + " days"
	}
	interval = seconds / 3600
	if (interval > 1) {
		return Math.floor(interval) + " hrs"
	}
	interval = seconds / 60
	if (interval > 1) {
		return Math.floor(interval) + " mins"
	}
	return Math.floor(seconds) + " secs"
}
