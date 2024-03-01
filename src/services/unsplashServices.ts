import { FetchedImagesType } from "@/types";

export const getPopular = (page = 1) =>
  fetch(
    `https://api.unsplash.com/photos/?order_by=popular&per_page=20&client_id=${
      import.meta.env.VITE_UNSPLASH_ACCESS_KEY
    }&page=${page}`
  )
    .then((res) => res.json())
    .then<FetchedImagesType>((res) => ({
      results: res,
      total_pages: Infinity,
    }))
    .catch((error) => {
      throw new Error(error);
    });

export const getPhoto = (id: string) =>
  fetch(
    `https://api.unsplash.com/photos/${id}?client_id=${
      import.meta.env.VITE_UNSPLASH_ACCESS_KEY
    }`
  )
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => {
      throw new Error(error);
    });

export const searchPhotos = (page = 1, query: string) =>
  fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${
      import.meta.env.VITE_UNSPLASH_ACCESS_KEY
    }&per_page=20&page=${page}`
  )
    .then((res) => res.json())
    .then<FetchedImagesType>((res) => res)
    .catch((error) => {
      throw new Error(error);
    });
