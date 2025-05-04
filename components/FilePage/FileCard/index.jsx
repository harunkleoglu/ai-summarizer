"use client"
import { FileText, FileVideo, FileAudio, FileType, FileImage, File, MoreVertical, Eye, Trash2, Edit, HardDrive } from 'lucide-react';

import { useState } from 'react';

export default function FileCard({ file }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const getFileIcon = (type) => {
        switch (type) {
            case 'pdf':
                return <FileText className="w-6 h-6 text-red-500" />;
            case 'video':
                return <FileVideo className="w-6 h-6 text-yellow-500" />;
            case 'image':
                return <FileImage className="w-6 h-6 text-blue-500" />;
            case 'document':
                return <FileType className="w-6 h-6 text-indigo-500" />;
            case 'audio':
                return <FileAudio className="w-6 h-6 text-green-500" />;
            default:
                return <File className="w-6 h-6 text-gray-500" />;
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="relative flex flex-col justify-center items-center h-[260px] min-w-[260px] md:h-[240px] md:min-w-[240px] lg:h-[220px] lg:min-w-[220px] xl:h-[225px] xl:min-w-[225px] 2xl:h-[230px] 2xl:min-w-[230px] hover:scale-[105%] hover:bg-gray-100 transition-all cursor-pointer border border-gray-200 shadow-sm rounded-2xl p-4">
            <div className="mb-4">
                {getFileIcon(file.type)}
            </div>
            <h3 className="text-lg font-medium text-gray-700 text-center mb-2">{file.name}</h3>
            <span className="flex items-center justify-center gap-1 text-xs border-1 border-green-500 text-green-500 font-semibold px-3 py-1 rounded-xl text-center"><HardDrive className='h-4 w-4'></HardDrive>{file.size} MB</span>

            <button
                className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200 cursor-pointer"
                onClick={toggleDropdown}
            >
                <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {isDropdownOpen && (
                <div className="absolute top-10 right-2 bg-white border border-gray-300 rounded-md shadow-lg w-40">
                    <ul className="flex flex-col">
                        <li className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                            <Eye className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">Preview</span>
                        </li>
                        <li className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                            <Edit className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">Rename</span>
                        </li>
                        <li className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                            <Trash2 className="w-4 h-4 text-red-600" />
                            <span className="text-sm text-red-600">Delete</span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}