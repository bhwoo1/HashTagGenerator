import React from 'react'
import Badge from './Badge'

function Title() {
  const snsList = ['Instagram', 'X', 'Thread', 'Pinterest'];

  return (
    <article className='flex flex-col gap-4'>
      <div className='flex flex-col gap-4'>
          <p className='text-[50px] md:text-[70px] font-bold text-blue-400'>#해시태그</p>
          <p className='text-[50px] md:text-[70px] font-bold'>#생성기</p>
      </div>
      <div className='flex flex-row gap-2'>
        {snsList.map((sns, index) => (
          <Badge key={index} sns={sns}/>
        ))}
      </div>
    </article>
  )
}

export default Title