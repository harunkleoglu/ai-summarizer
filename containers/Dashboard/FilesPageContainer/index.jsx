"use client"
import { useState } from "react";
import { useDebounce } from "use-debounce";
import FileList from "@/components/FilePage/FileList";
import FilePageBanner from "@/components/FilePage/FilePageBanner";

export default function FilesPageContainer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState([]);

  const [debouncedQuery] = useDebounce(searchQuery, 300);

  const files = [
    { name: "caliskan-ari.pdf", type: "pdf", size: 1.2 },
    { name: "bilfen-gelistirme-notlari.mp4", type: "video", size: 15.4 },
    { name: "AMIN-soundfx.wav", type: "audio", size: 3.1 },
    { name: "Document 2", size: 2.5 },
    { name: "Video 2", type: "video", size: 20.7 },
    { name: "Audio 2", type: "audio", size: 4.8 },
    { name: "Document 3", type: "pdf", size: 1.8 },
    { name: "Document 1", type: "pdf", size: 1.2 },
    { name: "Video 1", type: "video", size: 15.4 },
    { name: "Audio 1", type: "audio", size: 3.1 },
  ];

  const filteredFiles = filterQuery.length
    ? files.filter((file) =>
        file.type && filterQuery.some((filter) => filter.toLowerCase() === file.type)
      )
    : files;

  const searchedFiles = filteredFiles.filter((file) =>
    file.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );


  return (
    <>
      <FilePageBanner
        onSearch={setSearchQuery}
        onFilter={setFilterQuery}
      ></FilePageBanner>
      <FileList files={searchedFiles}></FileList>
    </>
  );
}