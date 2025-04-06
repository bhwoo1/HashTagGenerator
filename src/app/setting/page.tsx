import React from 'react'
import SettingForm from '../components/setting/SettingForm'

function page() {
  return (
    <div className='m-24 flex flex-col gap-12'>
      <p className='text-[40px] font-bold'>설정</p>
      <SettingForm />
    </div>
  )
}

export default page