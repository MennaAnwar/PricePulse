"use server";

import axios from "axios";
import * as cheerio from "cheerio";
import {
  extractCategory,
  extractCurrency,
  extractDescription,
  extractPath,
  extractPrice,
} from "../utils";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  // BrightData proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    // Fetch the product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    // Extract the product title
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $(".a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base"),
      $(".a-price span.a-price-whole")
    );

    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";

    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    const imageUrls = Object.keys(JSON.parse(images));

    const currency = extractCurrency($(".a-price-symbol"));
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");

    const path = extractPath($);
    const category = extractCategory(path);
    const description = extractDescription($);

    // Construct data object with scraped information
    const data = {
      url,
      currency: currency || "$",
      image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category,
      reviewsCount: 100,
      stars: 4.5,
      isOutOfStock: outOfStock,
      path,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };

    console.log(data);

    return data;
  } catch (error: any) {
    console.log(error);
  }
}

export async function scrapeAmazonProducts(url: string) {
  if (!url) return [];

  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    // Fetch the search results page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    // Array to store product data
    const productsData: {
      url: string;
      currency: any;
      image: string | undefined;
      title: string;
      currentPrice: number;
      stars: number;
      _id: string | undefined;
    }[] = [];

    // Iterate over each product on the page
    $("div[data-component-type='s-search-result']").each((index, element) => {
      const title = $(element).find("h2 span.a-text-normal").text().trim();
      const currentPrice = extractPrice(
        $(element).find(".a-price-whole"),
        $(element).find(".a-price .a-price-whole")
      );
      const images = $(element).find("img.s-image").attr("src");
      const currency = extractCurrency($(element).find(".a-price-symbol"));
      const _id = `https://amazon.com${$(element)
        .find("h2 a.a-link-normal")
        .attr("href")}`;

      // Construct data object with scraped information
      const data = {
        url,
        currency: currency || "$",
        image: images,
        title,
        currentPrice: Number(currentPrice),
        stars:
          parseFloat($(element).find(".a-icon-alt").text().split(" ")[0]) || 0,
        _id,
      };

      // Add product data to the array
      productsData.push(data);
    });

    console.log(productsData);

    return productsData;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to scrape products: ${error.message}`);
  }
}
