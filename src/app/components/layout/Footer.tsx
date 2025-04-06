import React from 'react'
import Navigator from './Navigator'

function Footer() {
  return (
    <section className='fixed h-[100px] w-full flex flex-row justify-between items-center p-4 bottom-0 left-0 right-0'>
        <Navigator />
    </section>
  )
}

export default Footer;