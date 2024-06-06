"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import CustomButton from "../button/CustomButton";
import { CarProps } from "@/app/types";
import CartCarDetails from "./CartCarDetail";
import SERVER_API_URL from "../../config";

interface CartCarCardProps {
    car: CarProps;
}

const CartCarCard = ({ car }: CartCarCardProps) => {
    const { name, description, brand, model, price, color, motorType, power, place, status, type, id } = car;

    const [isOpen, setIsOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
        const fetchCarImage = async () => {
            try {
                const response = await axios.get(`${SERVER_API_URL}/images/${id}`);
                if (response.data && response.data.url) {
                    setImageUrl(response.data.url);
                }
            } catch (error) {
                console.error("Error fetching car image URL:", error);
            }
        };

        fetchCarImage();
    }, [id]);

    return (
        <div className="car-card group">
            <div className="car-card__content">
                <h2 className="car-card__content-title">
                    {brand} {model}
                </h2>
            </div>

            <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
                <span className="self-start text-[14px] leading-[17px] font-semibold">
                    $
                </span>
                {price}
            </p>

            <div className="relative w-full h-40 my-3 object-contain">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={`${brand} ${model}`}
                        fill
                        priority
                        className="object-contain"
                    />
                ) : (
                    <p>Loading image...</p>
                )}
            </div>

            <div className="relative flex w-full mt-2">
                <div className="flex group-hover:invisible w-full justify-between text-grey">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Image
                            src="/icon/steering-wheel.svg"
                            width={20}
                            height={20}
                            alt="steering wheel"
                        />
                        <p className="text-[14px] leading-[17px]">
                            {motorType === "a" ? "Automatic" : "Manual"}
                        </p>
                    </div>
                    <div className="car-card__icon">
                        <Image src="/icon/tire.svg" width={20} height={20} alt="seat" />
                        <p className="car-card__icon-text">{type}</p>
                    </div>
                    <div className="car-card__icon">
                        <Image src="/icon/gas.svg" width={20} height={20} alt="seat" />
                        <p className="car-card__icon-text">{color} MPG</p>
                    </div>
                </div>

                <div className="car-card__btn-container">
                    <CustomButton
                        title="View More"
                        containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                        textStyles="text-white text-[14px] leading-[17px] font-bold"
                        rightIcon="/icon/right-arrow.svg"
                        handleClick={() => setIsOpen(true)}
                    />
                </div>
            </div>

            <CartCarDetails
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                car={car}
            />
        </div>
    );
};

export default CartCarCard;
