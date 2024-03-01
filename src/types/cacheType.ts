import { UnsplashImageTypes } from ".";

export type CacheType = {
  [key: string]: {
    results: UnsplashImageTypes[];
    page: number;
    total_pages: number;
  };
};
