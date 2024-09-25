import React from 'react'
import { MoonLoader } from 'react-spinners'

export const Spinner = () => {
  return (
    <div className='w-100 h-100 flex justify-content-center align-items-center'>
      <MoonLoader size={100} color='yellow' />
    </div>
  )
}
