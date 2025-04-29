import React from 'react'

export default function SidebarFooter() {
    return (
        <div className='flex flex-col gap-3 text-gray-800 justify-center items-center py-10 h-fit w-full'>
            <a href='/privacy-policy' className='text-sm'>Privacy Policy</a>
            <p className='text-sm text-center'>© 2025 QuickScribe. All rights reserved.</p>
        </div>
    )
}