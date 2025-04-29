import { Button } from '@/globalElements'
import React from 'react'

function InformationCard({
    title = "Information Title",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    isActionCard = false,
    action
}) {
    return (
        <>
            <div className="flex flex-col gap-4 justify-center bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-gray-700">{description}</p>
                {isActionCard && (
                    <Button onClick={action}>Text</Button>
                )}
            </div>
        </>
    )
}

export default InformationCard