import Image from "next/image";
import Link from "next/link";
import React from "react";

function PropertyCard() {
  return (
    <div className="relative bg-black w-[450px] p-[2px] rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
      {/* Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#96EA63] to-white rounded-lg p-[2px]"></div>

      {/* Card Content */}
      <div className="relative bg-black w-full h-full p-6 rounded-lg">
        {/* Image Section */}
        <div className="relative">
          <Image
            src="/assets/img2.jpg"
            alt="Land Image"
            width={400}
            height={300}
            className="rounded-lg"
          />
        </div>

        {/* Content Section */}
        <div className="mt-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">$50 Token Price</h3>
          <Link
            href="/details-page"
            className="bg-[#96EA63] text-black hover:bg-[#86d456] px-4 py-2 rounded-md text-sm font-medium"
          >
            View Details
          </Link>
        </div>

        {/* Additional Information */}
        <div className="mt-4 rounded-lg flex justify-around font-medium p-1 border border-white text-gray-300">
          <p>10 Available Shares</p>
          <p>5,000 sq Feet</p>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
