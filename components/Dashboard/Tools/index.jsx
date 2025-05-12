import React from 'react'
import ToolCard from './ToolCard'

export default function Tools() {
    return (
        <div className='grid grid-cols-3 gap-5 w-full mt-5'>
            <ToolCard />
            <ToolCard />
            <ToolCard />
            <ToolCard />
            <ToolCard />
            <ToolCard />
        </div>
    )
}
