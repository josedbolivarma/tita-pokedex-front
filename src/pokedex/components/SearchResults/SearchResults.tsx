import React, { useEffect, useState } from 'react';
import styles from "./SearchResults.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonsByTypeAsync, getPokemonTypesAsync } from '../../../redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateUrlWithType } from '../../../utils';

const types = [
    {
        id: 1,
        type: "1"
    },
    {
        id: 2,
        type: "2"
    }
]

export const SearchResults = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [selectedType, setSelectedType] = useState<string>(searchParams.get("type") || ""); // Valor por defecto 'fire'
    const navigate = useNavigate();

    const {types, loading} = useSelector((store: any) => store)
    const dispatch = useDispatch();

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value);
        updateUrlWithType({name: "type", value: e.target.value, navigate, location});
    };

    useEffect(() => {
          dispatch(getPokemonTypesAsync());
    }, []);

  return (
    <select value={selectedType} onChange={handleTypeChange} className='w-100 h-100 p-8 radius-8'>  
        <option value="" className={`font-title color-primary color-white-bg font-size-14 border-bottom p-4 cursor-pointer ${styles.option}`}>All</option>
        {
            (!loading) && (
                types?.map((type: any) => (
                    <option key={type.name} className={`font-title color-primary color-white-bg font-size-14 border-bottom p-4 cursor-pointer ${styles.option}`}>{type?.name}</option>
                ))
            )
        }
    </select>
  )
}
