import { Brain, ArrowUpRight } from "lucide-react"

export default function ToolCard({ label, description, color = "green" }) {
    // Dynamic color classes
    const borderColor = `border-${color}-400`;
    const textColor = `text-${color}-500`;
    const borderBtnColor = `border-${color}-500`;
    const bgBtnHover = `hover:bg-${color}-500`;
    const textBtnHover = `hover:text-white`;
    const textBtn = `text-${color}-500`;

    return (
        <div className={`border-2 ${borderColor} hover:scale-102 transition-all rounded-lg shadow-sm p-5 w-full`}>
            <div className="flex flex-col gap-3 justify-start">
                <div className={`flex ${textColor} gap-3 items-center`}>
                    <Brain size={32} />
                    <h2 className="font-semibold text-lg">{label}</h2>
                </div>
                <span className="w-full h-[2px] bg-gray-200"></span>
                <div className="flex flex-col gap-3 justify-start">
                    <p className="text-gray-500 text-sm">{description}</p>
                    <button className={`flex items-center justify-center border-2 ${borderBtnColor} ${bgBtnHover} cursor-pointer shadow-md transition-all font-bold ${textBtn} ${textBtnHover} py-2 rounded-lg font-mono`}>
                        Try It <ArrowUpRight />
                    </button>
                </div>
            </div>
        </div>
    )
}
