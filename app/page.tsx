import HeroCarousel from "@/Components/HeroCarousel";
import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text text-pink">
              Enjoy Smart Shopping:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              Maximize Your Savings with
              <span className="text-pink"> PricePulse</span> !
            </h1>
            <p className="mt-6">
              Comprehensive, user-friendly analytics solutions designed to boost
              conversion rates and enhance user engagement.
            </p>
          </div>
          <HeroCarousel />
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text">Trending Products</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16"></div>
      </section>
    </>
  );
};

export default Home;
