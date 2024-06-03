import HeroCarousel from "@/Components/HeroCarousel";
import ProductCard from "@/Components/ProductCard";
import Searchbar from "@/Components/Searchbar";
import { getAllProducts } from "@/lib/actions";
import React from "react";

const Home = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="head-text">
              Maximize Your Savings with
              <span className="text-pink"> PricePulse</span> !
            </h1>
            <p className="mt-6">
              Comprehensive, user-friendly analytics solutions designed to boost
              conversion rates and enhance user engagement.
            </p>
            <Searchbar />
          </div>
          <HeroCarousel />
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text">Your Browsing History</h2>

        <div className="flex flex-wrap justify-center gap-x-2 gap-y-8">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
