import { useState, Suspense } from 'react'
import TodoList from './Todolist'
import Game2048 from './Game2048'

export default function TailwindUI() {
  const [show, setShow] = useState(0)
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-wrap w-full justify-center gap-2 text-center mb-2">
        <div>
          <button className="py-2 px-8 w-full bg-red-500 text-white" onClick={() => setShow(1)}>
            framer-motion issue
          </button>
        </div>
        <div>
          <button className="py-2 px-8 w-full bg-red-500 text-white" onClick={() => setShow(2)}>
            Dnd-kit Issue
          </button>
        </div>
      </div>
      <div className="w-full h-full">
        <div>
          {show == 1 && (
            <Suspense fallback={<div>Loading...</div>}>
              <TodoList />
            </Suspense>
          )}
          {show == 2 && (
            <Suspense fallback={<div>Loading...</div>}>
              <Game2048 />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  )
}
