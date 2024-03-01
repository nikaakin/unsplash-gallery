import { forwardRef } from "react";
import { GalleryProps } from "./type";

export const Gallery = forwardRef<HTMLImageElement, GalleryProps>(
  ({ images, isLoading }, ref) => (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
      {images?.map((item, i) => (
        <img
          ref={i === images.length - 1 ? ref : null}
          key={item.id}
          // src={item.urls.regular}
          src={"public/vite.svg"}
          alt={item.alt_description}
          className={`w-full h-full align-middle object-cover min-h-48 ${
            item.width < item.height ? "row-span-2" : "row-span-auto"
          }`}
        />
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  )
);
