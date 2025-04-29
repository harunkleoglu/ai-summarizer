import { useTranslations } from "next-intl"
import FileCard from "../FileCard"
import { CircleAlert } from "lucide-react"
export default function FileList({ files }) {
    const t = useTranslations("DashboardPage.Dashboard-FilesPage");

    if(!files || files.length === 0){
        return(
            <>
                <div className="flex justify-center items-center border border-gray-200 rounded-lg h-[50%]">
                    <span className="flex items-center justify-center gap-2 font-mono font-bold text-xl"><CircleAlert></CircleAlert>{t("not-found")}</span>
                </div>
            </>
        )
    }
    
    return (
        <div className="grid justify-items-stretch sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 rounded-sm w-full h-fit">
            {files.map((file, index) => (
                <FileCard key={index} file={file} />
            ))}
        </div>
    )
}