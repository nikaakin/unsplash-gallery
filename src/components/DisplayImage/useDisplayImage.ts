import { getPhoto } from "@/services";
import { getPhotoType } from "@/types";
import { useEffect, useState } from "react";

export const useDisplayImage = (id: string) => {
  const [data, setData] = useState<getPhotoType | null>(null);

  useEffect(() => {
    setData(null);
    (async () => {
      const res = await getPhoto(id);
      setData(res);
    })();
  }, [id]);

  return { data };
};
