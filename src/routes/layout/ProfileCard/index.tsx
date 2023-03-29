export default function ProfileCardComponent() {
  return (
    <div className="flex flex-col rounded-lg overflow-clip pd-4 w-64 h-80 bg-white">
      <div>
        <figure>
          <img src="https://picsum.photos/300/200" width="100%" className="h-32 object-cover" />
        </figure>
      </div>
      <div className="flex-1 relative">
        <img src="https://picsum.photos/50/50" width="50" height="50" className="absolute top-[calc(-25px)] left-[calc(50%_-_25px)] rounded-full outline outline-4 outline-offset-0 outline-white" />
        <div className="my-4 items-center mt-12">
          <div>
            <span className="font-bold">Victor Crest &nbsp;</span>
            <span>26</span>
          </div>
          <span className="font-light text-xs">London</span>
        </div>
      </div>
      <hr />
      <div className="flex w-full mt-2 justify-evenly text-center pb-2">
        <div className="w-[calc(30%_-_2px)] my-auto">
          <div className="flex flex-col">
            <div className="font-bold">80K</div>
            <span className="text-xs">Followers</span>
          </div>
        </div>
        <div className="w-[calc(30%_-_2px)] my-auto">
          <div className="flex flex-col">
            <div className="font-bold">803K</div>
            <span className="text-xs">Likes</span>
          </div>
        </div>
        <div className="w-[calc(30%_-_2px)] my-auto">
          <div className="flex flex-col">
            <div className="font-bold">1.4K</div>
            <span className="text-xs">Photos</span>
          </div>
        </div>
      </div>
    </div>
  )
}
