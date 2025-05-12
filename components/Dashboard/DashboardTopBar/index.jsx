"use client"
import { useTranslations } from "use-intl"

export default function DashboardTopBar({ user }) {
    const t = useTranslations('DashboardPage.Dashboard-MainPage')
    return (
        <div className="flex border border-gray-200 font-mono w-full p-10 shadow-xs rounded-lg">
            {user && <p className="font-bold text-lg">{t("welcome")}, {user.name}!</p>}
        </div>
    )
}
