import React from 'react'
import Title from '../components/main/Title'
import ResultComponent from '../components/result/ResultComponent'

function page() {
  return (
    <div className="flex items-center justify-center m-16 flex-col gap-12">
      <Title />
      <ResultComponent />
    </div>
  )
}

export default page