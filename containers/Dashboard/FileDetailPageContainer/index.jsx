"use client"
import React, { useEffect, useState } from 'react'
import FileDetail from '@/components/FileDetailPage/FileDetail';

function FileDetailPageContainer({fileId}) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFileDetails() {
      setError(null);
      const res = await fetch(`/api/file?id=${fileId}`);
      if (!res.ok) {
        setError("Dosya detayları alınamadı.");
        return;
      }
      const data = await res.json();
      if (data.status === "success") {
        setFile(data.file);
      } else {
        setError("Dosya bulunamadı.");
      }
    }
    fetchFileDetails();
  }, [fileId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dosya Detayları</h1>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : file ? (
        <FileDetail file={file} />
      ) : (
        <div className="text-gray-500">Yükleniyor...</div>
      )}
    </div>
  )
}

export default FileDetailPageContainer