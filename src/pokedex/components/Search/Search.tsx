import React, { useState } from 'react'
import styles from "./Search.module.css";
import { useDispatch } from 'react-redux';
import { FilterBox } from '../';
import { searchByIdAsync, searchByNameAsync } from '../../../redux';

export const Search = () => {
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState<"name"|"id">("name");

  const [showFilter, setShowFilter] = useState(false);
  

  // Función para alternar la visibilidad del cuadro de filtro
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const changeFilterType = (type: "name"|"id") => {
    setFilterType(type);
  }
  
  const handleChange = (e: any) => {
    const value = e.target.value;
    if (filterType === 'name') {
      dispatch(searchByNameAsync(value));
    } else if (filterType === 'id' && !isNaN(value)) {
      dispatch(searchByIdAsync(value));
    }

    if (filterType === 'id' && value.trim() === "") {
      dispatch(searchByNameAsync(value));
    }
  }



  return (
    <div className={styles.root}>
        <div className={`${styles.search_box} w-100 radius-16`}>
            <i className="fa-solid fa-magnifying-glass color-primary"></i>
            <input type="text" onChange={handleChange} className={styles.input} placeholder='Search'/>
        </div>
    
        <button className={`${styles.btn} radius-16`} onClick={toggleFilter}>
            {
              (filterType === "id") ? <i className="fa-solid fa-hashtag color-primary"></i> : <i className="fa-solid fa-a color-primary"></i>
            }
        </button>

        {showFilter && <FilterBox changeFilterType={changeFilterType} />}
    </div>
  )
}
