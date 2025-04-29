import React, { useState } from 'react';
import { FileText, FileVideo, FileType, FileImage, FileAudio } from 'lucide-react';

export default function Filter({ onFilter }) {
    const [selectedFilter, setSelectedFilter] = useState([]);

    const handleFilterClick = (filterType) => {
        const updatedFilter = selectedFilter.includes(filterType)
            ? selectedFilter.filter((filter) => filter !== filterType)
            : [...selectedFilter, filterType];

        setSelectedFilter(updatedFilter);
        onFilter(updatedFilter);
    };

    return (
        <div className='flex gap-3 items-center justify-center h-fit w-fit shadow-xsp-3 rounded-lg'>
            <button 
                className={`flex px-3 py-2 items-center justify-center border-2 ${selectedFilter?.includes('pdf') ? 'bg-red-400 text-white' : 'border-red-400 text-red-500 hover:bg-red-400 hover:text-white'} hover:scale-105 cursor-pointer transition-all duration-200 h-3/4 rounded-xl`} 
                onClick={() => handleFilterClick('pdf')}
            >
                <FileText size={20}></FileText>
                <p className='font-semibold text-sm ms-2'>PDF</p>
            </button>
            <button 
                className={`flex px-3 py-2 items-center justify-center border-2 ${selectedFilter?.includes('video') ? 'bg-yellow-400 text-white' : 'border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-white'} hover:scale-105 cursor-pointer transition-all duration-200 h-3/4 rounded-xl`} 
                onClick={() => handleFilterClick('video')}
            >
                <FileVideo size={20}></FileVideo>
                <p className='font-semibold text-sm ms-2'>Video</p>
            </button>
            <button 
                className={`flex px-3 py-2 items-center justify-center border-2 ${selectedFilter?.includes('image') ? 'bg-blue-400 text-white' : 'border-blue-400 text-blue-500 hover:bg-blue-400 hover:text-white'} hover:scale-105 cursor-pointer transition-all duration-200 h-3/4 rounded-xl`} 
                onClick={() => handleFilterClick('image')}
            >
                <FileImage size={20}></FileImage>
                <p className='font-semibold text-sm ms-2'>Image</p>
            </button>
            <button 
                className={`flex px-3 py-2 items-center justify-center border-2 ${selectedFilter?.includes('document') ? 'bg-indigo-400 text-white' : 'border-indigo-400 text-indigo-500 hover:bg-indigo-400 hover:text-white'} hover:scale-105 cursor-pointer transition-all duration-200 h-3/4 rounded-xl`} 
                onClick={() => handleFilterClick('document')}
            >
                <FileType size={20}></FileType>
                <p className='font-semibold text-sm ms-2'>Document</p>
            </button>
            <button 
                className={`flex px-3 py-2 items-center justify-center border-2 ${selectedFilter?.includes('audio') ? 'bg-green-400 text-white' : 'border-green-400 text-green-500 hover:bg-green-400 hover:text-white'} hover:scale-105 cursor-pointer transition-all duration-200 h-3/4 rounded-xl`} 
                onClick={() => handleFilterClick('audio')}
            >
                <FileAudio size={20}></FileAudio>
                <p className='font-semibold text-sm ms-2'>Audio</p>
            </button>
        </div>
    );
}