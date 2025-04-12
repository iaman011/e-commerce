//  Carousel:
// A carousel is a UI component that allows users to cycle through a series of content items, typically images, cards, or text, in a sliding or rotating manner. It’s often used to display:
"use client";
import Stripe from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0); //0 determines the first product

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length); //as of now our product.length is 5 in app/page.tsx
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current]; //currentProduct stores the currentProduct via accessing it from products[current]
  const price = currentProduct.default_price as Stripe.Price;

  return (
    <div>
      
      <Card className="relative overflow-hidden rounded-lg shadow-md border-gray-300 bg-neutral-100">
      <div className="pb-8">
            <h1 className="text-3xl font-bold leading-none tracking-tight text-center text-indigo-300 ">
            Recommended Products
              </h1>
              </div>
        {currentProduct.images && currentProduct.images[0] && (
          <div className="relative flex items-center justify-center h-[180px] w-[150px]">
            <Image
              alt={currentProduct.name}
              src={currentProduct.images[0]}
              fill
              // priority
              className="object-cover transition-opacity duration-500 ease-in-out m-5"
            />
          </div>
        )}
        {/* cardcontent which will link to the title of the card and the price of it */}
        <CardContent className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <CardTitle className="text-3xl font-bold text-black mb-2 text-balance text-center">
            {currentProduct.name}
          </CardTitle>
          {price && price.unit_amount && (
            <p className="text-xl text-black">
              ₹{(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
