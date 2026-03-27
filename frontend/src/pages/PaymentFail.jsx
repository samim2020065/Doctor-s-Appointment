import React from 'react'
import { Link } from 'react-router-dom'

const PaymentFail = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center'>
        <div className='mb-4'>
          <div className='w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center'>
            <svg className='w-8 h-8 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
            </svg>
          </div>
        </div>
        <h2 className='text-2xl font-bold text-red-600 mb-4'>Payment Failed!</h2>
        <p className='text-gray-600 mb-6'>Your payment could not be processed. Please try booking your appointment again.</p>
        <Link to='/doctors' className='bg-[#5f6FFF] text-white px-6 py-2 rounded-full hover:bg-[#4a5bd6] transition-colors'>
          Book Another Appointment
        </Link>
      </div>
    </div>
  )
}

export default PaymentFail