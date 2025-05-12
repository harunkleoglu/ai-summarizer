"use server";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardSidebar from '@/components/DashboardLayout/Sidebar';

export default async function DashboardLayout({ children }) {
    const session = await getServerSession();

    if (!session) {
        redirect('/login');
    }
    const user = session?.user;

    return (
        <div className="flex flex-col lg:flex-row">
            <DashboardSidebar user={user} />
            <main className="flex-1 p-4 lg:p-10 lg:ml-[270px] 2xl:ml-[300px] overflow-y-auto h-screen">
                {children}
            </main>
        </div>
    );
}