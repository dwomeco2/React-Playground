import { useState } from 'react';
import styles from './index.module.css'

function PreviewCardComponent() {
    return (
        <div className="w-64 h-128 rounded-lg overflow-clip bg-white py-2 hover:card_hover_shadow">
            <div className="flex px-2 pb-2 items-center">
                <img src="https://picsum.photos/50/50" className="w-6 h-6 rounded-full"></img>
                <div className="flex flex-col flex-1 text-start ml-2">
                    <span className="text-sm font-semibold">Stuar Manson</span>
                    <span className="text-xs">published 2 hours ago</span>
                </div>
                <button>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        </svg>    
                    </span>
                </button>
            </div>
            <figure ><img src="https://picsum.photos/104/208" className="w-full h-52"/></figure>
            <div className="text-start p-2">
                <div className="font-medium mb-0">Flores</div>
                <span className="font-light text-xs">by Stuar Manson</span>
                <p className="text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nihil aut sed facilis laudantium obcaecati architecto qui nobis impedit id commodi eveniet tempora asperiores sunt iste, ducimus reiciendis quae vitae?</p>
            </div>
        </div>
    )
}

function ProfileCardComponent() {
    return (
        <div className="flex flex-col rounded-lg overflow-clip pd-4 w-64 h-80 bg-white">
            <div><figure><img src="https://picsum.photos/300/200" width="100%" className="h-32 object-cover"/></figure></div>
            <div className="flex-1 relative">
                <img src="https://picsum.photos/50/50" width="50" height="50" className="absolute top-[calc(-25px)] left-[calc(50%_-_25px)] rounded-full outline outline-4 outline-offset-0 outline-white" />
                <div className="my-4 items-center mt-12">
                    <div>
                        <span className="font-bold">Victor Crest &nbsp;</span>
                        <span>26</span>
                    </div>
                    <span className="font-light text-xs">London</span>
                </div>
            </div>
            <hr />
            <div className="flex w-full mt-2 justify-evenly text-center pb-2">
                <div className="w-[calc(30%_-_2px)] my-auto">
                    <div className="flex flex-col">
                        <div className="font-bold">80K</div>
                        <span className="text-xs">Followers</span>
                    </div>
                </div>
                <div className="w-[calc(30%_-_2px)] my-auto">
                    <div className="flex flex-col">
                        <div className="font-bold">803K</div>
                        <span className="text-xs">Likes</span>
                    </div>
                </div>
                <div className="w-[calc(30%_-_2px)] my-auto">
                    <div className="flex flex-col">
                        <div className="font-bold">1.4K</div>
                        <span className="text-xs">Photos</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PricingComponent() {
    const [isMonthly, setIsMonthly] = useState(false);

    function JustAToggle() {
        function toggle(_e: React.MouseEvent<HTMLElement>) {
            setIsMonthly(!isMonthly);
        }

        return (
            <button className={`pricing_toggle_btn ${isMonthly ? 'active': ''} rounded-full`} onClick={e => toggle(e)}></button>
        )
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Our Pricing</h1>
            <div className="flex justify-center gap-6 items-center">
                <div className="text-sm text-gray-600">Annually</div>
                <JustAToggle />
                <div className="text-sm text-gray-600">Monthly</div>
            </div>
            <div className="flex justify-center mt-10">
                <div className="w-72 h-[22rem] p-4  bg-white text-gray-600 rounded-xl">
                    <div className="font-bold">Basic</div>
                    <div className="my-6 flex justify-center">
                        <span className="text-2xl font-bold self-center">$</span>
                        <span className="text-4xl font-extrabold">19.99</span>
                    </div>
                    <div className="mb-6">
                        <div className="py-2 border-y-2">500 GB Storage</div>
                        <div className="py-2 border-b-2">2 Users Allowed</div>
                        <div className="py-2 border-b-2">Send up to 3 GB</div>
                    </div>
                    <button className="w-full font-bold py-2 text-xs btn_learn_more rounded-md">LEARN MORE</button>
                </div>
                <div className="w-72 h-[24rem] mt-[-1rem] p-4 text-white bg-[var(--pricing-primary-color)] rounded-xl">
                    <div className="mt-[1rem]"></div>
                    <div className="font-bold">Professional</div>
                    <div className="my-6 flex justify-center">
                        <span className="text-2xl font-bold self-center">$</span>
                        <span className="text-4xl font-extrabold">24.99</span>
                    </div>
                    <div className="mb-6">
                        <div className="py-2 border-y-2">1 TB Storage</div>
                        <div className="py-2 border-b-2">5 Users Allowed</div>
                        <div className="py-2 border-b-2">Send up to 10 GB</div>
                    </div>
                    <button className="w-full font-bold py-2 text-xs btn_learn_more_main rounded-md">LEARN MORE</button>
                </div>
                <div className="w-72 h-[22rem] p-4 bg-white text-gray-600 rounded-xl">
                    <div className="font-bold">Master</div>
                    <div className="my-6 flex justify-center">
                        <span className="text-2xl font-bold self-center">$</span>
                        <span className="text-4xl font-extrabold">39.99</span>
                    </div>
                    <div className="mb-6">
                        <div className="py-2  border-y-2">2 TB Storage</div>
                        <div className="py-2  border-b-2">10 Users Allowed</div>
                        <div className="py-2  border-b-2">Send up to 20 GB</div>
                    </div>
                    <button className="w-full font-bold py-2 text-xs btn_learn_more rounded-md">LEARN MORE</button>
                </div>
            </div>
        </div>
    )
}

export default function Layout() {
    const layouts = ["Preview Card", "Profile Card", "Pricing Component"];
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
        </div>
    )   
}