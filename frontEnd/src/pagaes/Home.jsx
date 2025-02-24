import React from 'react'
import Hero from '../Components/Hero'
import Latest_collection from '../Components/Latest_collection'
import BestSeller from '../Components/BestSeller'
import Overpolicy from '../Components/Overpolicy'
import NewLaterBox from '../Components/NewLaterBox'

const home = () => {
  return (
    <div>

      <Hero/>
      <Latest_collection/>
      <BestSeller/>
      <Overpolicy/>
      <NewLaterBox/>
    </div>
  )
}

export default home