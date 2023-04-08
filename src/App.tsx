import React, { StrictMode } from "react"
import { useState, Suspense, lazy } from "react"
import { createPortal } from "react-dom"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import ReactDOM from "react-dom/client"
import GithubCorner from "./components/GithubCorner/index"

import "./index.css"
import "./App.css"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

const PreviewCardComponent = lazy(() => import("./components/PreviewCard"))
const ProfileCardComponent = lazy(() => import("./components/ProfileCard"))
const PricingComponent = lazy(() => import("./components/PricingComponent"))
const CountdownTimer = lazy(() => import("./components/CountdownTimer"))
const SidebarComponent = lazy(() => import("./components/SidebarComponent"))
const ImageSlider = lazy(() => import("./components/ImageSlider"))
const MasonryLayout = lazy(() => import("./components/MasonryLayout"))
const HackerNews = lazy(() => import("./components/HackerNews"))
const IssuesWithLibrary = lazy(() => import("./components/IssuesWithLibrary"))
const TailWindUI = lazy(() => import("./components/TailwindUIFramework"))

const queryClient = new QueryClient()

function App() {
	const layouts = [
		"Preview Card",
		"Profile Card",
		"Pricing Component",
		"Countdown timer",
		"Sidebar Component",
		"Image Slider",
		"Masonry layout",
		"Hacker News",
		"Library encounterd issues log",
		"TodoList / 2048"
	].reverse()
	// eslint-disable-next-line react/jsx-key
	const layoutComponent = [
		<PreviewCardComponent />,
		<ProfileCardComponent />,
		<PricingComponent />,
		<CountdownTimer />,
		<SidebarComponent />,
		<ImageSlider />,
		<MasonryLayout />,
		<HackerNews />,
		<IssuesWithLibrary />,
		<TailWindUI />
	].reverse()
	const [activeLayout, setActiveLayout] = useState(0)

	return (
		<QueryClientProvider client={queryClient}>
			<div className='background' />
			<div className='w-full h-screen p-8 overflow-y-scroll no-scrollbar'>
				<div>
					<h1 className='font-bold text-center text-3xl mb-4'>
						My react playground
					</h1>
					<div className='no-scrollbar component-selector flex w-full sm:mx-auto sm:w-[720px] overflow-x-auto mb-6'>
						{layouts.map((layout, index) => {
							return (
								<div
									key={index}
									className={`menu-text inline select-none p-2 px-4 cursor-pointer ${
										activeLayout === index &&
										"border-b-red-500 border-b-2 border-solid"
									}`}
									onClick={() => setActiveLayout(index)}
								>
									{layout}
								</div>
							)
						})}
					</div>
				</div>
				<div className='mt-4'>
					<Suspense fallback={<div>Loading</div>}>
						{layoutComponent[activeLayout]}
					</Suspense>
				</div>
			</div>
		</QueryClientProvider>
	)
}

const router = createBrowserRouter([
	{
		path: "/react-playground",
		element: <App />
	}
])

const githubCornerDiv = document.getElementById(
	"github-corner-div"
) as HTMLElement

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
	<StrictMode>
		<RouterProvider router={router} />
		{createPortal(<GithubCorner />, githubCornerDiv)}
	</StrictMode>
)
