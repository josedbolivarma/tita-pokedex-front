import React, { useEffect, useState } from 'react'
import { Layout } from '../../layouts'
import { CardsContainer } from '../../containers'
import { BreadCrumb } from '../../../shared'

import styles from "./FavoritesPage.module.css";
import localFavorites from '../../../utils/localFavorites';
import { Pokemon } from '../../../interfaces/pokemon.interface';

export default function FavoritesPage() {
  const [favoritePokemons, setFavoritePokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setFavoritePokemons( localFavorites.pokemons() );
    setLoading(false);
  }, []);

  return (
    <section className='root color-black-bg'>
        <div className="container">

        <BreadCrumb name={"Favorites"} path='/' />

        <div className={styles.back_pokeball}>
          <img className={styles.back_pokeball_img} src="https://res.cloudinary.com/duzncuogi/image/upload/v1727160796/tita-pokedex/assets/icons/pokeball_mgeat3.png" alt="Pokeball" />
        </div>

        </div>
        <Layout>
          <>
            <div className={styles.pokemon_box}>
              <img src="https://res.cloudinary.com/duzncuogi/image/upload/v1727196398/tita-pokedex/assets/icons/ash_kechum_qitr01.png" alt="Ash Kechum" className={styles.pokemon_image}/>
            </div>
            <div className='mt-em-6'>
              <CardsContainer data={favoritePokemons} loading={loading} />
            </div>
          </>
        </Layout>
    </section>
  )
}
