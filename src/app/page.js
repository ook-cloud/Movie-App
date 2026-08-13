"use client";
import { useEffect, useState } from "react";
import { Footer } from "../app/features/Footer";
import { Header } from "../app/features/Header";
import { HeroSection } from "../app/features/HeroSection";
import { Popular } from "./features/Popular";
import { TopRated } from "./features/TopRated";
import { Upcoming } from "./features/Upcoming";
const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2RlYjljY2JlMzU2YjJjOTMxZjRjZWI1OTA4YmQ4NSIsIm5iZiI6MTc4NjU4NTAxNC41MDcsInN1YiI6IjZhN2QxZmI2OGFhNWQzN2ZiNTQ0NTkzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wd9oLUNGObBB7hSw6-cdoMQ2J35kHO-koQ8BCdqOOwQ";
export default function Main() {
  const [dark, setDark] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessege, SetErrorMessege] = useState("");
  const getData = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    const jsonData = await response.json();
    return jsonData.results;
  };
  useEffect(() => {
    getData()
      .then((data) => setData(data))
      .catch(() => SetErrorMessege("Movie api error"))
      .finally(() => {
        setLoading(false);
      });
  }, []);
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