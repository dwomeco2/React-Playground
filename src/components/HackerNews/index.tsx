import HackerNewsList from './components/HackerNewsListItem'
import HackerNewsStoryContent from './components/HackerNewsStoryContent'

export default function HackerNews() {
  return (
    <div className="flex w-full h-screen">
      <div className="shrink-0 w-[28rem] h-full overflow-y-scroll">
        <HackerNewsList />
      </div>
      <div className="grow">
        <HackerNewsStoryContent />
      </div>
    </div>
  )
}
