import React from 'react'
import styles from "./FilterBox.module.css";

interface Props {
    changeFilterType: (type: "name"|"id"|"type") => void;
    selectedFilter: "name"|"id"|"type";
}

type Option = {
  id: number;
  label: String;
  name: "id"|"name"|"type";
}

const options: Option[] = [
  {
    id: 1,
    label: "Name",
    name: "name",
  },
  {
    id: 2,
    label: "Number",
    name: "id",
  },
  {
    id: 3,
    label: "Type",
    name: "type",
  }
]

export const FilterBox = ({ changeFilterType, selectedFilter }: Props) => {

  return (
    <div className={`color-primary-bg ${styles.filter_box}`}>
          <h3 className='color-white'>Sort by:</h3>
          <div className={`${styles.filter_options} color-white-bg color-black flex flex-col gap-16`}>
            {
              options.map((option: Option) => (
                <div>
                  <input type="radio" id={option?.name} checked={option?.name === selectedFilter} onChange={() => changeFilterType(option?.name)} name="sort" value={option?.name} />
                  <label className='cursor-pointer' htmlFor={option?.name}>{option?.label}</label>
                </div>
              ))
            }
          </div>
        </div>
  )
}
