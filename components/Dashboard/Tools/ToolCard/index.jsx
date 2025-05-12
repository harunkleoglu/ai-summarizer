import { Brain, ArrowUpRight } from "lucide-react"
export default function ToolCard() {
    return (
        <div className="border border-gray-200 rounded-lg shadow-sm p-5 w-full">
            <div className="flex flex-col gap-3 justify-start">
                <div className="flex text-green-500 gap-3 items-center">
                    <Brain size={32} />
                    <h2 className="font-semibold text-lg">AI PDF Summarizer</h2>
                </div>
                <span className="w-full h-[2px] bg-gray-200"></span>
                <div className="flex flex-col gap-3 justify-start">
                    <p className="text-gray-500 text-sm">Summarize your PDF documents with QuickScribe advanced AI tool</p>
                    <button className="flex items-center justify-center border-2 border-green-500 hover:bg-green-500 cursor-pointer shadow-md transition-all font-bold text-green-500 hover:text-white py-2 rounded-lg font-mono">Try It <ArrowUpRight></ArrowUpRight></button>
                </div>
            </div>
        </div>
    )
}
