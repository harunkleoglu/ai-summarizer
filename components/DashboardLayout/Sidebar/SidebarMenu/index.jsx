"use client"
import { signOut } from 'next-auth/react';
import SidebarMenuItem from './SidebarMenuItem';
import { useLocale, useTranslations } from 'next-intl';
import { Home, FileText, User, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/globalElements';

export default function SidebarMenu({ user }) {
  const t = useTranslations('DashboardPage.Dashboard-Sidebar');
  const pathname = usePathname();
  const locale = useLocale();

  const handleSignout = async () => {
    try {
      await signOut({ callbackUrl: '/login' });
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <div className='h-full w-full px-4'>
      <div className='flex flex-col justify-evenly h-full pb-10'>

        <ul className='flex flex-col justify-between items-center h-full mt-2'>
          <div className='flex flex-col w-full gap-3'>
            <SidebarMenuItem href="/dashboard" className="w-full" icon={Home} active={pathname === `/${locale}/dashboard`}>{t('dashboard')}</SidebarMenuItem>
            <SidebarMenuItem href="/dashboard/files" className="w-full" icon={FileText} active={pathname === `/${locale}/dashboard/files`}>{t('files')}</SidebarMenuItem>
            <SidebarMenuItem href="/dashboard/profile" className="w-full" icon={User} active={pathname === `/${locale}/dashboard/profile`}>{t('profile')}</SidebarMenuItem>
          </div>
          <div className='flex flex-col w-full gap-2'>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-700"
              value={locale}
              onChange={(e) => {
                const newLocale = e.target.value;
                const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
                window.location.href = newPath;
              }}
            >
              <option value="en">English</option>
              <option value="tr">Türkçe</option>
            </select>
            <Button icon={<LogOut width={20} height={20} />} onClick={handleSignout}>
              {t('logout')}
            </Button>
          </div>
        </ul>
      </div>
    </div>
  );
}