import { MagnifierIcon } from "@/Icons";
import { Gallery, Header } from "@/components";
import { useHome } from "./useHome";

export const Home = () => {
  const {
    onQueryChange,
    query,
    isSearchImagesLoading,
    searchImages,
    searchRef,
    popularImages,
    popularIsLoading,
    popularRef,
  } = useHome();

  return (
    <div className="bg-slate-50 min-h-screen">
      <Header text="History" to="/history" />
      <div className="px-6 mb-20">
        <div className="relative">
          <div className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2">
            <MagnifierIcon />
          </div>
          <input
            type="text"
            value={query}
            onChange={onQueryChange}
            placeholder="Search for images..."
            className="w-full md:text-xl text-sm md:py-4 pr-8 py-2 pl-10 md:pl-16 bg-gray-100 border-2 border-gray-200 hover:bg-white focus-visible:bg-white transition-colors text-gray-600 rounded-xl outline-none placeholder:text-grey-500"
          />
        </div>
        <div className="mt-10">
          {query ? (
            searchImages.length > 0 ? (
              <Gallery
                images={searchImages}
                isLoading={isSearchImagesLoading}
                ref={searchRef}
              />
            ) : (
              !isSearchImagesLoading &&
              searchImages.length === 0 && (
                <div className="text-center text-2xl text-gray-700">
                  No images found
                </div>
              )
            )
          ) : (
            <Gallery
              images={popularImages}
              isLoading={popularIsLoading}
              ref={popularRef}
            />
          )}
        </div>
      </div>
    </div>
  );
};
