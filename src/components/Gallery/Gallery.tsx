import { forwardRef, useState } from "react";
import { GalleryProps } from "./type";
import { DisplayImage, Modal } from "@/components";

export const Gallery = forwardRef<HTMLImageElement, GalleryProps>(
  ({ images, isLoading }, ref) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onImageClick = (id: string) => {
      setSelectedId(id);
      setIsModalOpen(true);
    };

    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-center">
        <Modal
          onClose={setIsModalOpen.bind(null, false)}
          isOpen={isModalOpen}
          children={<DisplayImage id={selectedId || ""} />}
        />
        {images?.map((item, i) => (
          <button
            className={`w-full h-full align-middle min-h-48 outline-none ${
              item.width < item.height ? "row-span-2" : "row-span-auto"
            }`}
            key={item.id}
            onClick={onImageClick.bind(null, item.id)}
          >
            <img
              ref={i === images.length - 1 ? ref : null}
              src={item.urls.regular}
              alt={item.alt_description}
              className="object-cover w-full h-full "
            />
          </button>
        ))}
        {isLoading && <div>Loading...</div>}
      </div>
    );
  }
);
