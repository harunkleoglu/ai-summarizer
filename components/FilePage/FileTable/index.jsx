"use client"
import { FileText, FileSpreadsheet, FileCog, FileArchive, FileCode2, FileVideo, FileAudio, FileType, FileImage, File, MoreVertical, Eye, Trash2, Edit, HardDrive, Calendar, FileIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRelativeTime } from '@/lib/dateUtils';

const getFileIcon = (contentType) => {
    const iconProps = "w-5 h-5";
    
    if (contentType.startsWith("image/")) 
        return <div className="bg-blue-100 p-2 rounded-lg"><FileImage className={`${iconProps} text-blue-600`} /></div>;
    if (contentType.startsWith("video/")) 
        return <div className="bg-yellow-100 p-2 rounded-lg"><FileVideo className={`${iconProps} text-yellow-600`} /></div>;
    if (contentType.startsWith("audio/")) 
        return <div className="bg-green-100 p-2 rounded-lg"><FileAudio className={`${iconProps} text-green-600`} /></div>;
    if (contentType.startsWith("application/vnd.ms-excel") || contentType.startsWith("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) 
        return <div className="bg-lime-100 p-2 rounded-lg"><FileSpreadsheet className={`${iconProps} text-lime-600`} /></div>;
    if (contentType.startsWith("application/zip") || contentType.startsWith("application/x-rar-compressed") || contentType.startsWith("application/x-7z-compressed")) 
        return <div className="bg-orange-100 p-2 rounded-lg"><FileArchive className={`${iconProps} text-orange-600`} /></div>;
    if (contentType.startsWith("text/") || contentType.startsWith("application/json") || contentType.startsWith("application/xml")) 
        return <div className="bg-purple-100 p-2 rounded-lg"><FileCode2 className={`${iconProps} text-purple-600`} /></div>;
    if (contentType.startsWith("application/x-msdownload") || contentType.startsWith("application/vnd.android.package-archive") || contentType.startsWith("application/octet-stream")) 
        return <div className="bg-gray-100 p-2 rounded-lg"><FileCog className={`${iconProps} text-gray-700`} /></div>;
    if (contentType === 'application/pdf') 
        return <div className="bg-red-100 p-2 rounded-lg"><FileText className={`${iconProps} text-red-600`} /></div>;
    if (["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain", "application/rtf", "application/vnd.oasis.opendocument.text"].includes(contentType)) 
        return <div className="bg-indigo-100 p-2 rounded-lg"><FileType className={`${iconProps} text-indigo-600`} /></div>;

    return <div className="bg-gray-100 p-2 rounded-lg"><File className={`${iconProps} text-gray-500`} /></div>;
};

const formatSize = (size) => {
  if (!size) return '-';
  if (size >= 1024 * 1024 * 1024) return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  if (size >= 1024 * 1024) return (size / (1024 * 1024)).toFixed(2) + ' MB';
  if (size >= 1024) return (size / 1024).toFixed(2) + ' KB';
  return size + ' B';
};

function FileTable({ filteredFiles }) {
  const [openMenuIdx, setOpenMenuIdx] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuIdx !== null && !event.target.closest('.dropdown-menu')) {
        setOpenMenuIdx(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openMenuIdx]);

  const handleViewDetails = (e, file) => {
    e.stopPropagation();
    setOpenMenuIdx(null);
    router.push(`/dashboard/files/${file.id}`);
  };

  const handleRename = (e, file) => {
    e.stopPropagation();
    setOpenMenuIdx(null);
    // TODO: Implement rename functionality
    console.log('Rename clicked for', file.name);
  };

  const handleDelete = (e, file) => {
    e.stopPropagation();
    setOpenMenuIdx(null);
    // TODO: Implement delete functionality
    console.log('Delete clicked for', file.name);
  };

  const handleRowClick = (file) => {
    router.push(`/dashboard/files/${file.id}`);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="grid grid-cols-12 gap-4 items-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
            <div className="col-span-5">Dosya Adı</div>
            <div className="col-span-2">Tür</div>
            <div className="col-span-2">Boyut</div>
            <div className="col-span-2">Güncelleme</div>
            <div className="col-span-1 text-right">İşlemler</div>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-y-auto">
        {filteredFiles && filteredFiles.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredFiles.map((file, idx) => {
              const ext = file.name.split('.').pop()?.toLowerCase();
              return (                <div 
                  key={idx} 
                  className="group hover:bg-blue-50/50 transition-all duration-200 cursor-pointer border-l-4 border-transparent hover:border-blue-400"
                  onClick={() => handleRowClick(file)}
                >
                  <div className="px-6 py-4">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* File Name with Icon */}
                      <div className="col-span-5 flex items-center gap-3">
                        <div className="transform group-hover:scale-110 transition-transform duration-200">
                          {getFileIcon(file.contentType)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                            {file.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {file.contentType}
                          </div>
                        </div>
                      </div>

                      {/* File Type */}
                      <div className="col-span-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors">
                          .{ext || 'file'}
                        </span>
                      </div>

                      {/* File Size */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-1.5">
                          <HardDrive className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-sm text-gray-600 font-medium">
                            {formatSize(file.size)}
                          </span>
                        </div>
                      </div>

                      {/* Updated Time */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {file.updatedAt ? getRelativeTime(file.updatedAt) : '-'}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="col-span-1 text-right">
                        <div className="relative">
                          <button
                            className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-white hover:shadow-md transition-all duration-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuIdx(openMenuIdx === idx ? null : idx);
                            }}
                            aria-label="Menüyü aç"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>
                          
                          {openMenuIdx === idx && (                            <div className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-xl shadow-2xl z-20 overflow-hidden dropdown-menu">
                              <div className="py-2">
                                <button 
                                  onClick={(e) => handleViewDetails(e, file)}
                                  className="w-full px-4 py-3 text-left text-sm hover:bg-blue-50 flex items-center gap-3 transition-colors"
                                >
                                  <Eye className="w-4 h-4 text-blue-600" />
                                  <span className="font-medium text-gray-700">Detayları Gör</span>
                                </button>
                                <button 
                                  onClick={(e) => handleRename(e, file)}
                                  className="w-full px-4 py-3 text-left text-sm hover:bg-orange-50 flex items-center gap-3 transition-colors"
                                >
                                  <Edit className="w-4 h-4 text-orange-600" />
                                  <span className="font-medium text-gray-700">Yeniden Adlandır</span>
                                </button>
                                <div className="border-t border-gray-100 my-1"></div>
                                <button 
                                  onClick={(e) => handleDelete(e, file)}
                                  className="w-full px-4 py-3 text-left text-sm hover:bg-red-50 flex items-center gap-3 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                  <span className="font-medium text-red-600">Sil</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center py-16">            <div className="text-center">
              <FileIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">Dosya bulunamadı</h3>
              <p className="text-sm text-gray-400">Henüz hiç dosya yüklenmemiş</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileTable;