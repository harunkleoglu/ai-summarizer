import React, { useState } from 'react';
import { FileText, FileVideo, FileType, FileImage, FileAudio, FileCode, FileArchive, FileSpreadsheet, FileCog } from 'lucide-react';

export default function Filter({ onFilter }) {
    const [selectedFilter, setSelectedFilter] = useState([]);

    const filterData = [
        {
            label: 'PDF',
            icon: <FileText size={20} />,
            mimeTypes: ['application/pdf'],
            selectedClassNames: 'bg-red-400 text-white',
            unselectedClassNames: 'border-red-400 text-red-500 hover:bg-red-400 hover:text-white'
        },
        {
            label: 'Video',
            icon: <FileVideo size={20} />,
            mimeTypes: ['video/mp4', 'video/x-matroska', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/x-flv', 'video/ogg'],
            selectedClassNames: 'bg-yellow-400 text-white',
            unselectedClassNames: 'border-yellow-400 text-yellow-500 hover:bg-yellow-400 hover:text-white'
        },
        {
            label: 'Image',
            icon: <FileImage size={20} />,
            mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp', 'image/tiff', 'image/heic'],
            selectedClassNames: 'bg-blue-400 text-white',
            unselectedClassNames: 'border-blue-400 text-blue-500 hover:bg-blue-400 hover:text-white'
        },
        {
            label: 'Document',
            icon: <FileType size={20} />,
            mimeTypes: [
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'text/plain',
                'application/rtf',
                'application/vnd.oasis.opendocument.text'
            ],
            selectedClassNames: 'bg-indigo-400 text-white',
            unselectedClassNames: 'border-indigo-400 text-indigo-500 hover:bg-indigo-400 hover:text-white'
        },
        {
            label: 'Audio',
            icon: <FileAudio size={20} />,
            mimeTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp4', 'audio/x-ms-wma', 'audio/flac', 'audio/aac'],
            selectedClassNames: 'bg-green-400 text-white',
            unselectedClassNames: 'border-green-400 text-green-500 hover:bg-green-400 hover:text-white'
        },
        {
            label: 'Code',
            icon: <FileCode size={20} />,
            mimeTypes: [
                'text/javascript', 'application/json', 'text/x-python', 'text/x-java-source', 'text/x-c', 'text/x-c++', 'text/x-csharp', 'text/html', 'text/css', 'application/xml', 'text/markdown', 'text/x-php', 'text/x-go', 'text/x-ruby', 'text/x-shellscript', 'text/x-typescript', 'text/x-sql'
            ],
            selectedClassNames: 'bg-purple-400 text-white',
            unselectedClassNames: 'border-purple-400 text-purple-500 hover:bg-purple-400 hover:text-white'
        },
        {
            label: 'Archive',
            icon: <FileArchive size={20} />,
            mimeTypes: [
                'application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed', 'application/x-tar', 'application/gzip', 'application/x-bzip2'
            ],
            selectedClassNames: 'bg-orange-400 text-white',
            unselectedClassNames: 'border-orange-400 text-orange-500 hover:bg-orange-400 hover:text-white'
        },
        {
            label: 'Spreadsheet',
            icon: <FileSpreadsheet size={20} />,
            mimeTypes: [
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'text/csv',
                'application/vnd.oasis.opendocument.spreadsheet'
            ],
            selectedClassNames: 'bg-lime-400 text-white',
            unselectedClassNames: 'border-lime-400 text-lime-500 hover:bg-lime-400 hover:text-white'
        },
        {
            label: 'Executables',
            icon: <FileCog size={20} />,
            mimeTypes: [
                'application/x-msdownload',
                'application/vnd.android.package-archive',
                'application/octet-stream',
                'application/x-ms-installer'
            ],
            selectedClassNames: 'bg-gray-500 text-white',
            unselectedClassNames: 'border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white'
        },
    ];

    const handleFilterClick = (label) => {
        const updatedFilter = selectedFilter.includes(label)
            ? selectedFilter.filter((f) => f !== label)
            : [...selectedFilter, label];
        setSelectedFilter(updatedFilter);
        // Seçili filtrelerin mimeTypes'larını birleştirip onFilter'a gönder
        const selectedMimeTypes = filterData
            .filter(f => updatedFilter.includes(f.label))
            .flatMap(f => f.mimeTypes);
        onFilter(selectedMimeTypes);
    };

    return (
        <div className='flex gap-3 items-center justify-center h-fit w-fit rounded-lg'>
            {filterData.map((filter) => (
                <button
                    key={filter.label}
                    className={`flex px-3 py-2 items-center justify-center border-2 ${selectedFilter?.includes(filter.label) ? filter.selectedClassNames : filter.unselectedClassNames} hover:scale-105 cursor-pointer transition-all duration-200 rounded-xl`}
                    onClick={() => handleFilterClick(filter.label)}
                >
                    {filter.icon}
                    <p className='font-medium text-sm ms-2'>{filter.label}</p>
                </button>
            ))}
        </div>
    );
}