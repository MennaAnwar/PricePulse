"use server";

import { scrapeAmazonProduct, scrapeAmazonProducts } from "../scraper";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrapedProduct) return;

    let product = scrapedProduct;
    console.log(product);
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}

export async function scrapeAndStoreProducts(Url: string) {
  if (!Url) return;

  try {
    console.log(Url);
    const scrapedProducts = await scrapeAmazonProducts(Url);

    if (!scrapedProducts) return;

    let products = scrapedProducts;
    console.log(products);
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}
