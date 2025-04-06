import React from 'react'
import Badge from './Badge'

function Title() {
  const snsList = ['Instagram', 'X', 'Thread', 'Pinterest'];

  return (
    <article className='flex flex-col gap-4'>
      <div className='flex sm:flex-row md:flex-col gap-4'>
          <p className='sm:text-4xl md:text-[70px] font-bold'>#해시태그</p>
          <p className='sm:text-4xl md:text-[70px] font-bold'>생성기</p>
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