// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import CustomButton from "../button/CustomButton";
// import { CarProps } from "@/app/types";
// import CarDetails from "@/app/components/card/";
// import SERVER_API_URL from "@/app/config";

// interface CarCardProps {
//   car: CarProps;
// }

// const CarCard = ({ car }: CarCardProps) => {
//   const { name, description, brand, model, price, color, motorType, power, place, status, type, images } = car;
//   const [imageUrl, setImageUrl] = useState("");
//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const fetchCarData = async () => {
//       try {
//         const response = await fetch(`${SERVER_API_URL}/car/${car.id}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch car data");
//         }
//         const data = await response.json();
//         // Set the image URL and other details
//         setImageUrl(data.imageUrl);
//         // You can set other details here as needed
//       } catch (error) {
//         console.error("Error fetching car data:", error);
//       }
//     };

//     fetchCarData();
//   }, [car.id]);

//   return (
//     <div className="car-card group">
//       <div className="car-card__content">
//         <h2 className="car-card__content-title">
//           {brand} {model}
//         </h2>
//       </div>
      
//       <div className="relative w-full h-40 my-3 object-contain">
//         <Image
//           src={imageUrl || '/fallback-image.png'}
//           alt={`${brand} ${model}`}
//           layout="fill"
//           className="object-contain"
//         />
//       </div>

//       <div className="relative flex w-full mt-2">
//         <div className="flex group-hover:invisible w-full justify-between text-grey">
//           <div className="flex flex-col justify-center items-center gap-2">
//             <Image
//               src="/icon/steering-wheel.svg"
//               width={20}
//               height={20}
//               alt="steering wheel"
//             />
//             <p className="text-[14px] leading-[17px]">
//               {motorType === "a" ? "Automatic" : "Manual"}
//             </p>
//           </div>
//           <div className="car-card__icon">
//             <Image src="/icon/tire.svg" width={20} height={20} alt="seat" />
//             <p className="car-card__icon-text">{power} HP</p>
//           </div>
//           <div className="car-card__icon">
//             <Image src="/icon/gas.svg" width={20} height={20} alt="seat" />
//             <p className="car-card__icon-text">{color} COLOR</p>
//           </div>
//         </div>

//         <div className="car-card__btn-container">
//           <CustomButton
//             title="View More"
//             containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
//             textStyles="text-white text-[14px] leading-[17px] font-bold"
//             rightIcon="/icon/right-arrow.svg"
//             handleClick={() => setIsOpen(true)}
//           />
//         </div>
//       </div>

//       <CarDetails
//         isOpen={isOpen}
//         closeModal={() => setIsOpen(false)}
//         car={car}
//       />
//     </div>
//   );
// };

// export default CarCard;
