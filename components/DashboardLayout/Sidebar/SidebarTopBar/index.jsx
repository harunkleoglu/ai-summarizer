import useStore from "@/store/sidebarStore"
import { ArrowLeftToLine } from "lucide-react"

export default function SidebarTopBar() {
  const closeSidebar = useStore((state) => state.closeSidebar)
  return (
    <div className="relative flex flex-col items-center justify-center h-fit w-full">
      <button onClick={closeSidebar} className="lg:hidden absolute hover:bg-gray-400 hover:text-white hover:scale-110 p-1 rounded-lg right-25 top-7 hover:shadow-xs transition-all ">
        <ArrowLeftToLine></ArrowLeftToLine>
      </button>
      <h2 className="text-3xl not-lg:mb-10 not-lg:mt-20 lg:my-10 font-mono font-bold text-green-500 antialiased">QuickScribe</h2>
    </div>
  )
}
