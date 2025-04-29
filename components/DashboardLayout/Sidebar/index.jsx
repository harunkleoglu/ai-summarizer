"use client";
import React, { useState } from 'react';
import SidebarTopBar from './SidebarTopBar';
import SidebarMenu from './SidebarMenu';
import SidebarFooter from './SidebarFooter';
import { Menu } from 'lucide-react';

export default function DashboardSidebar() {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button
                className="fixed top-4 left-0 z-50 p-2 bg-gray-200 rounded-md shadow-md"
                onClick={toggleSidebar}
            >
                <Menu />
            </button>
            <div
                className={`flex flex-col fixed top-0 left-0 h-screen border-r border-gray-200 bg-white lg:w-[270px] 2xl:w-[300px] transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <SidebarTopBar />
                <div className='flex-1 overflow-y-auto'>
                    <SidebarMenu />
                </div>
                <SidebarFooter />
            </div>
        </div>
    );
}
