"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import PropertyCard from "../../components/PropertyCard";
import axios from "axios";
// import { properties } from "../../data/Properties";

function MarketPlace() {
  const [checkActive, setCheckActive] = useState("");
  const [properties, setProperties] = useState([]);
  const handleActive = (type: React.SetStateAction<string>) => {
    setCheckActive(type);
  };
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await axios.get("http://localhost:3000/api/land/lands"); // Adjust the API route if necessary
        console.log("market", data);
        setProperties(data.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

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
          onClick={() => handleActive("All")}
          className={` ${
            checkActive === "All" ? "text-[#96EA63]" : "text-white"
          } hover:text-[#96EA63] px-3 py-2 rounded-md text-md font-medium active`}
        >
          All
        </Link>
        <Link
          href="/marketplace"
          onClick={() => handleActive("Buildings")}
          className={` ${
            checkActive === "Buildings" ? "text-[#96EA63]" : "text-white"
          } hover:text-[#96EA63] px-3 py-2 rounded-md text-md font-medium active`}
        >
          Buildings
        </Link>
        <Link
          href="/marketplace"
          onClick={() => handleActive("Land")}
          className={` ${
            checkActive === "Land" ? "text-[#96EA63]" : "text-white"
          } hover:text-[#96EA63] px-3 py-2 rounded-md text-md font-medium active`}
        >
          Land
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            id={property.tokenId}
            title={property.propertyName}
            area={property.propertyArea}
            totalTokens={property.propertyTokens}
            tokenPrice={property.tokenPrice}
            image={property.images}
          />
        ))}
      </div>
    </div>
  );
}

export default MarketPlace;

// "use client";
// import Navbar from "@/components/Navbar";
// import PropertyCard from "@/components/PropertyCard";
// import { properties } from "@/data/Properties";
// import Link from "next/link";
// import React, { useState } from "react";

// function marketPlace() {
//   const [checkActive, setCheckActive] = useState("");
//   const handleActive = (type) => {
//     setCheckActive(type);
//   };

//   return (
//     <div className="font-montserrat bg-[#11111C]">
//       <Navbar />
//       <div className="flex justify-center my-[30px]">
//         <p className="text-[50px] font-bold">Available Properties</p>
//       </div>
//       <div className="border-b border-gray-200"></div>
//       <div className="hidden md:flex items-center space-x-10 text-[25px] m-[20px]">
//         <Link
//           href=""
//           onClick={() => handleActive("All")}
//           className={` ${
//             checkActive === "All" ? "text-[#96EA63]" : "text-white"
//           } hover:text-[#96EA63] px-3 py-2 rounded-md text-md font-medium active`}
//         >
//           All
//         </Link>
//         <Link
//           href="/marketplace"
//           onClick={() => handleActive("Buildings")}
//           className={` ${
//             checkActive === "Buildings" ? "text-[#96EA63]" : "text-white"
//           } hover:text-[#96EA63] px-3 py-2 rounded-md text-md font-medium active`}
//         >
//           Buildings
//         </Link>
//         <Link
//           href="/marketplace"
//           onClick={() => handleActive("Land")}
//           className={` ${
//             checkActive === "Land" ? "text-[#96EA63]" : "text-white"
//           } hover:text-[#96EA63] px-3 py-2 rounded-md text-md font-medium active`}
//         >
//           Land
//         </Link>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//         {properties.map((property) => (
//           <PropertyCard
//             key={property.id}
//             id={property.id}
//             title={property.title}
//             location={property.location}
//             image={property.images[0]}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default marketPlace;
