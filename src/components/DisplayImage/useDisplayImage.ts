import { getPhoto } from "@/services";
import { getPhotoType } from "@/types";
import { useEffect, useState } from "react";

export const useDisplayImage = (id: string) => {
  const [data, setData] = useState<getPhotoType | null>(null);

  const description =
    data?.description?.length || 0 > 120
      ? data?.description.slice(0, 120).concat("...")
      : data?.description || "No description available";

  useEffect(() => {
    if (!id) return;
    setData(null);
    (async () => {
      const res = await getPhoto(id);
      setData(res);
    })();
  }, [id]);

  return { data, description };
};
