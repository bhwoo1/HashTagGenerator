import React from 'react'
import { CiCirclePlus } from 'react-icons/ci'

function InputForm() {
  return (
    <div className='flex flex-col gap-4'>
        <label htmlFor="image">
            <div className='flex w-[400px] h-[60px] cursor-pointer hover:bg-neutral-900 transition duration-300 ease-in-out bg-neutral-600 rounded-2xl text-white text-center items-center justify-center'>
                <CiCirclePlus size={60}/>
            </div>
        </label>
        <input type='file' name='image' id='image' className='hidden' accept="image/*"/>
        <div>
            <p className='text-sm font-bold'>현재 설정 : </p>
        </div>
    </div>
  )
}

export default InputForm