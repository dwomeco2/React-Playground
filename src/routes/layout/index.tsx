import { useState } from 'react';

import PreviewCardComponent from './PreviewCard';
import ProfileCardComponent from './ProfileCard';
import PricingComponent from './PricingComponent';
import CountdownTimer from './CountdownTimer';
import SidebarComponent from './SidebarComponent';
import PriceSlider from './PriceSlider';

export default function Layout() {
    const layouts = ["Preview Card", "Profile Card", "Pricing Component", "Countdown timer", "Sidebar Component", "Price Slider"];
    const [activeLayout, setActiveLayout] = useState(0);
    
    return (
        <div className="w-full h-full p-8 bg-gray-200">
            <div>
                <h1 className="font-bold text-2xl">Show different components</h1>
                <div className="flex">
                    { layouts.map((layout, index) => {
                        return <button key={index} className="p-2 m-4 bg-blue-400" onClick={e => setActiveLayout(index)}>{layout}</button>
                    })}
                </div>
            </div>
            { activeLayout === 0 && <div className="grid grid-cols-4 gap-4">
                { [1,2,3,4,5,6].map((n) => <PreviewCardComponent key={n} />) }
            </div> 
            }
            {
                activeLayout === 1 && <ProfileCardComponent />
            }
            {
                activeLayout === 2 && <PricingComponent />
            }
            {
                activeLayout === 3 && <CountdownTimer />
            }
            {
                activeLayout === 4 && <SidebarComponent />
            }
            {
                activeLayout === 5 && <PriceSlider />
            }
        </div>
    )   
}