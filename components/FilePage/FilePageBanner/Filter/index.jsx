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

    const filterData = [
        {
            type: 'pdf',
            icon: <FileText size={20} />,
            label: 'PDF',
            selectedClassNames: 'bg-red-400 text-white',
            unselectedClassNames: 'border-red-400 text-red-500 hover:bg-red-400 hover:text-white'
        },
        { 
            type: 'video',
            icon: <FileVideo size={20} />,
            label: 'Video',
            selectedClassNames: 'bg-yellow-400 text-white',
            unselectedClassNames: 'border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-white'
        },
        {
            type: 'image',
            icon: <FileImage size={20} />,
            label: 'Image',
            selectedClassNames: 'bg-blue-400 text-white',
            unselectedClassNames: 'border-blue-400 text-blue-500 hover:bg-blue-400 hover:text-white'
        },
        {
            type: 'document',
            icon: <FileType size={20} />,
            label: 'Document',
            selectedClassNames: 'bg-indigo-400 text-white',
            unselectedClassNames: 'border-indigo-400 text-indigo-500 hover:bg-indigo-400 hover:text-white'
        },
        {
            type: 'audio',
            icon: <FileAudio size={20} />,
            label: 'Audio',
            selectedClassNames: 'bg-green-400 text-white',
            unselectedClassNames: 'border-green-400 text-green-500 hover:bg-green-400 hover:text-white'
        },
    ]

    return (
        <div className='flex gap-3 items-center justify-center h-fit w-fit rounded-lg'>
            {filterData.map((filter) => (
                <button
                    className={`flex px-3 py-2 items-center justify-center border-2 ${selectedFilter?.includes(filter.type) ? filter.selectedClassNames : filter.unselectedClassNames} hover:scale-105 cursor-pointer transition-all duration-200 rounded-xl`}
                    onClick={() => handleFilterClick(filter.type)}
                >
                    {filter.icon}
                    <p className='font-medium text-sm ms-2'>{filter.label}</p>
                </button>
            ))}
        </div>
    );
}