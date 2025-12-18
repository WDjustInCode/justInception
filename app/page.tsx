import Hero from "@/components/site/hero";
import About from "@/components/site/about";
import ServicesPreview from "@/components/site/servicespreview";
import Gallery from "@/components/site/gallery";
import Contact from "@/components/site/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ServicesPreview />
      <Gallery />
      <Contact />
    </>
  );
}
