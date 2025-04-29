"use client"
import { Search, CircleX } from 'lucide-react';
import { useState } from 'react';

export default function SearchBox({ onSearch }) {
    const [isVisible, setVisible] = useState(false);

    const handleInputChange = (e) => {
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

    const toggleVisibility = () => {
        setVisible(!isVisible);
    };

    const handleAnimationEnd = () => {
        if (!isVisible) {
            const inputElement = document.querySelector('input');
            if (inputElement) {
                inputElement.style.display = 'none';
            }
        }
    };

    return (
        <div
            className={`flex relative outline-2 outline-green-500 rounded-xl ${isVisible ? "w-[250px]  pe-2 ps-4" : "w-[40]"} transition-all duration-300  gap-2 items-center justify-center`}
            onAnimationEnd={handleAnimationEnd}
        >
            <input
                className={`flex left-3 absolute ${isVisible ? "" : "hidden"} py-2 focus:outline-0 transition-all duration-1000 font-mono`}
                placeholder="Search"
                onChange={handleInputChange}
            />
            <button
                className={`absolute p-[9px] right-0 text-green-500 hover:text-white ${isVisible ? "" : "hover:bg-green-500"} transition-all duration-300 rounded-xl cursor-pointer`}
                onClick={toggleVisibility}
            >
                {isVisible ?
                    <CircleX className='text-green-500 hover:text-red-400 hover:scale-110 hover:rotate-90 transition-all duration-400' size={22}></CircleX>
                    :
                    <Search size={22}></Search>
                }
            </button>
        </div>
    );
}