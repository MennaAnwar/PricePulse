"use client";
import { scrapeAndStoreProduct } from "@/lib/actions";
import { Product } from "@/types";
import Image from "next/image";
import React from "react";

interface Props {
  product: Product;
}

const Products = ({ product }: Props) => {
  const handleClick = async (url: any) => {
    console.log(url);
    const product = await scrapeAndStoreProduct(url);
    window.location.href = `/products/${product._id}`;
  };
  return (
    <div
      className="product-card border p-5"
      onClick={() => handleClick(product._id)}
    >
      <div className="product-card_img-container">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="product-card_img"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="product-title">{product.title}</h3>

        <div className="flex justify-between">
          <p className="text-black opacity-50 text-lg capitalize">
            {product.category}
          </p>

          <p className="text-black text-lg font-semibold">
            <span>{product?.currency}</span>
            <span>{product?.currentPrice}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Products;
