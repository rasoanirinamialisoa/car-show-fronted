"use client";

import { useRouter } from "next/navigation";

import { updateSearchParams } from "@/app/utils";
import { CustomButton } from "..";
import { ShowMoreProps } from "@/app/types";

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;

    const newPathname = updateSearchParams("limit", `${newLimit}`);

    router.push(newPathname);
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!isNext && (
        <CustomButton
          btnType="button"
          title="Show More"
          containerStyles="bg-purple-500 rounded-full text-white"
          handleClick={handleNavigation}
          rightIcon={""}
        />
      )}
    </div>
  );
};

export default ShowMore;
