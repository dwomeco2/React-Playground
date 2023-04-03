import { useState } from 'react'
import HackerNewsList from './components/HackerNewsListItem'
import HackerNewsStoryContent from './components/HackerNewsStoryContent'

export default function HackerNews() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <div className="w-full mb-2">
        <div className="cursor-pointer select-none py-2 px-2 text-center border-solid border-2 rounded-md bg-transparent border-violet-500" onClick={() => setSidebarOpen(!sidebarOpen)}>
          Toggle Sidebar
        </div>
      </div>
      <div className="flex w-full h-screen relative overflow-hidden">
        <div className={`shrink-0 ${sidebarOpen ? '' : 'absolute left-[-28rem]'} w-[28rem] h-full`}>
          <HackerNewsList />
        </div>
        <div className="grow">
          <HackerNewsStoryContent />
        </div>
      </div>
    </div>
  )
}
