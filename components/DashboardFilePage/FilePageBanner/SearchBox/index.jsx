import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBox({ onSearch }) {
    const handleInputChange = (e) => {
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

    return (
        <div className='flex outline-2 outline-green-500 rounded-xl gap-2 pe-2 ps-4 items-center justify-center'>
            <input
                className='flex py-2 focus:outline-0 font-mono '
                placeholder="Search"
                onChange={handleInputChange}
            />
            <span
                className='text-green-500 hover:text-white hover:bg-green-500 transition-all duration-300 p-2 rounded-full cursor-pointer'
            >
                <Search size={22}></Search>
            </span>
        </div>
    );
}