import { Gallery, Header, HistoryList } from "@/components";
import { useInfiteScroll } from "@/hooks";
import { searchPhotos } from "@/services";
import { useState } from "react";

export const History = () => {
  const [selectedQuery, setSelectedQuery] = useState<string>("");
  const { data, isLoading, ref } = useInfiteScroll(searchPhotos, selectedQuery);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header text="Home" to="/" />
      <main className="flex gap-6">
        <div className="basis-0 md:basis-162">
          <HistoryList onChange={setSelectedQuery} />
        </div>
        <div className="z-10 w-full">
          {selectedQuery ? (
            <Gallery
              images={data?.results || []}
              isLoading={isLoading}
              ref={ref}
            />
          ) : (
            <div className="text-center text-2xl text-gray-700">
              Select the query to see the images
            </div>
          )}
          {data.results?.length === 0 && !isLoading && selectedQuery && (
            <div className="text-center text-2xl text-gray-700">
              No images found
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
