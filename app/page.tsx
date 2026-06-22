import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Expertise from "@/components/Expertise";
import AllWork from "@/components/AllWork";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Expertise />
      <AllWork />
      <Footer />
    </main>
  );
}
