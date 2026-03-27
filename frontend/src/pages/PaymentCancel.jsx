import React from 'react'
import { Link } from 'react-router-dom'

const PaymentCancel = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center'>
        <div className='mb-4'>
          <div className='w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center'>
            <svg className='w-8 h-8 text-yellow-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z'></path>
            </svg>
          </div>
        </div>
        <h2 className='text-2xl font-bold text-yellow-600 mb-4'>Payment Cancelled!</h2>
        <p className='text-gray-600 mb-6'>Your payment was cancelled. You can try booking your appointment again.</p>
        <Link to='/doctors' className='bg-[#5f6FFF] text-white px-6 py-2 rounded-full hover:bg-[#4a5bd6] transition-colors'>
          Book Another Appointment
        </Link>
      </div>
    </div>
  )
}

export default PaymentCancel