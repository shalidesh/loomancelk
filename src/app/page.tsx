import ScrollyCanvas from "@/components/ScrollyCanvas";
import Collection from "@/components/Collection";
import About from "@/components/About";
import Contact from "@/components/Contact";
import BrandStatement from "@/components/BrandStatement";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0b0b0b] min-h-screen">
      <ScrollyCanvas />
      <Collection />
      <About />
      <Contact />
      <BrandStatement />
      <Footer />
    </main>
  );
}
