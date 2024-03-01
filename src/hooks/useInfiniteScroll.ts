import { getCache, updateCache } from "@/cache";
import { FetchedImagesType } from "@/types";
import { useEffect, useRef, useState } from "react";

export const useInfiteScroll = (
  service: (page: number, query: string) => Promise<FetchedImagesType>,
  query: string | null = null
) => {
  const [data, setData] = useState(getCache(query));
  console.log(data, "data");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(getCache(query)?.page | 1);
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    console.log(data, "data 1");
    if (data?.total_pages < page || query === "" || page === data.page) return;
    setIsLoading(true);
    (async () => {
      const res = await service(page, query || "");
      console.log("feched");
      res &&
        setData((prev) => ({
          results: [...prev.results, ...res.results],
          total_pages: res.total_pages,
          page: page,
        }));

      updateCache(query || "", data.results, page, data.total_pages);

      setIsLoading(false);
    })();
  }, [page, query]);

  useEffect(() => {
    console.log(data, "data2");
    if (!query) return;
    setData(getCache(query));
    setPage(1);
  }, [query]);

  useEffect(() => {
    console.log(data, "data 3");
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          console.log(
            "intersecting",
            ref,
            ref.current?.getBoundingClientRect(),
            ref.current?.clientHeight
          );
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
