"use client";

import React, {useState, useEffect } from "react";
import { Popular } from "../home/features/Popular";
import { Previous } from "../icons/Previous";
import { Next } from "../icons/Next";
import { Dots } from "../icons/Dots";
// import { useEffect } from "react";

const api_token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYjE0NDJiOGUwMTcxN2VlNDliZTU0Njc1ZDIwMmExMiIsIm5iZiI6MTc4NjU4NTA3NS45NDIwMDAyLCJzdWIiOiI2YTdkMWZmMzg4ZjQ0ZGJjMzI0NDU5ODgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FngqDaJnZYi7hYgRF6MBlM_mBw52dkzc72A78xQPoYI";

export default function PopularPage() {
    const [selectedPage, setSelectedPage] = useState(1);
  const getData = async () => {
    const response = await fetch(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=${selectedPage}',
      { headers: { Authorization: `Bearer ${api_token}` } },
    );
    const jsonData = await response.json();
    return jsonData.results;
  };

  useEffect(() => {
    getData()
      .then((data) => setData(data))
      .catch(() => SetErrorMessage("Movie api error"))
      .finally(() => {
        setLoading(false);
      });
  }, []);

    const handlePreviousButton = () => {
        const page = selectedPage === 1 ? 1 : selectedPage - 1;
        setSelectedPage(page);
    };
    const handleNextButton = () => {
        setSelectedPage(selectedPage + 1);
    };
    const handleSecondButton = (page) => {
        setSelectedPage(page);
    };
  return (
    <div className="w-full min-h-screen flex flex-col items-center overflow-x-hidden">
      <Popular selectedPage={selectedPage}/>

              {/* Pagination Хэсэг */}
              <div className="max-w-7xl h-10 flex justify-end">
                <div className="h-10 flex gap-2">
                  <button 
                  onClick={handlePreviousButton} 
                  className="h-10 flex items-center justify-center border border-[#E4E4E7] border-solid rounded-md py-1 px-2 cursor-pointer">
                    <Previous />
                    <p className="font-inter font-medium text-[14px] text-[#09090B] leading-5 ml-1">
                      Previous
                    </p>
                  </button>
                  <div className="h-10 flex">
                    <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-zinc-100">
                      {selectedPage}
                    </button>
                    <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-zinc-100"
                     onClick={() => handleSecondButton(selectedPage + 1)}
                     >
                      {selectedPage +1}
                    </button>
                    <button className="w-10 h-10 rounded-md flex justify-center items-center">
                      <Dots />
                    </button>
                    <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-zinc-100"
                       onClick={() => handleSecondButton(selectedPage + 4)}>
                      {selectedPage +4}
                    </button>
                  </div>
                  <button 
                  onClick={handleNextButton}
                  className="h-10 flex items-center justify-center border-[#E4E4E7] border-solid border rounded-md py-1 px-2 cursor-pointer">
                    <p className="font-inter font-medium text-[14px] text-[#09090B] leading-5 mr-1">
                      Next
                    </p>
                    <Next />
                  </button>
                </div>
              </div>
    </div>
  );
}
