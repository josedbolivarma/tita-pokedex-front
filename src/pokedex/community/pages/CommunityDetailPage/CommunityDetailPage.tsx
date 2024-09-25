import React from 'react'
import { BreadCrumb, Chip, Spinner } from '../../../../shared'
import { Layout } from '../../../layouts'
import { getGradientClass, getTypeColor } from '../../../../utils'
import { useFetchPokemons } from '../../../../hooks'
import { useParams } from 'react-router-dom'

import styles from "./CommunityDetailPage.module.css";

export default function CommunityDetailPage() {
    const {id} = useParams();
    const { data, isLoading, error } = useFetchPokemons(`${id}`);

    const pokemon = data;

    if (error) return <p>Error: {error}</p>;

    return (
        <section className={`root ${pokemon?.type ? getGradientClass(pokemon?.type[0]) : "transparent"}`}>
          <div className="container-x pt-24">
          <BreadCrumb id={pokemon?.id} name={pokemon?.name} />
            <div className='w-100 flex justify-content-end px-20'>
              {/* <button className='flex flex-col text-center font-size-24 cursor-pointer gap-2' onClick={ onToggleFavorite } style={{ zIndex: 100, alignItems: "end" }}>
                <i className="fa-regular fa-star" style={{color: isInFavorites ? "yellow" : "black"}}></i>
              </button> */}
            </div>
              <img className={styles.back_pokeball_img} src="https://res.cloudinary.com/duzncuogi/image/upload/v1727160796/tita-pokedex/assets/icons/pokeball_mgeat3.png" alt="Pokeball" />
          </div>

          {
            isLoading && <Spinner />
          }

          {
            (!isLoading && !error) && (
              <div className={`${styles.hero_container} h-100 container-x pt-48 flex flex-col-reverse justify-content-center align-items-center`}>
            <div className={`${styles.attributes} flex flex-col gap-em-3`}>
                <div className='w-100 h-100 flex flex-col justify-content-center align-items-start gap-em-2'>
                  <h3 className='font-size-48'>{pokemon?.name}</h3>
                  <h4 className='font-size-24 color-black'>About</h4>

                  <p className='color-black font-size-14'>Eats Iron - And like sleeping all day long</p>

                  <div className={`flex justify-content-center ${styles.pokemon_attributes}`}>
                  <div className="flex flex-col gap-20 align-items-center justify-content-between py-4 px-em-2">
                  <div className='flex gap-4'>
                    <i className="fa-solid fa-weight-hanging"></i>
                    <p>60,0 kg</p>
                  </div>

                  <p>Weight</p>
                </div>

                <div className="divider" />

                <div className="flex flex-col gap-20 align-items-center justify-content-between px-em-2">
                  <div className='flex gap-4'>
                    <i className="fa-solid fa-ruler-vertical"></i>
                    <p>1m</p>
                  </div>

                  <p>Height</p>
                </div>

                <div className="divider" />

                <div className="flex flex-col gap-20 align-items-center justify-content-between px-em-2">
                  <div className='flex flex-col gap-4'>
                    <p>Mega punch</p>
                    <p>Fire punch</p>
                  </div>

                  <p>Moves</p>
                </div>
    
                    
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
