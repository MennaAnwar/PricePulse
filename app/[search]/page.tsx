"use client";

import Searchbar from "@/Components/Searchbar";
import { scrapeAndStoreProducts } from "@/lib/actions";
import React, { useEffect, useState } from "react";
import Products from "@/Components/Products";

type Props = {
  params: { search: string };
};

type Products = {
  url: string;
  currency: any;
  image: string | undefined;
  title: string;
  currentPrice: number;
  stars: number;
};

const Search = ({ params: { search } }: Props) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await scrapeAndStoreProducts(
          `https://www.amazon.com/s?k=${search}`
        );
        setProducts(products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search]);

  return (
    <div className="px-10">
      <section>
        <Searchbar />
      </section>
      <section>
        <h2 className="section-text py-10">Results for: "{search}"</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {products?.map((product: any) => (
            <Products key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Search;
