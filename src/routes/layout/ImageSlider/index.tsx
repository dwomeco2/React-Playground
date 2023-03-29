import { useState, cloneElement } from 'react'
import { initializeImageSliderState } from './ImageSliderState'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export default function ImageSlider() {
  const [imageSliderState, setImageSliderState] = useState(initializeImageSliderState())

  if (imageSliderState.total_images < imageSliderState.visible_no_image) {
    return <div>Not enought Images</div>
  }

  function next() {
    const cid = (imageSliderState.current_imageId + 1) % imageSliderState.total_images
    const new_images = imageSliderState.images
    const new_back_images = imageSliderState.back_images

    if (imageSliderState.back_images.length > 0 && imageSliderState.images.length > 0) {
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      new_images.push(new_back_images.pop()!)
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      new_back_images.unshift(new_images.shift()!)
    }

    setImageSliderState(prev => {
      return {
        ...prev,
        direction: 'rtl',
        current_imageId: cid,
        images: new_images,
        back_images: new_back_images
      }
    })
  }

  function before() {
    const c = imageSliderState.current_imageId
    const t = imageSliderState.total_images
    const new_images = imageSliderState.images
    const new_back_images = imageSliderState.back_images

    if (imageSliderState.back_images.length > 0 && imageSliderState.images.length > 0) {
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      new_back_images.push(new_images.pop()!)
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      new_images.unshift(new_back_images.shift()!)
    }

    setImageSliderState(prev => {
      return {
        ...prev,
        direction: 'ltr',
        current_imageId: c == 1 ? t : c - 1,
        images: new_images,
        back_images: new_back_images
      }
    })
  }

  return (
    <div className="w-full">
      <div className="flex justify-center mx-auto">
        <TransitionGroup
          className="image_slider"
          // The exiting component is already detached and therefore does not get any updates.
          // https://stackoverflow.com/questions/48655213/react-csstransition-wrong-class-used-on-exit
          childFactory={child => cloneElement(child, { classNames: `${imageSliderState.direction}` })}
        >
          {imageSliderState.images.map((image, index) => {
            const { type, image_size } = mapImageSliderStateStyle()
            return (
              <CSSTransition
                key={image.id}
                timeout={200}
                classNames={`${imageSliderState.direction}`}
                addEndListener={() => {
                  // image.nodeRef.current?.classList.toggle(`${dir}`)
                }}
              >
                <div className={`image_slide_item ${type[index]}`}>
                  <img src={image.src} width={image_size[index]} height={image_size[index]} />
                  {/* Hidden class for tailwindcss to not remove it from bundle */}
                  <div className="hidden ltr-enter ltr-enter-active rtl-enter rtl-enter-active ltr-exit ltr-exit-active rtl-exit rtl-exit-active" />
                </div>
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      </div>
      <button onClick={() => before()}>Before</button>
      <button onClick={() => next()}>Next</button>
    </div>
  )
}

const mapImageSliderStateStyle = () => {
  const type = ['carousel-2', 'carousel-1', 'carousel0', 'carousel1', 'carousel2']
  const image_size = [150, 200, 250, 200, 150]
  return { type, image_size }
}
