import { useInfiteScroll } from "@/hooks";
import { getPopular } from "@/services";
import { imageTypes } from "@/types";

export const Home = () => {
  const { ref, data, isLoading } = useInfiteScroll<
    imageTypes,
    HTMLImageElement
  >(getPopular);

  return (
    <div>
      <h1>Home</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-center">
        {data.map((item, i) => (
          <img
            ref={i === data.length - 1 ? ref : null}
            key={item.id}
            src={item.urls.regular}
            alt={item.alt_description}
            className={`w-full h-full align-middle object-cover min-h-48 ${
              item.width < item.height ? "row-span-2" : "row-span-auto"
            }`}
          />
        ))}
        {isLoading && <div>Loading...</div>}
      </div>
    </div>
  );
};
