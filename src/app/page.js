"use client";
import { useEffect, useState } from "react";
import { Footer } from "./features/Footer";
import { Header } from "./features/Header";
import { HeroSection } from "./features/HeroSection";
import { Popular } from "./features/Popular";
import { TopRated } from "./features/TopRated";
import { Upcoming } from "./features/Upcoming";
const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjE0NDJiOGUwMTcxN2VlNDliZTU0Njc1ZDIwMmExMiIsIm5iZiI6MTc4NjU4NTA3NS45NDIwMDAyLCJzdWIiOiI2YTdkMWZmMzg4ZjQ0ZGJjMzI0NDU5ODgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FngqDaJnZYi7hYgRF6MBlM_mBw52dkzc72A78xQPoYI";
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
