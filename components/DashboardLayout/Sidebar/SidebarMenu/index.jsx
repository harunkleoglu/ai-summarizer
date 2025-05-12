"use client"
import { signOut } from 'next-auth/react';
import SidebarMenuItem from './SidebarMenuItem';
import { useLocale, useTranslations } from 'next-intl';
import { Home, FileText, User, LogOut, CircleUserRound, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function SidebarMenu({ user }) {
  const t = useTranslations('DashboardPage.Dashboard-Sidebar');
  const pathname = usePathname();
  const locale = useLocale();

  const handleSignout = async () => {
    console.log('Logout button clicked'); // Debugging log
    try {
      await signOut({ callbackUrl: '/login' });
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <div className='h-full w-full px-4'>
      <div className='flex flex-col justify-evenly h-full pb-10'>

        <ul className='flex flex-col items-center justify-start gap-3 h-full'>
          <SidebarMenuItem href="/dashboard" className="w-full" icon={Home} active={pathname === `/${locale}/dashboard`}>{t('dashboard')}</SidebarMenuItem>
          <SidebarMenuItem href="/dashboard/files" className="w-full" icon={FileText} active={pathname === `/${locale}/dashboard/files`}>{t('files')}</SidebarMenuItem>
          <SidebarMenuItem href="/dashboard/profile" className="w-full" icon={User} active={pathname === `/${locale}/dashboard/profile`}>{t('profile')}</SidebarMenuItem>
          <SidebarMenuItem className="w-full" onClick={handleSignout} icon={LogOut}>{t('logout')}</SidebarMenuItem>
        </ul>

        <div className='flex justify-evenly items-center py-3 bg-gray-50 outline-3 outline-green-500 hover:outline-green-600 transition-all duration-300 rounded-lg'>
          <div className='flex items-center gap-3'>
            <CircleUserRound size={28}></CircleUserRound>
            <span className='font-mono font-bold text-sm'>{user.name}</span>
          </div>
          <ArrowRight size={18}></ArrowRight>
        </div>

      </div>
    </div>
  );
}