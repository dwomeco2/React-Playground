import { useState } from 'react'

import PreviewCardComponent from './PreviewCard'
import ProfileCardComponent from './ProfileCard'
import PricingComponent from './PricingComponent'
import CountdownTimer from './CountdownTimer'
import SidebarComponent from './SidebarComponent'
import PriceSlider from './PriceSlider'
import ImageSlider from './ImageSlider'
import MasonryLayout from './MasonryLayout'

export default function Layout() {
  const layouts = ['Preview Card', 'Profile Card', 'Pricing Component', 'Countdown timer', 'Sidebar Component', 'Price Slider', 'Image Slider', 'Masonry layout']
  // eslint-disable-next-line react/jsx-key
  const layoutComponent = [<PreviewCardComponent />, <ProfileCardComponent />, <PricingComponent />, <CountdownTimer />, <SidebarComponent />, <PriceSlider />, <ImageSlider />, <MasonryLayout />]
  const [activeLayout, setActiveLayout] = useState(0)

  return (
    <div className="w-full h-full p-8 bg-gray-200">
      <div>
        <h1 className="font-bold text-2xl">Show different components</h1>
        <div className="flex flex-wrap">
          {layouts.map((layout, index) => {
            return (
              <button key={index} className="p-2 m-4 bg-blue-400" onClick={() => setActiveLayout(index)}>
                {layout}
              </button>
            )
          })}
        </div>
      </div>
      {layoutComponent[activeLayout]}
    </div>
  )
}
