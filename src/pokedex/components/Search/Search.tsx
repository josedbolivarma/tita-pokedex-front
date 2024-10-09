import React, { useState } from 'react'
import styles from "./Search.module.css";
import { useDispatch } from 'react-redux';
import { FilterBox, SearchResults } from '../';
import { searchByIdAsync, searchByNameAsync } from '../../../redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams(); // Destructura el primer valor
  const page = searchParams.get('page');

  const [filterType, setFilterType] = useState<"name"|"id"|"type">("name");

  const [showFilter, setShowFilter] = useState(false);
  
  const cleanURL = () => {
    if (searchParams.toString()) {
      setSearchParams({}); // Borra todos los parámetros de búsqueda
    }
  };

  // Función para alternar la visibilidad del cuadro de filtro
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const changeFilterType = (type: "name"|"id"|"type") => {
    setFilterType(type);
  }
  
  const handleChange = (e: any) => {
    const value = e.target.value;
    cleanURL();
    if (filterType === 'name') {
      dispatch(searchByNameAsync(value));
    } else if (filterType === 'id' && !isNaN(value)) {
      dispatch(searchByIdAsync(value));
    }

    if (filterType === 'id' && value.trim() === "") {
      dispatch(searchByNameAsync(value));
      navigate(`/?page=${page}`);
    }
  }



  return (
    <div className={`${styles.root} relative`}>
        {
          (filterType !== "type") && (
            <div className={`${styles.search_box} w-100 radius-16`}>
              <i className="fa-solid fa-magnifying-glass color-primary"></i>
              <input type="text" onChange={handleChange} className={styles.input} placeholder='Search'/>
            </div>
          )
        }

        {
          (filterType === "type") && <SearchResults />
        }

        <button className={`${styles.btn} radius-16`} onClick={toggleFilter}>
            {
              (filterType === "id") 
              ? <i className="fa-solid fa-hashtag color-primary"></i>
              : (filterType === "type") 
              ? <i className="fa-solid fa-a color-primary"></i>
              : <i className="fa-solid fa-a color-primary"></i>
            }
        </button>

        {showFilter && <FilterBox changeFilterType={changeFilterType} />}
    </div>
  )
}
