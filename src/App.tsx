import { useState, Suspense, lazy } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const PreviewCardComponent = lazy(() => import('./components/PreviewCard'))
const ProfileCardComponent = lazy(() => import('./components/ProfileCard'))
const PricingComponent = lazy(() => import('./components/PricingComponent'))
const CountdownTimer = lazy(() => import('./components/CountdownTimer'))
const SidebarComponent = lazy(() => import('./components/SidebarComponent'))
const PriceSlider = lazy(() => import('./components/PriceSlider'))
const ImageSlider = lazy(() => import('./components/ImageSlider'))
const MasonryLayout = lazy(() => import('./components/MasonryLayout'))
const HackerNews = lazy(() => import('./components/HackerNews'))

const queryClient = new QueryClient()

export default function App() {
  const layouts = ['Preview Card', 'Profile Card', 'Pricing Component', 'Countdown timer', 'Sidebar Component', 'Price Slider', 'Image Slider', 'Masonry layout', 'Hacker News']
  // eslint-disable-next-line react/jsx-key
  const layoutComponent = [
    <PreviewCardComponent />,
    <ProfileCardComponent />,
    <PricingComponent />,
    <CountdownTimer />,
    <SidebarComponent />,
    <PriceSlider />,
    <ImageSlider />,
    <MasonryLayout />,
    <HackerNews />
  ]
  const [activeLayout, setActiveLayout] = useState(layouts.length - 1)

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-screen p-8 bg-gray-300">
        <div>
          <h1 className="font-bold text-center text-2xl">Show different components</h1>
          <div className="flex flex-wrap justify-center">
            {layouts.map((layout, index) => {
              return (
                <button key={index} className="p-2 m-4 bg-blue-400" onClick={() => setActiveLayout(index)}>
                  {layout}
                </button>
              )
            })}
          </div>
        </div>
        <Suspense fallback={<div>Loading</div>}>{layoutComponent[activeLayout]}</Suspense>
      </div>
    </QueryClientProvider>
  )
}
