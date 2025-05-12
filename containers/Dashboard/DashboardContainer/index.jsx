import DashboardTopBar from '@/components/Dashboard/DashboardTopBar';
import Tools from '@/components/Dashboard/Tools';
import { getServerSession } from 'next-auth';
import React from 'react';

export default async function DashboardContainer() {
    const session = await getServerSession();
    const user = session?.user;

    return (
        <>
            <DashboardTopBar user={user} />
            <Tools />
        </>
    );
}

