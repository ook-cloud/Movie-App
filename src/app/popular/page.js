"use client";

import React from "react";
import { Popular } from "../features/Popular";
import { Previous } from "../Icons/Previous";
import { Next } from "../Icons/Next";
import { Dots } from "../Icons/Dots";


export default function PopularPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center overflow-x-hidden">
      <Popular />

              {/* Pagination Хэсэг */}
              <div className="max-w-7xl h-10 flex justify-end">
                <div className="h-10 flex gap-2">
                  <button className="h-10 flex items-center justify-center border border-[#E4E4E7] border-solid rounded-md py-1 px-2 cursor-pointer">
                    <Previous />
                    <p className="font-inter font-medium text-[14px] text-[#09090B] leading-5 ml-1">
                      Previous
                    </p>
                  </button>
                  <div className="h-10 flex">
                    <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-zinc-100">
                      1
                    </button>
                    <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-zinc-100">
                      2
                    </button>
                    <button className="w-10 h-10 rounded-md flex justify-center items-center">
                      <Dots />
                    </button>
                    <button className="w-10 h-10 rounded-md flex items-center justify-center hover:bg-zinc-100">
                      5
                    </button>
                  </div>
                  <button className="h-10 flex items-center justify-center border-[#E4E4E7] border-solid border rounded-md py-1 px-2 cursor-pointer">
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
