"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { properties } from "@/data/Properties";
import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const DetailsPage = ({
  id,
  title,
  tokenPrice,
  totalTokens,
  area,
  image,
}: any) => {
  const searchParams = useSearchParams();

  const details = searchParams.get("id");
  console.log(details, "details");

  // const parsedEvent = JSON.parse(details);

  const property = properties.find((p) => p.id === parseInt(details as string));

  if (!property) {
    return <p>Property not found</p>;
  }

  return (
    <div className="font-montserrat bg-[#11111C]">
      <Navbar />
      <Link
        href="/marketplace"
        className="flex items-center space-x-1 mx-[30px] cursor-pointer"
      >
        <FaArrowLeft />
        <p>Back</p>
      </Link>
      <div className="flex justify-between my-[30px] mx-[70px]">
        <div>
          <p className="text-[30px] font-semibold">{property.title}</p>
          <p className="text-[22px]">{property.location}</p>
        </div>
        <div className="flex space-x-3 items-center">
          <p className="text-[22px] text-gray-400">View Smart Contract</p>
          <button className="bg-white text-black p-2">ETH</button>
          <button className="bg-white text-black p-2">HEDERA</button>
        </div>
      </div>
      <div className="mx-[70px]">
        <div className="flex space-x-5">
          <Image
            src={property.images}
            width={600}
            height={500}
            alt="gallery"
            className="rounded-lg"
          />
          <Image
            src="/assets/img2.jpg"
            width={600}
            height={500}
            alt="gallery"
            className="rounded-lg"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="my-[30px] space-y-1">
            <p className="text-[30px] font-bold">
              Total Investment: {property.totalInvestment}
            </p>
            <p className="text-[25px] font-medium">
              Token Price: {property.tokenPrice}
            </p>
            <p className="text-[25px] font-medium">
              Total Tokens: {property.totalTokens}
            </p>
          </div>
          <button className="text-[#11111C] mx-[40px] bg-[#96EA63] w-[250px] hover:bg-[#86d456] px-4 py-2 rounded-md text-sm font-medium">
            Buy Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
