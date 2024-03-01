/* eslint-disable react-hooks/exhaustive-deps */
import { getCache, updateCache } from "@/cache";
import { FetchedImagesType } from "@/types";
import { useEffect, useRef, useState } from "react";

export const useInfiteScroll = (
  service: (page: number, query: string) => Promise<FetchedImagesType>,
  query: string | null = null
) => {
  const [data, setData] = useState(getCache(query));
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(getCache(query)?.page | 1);
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (
      data?.total_pages < page ||
      query === "" ||
      (page === data.page && data.results.length > 0)
    )
      return;

    setIsLoading(true);
    (async () => {
      const res = await service(page, query || "");

      res &&
        setData((prev) => ({
          results: [...prev.results, ...res.results],
          total_pages: res.total_pages,
          page: page,
        }));

      updateCache(query || "", res.results, page, res.total_pages);

      setIsLoading(false);
    })();
  }, [page, query]);

  useEffect(() => {
    if (!query) return;
    setData(getCache(query));
    setPage(getCache(query)?.page | 1);
  }, [query]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0 }
    );
    ref.current && observer.observe(ref.current!);

    return () => {
      observer.disconnect();
    };
  }, [ref, data]);

  return { ref, data, isLoading };
};
