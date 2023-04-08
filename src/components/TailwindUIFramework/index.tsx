import { useState, Suspense } from "react"
import TodoList from "./Todolist"
import Game2048 from "./Game2048"

export default function TailwindUI() {
	const Components = [
		[<TodoList />, "TodoList"],
		[<Game2048 />, "2048"]
	]
	const [show, setShow] = useState(1)
	return (
		<div className='flex flex-col'>
			<div className='flex flex-wrap w-full justify-center gap-2 text-center mb-2'>
				{Components.map(([, name], index) => {
					return (
						<div key={index}>
							<button
								className='py-2 px-8 w-full bg-green-500 text-white'
								onClick={() => setShow(index)}
							>
								{name}
							</button>
						</div>
					)
				})}
			</div>
			<div className='w-full h-full'>
				<div>{Components[show][0]}</div>
			</div>
		</div>
	)
}
