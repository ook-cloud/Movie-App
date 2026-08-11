import { Header } from "./features/Header";
import { Footer } from "./features/Footer";
import { HeroSection } from "./features/HeroSection";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      Popular
      <div>Popular</div>
      <Footer />
    </div>
  );
}
