import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'> 
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* left section */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Book appointments with trusted doctors anytime, anywhere. Your health is our priority—fast, secure, and reliable care at your fingertips.</p>


            </div>
            {/* cnter section */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>HOME</li>
                    <li>ABOUT US</li>
                    <li>CONTACT US</li>
                    <li>PRIVACY & POLICY</li>
                </ul>

            </div>
            {/* right section */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>78384Y3</li>
                    <li>prescripto@gmail.com</li>
                   
                </ul>

            </div>
        </div>
        <div>
            {/* cpoy right text */}
            <hr />
            <p className='py-5 text-sm text-center '>Copyright 2025@ Prescripto - All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer