import { useInfiteScroll } from "@/hooks";
import { getPopular, searchPhotos } from "@/services";
import { useEffect, useState } from "react";

export const useHome = () => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  const {
    data: searchImages,
    isLoading: isSearchImagesLoading,
    ref: searchRef,
  } = useInfiteScroll(searchPhotos, debouncedQuery);

  const {
    ref: popularRef,
    data: popularImages,
    isLoading: popularIsLoading,
  } = useInfiteScroll(getPopular);

  const onQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const debounceTimeOut = setTimeout(async () => {
      setDebouncedQuery(query);
    }, 1000);
    return () => {
      clearTimeout(debounceTimeOut);
    };
  }, [query]);

  return {
    query,
    onQueryChange,
    isSearchImagesLoading,
    searchRef,
    popularIsLoading,
    popularRef,
    popularImages: popularImages.results,
    searchImages: searchImages.results,
  };
};
