import React from 'react'

function Badge({sns}: {sns: string}) {
  return (
    <div className={`bg-neutral-800 rounded-3xl items-center justify-center w-[80px] px-2 py-1 text-cneter`}>
        <p className='text-white text-sm'>{sns}</p>
    </div>
  )
}

export default Badge