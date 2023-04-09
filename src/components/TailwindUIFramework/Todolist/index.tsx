import React, { useState, useRef } from "react"
import { z } from "zod"
import { nanoid } from "nanoid"
import { CgSearch } from "react-icons/cg"
import { FaTrash } from "react-icons/fa"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const todoItemZod = z.object({
	id: z.string(),
	text: z.string(),
	checked: z.boolean().default(false)
})
const todoZod = z.array(todoItemZod).default([])
type todoListType = z.infer<typeof todoZod>

const dragItem = z.object({ id: z.string(), index: z.number() })
type dragItemType = z.infer<typeof dragItem>

const TodoItem = (props: any) => {
	const { handleTodoChecked, handleDrop, deleteTodoItem, ...todo } = props

	const ref = useRef<HTMLDivElement>(null)

	const [, drop] = useDrop({
		accept: "todo",
		hover(item: dragItemType, monitor) {
			if (!ref.current) {
				return
			}
			const dragIndex = item.index
			const hoverIndex = todo.index
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return
			}

			// Determine mouse position
			const clientOffset = monitor.getClientOffset()
			if (clientOffset == null) {
				return
			}

			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect()
			// Get vertical middle
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}
			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return
			}
			// console.log(`drag: ${dragIndex}`, `hover: ${hoverIndex}`)
			// Time to actually perform the action
			handleDrop(dragIndex, hoverIndex)
			// Note: we're mutating the monitor item here!
			// Generally it's better to avoid mutations,
			// but it's good here for the sake of performance
			// to avoid expensive index searches.
			item.index = hoverIndex
		}
	})

	const [, drag] = useDrag({
		type: "todo",
		item: { id: todo.id, index: props.index }
	})

	drag(drop(ref))

	return (
		<div ref={ref}>
			<div className='flex items-center hover:bg-gray-800 rounded-md'>
				<div className='flex grow '>
					<div className='flex items-center px-1'>
						<input
							checked={todo.checked ?? false}
							id='checked-checkbox'
							type='checkbox'
							value=''
							className='w-4 h-4 accent-green-600 bg-gray-200 rounded'
							onChange={e => handleTodoChecked(todo.id, e)}
						/>
					</div>
					<div
						className={`grow text-start py-2 px-1 text-gray-200 border-gray-300 ${
							todo.checked && "line-through"
						} cursor-pointer`}
					>
						{todo.text}
					</div>
					<button
						type='button'
						onClick={() => deleteTodoItem(todo.id)}
						className='text-gray-200 text-lg py-2 px-1 hover:bg-gray-800 rounded-md'
					>
						<FaTrash />
					</button>
				</div>
			</div>
		</div>
	)
}

const TodoContainer = ({
	children,
	className
}: {
	children: JSX.Element[] | JSX.Element
	className: string
}) => {
	const [, drop] = useDrop(() => ({
		accept: "todo"
	}))

	return (
		<div ref={drop} className={className}>
			{children}
		</div>
	)
}

const TodoList = () => {
	const [todos, setTodos] = useState<todoListType>([])
	const [inputValue, setInputValue] = useState("")

	const handleInputChange = (event: {
		target: { value: React.SetStateAction<string> }
	}) => {
		setInputValue(event.target.value)
	}

	const handleFormSubmit = (event: { preventDefault: () => void }) => {
		event.preventDefault()
		if (inputValue.trim()) {
			setTodos([
				...todos,
				todoItemZod.parse({ id: nanoid(), text: inputValue })
			])
			setInputValue("")
		}
	}

	const handleTodoChecked = (
		id: string,
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setTodos(prev => {
			const newTodos = [...prev]
			let todoIndex = newTodos.findIndex(todo => todo.id === id)
			newTodos[todoIndex] = todoItemZod.parse({
				...newTodos[todoIndex],
				checked: event.target.checked
			})
			return newTodos
		})
	}

	const handleDrop = (dragIndex: number, hoverIndex: number) => {
		setTodos(prev => {
			let updatedList = [...prev]

			const [dragItem] = updatedList.splice(dragIndex, 1)
			updatedList.splice(hoverIndex, 0, dragItem)

			return updatedList
		})
	}

	const deleteTodoItem = (id: string) => {
		setTodos(prev => prev.filter(todo => todo.id !== id))
	}

	return (
		<div className='max-w-lg mx-auto text-gray-800 bg-gray-900 p-2 rounded-md'>
			<div>
				<h1 className='text-gray-300 text-2xl font-bold mb-2'>Todo List</h1>
			</div>
			<form
				onSubmit={handleFormSubmit}
				className={`flex gap-2 outline-0 ${todos && todos[0] ? "mb-4" : ""}`}
			>
				<div className='flex grow relative'>
					<div className='text-gray-300 absolute-center-y left-2'>
						<CgSearch />
					</div>
					<input
						type='text'
						value={inputValue}
						onChange={handleInputChange}
						placeholder='Add a task'
						className='flex-1 placeholder-gray-500 text-gray-200 bg-gray-600 rounded-md p-2 reset-input pl-8'
					/>
				</div>
			</form>
			<DndProvider backend={HTML5Backend}>
				<TodoContainer className='list-container max-h-[32rem]'>
					{todos.map((item, index) => (
						<TodoItem
							key={item.id}
							index={index}
							handleTodoChecked={handleTodoChecked}
							handleDrop={handleDrop}
							deleteTodoItem={deleteTodoItem}
							{...item}
						/>
					))}
				</TodoContainer>
			</DndProvider>
		</div>
	)
}

export default TodoList
