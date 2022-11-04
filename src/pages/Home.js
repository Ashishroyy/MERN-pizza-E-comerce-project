import React from 'react'
import Products from '../components/Products'
const Home = () => {
  return (
    <>
    <div className='hero py-20'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='w-1/2'>
          <h6 className='text-lg'>Are you hungery?</h6>
          <h6 className='text-3xl font-bold md:text-6xl'>Don't wait!</h6>
          <button className='font-bold mt-4 bg-yellow-500 text-white py-2 px-3 rounded-full hover:bg-yellow-600'>order now</button>
        </div>
        <div className='w-1/2'>
          <img className='w-2/3' src='/images/pizzaa.png' alt='pizza'/>
        </div>
      </div>
    </div>
    <div className='pb-23'>
      <Products/>
    </div>
    </>
  )
}

export default Home