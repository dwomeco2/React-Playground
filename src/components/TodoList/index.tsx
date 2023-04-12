import React, {useState, useRef, useCallback, useMemo} from 'react';
import {z} from 'zod';
import {CgSearch} from 'react-icons/cg';
import {FaTrash} from 'react-icons/fa';
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {nanoid} from 'nanoid';

import styles from './index.module.css';

type TodoListProps = {
	id: string;
	text: string;
	isChecked?: boolean;
};

const dragItem = z.object({id: z.string(), index: z.number()});
type DragItemType = z.infer<typeof dragItem>;

type TodoItemProps = {
	todo: TodoListProps;
	index: number;
	setTodos: React.Dispatch<React.SetStateAction<TodoListProps[]>>;
};

function TodoItem(props: TodoItemProps) {
	const {todo, index, setTodos} = props;

	const {text, isChecked} = todo;

	const ref = useRef<HTMLDivElement>(null);

	const dragItem: DragItemType = {...todo, index};

	const [, drop] = useDrop({
		accept: 'todo',
		hover(item: DragItemType, monitor) {
			if (!ref.current) {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = index;
			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}

			// Determine mouse position
			const clientOffset = monitor.getClientOffset();
			if (!clientOffset) {
				return;
			}

			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			// Get vertical middle
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			// Get pixels to the top
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// Only perform the move when the mouse has crossed half of the items height
			// When dragging downwards, only move when the cursor is below 50%
			// When dragging upwards, only move when the cursor is above 50%
			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			// console.log(`UPDATE: hoverID: ${todo.id}(${todo.index}), dragID: ${item.id}(${item.index})`);
			handleDrop(dragIndex, hoverIndex);

			item.index = hoverIndex;
		},
	}, [dragItem]);

	const [, drag] = useDrag({
		type: 'todo',
		item: dragItem,
	}, [dragItem]);

	drag(drop(ref));

	const handleTodoChecked = (
		id: string,
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setTodos(prev => {
			const newTodos = [...prev];
			const todoIndex = newTodos.findIndex(todo => todo.id === id);
			newTodos[todoIndex] = {
				...newTodos[todoIndex],
				isChecked: event.target.checked,
			};
			return newTodos;
		});
	};

	const handleDrop = (dragIndex: number, hoverIndex: number) => {
		setTodos(prev => {
			const updatedList = [...prev];

			[updatedList[dragIndex], updatedList[hoverIndex]] = [updatedList[hoverIndex], updatedList[dragIndex]];

			return updatedList;
		});
	};

	const deleteTodoItem = (id: string) => {
		setTodos(prev => prev.filter(todo => todo.id !== id));
	};

	return (
		<div ref={ref} className={`${styles.todoitem}`}>
			<div className='flex items-center hover:bg-gray-800 rounded-md'>
				<div className='flex grow '>
					<div className='flex items-center px-1'>
						<input
							checked={isChecked ?? false}
							id='checked-checkbox'
							type='checkbox'
							value=''
							className='w-4 h-4 accent-green-600 bg-gray-200 rounded'
							onChange={e => {
								handleTodoChecked(todo.id, e);
							}}
						/>
					</div>
					<div
						className={`grow text-start py-2 px-1 text-gray-200 border-gray-300 ${
							isChecked ? 'line-through' : ''
						} cursor-pointer`}
					>
						{text}
					</div>
					<button
						type='button'
						className='text-gray-200 text-lg py-2 px-1 hover:bg-gray-800 rounded-md'
						onClick={() => {
							deleteTodoItem(todo.id);
						}}
					>
						<FaTrash/>
					</button>
				</div>
			</div>
		</div>
	);
}

function TodoContainer({
	children,
	className,
}: {
	children: JSX.Element[] | JSX.Element;
	className: string;
}) {
	const [, drop] = useDrop(() => ({
		accept: 'todo',
	}));

	return (
		<div ref={drop} className={className}>
			{children}
		</div>
	);
}

function TodoList() {
	const [todos, setTodos] = useState<TodoListProps[]>([]);
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (event: {
		target: {value: React.SetStateAction<string>};
	}) => {
		const changedValue = (event.target.value as string).trim();
		if (inputValue !== changedValue) {
			setInputValue(changedValue);
		}
	};

	const handleFormSubmit = useCallback((event: {preventDefault: () => void}) => {
		event.preventDefault();
		if (inputValue.length !== 0) {
			setTodos(prev => [
				...prev,
				{id: nanoid(), text: inputValue, isChecked: false},
			]);
			setInputValue('');
		}
	}, [inputValue]);

	const todosItem = useMemo(() => (
		<TodoContainer className='list-container max-h-[32rem]'>
			{todos.map((item, index) => (
				<TodoItem
					key={item.id}
					index={index}
					setTodos={setTodos}
					todo={item}
				/>
			))}
		</TodoContainer>
	), [todos]);

	return (
		<div className='max-w-2xl mx-auto text-gray-800 bg-gray-900 p-2 rounded-md'>
			<div>
				<h1 className='text-gray-300 text-2xl font-bold mb-2'>Todo List</h1>
			</div>
			<form
				className={`flex gap-2 outline-0 ${todos[0] ? 'mb-4' : ''}`}
				onSubmit={handleFormSubmit}
			>
				<div className='flex grow relative'>
					<div className='text-gray-300 absolute-center-y left-2'>
						<CgSearch/>
					</div>
					<input
						type='text'
						value={inputValue}
						placeholder='Add a task'
						className='flex-1 placeholder-gray-500 text-gray-200 bg-gray-600 rounded-md p-2 reset-input pl-8'
						onChange={handleInputChange}
					/>
				</div>
			</form>
			<DndProvider backend={HTML5Backend}>
				{todosItem}
			</DndProvider>
		</div>
	);
}

export default TodoList;
