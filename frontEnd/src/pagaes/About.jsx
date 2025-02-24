import React from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import NewLaterBox from '../Components/NewLaterBox'
const About = () => {
  return (
    <>
    <div className='text-2xl text-center pt-5 border-t '>
    <Title text1={'ABOUT'} text2={'US'}/>
    </div>

    <div className="my-20 flex flex-col md:flex-row gap-16">
      <img src={assets.about_img} alt="" className=" w-full md:max-w-[450px]" />

      <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
      <p >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati, provident deserunt blanditiis voluptatibus dignissimos, eius minima alias illo amet iste sequi asperiores!</p>
      <p >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum maiores est exercitationem architecto explicabo autem a unde. Totam similique dolorem libero corrupti.</p>
      <b className='text-gray-800'>Our Mission</b>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, illo modi eveniet fugiat perspiciatis consequuntur id ad voluptatum.</p>
      </div>
     
    </div>
    <div className="text-xl py-4">
        <Title text1={'WHY'} text2={"choose us"}/>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20 ">
        <div className="border px-20 md:px-16 py-20  flex flex-col gap-5 ">
          <b>Quality assurance:</b>
          <p className='text-gray-300'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus sunt at magni quae, incidunt quod!</p>
        </div>

        <div className="border px-20 md:px-16 py-20  flex flex-col gap-5 ">
          <b>Convenience:</b>
          <p className='text-gray-300'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus sunt at magni quae, incidunt quod!</p>
        </div>

        <div className="border px-20 md:px-16 py-20  flex flex-col gap-5 ">
          <b>Exceptional Coustomer Service:</b>
          <p className='text-gray-300'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus sunt at magni quae, incidunt quod!</p>
        </div>
      </div>
      <NewLaterBox/>
      
    </>
  )
}

export default About