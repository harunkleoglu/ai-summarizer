"use client"
import { useTranslations } from "use-intl"

export default function DashboardTopBar({ user }) {
    const t = useTranslations('DashboardPage.Dashboard-MainPage')
    return (
        <div className="flex border border-gray-200 w-full p-10 shadow-xs rounded-lg">
            {user && <p className="text-lg">{t("welcome")}, <b>{user.name}!</b></p>}
        </div>
    )
}
