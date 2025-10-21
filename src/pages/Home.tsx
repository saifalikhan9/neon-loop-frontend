import { CTA } from "@/components/CTA";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <FeaturedProducts />
        <Features />
        <Testimonials />
        <CTA />
      </main>
    </>
  );
}
