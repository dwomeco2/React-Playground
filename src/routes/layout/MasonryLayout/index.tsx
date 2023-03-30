import { useState, useEffect, createRef } from 'react'
import imagesjson from './images.json'

type imageType = {
  id: number
  h: string
  bg: string
  ref: React.RefObject<HTMLDivElement>
}

type imageBoundingRect = { ref: React.RefObject<HTMLDivElement>; br: DOMRect }

export default function MasonryLayout() {
  const [images, setImages] = useState<imageType[]>(
    imagesjson.images.map(item => {
      return { ...item, ref: createRef<HTMLDivElement>() }
    })
  )
  const [domRects, setDomRects] = useState<imageBoundingRect[]>()

  function randomizeOnclick() {
    const newImages = [...images]

    for (let n = 0; n < newImages.length - 1; n++) {
      const k = n + Math.floor(Math.random() * (newImages.length - n))

      const temp = newImages[k]
      newImages[k] = newImages[n]
      newImages[n] = temp
    }
    setImages(newImages)
  }

  useEffect(() => {
    const dr = images.map(item => {
      return { ref: item.ref, br: item.ref.current!.getBoundingClientRect() }
    })
    if (domRects != null) {
      domRects.forEach(oldItem => {
        const newItem = dr.find(item => item.ref.current === oldItem.ref.current)
        if (newItem != null) {
          const domNode = newItem.ref.current!
          const deltaX = oldItem.br.left - newItem.br.left
          const deltaY = oldItem.br.top - newItem.br.top

          if (deltaX !== 0 || deltaY !== 0) {
            console.log(deltaX, deltaY)
            domNode.style.transform = `translate(${deltaX}px, ${deltaY}px)`
            domNode.style.transition = 'transform 0s'
            requestAnimationFrame(() => {
              // In order to get the animation to play, we'll need to wait for
              // the 'invert' animation frame to finish, so that its inverted
              // position has propagated to the DOM.
              //
              // Then, we just remove the transform, reverting it to its natural
              // state, and apply a transition so it does so smoothly.
              domNode.style.transform = ''
              domNode.style.transition = 'transform 500ms'
            })
          }
        }
      })
    }
    setDomRects(dr)
  }, [images])

  return (
    <div>
      <p>masonry in grid layout only implemented by firefox</p>
      <div>
        <button className="bg-slate-700 rounded-full py-2 px-8 my-2 text-white" onClick={randomizeOnclick}>
          Randomize
        </button>
      </div>
      <div className="columns-3 gap-2">
        {images.map(item => {
          return (
            <div key={item.id} ref={item.ref} className="flex justify-center items-center relative mb-2 hover:scale-110 hover:z-10 cursor-pointer">
              <div className="absolute text-5xl font-bold text-white">{item.id}</div>
              <img
                className={`w-full aspect-video`}
                style={{
                  height: `${item.h}`,
                  backgroundColor: `${item.bg}`
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
