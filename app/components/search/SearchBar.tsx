"use client";
import React, { useState, useEffect } from "react";
import SearchButton from "./SearchButton";
import Image from "next/image";
import axios from "axios";
import _ from "lodash";

const SearchBar = () => {
    const [manufacturer, setManufacturer] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [motorType, setMotorType] = useState<string>("");
    const [carType, setCarType] = useState<string>("");
    const [minPrice, setMinPrice] = useState<number | "">("");
    const [maxPrice, setMaxPrice] = useState<number | "">("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams({
                model: model,
                brand: manufacturer,
                motorType: motorType,
                price: `${minPrice}-${maxPrice}`,
            });
            const response = await axios.get(`http://localhost:3400/car`);
            setSearchResults(response.data);
        } catch (error) {
            setError("Error fetching data");
        }
        setLoading(false);
    };

    const debounceSearch = _.debounce(() => {
        fetchData();
    }, 300);

    useEffect(() => {
        fetchData(); // Appel initial pour récupérer les données au montage du composant
    }, []); // Le tableau vide en tant que dépendance garantit que cela ne se produit qu'une seule fois

    return (
        <form className="searchbar">
            <div className="searchbar__item">
                <select
                    name="model"
                    value={model}
                    onChange={(e) => {
                        setModel(e.target.value);
                        debounceSearch(); // Déclenche la recherche avec délai de latence après chaque modification de sélection
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
                    value={manufacturer}
                    onChange={(e) => {
                        setManufacturer(e.target.value);
                        debounceSearch(); // Déclenche la recherche avec délai de latence après chaque modification de sélection
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
                        debounceSearch(); // Déclenche la recherche avec délai de latence après chaque modification de sélection
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
                        const [min, max] = e.target.value.split("-");
                        setMinPrice(parseInt(min));
                        setMaxPrice(parseInt(max));
                        debounceSearch(); // Déclenche la recherche avec délai de latence après chaque modification de sélection
                    }}
                    className="searchbar__input"
                >
                    <option value="">Price</option>
                    {/* Vous devrez mettre à jour les options en fonction des données de recherche réelles */}
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
                        debounceSearch(); // Déclenche la recherche avec délai de latence après chaque modification de sélection
                    }}
                    className="searchbar__input"
                    
                />
                <SearchButton otherClasses="sm:hidden" />
            </div>
        </form>
    );
};

export default SearchBar;
