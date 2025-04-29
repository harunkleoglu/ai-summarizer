import React from 'react'
import { LayoutList, LayoutGrid } from 'lucide-react'

function ShowOptions() {
  return (
    <div className='flex items-center gap-2'>
        <button className='p-1 text-gray-700 hover:text-white hover:bg-gray-500 hover:scale-110 transition-all rounded-lg cursor-pointer'>
            <LayoutGrid size={24}></LayoutGrid>
        </button>
        <button className='p-1 text-gray-700 hover:text-white hover:bg-gray-500 hover:scale-110 transition-all rounded-lg cursor-pointer'>
            <LayoutList size={24}></LayoutList>
        </button>
    </div>
  )
}

export default ShowOptions