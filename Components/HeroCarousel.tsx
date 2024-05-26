"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImages = [
  { imgUrl: "/assets/images/smartwatch.png", alt: "smartwatch" },
  { imgUrl: "/assets/images/bag.png", alt: "bag" },
  { imgUrl: "/assets/images/dress.png", alt: "dress" },
  { imgUrl: "/assets/images/cup.png", alt: "cup" },
  { imgUrl: "/assets/images/phone.png", alt: "phone" },
];

const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={2000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <Image
            src={image.imgUrl}
            alt={image.alt}
            width={300}
            height={300}
            className="object-contain"
            key={image.alt}
          />
        ))}
      </Carousel>

      <Image
        src="assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={140}
        height={140}
        className="max-xl:hidden absolute -left-[30%] bottom-0 z-0"
      />
    </div>
  );
};

export default HeroCarousel;
