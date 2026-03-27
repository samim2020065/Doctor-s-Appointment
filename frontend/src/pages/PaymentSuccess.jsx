import React from 'react'
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center'>
        <div className='mb-4'>
          <div className='w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center'>
            <svg className='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M5 13l4 4L19 7'></path>
            </svg>
          </div>
        </div>
        <h2 className='text-2xl font-bold text-green-600 mb-4'>Payment Successful!</h2>
        <p className='text-gray-600 mb-6'>Your appointment has been booked successfully. You will receive a confirmation email shortly.</p>
        <Link to='/my-appointments' className='bg-[#5f6FFF] text-white px-6 py-2 rounded-full hover:bg-[#4a5bd6] transition-colors'>
          View My Appointments
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccess