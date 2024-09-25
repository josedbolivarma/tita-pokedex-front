import React from 'react'
import styles from "./BreadCrumb.module.css";
import { useNavigate } from 'react-router-dom';
import { capitalize, formatId } from '../../utils';

export const BreadCrumb = ({name, id}: {name: string, id?: number}) => {
  const navigate = useNavigate();
  
  return (
    <div className={`${styles.root} color-white`}>
        <button className="btn" onClick={() => navigate(-1)} style={{ zIndex: 100 }}>
            <img className={styles.icon} src="https://res.cloudinary.com/duzncuogi/image/upload/v1727141854/tita-pokedex/assets/icons/arrow_back_htizvy.png" alt="Return Arrow Icon" />
        </button>
        {name && <h4 className='w-100 font-size-24'>{capitalize(name)}</h4>}
        {id && <p className="font-size-12">#{formatId(id)}</p>}
    </div>
  )
}
