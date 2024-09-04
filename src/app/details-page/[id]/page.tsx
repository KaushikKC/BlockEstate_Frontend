"use client";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import img1 from "/public/assets/img1.jpg";
import img2 from "/public/assets/img2.jpg";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Navbar from "../../../components/Navbar";
import { properties } from "../../../data/Properties";

const DetailsPage = ({
  id,
  title,
  tokenPrice,
  totalTokens,
  area,
  image,
}: any) => {
  const Gallery = [img1, img2, img1, img2, img1];
  const [currentIndex, setCurrentIndex] = useState(0);
  const searchParams = useSearchParams();
  const tokenId = searchParams.get("id");
  const [property, setProperty] = useState(null);
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/land/lands/${tokenId}`
        );
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };

    if (tokenId) {
      fetchPropertyDetails();
    }
  }, [tokenId]);

  if (!property) {
    return <p>Loading...</p>;
  }

  const prevClick = () => {
    setCurrentIndex((currentIndex) => currentIndex - 1);
  };

  const nextClick = () => {
    setCurrentIndex((currentIndex) => currentIndex + 1);
  };

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
          <p className="text-[30px] font-semibold">{property.propertyName}</p>
          <p className="text-[22px]">{property.propertyAddress}</p>
        </div>
        <div className="flex space-x-3 items-center">
          <p className="text-[22px] text-gray-400">View Smart Contract</p>
          <button className="bg-white text-black p-2">ETH</button>
          <button className="bg-white text-black p-2">HEDERA</button>
        </div>
      </div>
      <div className="mx-[70px]">
        <div className="flex justify-center">
          <div className="overflow-hidden relative w-[820px]">
            <div
              className="flex space-x-5"
              style={{
                transform: `translateX(-${currentIndex * (405 + 10)}px)`,
                transition: "transform 0.5s ease",
              }}
            >
              {Gallery.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Image ${index}`}
                  className="h-[300px] w-[400px] rounded-lg"
                />
              ))}
            </div>
            <div className="flex justify-center space-x-20 py-[20px]">
              {/* <button
                className="rounded-[999px] flex justify-center items-center border-[2px] p-[8px]"
                onClick={prevClick}
                disabled={currentIndex === 0}
              >
                <GrFormPrevious className="h-[30px] w-[30px]" />
              </button>
              <button
                className="rounded-[999px] flex justify-center items-center border-[2px] p-[8px]"
                onClick={nextClick}
                disabled={currentIndex === property.images.length - 1}
              >
                <GrFormNext className="h-[30px] w-[30px]" />
              </button> */}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="my-[30px] space-y-1">
            <p className="text-[30px] font-bold">
              Total Investment: {property.propertyTokens * property.tokenPrice}
            </p>
            <p className="text-[25px] font-medium">
              Token Price: {property.tokenPrice}
            </p>
            <p className="text-[25px] font-medium">
              Total Tokens: {property.propertyTokens}
            </p>
          </div>
          <Link
            href={{
              pathname: `/buy-property/${tokenId}`,
              query: { id: tokenId },
            }}
            className="text-[#11111C] mx-[40px] bg-[#96EA63] w-[250px] hover:bg-[#86d456] px-4 py-2 flex justify-center items-center rounded-md text-sm font-medium"
          >
            Buy Property
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
