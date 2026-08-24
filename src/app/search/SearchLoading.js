export const SearchDetailsSkeleton = () => {
  return (
    <div className="w-full max-w-7xl flex flex-col px-4 sm:px-6 lg:px-8 gap-6 sm:gap-8 mt-6 sm:mt-10 mb-16 animate-pulse">
      <div className="w-full flex">
        <div className="h-8 sm:h-9 w-40 sm:w-48 bg-zinc-200 rounded-md" />
      </div>

      <div className="w-full flex flex-col gap-6 sm:gap-8">
        <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          <div className="flex-1 w-full flex flex-col gap-6 sm:gap-8 order-2 md:order-1">
            <div className="h-6 sm:h-7 w-48 sm:w-64 bg-zinc-200 rounded-md" />

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-full flex flex-col rounded-lg bg-[#F4F4F5] overflow-hidden"
                >
                  <div className="w-full aspect-2/3 bg-zinc-200" />
                  <div className="w-full p-2.5 sm:p-3 flex flex-col gap-2 justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-zinc-300" />
                      <div className="h-3.5 w-10 sm:w-12 bg-zinc-300 rounded" />
                    </div>
                    <div className="flex flex-col gap-1.5 pb-1">
                      <div className="h-3.5 sm:h-4 w-full bg-zinc-300 rounded" />
                      <div className="h-3.5 sm:h-4 w-3/4 bg-zinc-300 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full flex justify-end mt-4">
              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                <div className="h-9 sm:h-10 w-20 sm:w-24 bg-zinc-200 rounded-md border border-[#E4E4E7]" />
                <div className="flex items-center gap-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-zinc-300" />
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-zinc-200" />
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-zinc-200" />
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-zinc-200" />
                </div>
                <div className="h-9 sm:h-10 w-16 sm:w-20 bg-zinc-200 rounded-md border border-[#E4E4E7]" />
              </div>
            </div>
          </div>

          <div className="hidden md:block w-px self-stretch bg-[#E4E4E7]" />

          <div className="w-full md:w-80 flex flex-col gap-4 sm:gap-5 shrink-0 order-1 md:order-2">
            <div className="flex flex-col gap-2">
              <div className="h-7 sm:h-8 w-24 sm:w-28 bg-zinc-200 rounded-md" />
              <div className="h-4 sm:h-5 w-40 sm:w-48 bg-zinc-200 rounded-md" />
            </div>
            <div className="w-full flex flex-wrap gap-2 sm:gap-2.5 max-h-48 md:max-h-96 overflow-hidden">
              {Array.from({ length: 14 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-6 sm:h-7 w-16 sm:w-20 bg-zinc-200 rounded-full border border-zinc-200"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};