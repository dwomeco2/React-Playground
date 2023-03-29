import { useState } from 'react'

export default function PricingComponent() {
  const [isMonthly, setIsMonthly] = useState(false)

  function JustAToggle() {
    function toggle() {
      setIsMonthly(!isMonthly)
    }

    return <button className={`pricing_toggle_btn ${isMonthly ? 'active' : ''} rounded-full`} onClick={toggle}></button>
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
