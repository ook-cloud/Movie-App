import { EmailLogo } from "../icons/EmailLogo";
import { MovielogoWhite } from "../icons/MovielogoWhite";
import { PhoneLogo } from "../icons/PhoneLogo";

export const Footer = () => {
  return (
    <div className="mt-12.75 w-full min-h-70 flex bg-[#4338CA] py-10 px-8 lg:px-12 xl:px-16 justify-center shrink-0">
      <div className="w-full max-w-7xl min-h-50 flex justify-between gap-12">
        <div className="w-61.75 min-h-50 flex flex-col justify-start shrink-0">
          <div className="w-full h-13 flex flex-col gap-3">
            <div className="w-23 h-5 flex gap-2 items-center">
              <MovielogoWhite />

              <p className="font-inter font-bold italic text-4 text-[#FAFAFA] w-16 h-5 flex items-center">
                Movie Z
              </p>
            </div>

            <p className="font-inter font-normal text-[14px] leading-4 text-[#FAFAFA]">
              © 2024 Movie Z. All Rights Reserved.
            </p>
          </div>
        </div>

        <div className="flex flex-1 justify-end gap-16 xl:gap-24">
          <div className="hidden lg:block flex-1" />

          <div className="w-43.5 min-h-50 flex flex-col gap-3 shrink-0">
            <p className="w-full h-5 font-inter font-normal text-[14px] leading-4 text-[#FAFAFA]">
              Contact Information
            </p>

            <div className="w-full flex flex-col gap-6">
              <div className="w-full flex gap-3 items-start">
                <EmailLogo />

                <div className="flex flex-col">
                  <p className="h-5 font-inter font-medium text-[14px] leading-4 text-[#FAFAFA]">
                    Email:
                  </p>

                  <p className="h-5 font-inter font-normal text-[14px] leading-4 text-[#FAFAFA]">
                    support@movieZ.com
                  </p>
                </div>
              </div>

              <div className="w-full flex gap-3 items-start">
                <PhoneLogo />

                <div className="flex flex-col">
                  <p className="h-5 font-inter font-medium text-[14px] leading-4 text-[#FAFAFA]">
                    Phone:
                  </p>

                  <p className="h-5 font-inter font-normal text-[14px] leading-4 text-[#FAFAFA]">
                    +976 (11) 123-4567
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-68.5 min-h-50 flex shrink-0">
            <div className="w-full h-13 flex flex-col gap-3">
              <p className="w-full h-5 font-inter font-normal leading-4 text-[14px] text-[#FAFAFA]">
                Follow us
              </p>

              <div className="w-full h-5 flex gap-3">
                <p className="font-inter font-medium leading-4 text-[14px] text-[#FAFAFA]">
                  Facebook
                </p>

                <p className="font-inter font-medium leading-4 text-[14px] text-[#FAFAFA]">
                  Instagram
                </p>

                <p className="font-inter font-medium leading-4 text-[14px] text-[#FAFAFA]">
                  Twitter
                </p>

                <p className="font-inter font-medium leading-4 text-[14px] text-[#FAFAFA]">
                  Youtube
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};