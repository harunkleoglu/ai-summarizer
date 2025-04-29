import { Button, Logo } from '@/globalElements'
import React from 'react'

export default function Header() {
    return (
        <div className='flex justify-between p-8 shadow-md'>
            <Logo />
            <div className='flex gap-4'>
                <Button href="/login">Sign In</Button>
                <Button href="/register">Register</Button>
            </div>
        </div>
    )
}