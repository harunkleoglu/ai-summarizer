import SearchBox from "./SearchBox";
import Filter from "./Filter";
import UploadFileButton from "./UploadFileButton";
import GridOptions from "./GridOptions";
import useStore from "@/store/sidebarStore";
import { Menu } from "lucide-react";

export default function FilePageBanner({ onSearch, onFilter }) {
    const openSidebar = useStore((state) => state.openSidebar)
    return (
        <>
            <div className='flex justify-between w-full mb-3 p-5 border border-gray-200 shadow-xs rounded-lg'>
                <div className="flex gap-3">
                    <button
                        className="lg:hidden p-2 bg-green-500 text-white hover:scale-110 transition-all duration-300 rounded-md shadow-md"
                        onClick={openSidebar}
                    >
                        <Menu />
                    </button>
                    <div className="flex gap-2 justify-start">
                        <SearchBox onSearch={onSearch}></SearchBox>
                    </div>
                </div>
                <UploadFileButton />
            </div>
            <div className="flex justify-between mb-3">
                <Filter onFilter={onFilter}></Filter>
                <GridOptions></GridOptions>
            </div>
        </>
    );
}