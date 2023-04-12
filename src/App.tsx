import React, {StrictMode} from 'react';
import {useState, Suspense} from 'react';
import {createPortal} from 'react-dom';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import GithubCorner from './components/GithubCorner/index';

import './index.css';
import './App.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import PuffLoader from './components/share/PuffLoader';
import TagLabel from './components/share/TagLabel';
import layoutComponent from './data/tabs';

const queryClient = new QueryClient();

function App() {
	const [activeLayout, setActiveLayout] = useState(0);

	return (
		<QueryClientProvider client={queryClient}>
			<div className='background'>
				<img src='bg-pattern.svg'/>
			</div>
			<div className='w-full h-screen p-8 overflow-y-scroll no-scrollbar'>
				<div>
					<div className='masked-overflow no-scrollbar component-selector flex w-full sm:mx-auto sm:w-[524px] md:w-[720px] overflow-x-auto mb-6'>
						{layoutComponent.map(({name}, index) => (
							<div
								key={name as string}
								className={`menu-text inline select-none p-2 px-4 cursor-pointer 
                  ${activeLayout === index ? 'border-b-red-500 border-b-2 border-solid' : ''}
                `}
								onClick={(e: React.MouseEvent<HTMLDivElement>) => {
									const selfEl = e.target as HTMLDivElement;
									selfEl.scrollIntoView({behavior: 'smooth', inline: 'center'});
									setActiveLayout(index);
								}}
							>
								{name}
							</div>
						))}
					</div>
				</div>
				<div className='mt-4'>
					<div className='md:w-10/12 xl:w-9/12 w-full mx-auto flex justify-center'>
						<div className='w-full relative'>
							<TagLabel labels={layoutComponent[activeLayout].labels as readonly string[]}/>
							<Suspense fallback={<PuffLoader/>}>
								{layoutComponent[activeLayout].comp}
							</Suspense>
						</div>
					</div>
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
