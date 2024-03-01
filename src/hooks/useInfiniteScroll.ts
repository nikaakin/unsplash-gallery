import { useEffect, useRef, useState } from "react";

export const useInfiteScroll = <T, K extends Element>(
  service: (page: number) => Promise<T[]>,
  initialData: T[] = []
) => {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const ref = useRef<K | null>(null);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const res = await service(page);
      setData((prev) => [...prev, ...res]);
      setIsLoading(false);
    })();
  }, [page, service]);

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
