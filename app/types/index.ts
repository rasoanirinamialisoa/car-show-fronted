import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  textStyles?: string;
  rightIcon: string;
  isDisabled?: boolean;
}

export interface SearchManufacturerProps {
  manufacturer: string;
  setManufacturer: (manufacturer: string) => void;
}

export interface AppointmentProps {
  id: number,
  name: string;
  firstName: string;
  email: string;
  message: string;
  contact: string;
  appointmentDate: string;
  status: string;
  carId: number | null;
}



export interface CarProps {
  id: number;
  name: string;
  description: string;
  brand: string;
  model: string;
  price: number;
  color: string;
  motorType: string;
  power: number;
  place: number;
  status: string;
  type: string;
  images:string;
}



export interface CartProps {
  id: string;
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface FilterProps {
  manufacturer: string;
  year: number;
  fuel: string;
  limit: number;
  model: string;
}

export interface HomeProps {
  searchParams: FilterProps;
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

export interface UserProps {
  id: number,
  name: string,
  email: string,
  password: string
}

export interface JwtPayload {
  role: string;
}
