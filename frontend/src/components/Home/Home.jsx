import React from 'react'
import Hero from '../Hero/hero'
import  Products from '../products/product'
import TopProducts from '../TopProducts/TopProducts'
import Banner from '../Bannner/Banner'
import Testimonial from '../Testimonial/Testimonial'


const Home = () => {
    return (
        <>
          <div className='dark:bg-gray-950 dark:text-white'>
              <Hero/>
              <Products/>
              <TopProducts/>
              <Banner/>
              <Testimonial/>
          </div>
        </>
      )
}

export default Home