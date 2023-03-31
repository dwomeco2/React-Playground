export function sortKidsOldestFirst(kids: number[] = []) {
  return kids.sort((a, b) => (a < b ? -1 : 1))
}

export function timeAgo(timestamp: number | undefined) {
  if (timestamp === undefined) {
    return ''
  }
  return timeDifference(Date.now() / 1000, timestamp)
}

function timeDifference(current: number, previous: number) {
  var msPerMinute = 60 * 1000
  var msPerHour = msPerMinute * 60
  var msPerDay = msPerHour * 24
  var msPerMonth = msPerDay * 30
  var msPerYear = msPerDay * 365

  var elapsed = current - previous

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' secs ago'
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' mins ago'
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hrs ago'
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' days ago'
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' months ago'
  } else {
    return Math.round(elapsed / msPerYear) + ' years ago'
  }
}
