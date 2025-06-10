"use client"
import { FileText, FileVideo, FileAudio, FileType, FileImage, File, MoreVertical, Eye, Trash2, Edit, HardDrive } from 'lucide-react';
import React, { useState } from 'react';

function FileTable({ filteredFiles }) {
  const [openMenuIdx, setOpenMenuIdx] = useState(null);
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

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border rounded-t-lg overflow-hidden">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider bg-gray-100">File Name</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider bg-gray-100">Type</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 tracking-wider bg-gray-100">Size (MB)</th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 tracking-wider bg-gray-100">Actions</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="flex-1 overflow-x-auto overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200 border-t-0">
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFiles && filteredFiles.length > 0 ? (
              filteredFiles.map((file, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-2 flex items-center gap-2">
                    {getFileIcon(file.type)}
                    <span>{file.name}</span>
                  </td>
                  <td className="px-4 py-2 capitalize">{file.type || '-'}</td>
                  <td className="px-4 py-2">{file.size ? file.size.toFixed(2) : '-'}</td>
                  <td className="px-4 py-2 relative text-right">
                    <button
                      className="p-1 rounded hover:bg-gray-200"
                      onClick={() => setOpenMenuIdx(openMenuIdx === idx ? null : idx)}
                      aria-label="Show actions"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                    {openMenuIdx === idx && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10 animate-fade-in">
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"><Eye className="w-4 h-4" />View</button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"><Edit className="w-4 h-4" />Edit</button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-red-500 flex items-center gap-2"><Trash2 className="w-4 h-4" />Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400">No files found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FileTable