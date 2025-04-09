import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";


export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  })

  console.log(products);
  return (
    <div>
      <section>
        <div>
          <div>
            <h2>Welcome to My Ecommerce</h2>
            <p>Discover the latest products at the best prices.</p>
            {/* importing Button to use shadcn library and inside it instead of onClick we use link to maintain the server side rendering as onClick requires state_var hooks and renders on client side component */}
            <Button asChild variant="default">  
              <Link href="/products">Browse All Products</Link>

            </Button>
          </div>

    {/* fetching image from our stripe api where we add the product image */}
          <Image alt="Banner Image" width={450} height={450} src={products.data[0].images[0]} />

        </div>
      </section>
    </div>
  );
}
