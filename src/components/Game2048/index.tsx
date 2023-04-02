import { motion } from 'framer-motion'

export default function Game2048() {
  return (
    <div className="flex justify-center">
      <MyComponent />
    </div>
  )
}

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}

export const MyComponent = () => {
  // className="rounded-full bg-blue-700  w-40 h-40"
  return (
    <div>
      <div className="relative goo-effect">
        <motion.div
          className="absolute bg-orange-700 w-40 h-40 "
          animate={{
            opacity: [1, 1, 1, 0]
          }}
          transition={{ duration: 2, type: 'spring', times: [0, 0, 0, 1], repeat: Infinity, repeatDelay: 1 }}
        ></motion.div>
        <motion.div
          className="absolute bg-blue-700 w-40 h-40"
          animate={{
            translateX: [200, 0],
            backgroundColor: ['rgb(29 78 216)', 'rgb(29 78 216)', 'rgb(29 78 216)', 'rgb(29 78 216)', 'rgb(194 65 12)']
          }}
          transition={{ duration: 2, type: 'spring', times: [0, 0.25, 0.5, 0.75, 1], repeat: Infinity, repeatDelay: 1 }}
        ></motion.div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="fancy-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
