"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchButton from './SearchButton';
import Image from 'next/image';
import _ from 'lodash';

const SearchBar = () => {
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [motorType, setMotorType] = useState<string>('');
  const [carType, setCarType] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSearch = () => {
    const query = new URLSearchParams({
      model,
      brand,
      motorType,
      price: `${minPrice}-${maxPrice}`,
    }).toString();
    router.push(`/carsearch?${query}`);
  };

  const debounceSearch = _.debounce(handleSearch, 300);

  return (
    <form className="searchbar" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
      <div className="searchbar__item">
        <select
          name="model"
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
            debounceSearch();
          }}
          className="searchbar__input"
        >
          <option value="">Model</option>
          {searchResults.map((car) => (
            <option key={car.id} value={car.model}>
              {car.model}
            </option>
          ))}
        </select>
        <select
          name="brand"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            debounceSearch();
          }}
          className="searchbar__input"
        >
          <option value="">Brand</option>
          {searchResults.map((car) => (
            <option key={car.id} value={car.brand}>
              {car.brand}
            </option>
          ))}
        </select>
        <select
          name="motorType"
          value={motorType}
          onChange={(e) => {
            setMotorType(e.target.value);
            debounceSearch();
          }}
          className="searchbar__input"
        >
          <option value="">Motor</option>
          {searchResults.map((car) => (
            <option key={car.id} value={car.motorType}>
              {car.motorType}
            </option>
          ))}
        </select>
        <select
          name="price"
          value={`${minPrice}-${maxPrice}`}
          onChange={(e) => {
            const [min, max] = e.target.value.split('-').map(Number);
            setMinPrice(min || '');
            setMaxPrice(max || '');
            debounceSearch();
          }}
          className="searchbar__input"
        >
          <option value="">Price</option>
          {searchResults.map((car) => (
            <option key={car.id} value={car.price}>
              {car.price}
            </option>
          ))}
        </select>
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/icon/model-icon.png"
          alt="car brand"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
        />
        <input
          type="text"
          name="modelInput"
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
            debounceSearch();
          }}
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
    </form>
  );
};

export default SearchBar;
