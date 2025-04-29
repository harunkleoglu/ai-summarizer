import SearchBox from "./SearchBox";
import Filter from "./Filter";
import UploadFileButton from "./UploadFileButton";
import ShowOptions from "./ShowOptions";

export default function FilePageBanner({ onSearch, onFilter }) {
    return (
        <>
            <div className='flex justify-between w-full mb-3 p-5 border border-gray-200 shadow-xs rounded-lg'>
                <div className="flex gap-2 justify-start">
                    <SearchBox onSearch={onSearch}></SearchBox>
                </div>
                <UploadFileButton />
            </div>
            <div className="flex justify-between mb-3">
                <Filter onFilter={onFilter}></Filter>
                <ShowOptions></ShowOptions>
            </div>
        </>
    );
}