import React from 'react'
import { openSans } from './fonts'
import { Button } from '@/globalElements'
import { SearchX } from 'lucide-react'
function NotFound() {
    return (
        <html lang="en" className={openSans.className}>
            <head>
                <title>Page Not Found</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className='flex items-center justify-center h-screen w-screen bg-green-50'>
                <div className='flex flex-col items-center justify-center bg-white p-10 shadow-lg rounded-2xl gap-2'>
                    <span className='flex flex-col items-center justify-center mb-2'>
                        <SearchX className='text-green-500' width={60} height={60}/>
                        <h1 className='text-2xl font-bold flex items-center'>Page Not Found</h1>
                        <p>Sorry, the page you are looking for does not exist.</p>
                    </span>
                    <Button as='a' href='/'>Save Me!</Button>
                </div>
            </body>
        </html>
    )
}

export default NotFound