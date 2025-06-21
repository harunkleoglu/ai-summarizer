"use client"
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import FileList from "@/components/FilePage/FileList";
import FilePageBanner from "@/components/FilePage/FilePageBanner";
import useDashboardStore from "@/store/dashboardStore";

export default function FilesPageContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState([]);
  const [debouncedQuery] = useDebounce(searchQuery, 300);

  const files = useDashboardStore((state) => state.files);
  const setFiles = useDashboardStore((state) => state.setFiles);

  useEffect(() => {
    async function fetchFiles() {
      const res = await fetch("/api/file");
      const data = await res.json();
      if (res.ok && data.status === "success") {
        setFiles(data.files);
      }
    }
    fetchFiles();

    // Dosya yüklendikten sonra event dinle
    const onFileUploaded = () => fetchFiles();
    window.addEventListener('file-uploaded', onFileUploaded);
    return () => window.removeEventListener('file-uploaded', onFileUploaded);
  }, [setFiles]);

  const filteredFiles = filterQuery.length
    ? files.filter((file) =>
        file.contentType && filterQuery.some((filter) => filter.toLowerCase() === file.contentType)
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