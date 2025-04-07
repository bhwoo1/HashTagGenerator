import React from 'react'

function Button({icon, title, onClick}: {icon: React.ReactNode, title: string, type?: "submit" | "button" | "reset", onClick?: () => void}) {
  return (
    <div onClick={onClick} className='flex w-[200px] h-[60px] gap-2 cursor-pointer hover:bg-neutral-900 transition duration-300 ease-in-out bg-neutral-600 rounded-2xl text-white text-center items-center justify-center'>
        {icon}
        <p className='font-bold text-[45px]'>{title}</p>
    </div>
  )
}

export default Button