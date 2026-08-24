"use client";
import { Footer } from "./features/Footer";
import { Header } from "./features/Header";
import { HeroSection } from "./home/features/HeroSection";
import { Popular } from "./home/features/Popular";
import { TopRated } from "./home/features/TopRated";
import { Upcoming } from "./home/features/Upcoming";

  export default function Main() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center overflow-x-hidden">
      <div className="w-full min-h-screen flex flex-col items-center overflow-x-hidden">
        <Header />
        <HeroSection />
        <div className="w-full max-w-7xl flex flex-col gap-13 mt-13 shrink-0">
          <Upcoming />
          <Popular />
          <TopRated />
        </div>
        <Footer />
      </div>
    </div>
  );
}
