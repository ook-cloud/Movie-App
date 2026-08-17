"use client";
import { NextArrow } from "../Icons/NextArrow";
import { Star } from "../Icons/Star";
import { useState, useEffect } from "react";
import { PopularLoading } from "./PopularLoading";
import { useRouter } from "next/navigation";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjE0NDJiOGUwMTcxN2VlNDliZTU0Njc1ZDIwMmExMiIsIm5iZiI6MTc4NjU4NTA3NS45NDIwMDAyLCJzdWIiOiI2YTdkMWZmMzg4ZjQ0ZGJjMzI0NDU5ODgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FngqDaJnZYi7hYgRF6MBlM_mBw52dkzc72A78xQPoYI";

export const Popular = () => {
  const router =  useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessege, SetErrorMessege] = useState("");

  const getData = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
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
  const navigateToPopularPage = () => {
    router.push("/popular");
  };
  return (
    <div className="w-full flex flex-col px-4 md:px-8 gap-8">
      {loading && (
        <div>
          <PopularLoading />
        </div>
      )}
      {!loading && errorMessege && <div>{errorMessege}</div>}
      {!loading && !errorMessege && (
        <div className="w-full flex flex-col gap-8">
          <div className="w-full h-9 flex justify-between items-center">
            <p className="font-inter font-semibold text-[24px] text-[#09090B] leading-8">
              Popular
            </p>

            <div className="w-40 h-9 rounded-md flex justify-center items-center gap-2 bg-[#FFFFFF]"
                style=({cursor: "pointer"})
                onclick = {navigateToPopularPage}
            >
          
              <p className="font-inter font-medium text-[14px] text-[#09090B] leading-5">
                See more
              </p>
              <NextArrow />
            </div>
          </div>

          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {data.slice(0, 10).map((object) => (
              <div
                key={object.id}
                className="w-full h-110 flex flex-col rounded-lg gap-1 bg-[#F4F4F5] overflow-hidden"
              >
                <div className="relative w-full h-85px">
                  <img
                    alt={object.title || "Movie poster"}
                    src={
                      "https://image.tmdb.org/t/p/original" + object.poster_path
                    }
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="w-full h-23.75 flex flex-col py-2 px-2">
                  <div className="w-full h-5.75 flex gap-1">
                    <Star />
                    <p className="w-full h-5.75 flex font-inter font-medium text-[14px] text-[#09090B] leading-5 items-center">
                      {object.vote_average
                        ? object.vote_average.toFixed(1)
                        : "N/A"}
                      <span className="font-inter font-normal text-[14px] text-[#71717A]">
                        /10
                      </span>
                    </p>
                  </div>
                  <div className="w-full h-14 flex gap-2.5">
                    <p className="font-inter font-normal text-[18px] text-[#09090B] leading-7 line-clamp-2">
                      {object.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
