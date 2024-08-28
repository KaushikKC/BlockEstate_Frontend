// "use client";
// import Navbar from "@/components/Navbar";
// import { properties } from "@/data/Properties";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import React, { useState } from "react";

// function buyProperty({ id, tokenPrice }: any) {
//   const [propertyType, setPropertyType] = useState("");

//   const handlePropertyTypeChange = (e: {
//     target: { value: React.SetStateAction<string> };
//   }) => {
//     setPropertyType(e.target.value);
//   };

//   const searchParams = useSearchParams();

//   const details = searchParams.get("id");
//   console.log(details, "details");

//   // const parsedEvent = JSON.parse(details);

//   const property = properties.find((p) => p.id === parseInt(details as string));

//   if (!property) {
//     return <p>Property not found</p>;
//   }

//   const [tokensCount, setTokensCount] = useState(0);
//   const [totalInvestment, setTotalInvestment] = useState(0);
//   const handleTokensChange = (e: { target: { value: any } }) => {
//     const count = Number(e.target.value);
//     setTokensCount(count);
//     setTotalInvestment(count * tokenPrice);
//   };

//   return (
//     <div className="font-montserrat bg-[#11111C]">
//       <Navbar />
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="bg-gray-800 text-white p-10 rounded-lg shadow-md max-w-lg w-full">
//           <h1 className="text-3xl font-bold mb-4">Buy this Property</h1>

//           <form>
//             <div className="mb-4">
//               <label
//                 className="block text-gray-400 text-sm font-bold mb-2"
//                 htmlFor="propertyType"
//               >
//                 Property Type
//               </label>
//               <select
//                 id="propertyType"
//                 className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
//                 value={propertyType}
//                 onChange={handlePropertyTypeChange}
//               >
//                 <option value="">Select Buying Type</option>
//                 <option value="Buy">Buy</option>
//                 <option value="Lease">Lease</option>
//               </select>
//             </div>
//             {/* <div className="mb-4">
//               <label
//                 className="block text-gray-400 text-sm font-bold mb-2"
//                 htmlFor="propertyname"
//               >
//                 Property Name
//               </label>
//               <input
//                 className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
//                 id="propertyname"
//                 type="text"
//                 placeholder="Enter property name"
//               />
//             </div> */}
//             <div className="mb-4">
//               <label
//                 className="block text-gray-400 text-sm font-bold mb-2"
//                 htmlFor="tokens"
//               >
//                 Tokens Count (Shares)
//               </label>
//               <input
//                 className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
//                 id="tokens"
//                 type="number"
//                 placeholder="Enter Tokens"
//               />
//             </div>
//             <div className="mb-4">
//               <label
//                 className="block text-gray-400 text-sm font-bold mb-2"
//                 htmlFor="token-price"
//               >
//                 Token Price
//               </label>
//               <input
//                 className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
//                 id="total-investment"
//                 type="text"
//                 value={`$${totalInvestment.toFixed(2)}`}
//                 readOnly
//                 placeholder="Total Investment"
//               />
//             </div>
//             {/* <div className="mb-4">
//               <label
//                 className="block text-gray-400 text-sm font-bold mb-2"
//                 htmlFor="area"
//               >
//                 Property Area (in sq ft)
//               </label>
//               <input
//                 className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
//                 id="area"
//                 type="text"
//                 placeholder="Area"
//               />
//             </div>  */}

//             {propertyType === "Rent" && (
//               <div className="mt-6 text-gray-400">
//                 <label
//                   className="block text-gray-400 text-sm font-bold mb-2"
//                   htmlFor="collateral"
//                 >
//                   Collateral
//                 </label>
//                 <p className="mb-2">Take a photo of your document:</p>
//                 <ul className="list-disc list-inside space-y-1">
//                   <li>The document should be clear</li>
//                   <li>All corners must be visible</li>
//                 </ul>

//                 <div className="grid grid-cols-1 gap-4 my-4">
//                   <div className="border border-[#96EA63] p-4 rounded-md flex items-center justify-center">
//                     <button className="text-[#96EA63] flex flex-col items-center">
//                       <input
//                         type="file"
//                         accept=".pdf,.jpg,.jpeg,.png"
//                         className="mt-2 block w-full text-sm text-gray-500
//                         file:mr-4 file:py-2 file:px-4
//                         file:rounded-full file:border-0
//                         file:text-sm file:font-semibold
//                         file:bg-blue-50 file:text-[#212429]
//                         hover:file:bg-gray-200"
//                       />
//                       <p className="mt-2">Upload Document</p>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="flex justify-center">
//               <Link
//                 href="/marketplace"
//                 className="bg-[#96EA63] text-black py-2 px-4 rounded-md font-medium hover:bg-[#86d456] focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
//                 type="submit"
//               >
//                 Submit
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default buyProperty;

"use client";
import Navbar from "@/components/Navbar";
import { properties } from "@/data/Properties";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

function BuyProperty() {
  const searchParams = useSearchParams();
  const details = searchParams.get("id");
  console.log(details, "det");

  const pro = properties.find((p) => p.id === parseInt(details as string));
  console.log(parseInt(details as string), "pro");

  if (!pro) {
    return <p>Property not found</p>;
  }

  const [tokensCount, setTokensCount] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);

  const handleTokensChange = (e: { target: { value: any } }) => {
    const count = Number(e.target.value);
    setTokensCount(count);
    setTotalInvestment(
      count * parseFloat(pro.tokenPrice.replace(/[^0-9.-]+/g, ""))
    );
  };

  const [propertyType, setPropertyType] = useState("");

  const handlePropertyTypeChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPropertyType(e.target.value);
  };

  return (
    <div className="font-montserrat bg-[#11111C]">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-gray-800 text-white p-10 rounded-lg shadow-md max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-4">Buy this Property</h1>

          <form>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="propertyType"
              >
                Property Type
              </label>
              <select
                id="propertyType"
                className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                value={propertyType}
                onChange={handlePropertyTypeChange}
              >
                <option value="">Select Buying Type</option>
                <option value="Buy">Buy</option>
                <option value="Lease">Lease</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="tokens"
              >
                Tokens Count (Shares)
              </label>
              <input
                className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                id="tokens"
                type="number"
                value={tokensCount}
                onChange={handleTokensChange}
                placeholder="Enter Tokens"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-400 text-sm font-bold mb-2"
                htmlFor="total-investment"
              >
                Total Investment
              </label>
              <input
                className="w-full px-3 py-2 text-gray-300 bg-gray-900 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                id="total-investment"
                type="text"
                value={`$${totalInvestment.toFixed(2)}`}
                readOnly
                placeholder="Total Investment"
              />
            </div>

            {propertyType === "Lease" && (
              <div className="mt-6 text-gray-400">
                <label
                  className="block text-gray-400 text-sm font-bold mb-2"
                  htmlFor="collateral"
                >
                  Collateral
                </label>
                <p className="mb-2">Take a photo of your document:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>The document should be clear</li>
                  <li>All corners must be visible</li>
                </ul>

                <div className="grid grid-cols-1 gap-4 my-4">
                  <div className="border border-[#96EA63] p-4 rounded-md flex items-center justify-center">
                    <button className="text-[#96EA63] flex flex-col items-center">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="mt-2 block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-[#212429]
                        hover:file:bg-gray-200"
                      />
                      <p className="mt-2">Upload Document</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <Link
                href="/marketplace"
                className="bg-[#96EA63] text-black py-2 px-4 rounded-md font-medium hover:bg-[#86d456] focus:outline-none focus:ring-2 focus:ring-[#96EA63]"
                type="submit"
              >
                Submit
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BuyProperty;
