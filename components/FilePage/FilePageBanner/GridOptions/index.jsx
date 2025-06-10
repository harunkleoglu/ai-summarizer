import React from 'react'
import { LayoutList, LayoutGrid } from 'lucide-react'
import useDashboardStore from '@/store/dashboardStore'

function GridOptions() {
  const isGrid = useDashboardStore((state) => state.isGrid);
  const setIsGrid = useDashboardStore((state) => state.setIsGrid);
  return (
    <div className='flex items-center gap-2'>
        <button
          className={`p-1 text-gray-700 hover:text-white hover:bg-gray-500 hover:scale-110 transition-all rounded-lg cursor-pointer${isGrid ? ' bg-gray-500 text-white' : ''}`}
          onClick={() => setIsGrid(true)}
        >
            <LayoutGrid size={24}></LayoutGrid>
        </button>
        <button
          className={`p-1 text-gray-700 hover:text-white hover:bg-gray-500 hover:scale-110 transition-all rounded-lg cursor-pointer${!isGrid ? ' bg-gray-500 text-white' : ''}`}
          onClick={() => setIsGrid(false)}
        >
            <LayoutList size={24}></LayoutList>
        </button>
    </div>
  )
}

export default GridOptions