import React from 'react'
import ToolCard from './ToolCard'

export default function Tools() {
    return (
        <div className='grid grid-cols-3 gap-5 w-full mt-5'>
            <ToolCard label="AI PDF Summarizer" description="Summarize your PDF documents with QuickScribe advanced AI tool"  color="green"/>
            <ToolCard label="AI Text Summarizer" description="Summarize your text documents with QuickScribe advanced AI tool" color="red"/>
            <ToolCard label="AI Video Summarizer" description="Summarize your video documents with QuickScribe advanced AI tool" color="indigo"/>
        </div>
    )
}
