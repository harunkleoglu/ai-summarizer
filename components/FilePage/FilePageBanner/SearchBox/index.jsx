"use client"
import { Search, CircleX } from 'lucide-react';
import useSearchBoxStore from '@/store/searchBoxStore';

export default function SearchBox({ onSearch }) {
    const { isVisible, toggleVisibility, searchQuery, setSearchQuery, clearSearchQuery } = useSearchBoxStore();

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (onSearch) {
            onSearch(query);
        }
    };

    const handleButtonClick = () => {
        if (isVisible) {
            clearSearchQuery();
            if (onSearch) {
                onSearch("");
            }
        }
        toggleVisibility();
    };

    return (
        <div
            className={`flex relative outline-2 outline-green-500 rounded-xl ${isVisible ? "w-[250px]  pe-2 ps-4" : "w-[40]"} transition-all duration-300  gap-2 items-center justify-center`}
        >
            <input
                className={`flex left-3 absolute ${isVisible ? "" : "hidden"} py-2 focus:outline-0 transition-all duration-1000 font-mono`}
                placeholder="Search"
                value={searchQuery}
                onChange={handleInputChange}
            />
            <button
                className={`absolute right-0 text-green-500 hover:text-white ${isVisible ? "m-[9px]" : "p-[9px] hover:bg-green-500"} transition-all duration-300 rounded-xl cursor-pointer`}
                onClick={handleButtonClick}
            >
                {isVisible ?
                    <CircleX className='text-green-500 hover:text-red-400 hover:scale-110 hover:rotate-90 transition-all duration-300' size={24}></CircleX>
                    :
                    <Search size={22}></Search>
                }
            </button>
        </div>
    );
}