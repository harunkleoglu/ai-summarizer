"use client"
import { useState } from "react";
import { useDebounce } from "use-debounce";
import FileList from "@/components/FilePage/FileList";
import FilePageBanner from "@/components/FilePage/FilePageBanner";
import useDashboardStore from "@/store/dashboardStore";

export default function FilesPageContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState([]);

  const [debouncedQuery] = useDebounce(searchQuery, 300);

  const files = useDashboardStore((state) => state.files);

  const filteredFiles = filterQuery.length
    ? files.filter((file) =>
        file.type && filterQuery.some((filter) => filter.toLowerCase() === file.type)
      )
    : files;

  const searchedFiles = filteredFiles.filter((file) =>
    file.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );


  return (
    <div className="h-[calc(100vh-64px)] flex flex-col max-h-screen">
      <FilePageBanner
        onSearch={setSearchQuery}
        onFilter={setFilterQuery}
      />
      <div className="flex-1 min-h-0 flex flex-col">
        <FileList filteredFiles={searchedFiles} />
      </div>
    </div>
  );
}