import React, {StrictMode} from 'react';
import {useState, Suspense, lazy} from 'react';
import {createPortal} from 'react-dom';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import GithubCorner from './components/GithubCorner/index';

import './index.css';
import './App.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {nanoid} from 'nanoid';

const PreviewCardComponent = lazy(async () => import('./components/PreviewCard'));
const ProfileCardComponent = lazy(async () => import('./components/ProfileCard'));
const PricingComponent = lazy(async () => import('./components/PricingComponent'));
const CountdownTimer = lazy(async () => import('./components/CountdownTimer'));
const SidebarComponent = lazy(async () => import('./components/SidebarComponent'));
const ImageSlider = lazy(async () => import('./components/ImageSlider'));
const MasonryLayout = lazy(async () => import('./components/MasonryLayout'));
const HackerNews = lazy(async () => import('./components/HackerNews'));
const IssuesWithLibrary = lazy(async () => import('./components/IssuesWithLibrary'));
const Latest = lazy(async () => import('./components/Latest'));

const queryClient = new QueryClient();

const layoutComponent = [
	[<PreviewCardComponent key={nanoid()}/>, 'Preview Card'] as const,
	[<ProfileCardComponent key={nanoid()}/>, 'Profile Card'] as const,
	[<PricingComponent key={nanoid()}/>, 'Pricing Component'] as const,
	[<CountdownTimer key={nanoid()}/>, 'Countdown timer'] as const,
	[<SidebarComponent key={nanoid()}/>, 'Sidebar Component'] as const,
	[<ImageSlider key={nanoid()}/>, 'Image Slider'] as const,
	[<MasonryLayout key={nanoid()}/>, 'Masonry layout'] as const,
	[<HackerNews key={nanoid()}/>, 'Hacker News'] as const,
	[<IssuesWithLibrary key={nanoid()}/>, 'Library encounterd issues log'] as const,
	[<Latest key={nanoid()}/>, 'TodoList / 2048'] as const,
].reverse();

function App() {
	const [activeLayout, setActiveLayout] = useState(0);

	return (
		<QueryClientProvider client={queryClient}>
			<div className='background'/>
			<div className='w-full h-screen p-8 overflow-y-scroll no-scrollbar'>
				<div>
					<h1 className='font-bold text-center text-3xl mb-4'>
						My react playground
					</h1>
					<div className='no-scrollbar component-selector flex w-full sm:mx-auto sm:w-[524px] md:w-[720px] overflow-x-auto mb-6'>
						{layoutComponent.map(([, layout], index) => (
							<div
								key={layout}
								className={`
                  menu-text inline select-none p-2 px-4 cursor-pointer 
                  ${activeLayout === index ? 'border-b-red-500 border-b-2 border-solid' : ''}
                `}
								onClick={() => {
									setActiveLayout(index);
								}}
							>
								{layout}
							</div>
						))}
					</div>
				</div>
				<div className='mt-4'>
					<Suspense fallback={<div>Loading</div>}>
						{layoutComponent[activeLayout][0]}
					</Suspense>
				</div>
			</div>
		</QueryClientProvider>
	);
}

const router = createBrowserRouter([
	{
		path: '/react-playground',
		element: <App/>,
	},
]);

const githubCornerDiv = document.getElementById(
	'github-corner-div',
) as HTMLDivElement;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
	<StrictMode>
		<RouterProvider router={router}/>
		{createPortal(<GithubCorner/>, githubCornerDiv)}
	</StrictMode>,
);
