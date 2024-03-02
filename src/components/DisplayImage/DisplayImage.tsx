import { DownloadIcon, LikeIcon, ViewIcon } from "@/Icons";
import { useDisplayImage } from "./useDisplayImage";

export const DisplayImage = ({ id }: { id: string }) => {
  const { data, description } = useDisplayImage(id);
  return (
    <div className="w-full h-full">
      <div className="w-full h-3/4 py-4 ">
        <img
          src={data?.urls?.raw}
          alt={description}
          className="w-full h-full object-center object-cover rounded-md"
        />
      </div>
      <div className="text-sm">{description}</div>
      <div className="flex justify-end items-center gap-10">
        <div className="flex flex-col items-center text-gray-600">
          <LikeIcon /> {data?.likes}
        </div>
        <div className="flex flex-col items-center text-gray-600">
          <ViewIcon /> {data?.views}
        </div>
        <div className="flex flex-col items-center text-gray-600">
          <DownloadIcon /> {data?.downloads}{" "}
        </div>
      </div>
    </div>
  );
};
