import { useTranslations } from "next-intl"
import FileTable from "../FileTable";
import FileCard from "../FileCard"
import { CircleAlert } from "lucide-react"
import useDashboardStore from '@/store/dashboardStore'

export default function FileList({ filteredFiles }) {
    const t = useTranslations("DashboardPage.Dashboard-FilesPage");
    const isGrid = useDashboardStore((state) => state.isGrid);

    if (!filteredFiles || filteredFiles.length === 0) {
        return (
            <div className="flex justify-center items-center border border-gray-200 rounded-lg h-[400px]">
                <span className="flex items-center justify-center gap-2 font-mono font-bold text-xl"><CircleAlert></CircleAlert>{t("not-found")}</span>
            </div>
        )
    }

    return (
        isGrid ? (
            <div className="grid p-2 justify-items-stretch sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 rounded-sm w-full h-fit overflow-y-auto min-h-0">
                {filteredFiles.map((file, index) => (
                    <FileCard key={index} file={file} />
                ))}
            </div>
        ) : (
            <div className="flex flex-col gap-4 w-full h-full min-h-0">
                <FileTable filteredFiles={filteredFiles} />
            </div>
        )
    )
}