import React, { useEffect, useState } from 'react'
import { BreadCrumb, Chip, Spinner } from '../../../../shared'
import { Layout } from '../../../layouts'
import { getGradientClass, getTypeColor } from '../../../../utils'
import { useFetchPokemons } from '../../../../hooks'
import { useParams } from 'react-router-dom'

import styles from "./CommunityDetailPage.module.css";
import localFavorites from '../../../../utils/localFavorites'
import confetti from 'canvas-confetti'
import { AttributesContainer } from '../../../containers'

export default function CommunityDetailPage() {
    const {id} = useParams();
    
    const { data, isLoading, error } = useFetchPokemons(!id ? '' : id);

    const [isInFavorites, setIsInFavorites] = useState<boolean>( false );

    const pokemon = data;

    const onToggleFavorite = () => {
      const favoritePokemon = {id: pokemon?.id, name: pokemon?.name, community: true, img: pokemon?.img };
      localFavorites.toggleFavorite( favoritePokemon );
      setIsInFavorites( !isInFavorites );
  
      if ( isInFavorites ) return;
  
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0
        }
      })
    }

    useEffect(() => {
      setIsInFavorites( localFavorites.existInFavorites(pokemon?.id, true) );
    }, [ pokemon?.id ])

    if (error) return <p>Error: {error}</p>;

    return (
        <section className={`root ${pokemon?.type ? getGradientClass(pokemon?.type[0]) : "transparent"}`}>
          <div className="container-x pt-24">
          <BreadCrumb id={pokemon?.id} name={pokemon?.name} path='/community' />
            <div className='w-100 flex justify-content-end px-20'>
              <button className='flex flex-col text-center font-size-24 cursor-pointer gap-2' onClick={ onToggleFavorite } style={{ zIndex: 100, alignItems: "end" }}>
                <i className="fa-regular fa-star" style={{color: isInFavorites ? "yellow" : "black"}}></i>
              </button>
            </div>
              <img className={styles.back_pokeball_img} src="https://res.cloudinary.com/duzncuogi/image/upload/v1727160796/tita-pokedex/assets/icons/pokeball_mgeat3.png" alt="Pokeball" />
          </div>

          {
            isLoading && <Spinner />
          }

          {
            (!isLoading && !error) && (
              <div className={`${styles.hero_container} h-100 container-x pt-48 flex flex-col-reverse justify-content-center align-items-center`}>
            

            {/* ATTRIBUTES */}
            <div className={`${styles.attributes} flex flex-col gap-em-3`}>
                <div className='w-100 h-100 flex flex-col justify-content-center align-items-start gap-em-2'>
                  <h3 className='font-size-48'>{pokemon?.name}</h3>
                  <h4 className='font-size-24 color-black'>About</h4>

            <p className='color-black font-size-14'>Eats Iron - And like sleeping all day long</p>
            <div className={`${styles.attributes} flex flex-col gap-em-3`}>
              <AttributesContainer color={getTypeColor(pokemon?.type ? pokemon?.type[0] : "transparent")} weight='80 kg' height='2m' moves={['Mega Taser']} />
            </div>


              <div className="w-100 flex justify-content-center align-items-center gap-16">
                {
                  pokemon?.type?.map((type: any, index: number) => (
                    <Chip key={`${index}-${type}`} type={type} />
                  ))
                }
              </div>
                </div>
            </div>

            {/* END ATTRIBUTES */}

            
            <div className={styles.pokemon_container}>
              <div className={styles.pokemon_box}>
                <img src={pokemon?.img} alt={`${pokemon?.name} Image`} className={styles.pokemon_image}/>
              </div>
            </div>

          </div>
            )
          }
        </section>
      )
}
