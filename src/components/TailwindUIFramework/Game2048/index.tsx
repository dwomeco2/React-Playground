import { useState, useEffect } from 'react'
import { useSpring, animated } from '@react-spring/web'

export default function Game2048() {
  const initializeGame = () => {
    let arr = Array(16).fill(0)
    const index = Math.floor(Math.random() * 16)
    let index2 = Math.floor(Math.random() * 16)
    while (index2 == index) {
      index2 = Math.floor(Math.random() * 16)
    }
    arr[index] = 2
    arr[index2] = 4
    return arr
  }

  const spawnOne = (arr: any[]) => {
    let index = Math.floor(Math.random() * 16)
    while (arr[index] != 0) {
      index = Math.floor(Math.random() * 16)
    }
    arr[index] = 2
    return arr
  }

  const [cells, setCells] = useState(initializeGame())
  const [isEnd, setIsEnd] = useState(false)

  useEffect(() => {
    function merge(arr: any[]) {
      if (arr[0] == arr[3] && arr[1] == 0 && arr[2] == 0) {
        arr = [arr[0] * 2, 0, 0, 0]
      } else if (arr[0] == arr[2] && arr[1] == 0) {
        arr = [arr[0] * 2, arr[3], 0, 0]
      } else if (arr[1] == arr[3] && arr[2] == 0) {
        arr = [arr[0], arr[1] * 2, 0, 0]
      } else if (arr[0] == arr[1] && arr[2] == arr[3]) {
        arr = [arr[0] * 2, arr[2] * 2, 0, 0]
      } else if (arr[0] == arr[1]) {
        arr = [arr[0] * 2, 0, arr[2], arr[3]]
      } else if (arr[1] == arr[2]) {
        arr = [arr[0], arr[1] * 2, 0, arr[3]]
      } else if (arr[2] == arr[3]) {
        arr = [arr[0], arr[1], arr[2] * 2, 0]
      }
      arr = arr.filter(e => e != 0)
      return arr.concat(Array(4 - arr.length).fill(0))
    }
    function transpose(arr: any[]) {
      let newArr2 = []
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
          newArr2.push(arr[j][i])
        }
      }
      return newArr2
    }
    const keydownCallback = (e: KeyboardEvent) => {
      if (isEnd) return
      let newArr = []
      if (e.key == 'ArrowRight') {
        for (let i = 0; i < 4; i++) {
          let arr = [i * 4, 1 + i * 4, 2 + i * 4, 3 + i * 4].map(j => cells[j]).reverse()
          arr = merge(arr)
          newArr.push(arr.reverse())
        }
        newArr = newArr.flat()
      }
      if (e.key == 'ArrowLeft') {
        for (let i = 0; i < 4; i++) {
          let arr = [i * 4, 1 + i * 4, 2 + i * 4, 3 + i * 4].map(j => cells[j])
          arr = merge(arr)
          newArr.push(arr)
        }
        newArr = newArr.flat()
      }
      if (e.key == 'ArrowUp') {
        for (let i = 0; i < 4; i++) {
          let arr = [i, i + 4, i + 8, i + 12].map(j => cells[j])
          arr = merge(arr)
          newArr.push(arr)
        }
        newArr = transpose(newArr).flat()
      }
      if (e.key == 'ArrowDown') {
        for (let i = 0; i < 4; i++) {
          let arr = [i, i + 4, i + 8, i + 12].map(j => cells[j]).reverse()
          arr = merge(arr)
          newArr.push(arr.reverse())
        }
        newArr = transpose(newArr).flat()
      }
      if (newArr.every(e => e != 0)) {
        setIsEnd(true)
      } else if (newArr.length > 0) {
        setCells(spawnOne(newArr))
      }
    }
    window.addEventListener('keydown', keydownCallback)
    return () => {
      window.removeEventListener('keydown', keydownCallback)
    }
  }, [cells])

  return (
    <div>
      <div className="sm:mx-auto w-[80vw] aspect-square sm:h-[30rem] sm:w-[30rem] p-2 rounded-md bg-emerald-200 grid grid-cols-4 grid-rows-4 gap-2">
        {cells.map((cell, index) => (
          <div key={index} className="w-full h-full bg-slate-700 flex justify-center items-center font-extrabold text-4xl select-none">
            {cell != 0 ? cell : ''}
          </div>
        ))}
      </div>
      {isEnd && <div>End</div>}
    </div>
  )
}

export const MyComponent = () => {
  const [springs, api] = useSpring(() => ({
    from: { width: 50 }
  }))

  const handleClick = () => {
    api.start({
      from: {
        width: 80
      },
      to: {
        width: 120
      }
    })
  }

  return (
    <div>
      <div className="haha relative">
        <animated.div
          style={{
            // width: 80,
            height: 80,
            background: '#ff6d6d',
            borderRadius: 8,
            ...springs
          }}
          onClick={handleClick}
        />
      </div>
    </div>
  )
}
