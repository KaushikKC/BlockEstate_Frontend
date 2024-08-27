import Link from "next/link";
import React from "react";
import Navbar from "../../components/Navbar";
import PropertyCard from "../../components/PropertyCard";

function marketPlace() {
  return (
    <div className="font-montserrat bg-[#11111C]">
      <Navbar />
      <div className="flex justify-center my-[30px]">
        <p className="text-[50px] font-bold">Available Properties</p>
      </div>
      <div className="border-b border-gray-200"></div>
      <div className="hidden md:flex items-center space-x-10 text-[25px] m-[20px]">
        <Link
          href="/"
          className="text-[#96EA63] hover:text-white px-3 py-2 rounded-md text-md font-medium active"
        >
          All
        </Link>
        <Link
          href="/marketplace"
          className="text-white hover:text-[#96EA63] px-3 py-2 rounded-md text-md font-medium"
        >
          Buildings
        </Link>
        <Link
          href="/marketplace"
          className="text-white hover:text-[#96EA63] px-3 py-2 rounded-md text-md font-medium"
        >
          Land
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
      </div>
    </div>
  );
}

export default marketPlace;
