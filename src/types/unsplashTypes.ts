export type UnsplashImageTypes = {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
  description: string;
  width: number;
  height: number;
};

export type FetchedImagesType = {
  results: UnsplashImageTypes[];
  total_pages: number;
};
