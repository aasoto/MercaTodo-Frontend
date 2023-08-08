import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { NavLink } from 'react-router-dom'

export const OptionNavbarCart = () => {
  return (
    <NavLink
        className={({ isActive }) => `text-gray-400 hover:text-gray-500 font-normal hover:font-medium px-4 py-2 hover:bg-gray-100 rounded-md transition duration-200 ${isActive ? 'border border-gray-500 font-medium bg-gray-100' : ''}`}
        to="/cart"
    >
        <ShoppingCartIcon className='w-6 h-6 text-red-600'/>
    </NavLink>
  )
}
