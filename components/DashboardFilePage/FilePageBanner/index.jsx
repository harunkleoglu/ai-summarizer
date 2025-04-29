import SearchBox from "./SearchBox";
import UploadFileButton from "./UploadFileButton";

export default function FilePageBanner({ onSearch }) {
    return (
        <div className='flex justify-between w-full mb-10 p-5 border border-gray-200 shadow-xs rounded-lg'>
            <SearchBox onSearch={onSearch}></SearchBox>
            <UploadFileButton />
        </div>
    );
}