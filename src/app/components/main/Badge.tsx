import React from 'react'

function Badge({sns}: {sns: string}) {
  return (
    <div className={`bg-neutral-800 rounded-3xl items-center justify-center md:w-[100px] px-2 py-1 text-cneter`}>
        <p className='text-white text-[10px] md:text-[15px] font-bold'>#{sns}</p>
    </div>
  )
}

export default Badge