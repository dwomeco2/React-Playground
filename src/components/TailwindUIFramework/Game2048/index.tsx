import { useSpring, animated } from '@react-spring/web'

export default function Game2048() {
  return (
    <div className="flex justify-center">
      <MyComponent />
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
