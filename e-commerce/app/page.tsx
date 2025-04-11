import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";
import { Carousel } from "@/components/carousel";
import { ProductList } from "@/components/product-list";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  console.log(products);
  return (
    <div>
      <section className="rounded-2xl bg-neutral-200 py-8 sm:py-12">
        <div className="mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              <span className="text-black">Welcome to</span>{" "}
              <span className="text-indigo-400">Aman Store</span>
            </h2>
            <p className="text-neutral-600">
              Discover the latest products at the best prices.
            </p>
            <p className="text-neutral-600">
            The best way to buy the products you love.
            </p>
            <p className="text-neutral-600">
            Take a look at what’s new, right now.
            </p>
            {/* importing Button to use shadcn library and inside it instead of onClick we use link to maintain the server side rendering as onClick requires state_var hooks and renders on client side component */}
            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center  text-white bg-neutral-600 
             focus:ring-4 focus:ring-gray-300 
             font-medium rounded-full text-sm px-5 py-2.5 
             me-2 mb-2 "
              >
                Browse All Products ➚
              </Link>
            </Button>
          </div>

          {/* fetching image from our stripe api where we add the product image for banner*/}
          <Image
            alt="Banner Image"
            width={450}
            height={450}
            src={products.data[0].images[0]}
          />
        </div>
      </section>
      <section className="py-8">
        <Carousel products={products.data} />
      </section>
       <div className="pb-8">
            <h1 className="text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8">
                All Products
              </h1>
              <ProductList products={products.data} />
            </div>
    </div>
  );
}
