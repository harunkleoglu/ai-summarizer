"use client"
import { FileText, FileSpreadsheet, FileCog, FileArchive, FileCode2, FileVideo, FileAudio, FileType, FileImage, File, MoreVertical, Eye, Trash2, Edit, HardDrive } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const getFileIcon = (file) => {
    const imageTypes = [
        'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'svg', 'ico', 'heic', 'heif'
    ];
    const videoTypes = [
        'mp4', 'mov', 'avi', 'wmv', 'flv', 'mkv', 'webm', 'mpeg', 'mpg', '3gp'
    ];
    const audioTypes = [
        'mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a', 'wma', 'opus'
    ];
    const spreadsheetTypes = [
        'xls', 'xlsx', 'csv', 'ods'
    ];
    const archiveTypes = [
        'zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'iso'
    ];
    const codeTypes = [
        'js', 'ts', 'jsx', 'tsx', 'py', 'java', 'c', 'cpp', 'cs', 'rb', 'php', 'go', 'rs', 'html', 'css', 'json', 'xml', 'sh', 'bat', 'yml', 'yaml'
    ];
    const exeTypes = [
        'exe', 'msi', 'apk', 'app', 'bin', 'dmg'
    ];
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (imageTypes.includes(ext)) return <div className='bg-blue-100 p-3 rounded-xl'><FileImage className="w-6 h-6 text-blue-500" /></div>;
    if (videoTypes.includes(ext)) return <div className='bg-yellow-100 p-3 rounded-xl'><FileVideo className="w-6 h-6 text-yellow-500" /></div>;
    if (audioTypes.includes(ext)) return <div className='bg-green-100 p-3 rounded-xl'><FileAudio className="w-6 h-6 text-green-500" /></div>;
    if (spreadsheetTypes.includes(ext)) return <div className='bg-lime-100 p-3 rounded-xl'><FileSpreadsheet className="w-6 h-6 text-lime-600" /></div>;
    if (archiveTypes.includes(ext)) return <div className='bg-orange-100 p-3 rounded-xl'><FileArchive className="w-6 h-6 text-orange-500" /></div>;
    if (codeTypes.includes(ext)) return <div className='bg-purple-100 p-3 rounded-xl'><FileCode2 className="w-6 h-6 text-purple-500" /></div>;
    if (exeTypes.includes(ext)) return <div className='bg-gray-100 p-3 rounded-xl'><FileCog className="w-6 h-6 text-black" /></div>;
    if (ext === 'pdf') return <div className='bg-red-100 p-3 rounded-xl'><FileText className="w-6 h-6 text-red-500" /></div>;
    if (["doc", "docx", "txt", "rtf", "odt"].includes(ext)) return <div className='bg-indigo-100 p-3 rounded-xl'><FileType className="w-6 h-6 text-indigo-500" /></div>;
    return <File className="w-6 h-6 text-gray-500" />;
};

const formatSize = (size) => {
    if (!size) return '-';
    if (size >= 1024 * 1024) return (size / (1024 * 1024)).toFixed(2) + ' MB';
    if (size >= 1024) return (size / 1024).toFixed(2) + ' KB';
    return size + ' B';
};

export default function FileCard({ file, index }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const router = useRouter();

    const handlePreview = (e) => {
        router.push(`files/${file.id}`);
    }

    const handleRename = (e) => {
        e.stopPropagation();
        // Implement rename functionality here
        console.log('Rename clicked for', file.name);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && !event.target.closest('.dropdown-menu')) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };

    }, [isDropdownOpen]);    return (
        <div 
            key={index} 
            className="group relative flex flex-col justify-between bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 h-[280px] min-w-[260px] md:h-[260px] md:min-w-[240px] lg:h-[240px] lg:min-w-[220px] xl:h-[245px] xl:min-w-[225px] 2xl:h-[250px] 2xl:min-w-[230px] transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300 hover:shadow-xl shadow-md rounded-2xl p-6 transform hover:-translate-y-1"
            onClick={handlePreview}
        >
            {/* Header with dropdown */}
            <div className="flex justify-between items-start mb-4">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
                <button
                    className="opacity-0 cursor-pointer group-hover:opacity-100 p-2 rounded-full hover:bg-white hover:shadow-md transition-all duration-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown();
                    }}
                >
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>
            </div>

            {/* File Icon */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {getFileIcon(file)}
                </div>                {/* File Name */}
                <div className="w-full mb-3 text-center overflow-hidden">
                    <h3 className="text-sm font-medium text-gray-800 leading-relaxed relative">
                        <span 
                            className={`inline-block transition-all duration-300 ${
                                file.name.length > 30 
                                    ? 'group-hover:animate-marquee whitespace-nowrap' 
                                    : 'group-hover:scale-105'
                            }`}
                            title={file.name}
                        >
                            {file.name}
                        </span>
                    </h3>
                </div>
            </div>

            {/* File Size Badge */}
            <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 text-xs bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium px-4 py-2 rounded-full shadow-sm">
                    <HardDrive className='h-3 w-3' />
                    {formatSize(file.size)}
                </div>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute top-14 right-2 bg-white border border-gray-200 rounded-xl shadow-2xl w-44 overflow-hidden z-10 dropdown-menu">
                    <div className="py-2">
                        <div 
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePreview(e);
                                setIsDropdownOpen(false);
                            }} 
                            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors"
                        >
                            <Eye className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-700 font-medium">Detayları Gör</span>
                        </div>
                        <div 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRename(e);
                                setIsDropdownOpen(false);
                            }}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 cursor-pointer transition-colors"
                        >
                            <Edit className="w-4 h-4 text-orange-600" />
                            <span className="text-sm text-gray-700 font-medium">Yeniden Adlandır</span>
                        </div>
                        <div className="border-t border-gray-100 my-1"></div>
                        <div className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 cursor-pointer transition-colors">
                            <Trash2 className="w-4 h-4 text-red-600" />
                            <span className="text-sm text-red-600 font-medium">Sil</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}