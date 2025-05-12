"use client";
import React, { useState } from 'react';
import SidebarTopBar from './SidebarTopBar';
import SidebarMenu from './SidebarMenu';
import SidebarFooter from './SidebarFooter';
import useStore from '../../../store/sidebarStore';

export default function DashboardSidebar({ user }) {
    const isOpen = useStore((state) => state.isSidebarOpen);
    return (
        <div>
            <div
                className={`flex flex-col fixed top-0 left-0 z-40 h-screen border-r border-gray-200 bg-white lg:w-[270px] 2xl:w-[300px] transition-transform duration-300 ${isOpen ? 'not-lg:translate-x-0' : 'not-lg:-translate-x-full'}`}
            >
                <SidebarTopBar />
                <div className='flex-1 overflow-y-auto'>
                    <SidebarMenu user={user} />
                </div>
                {/* <SidebarFooter /> */}
            </div>
        </div>
    );
}
