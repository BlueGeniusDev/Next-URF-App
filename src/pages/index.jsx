/**
 * Des: home page
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

// using context
import { useEffect } from "react";
import { useMainContext } from "@/context";
import { useRouter } from "next/router";

const Home = () => {
  const navigator = useRouter();
  // get global states
  const { language } = useMainContext();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigator.push("/admin/sales");
    }
  }, [navigator]);

  return (
    <main className="md:px-4 mb-12">
      <div className="mt-20 mb-16">
        <p className="text-center text-lightBlack font-outfit font-bold sm:text-3xl md:text-6xl not-italic">
          {language.homeHeadTitle}
        </p>
        <p className="m-1 text-center text-lightBlack font-outfit font-medium sm:text-xl md:text-3xl not-italic">
          {language.homeHeadSubTitle1}
        </p>
        <p className="m-1 text-center text-primaryBlue font-outfit font-medium sm:text-xl md:text-3xl not-italic underline underline-offset-8">
          {language.homeHeadSubTitle2}
        </p>
      </div>
      <div className="mobile:px-0 sm:px-6 lg:px-20 xl:px-52 xxl:px-80 my-10 mb-3 grid grid-cols-12 grid-rows-6 mobile:min-h-[300px] sm:min-h-[400px] md:min-h-[520px] sm:gap-2 md:gap-4">
        <div
          className="col-span-4 row-span-6 bg-svg bg-no-repeat rounded-md bg-center bg-cover"
          style={{
            backgroundImage: "url('/images/home/home1.svg')",
            imageRendering: "pixelated",
          }}
        ></div>
        <div
          className="col-span-5 row-span-3 bg-svg bg-no-repeat rounded-md bg-center bg-cover"
          style={{
            backgroundImage: "url('/images/home/home2.svg')",
            imageRendering: "pixelated",
          }}
        ></div>
        <div className=" col-span-3 row-span-3"></div>
        <div
          className="col-span-3 row-span-3 bg-svg bg-no-repeat rounded-md bg-center bg-cover"
          style={{
            backgroundImage: "url('/images/home/home3.svg')",
            imageRendering: "pixelated",
          }}
        ></div>
        <div
          className="col-span-5 row-span-3 bg-svg bg-no-repeat rounded-md bg-center bg-cover"
          style={{
            backgroundImage: "url('/images/home/home4.svg')",
            imageRendering: "pixelated",
          }}
        ></div>
      </div>
    </main>
  );
};

export default Home;
