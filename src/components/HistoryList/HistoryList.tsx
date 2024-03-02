import { cache } from "@/cache";
import { Dispatch, Fragment, SetStateAction, useState } from "react";

export const HistoryList = ({
  onChange,
}: {
  onChange: Dispatch<SetStateAction<string>>;
}) => {
  const selectQuery = (key: string) => {
    if (window.innerWidth <= 768) setIsVisible(false);
    onChange(key);
  };
  const [isVisible, setIsVisible] = useState(window.innerWidth > 768);

  return (
    <Fragment>
      <button
        className="fixed left-7 top-8 flex flex-col gap-1 z-30 outline-none md:hidden w-8 h-8 "
        onClick={setIsVisible.bind(null, !isVisible)}
      >
        <span
          className={`bg-stone-700 w-8 h-1 block transition-transform origin-center ${
            isVisible ? "rotate-0" : "rotate-45 translate-y-2 "
          }`}
        ></span>
        <span
          className={`bg-stone-700 w-8 h-1 block transition-transform origin-center ${
            isVisible ? "scale-100" : "scale-0"
          }`}
        ></span>
        <span
          className={`bg-stone-700 w-8 h-1 block transition-transform origin-center ${
            isVisible ? "rotate-0" : "-rotate-45  -translate-y-2"
          }`}
        ></span>
      </button>

      <div
        className={`flex flex-col fixed left-0 top-0 overflow-y-auto h-full md:max-h-full pt-20 pb-5 bg-gray-200 text-stone-800 w-full md:w-auto transition-opacity z-20 ${
          !isVisible && "!-z-10"
        }`}
        style={{ opacity: isVisible ? "1" : "0" }}
      >
        <h1 className="text-2xl text-center font-bold pb-4 px-24 sm:px-40">
          History:
        </h1>
        {Object.keys(cache).map(
          (key) =>
            key && (
              <div
                key={key}
                onClick={selectQuery.bind(null, key)}
                className="cursor-pointer hover:bg-gray-100 p-4 border-t border-gray-100  text-xl font-semibold capitalize w-full px-20 text-center"
              >
                {key}
              </div>
            )
        )}
      </div>
    </Fragment>
  );
};
