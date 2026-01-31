import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="container-main mt-16">
      <div className="relative aspect-[1536/868] overflow-hidden rounded-xl lg:rounded-2xl xl:rounded-4xl">
        <Image src="/featured.jpg" fill alt="featured"></Image>
      </div>
    </div>
  );
};

export default HeroSection;
