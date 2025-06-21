import React from 'react'
import { FileText, Hash, Clock, FileType, FolderOpen, HardDrive, Calendar, CalendarDays } from 'lucide-react';
import { getRelativeTime, formatFileSize } from '@/lib/dateUtils';

function FileDetail({ file }) {
  if (!file) return null;

  return (
    <div className="max-w mx-auto bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-200">
      {/* Header */}
      <div className="flex items-start space-x-4 mb-8">
        <div className="bg-blue-100 p-3 rounded-xl">
          <FileText className="text-blue-600 w-8 h-8" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900 break-all">{file.name}</h1>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Hash className="w-3 h-3" />
            <span className="font-mono">{file.id}</span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* File Size */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <HardDrive className="text-purple-600 w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Dosya Boyutu</p>
              <p className="text-lg font-semibold text-gray-900">{formatFileSize(file.size)}</p>
            </div>
          </div>
        </div>

        {/* Content Type */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <FileType className="text-green-600 w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">İçerik Tipi</p>
              <p className="text-lg font-semibold text-gray-900">{file.contentType}</p>
            </div>
          </div>
        </div>

        {/* Created */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Calendar className="text-blue-600 w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Oluşturulma</p>
              <p className="text-lg font-semibold text-gray-900">{getRelativeTime(file.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Updated */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <CalendarDays className="text-orange-600 w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Son Güncelleme</p>
              <p className="text-lg font-semibold text-gray-900">{getRelativeTime(file.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileDetail;