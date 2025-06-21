"use server"
import React from 'react'
import FileDetailPageContainer from '@/containers/Dashboard/FileDetailPageContainer'

async function FileDetailPage({params}) {
  const {id} = await params
  if (!id) {
    return <div className="text-red-500">Dosya ID'si bulunamadı.</div>
  }
  
  return <FileDetailPageContainer fileId={id}/>
}

export default FileDetailPage