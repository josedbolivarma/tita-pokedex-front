import React from 'react'
import styles from "./Header.module.css";
import { Search, SearchResults } from '../';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className={styles.header}>
        <nav className={`${styles.navbar} w-100 flex align-items-center justify-content-between radius-16 color-bg-white`}>
          <Link to="/" className='flex gap-8'>
            <img src="https://res.cloudinary.com/duzncuogi/image/upload/v1727125783/tita-pokedex/assets/icons/pokeball_pjoq7f.png" alt="Pokeball Logo" className={styles.logo} />
            <h3 className="color-white font-size-24 font-title">Pokédex</h3>
          </Link>

          <div className='flex gap-16 align-items-center'>
            <Link className='color-white font-size-16' to="/community">
              Community
            </Link>

            <Link className='color-white font-size-16' to="/favorites">
              Favorites
            </Link>
          </div>
        </nav>
        
        <Search />
      </header>
  )
}
