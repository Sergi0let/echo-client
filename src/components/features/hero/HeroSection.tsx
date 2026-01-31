import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="container-main mt-16">
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <Image src="/featured.webp" fill alt="featured"></Image>
      </div>
    </div>
  );
};

export default HeroSection;
