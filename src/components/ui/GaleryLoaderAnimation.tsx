"use client";

import Lottie from "lottie-react";
import animationData from "@/animations/loading.json";

export const GaleryLoaderAnimation = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <Lottie
        animationData={animationData}
        loop
        className="w-40 h-40"
      />
    </div>
  );
};