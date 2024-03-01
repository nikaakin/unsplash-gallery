import { CacheType, UnsplashImageTypes } from "@/types";

export const cache: CacheType = {};

// since I'm not seaching photos on empty query, I'll put popular images there.
export const updateCache = (
  key: string = "",
  data: UnsplashImageTypes[],
  page: number,
  total_pages: number = Infinity
) => {
  cache[key] = {
    results: data,
    page: page,
    total_pages: total_pages,
  };
};

// empty search query is `""` in which case I dont want to return any cache
// `null` is for popular images
export const getCache = (key: string | null) => {
  const defaultCache = { results: [], page: 1, total_pages: Infinity };
  if (key === "") return defaultCache;
  if (key === null) return cache[""] || defaultCache;
  return cache[key] || defaultCache;
};
