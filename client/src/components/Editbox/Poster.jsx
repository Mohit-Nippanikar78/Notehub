import React from 'react'

const Poster = () => {
  return (
    <div className="flex flex-col col-span-5 py-24 items-center relative">
      <div className="heading-gradient text-4xl font-extrabold">
        Notes Redefined
      </div>
      <div className="heading-gradient text-2xl font-extrabold">
        Organize, Simplify, Excel
      </div>
      <video src="/images/white-bg-video.mp4" className='absolute top-0  z-[-1] opacity-5' autoPlay={true}
        muted={true}
        loop={true}></video>
    </div>
  )
}

export default Poster