import { PriceHistoryItem, Product } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MET: "THRESHOLD_MET",
};

const THRESHOLD_PERCENTAGE = 40;

// Extracts and returns the price from a list of possible elements.
export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, "");

      let firstPrice;

      if (cleanPrice) {
        firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
      }

      return firstPrice || cleanPrice;
    }
  }

  return "";
}

// Extracts and returns the currency symbol from an element.
export function extractCurrency(element: any) {
  const currencyText = element.text().trim().slice(0, 1);
  return currencyText ? currencyText : "";
}

// Extracts element Path from amazon
export function extractPath($: any) {
  const selectors = [
    ".a-unordered-list.a-horizontal.a-size-small .a-list-item",
  ];

  for (const selector of selectors) {
    const elements = $(selector);
    if (elements.length > 0) {
      const textContent = elements
        .map((_: any, element: any) => $(element).text().trim())
        .get()
        .join("\n");
      return textContent;
    }
  }

  // If no matching elements were found, return an empty string
  return "";
}

// Extracts element Category
export function extractCategory(path: string): string {
  // Replace all newline characters and multiple spaces with a single space
  const cleanedPath = path
    .replace(/\s*\n\s*/g, " ") // Replace newlines and surrounding whitespace with a single space
    .replace(/\s*›\s*/g, " > ") // Replace '›' and surrounding whitespace with ' > '
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .trim();

  const parts = cleanedPath.split(">");
  const lastElement = parts[parts.length - 1].trim();

  console.log("Original Path:", path);
  console.log("Cleaned Path:", cleanedPath);
  console.log("Extracted Last Element:", lastElement);

  return lastElement;
}

// Extracts description from two possible elements from amazon
export function extractDescription($: any) {
  // these are possible elements holding description of the product
  const selectors = [
    ".a-expander-content p",
    // Add more selectors here if needed
  ];

  for (const selector of selectors) {
    const elements = $(selector);
    if (elements.length > 0) {
      const textContent = elements
        .map((_: any, element: any) => $(element).text().trim())
        .get()
        .join("\n");
      return textContent;
    }
  }

  // If no matching elements were found, return an empty string
  return "";
}

export function getHighestPrice(priceList: PriceHistoryItem[]) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

export function getLowestPrice(priceList: PriceHistoryItem[]) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
}

export function getAveragePrice(priceList: PriceHistoryItem[]) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;

  return averagePrice;
}

export const getEmailNotifType = (
  scrapedProduct: Product,
  currentProduct: Product
) => {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);

  if (scrapedProduct.currentPrice < lowestPrice) {
    return Notification.LOWEST_PRICE as keyof typeof Notification;
  }
  if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
    return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
  }
  if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
    return Notification.THRESHOLD_MET as keyof typeof Notification;
  }

  return null;
};

export const formatNumber = (num: number = 0) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

// Extracts and returns the number of reviews from an element.
export function extractNumberOfReviews($: any) {
  const reviewText = $("#acrCustomerReviewText").text().trim();
  const match = reviewText.match(/(\d+(,\d+)*).*rating/);

  if (match) {
    return parseInt(match[1].replace(/,/g, ""));
  }

  return 0;
}

// Extracts and returns the star rating from an element.
export function extractStarRating($: any) {
  const starText = $("#acrPopover").attr("title").trim();
  const match = starText.match(/(\d\.\d) out of 5 stars/);

  if (match) {
    return parseFloat(match[1]);
  }

  return 0;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
