import { Button, Logo } from '@/globalElements'
import { LogIn } from 'lucide-react'
import React from 'react'

export default function Header() {
    return (
        <div className='flex justify-between p-8 shadow-md'>
            <Logo />
            <div className='flex gap-4'>
                <Button as='a' href="/login" icon={<LogIn width={20} height={20} />}>Sign In</Button>
                <Button as='a' href="/register">Register</Button>
            </div>
        </div>
    )
}