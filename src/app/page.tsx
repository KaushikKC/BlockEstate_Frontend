import React from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Navbar from "../components/Navbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // Specify the font weights you need
});

function page() {
  return (
    <div className={montserrat.className}>
      <div className="bg-[#11111C] h-[1500px]">
        <Navbar />
        <div className="mx-[30px]">
          <div className="mx-[80px] my-[80px]">
            <p className="text-[70px] font-bold">
              <span className="text-[#96EA63]">Decentralized</span> Real Estate
            </p>
            <p className="text-[25px] font-small">
              Buy, Sell & Lease Real Estate with Web 3
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/assets/img1.png"
              width={1300}
              height={400}
              alt="display"
            />
          </div>
          <div className="flex justify-end mx-[230px]">
            <div className="bg-white text-[#11111C] p-[10px] flex items-center space-x-2 mx-[50px] m-[-25px]">
              <p className="text-[40px] font-bold">300+</p>
              <p className="font-medium w-[100px] font-[22px]">Property Sale</p>
              <p className="text-[40px] font-bold">550+</p>
              <p className="font-medium w-[100px] font-[22px]">Property Rent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
