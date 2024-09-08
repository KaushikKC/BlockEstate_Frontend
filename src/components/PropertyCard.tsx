import Image from "next/image";
import Link from "next/link";
import React from "react";

function PropertyCard({
  id,
  title,
  tokenPrice,
  totalTokens,
  area,
  image,
}: any) {
  console.log(image, "img");
  return (
    <div className="relative bg-black w-[450px] p-[2px] rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
      <div className="absolute inset-0 bg-gradient-to-r from-[#96EA63] to-white rounded-lg p-[2px]"></div>

      <div className="relative bg-black w-full h-full p-6 rounded-lg">
        <Link
          href={{
            pathname: `/details-page/${id}`,
            query: { id: id }, // Passing event as query parameter
          }}
          className="relative"
        >
          {image.length > 0 ? (
            <Image
              src={image[0]}
              alt={title}
              width={500}
              height={300}
              className="rounded-lg w-[500px] h-[300px]"
            />
          ) : (
            <Image
              src={image}
              alt={title}
              width={500}
              height={300}
              className="rounded-lg w-[500px] h-[300px]"
            />
          )}
        </Link>

        <div className="mt-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">
            {tokenPrice} Token Price
          </h3>
          <Link
            href={{
              pathname: `/details-page/${id}`,
              query: { id: id }, // Passing event as query parameter
            }}
            className="bg-[#96EA63] text-black hover:bg-[#86d456] px-4 py-2 rounded-md text-sm font-medium"
          >
            View Details
          </Link>
        </div>

        <div className="mt-4 rounded-lg flex justify-around font-medium p-1 border border-white text-gray-300">
          <p>{totalTokens} Shares</p>
          <p>{area} sq Feet</p>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;

// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import React from "react";

// function PropertyCard({ id, title, location, image }) {
//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <Link href={`/details/${id}`}>
//         <Image
//           src={image}
//           alt={title}
//           width={400}
//           height={300}
//           className="w-full"
//         />
//         <div className="p-4">
//           <h3 className="text-lg font-semibold">{title}</h3>
//           <p className="text-gray-600">{location}</p>
//         </div>
//       </Link>
//     </div>
//   );
// }

// export default PropertyCard;
