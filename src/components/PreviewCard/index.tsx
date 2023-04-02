import styles from './index.module.css'

export default function PreviewCardComponent() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(16rem,_1fr))] gap-4 place-items-center">
      {[1, 2, 3, 4, 5, 6].map(n => {
        return (
          <div key={n} className={`w-64 h-128 rounded-lg overflow-clip bg-white py-2 ${styles.card_hover_shadow}`}>
            <div className="flex px-2 pb-2 items-center">
              <img src="https://picsum.photos/50/50" className="w-6 h-6 rounded-full"></img>
              <div className="flex flex-col flex-1 text-start ml-2">
                <span className="text-sm font-semibold">Stuar Manson</span>
                <span className="text-xs">published 2 hours ago</span>
              </div>
              <button>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  </svg>
                </span>
              </button>
            </div>
            <figure>
              <img src="https://picsum.photos/104/208" className="w-full h-52" />
            </figure>
            <div className="text-start p-2">
              <div className="font-medium mb-0">Flores</div>
              <span className="font-light text-xs">by Stuar Manson</span>
              <p className="text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nihil aut sed facilis laudantium obcaecati architecto qui nobis impedit id commodi eveniet tempora asperiores sunt iste,
                ducimus reiciendis quae vitae?
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
