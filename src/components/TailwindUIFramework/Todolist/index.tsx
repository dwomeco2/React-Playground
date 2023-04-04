import React, { useState } from 'react'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { CgSearch } from 'react-icons/cg'
import { TbSelect } from 'react-icons/tb'
import { MdExpandMore } from 'react-icons/md'
import { DndContext, useSensors, useSensor, MouseSensor, TouchSensor, closestCenter, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const todoItemZod = z.object({ id: z.string(), text: z.string(), checked: z.boolean().default(false), hasContent: z.boolean().default(false) })
const todoZod = z.array(todoItemZod).default([])
type todoListType = z.infer<typeof todoZod>

const TodoItem = (props: any) => {
  const { handleTodoChecked, ...todo } = props
  const { attributes, listeners, transform, transition, setNodeRef } = useSortable({ id: todo.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  // Lots of rerendering...
  console.log(todo)

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="flex items-center hover:bg-gray-800 rounded-md">
        <div className="flex grow ">
          <div className="flex items-center px-1">
            <input
              checked={todo.checked ?? false}
              id="checked-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 accent-green-600 bg-gray-200 rounded"
              onChange={e => handleTodoChecked(todo.id, e)}
            />
          </div>
          <div className={`grow text-start py-2 px-1 text-gray-200 border-gray-300 ${todo.checked && 'line-through'} cursor-pointer`}>{todo.text}</div>
          {todo.hasContent && (
            <button type="button" onClick={() => {}} className="text-gray-200 text-lg py-2 px-1 hover:bg-gray-800 rounded-md">
              <MdExpandMore />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const TodoList = () => {
  const [todos, setTodos] = useState<todoListType>([])
  const [inputValue, setInputValue] = useState('')
  const [onSelect, setOnSelect] = useState(false)

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const handleInputChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setInputValue(event.target.value)
  }

  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (inputValue.trim()) {
      setTodos([...todos, todoItemZod.parse({ id: nanoid(), text: inputValue })])
      setInputValue('')
    }
  }

  const handleTodoChecked = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const newTodos = [...todos]
    let todoIndex = newTodos.findIndex(todo => todo.id === id)
    newTodos[todoIndex] = todoItemZod.parse({ ...newTodos[todoIndex], checked: event.target.checked })
    setTodos(newTodos)
  }

  // Function to update list on drop
  const handleDrop = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      let updatedList = [...todos]
      const activeIndex = updatedList.findIndex(todo => todo.id === active.id)
      const overIndex = updatedList.findIndex(todo => todo.id === over.id)

      const [reorderedItem] = updatedList.splice(activeIndex, 1)
      updatedList.splice(overIndex, 0, reorderedItem)

      setTodos(updatedList)
    }
  }

  return (
    <div className="max-w-lg mx-auto text-gray-800 bg-gray-900 p-2 rounded-md">
      <form onSubmit={handleFormSubmit} className={`flex gap-2 outline-0 ${todos && todos[0] ? 'mb-4' : ''}`}>
        <div className="flex grow relative">
          <div className="text-gray-300 absolute-center-y left-2">
            <CgSearch />
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add a task"
            className="flex-1 placeholder-gray-500 text-gray-200 bg-gray-600 rounded-md p-2 reset-input pl-8"
          />
        </div>
        <button type="button" className={`${onSelect ? 'bg-green-500' : 'bg-orange-400'} text-white px-4 py-2 rounded-md`} onClick={() => setOnSelect(!onSelect)}>
          <TbSelect />
        </button>
      </form>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDrop}>
        <SortableContext strategy={verticalListSortingStrategy} items={todos}>
          <div className="list-container max-h-[32rem]">
            {todos.map(item => (
              <TodoItem key={item.id} handleTodoChecked={handleTodoChecked} {...item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}

export default TodoList
