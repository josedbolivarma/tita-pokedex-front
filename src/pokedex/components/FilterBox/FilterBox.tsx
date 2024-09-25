import React from 'react'
import styles from "./FilterBox.module.css";

interface Props {
    changeFilterType: (type: "name"|"id") => void
}

export const FilterBox = ({ changeFilterType }: Props) => {

  return (
    <div className={`color-primary-bg ${styles.filter_box} color-white`}>
          <h3>Sort by:</h3>
          <div className={`${styles.filter_options} flex flex-col gap-4`}>
          <div>
            <input type="radio" id="id" onChange={() => changeFilterType("id")} name="sort" value="id" />
            <label className='cursor-pointer' htmlFor="id">Number</label>
          </div>
          <div>
            <input type="radio" id="name" onChange={() => changeFilterType("name")} name="sort" value="name" />
            <label className='cursor-pointer' htmlFor="name">Name</label>
          </div>
          </div>
        </div>
  )
}
