import React, { useEffect, useState } from 'react'
import { BreadCrumb, Chip, ProgressBar, Spinner } from '../../../shared'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { GET_POKEMON_INFO } from '../../../graphql';

import styles from "./DetailPage.module.css";
import { Layout } from '../../layouts';
import { getTypeColor } from '../../../utils';
import localFavorites from '../../../utils/localFavorites';

import confetti from 'canvas-confetti';


export default function DetailPage() {
  const { nameOrId } = useParams<{ nameOrId: string }>();
  const [color, setColor] = useState("transparent");
  const [isInFavorites, setIsInFavorites] = useState<boolean>( false );

  const onToggleFavorite = () => {
    const favoritePokemon = {id: pokemon?.id, name: pokemon?.name };
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

  

  const { loading, error, data } = useQuery<any>(
    GET_POKEMON_INFO,
    {
      variables: { name: nameOrId || "" },
    }
  );

  const pokemon = data?.pokemon_v2_pokemon[0];
  const pokemon_types = pokemon?.pokemon_v2_pokemontypes;

  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ pokemon?.id }.svg`;

  useEffect(() => {
    setIsInFavorites( localFavorites.existInFavorites(pokemon?.id) );
  }, [ pokemon?.id ])

  useEffect(() => {
    if (pokemon_types) {
      const color = getTypeColor(pokemon_types[0]?.pokemon_v2_type?.name);
      setColor(color);
    }
  }, [pokemon_types]);


  if (error) return <p>Error: {error.message}</p>;


  return (
    <section className="root" style={{
      background: !pokemon_types ? "transparent" : getTypeColor(pokemon_types[0]?.pokemon_v2_type?.name)
    }}>
      <div className="container">
       <BreadCrumb id={pokemon?.id} name={pokemon?.name} />

        <div className='w-100 flex justify-content-end px-20'>
          <button className='flex flex-col text-center font-size-24 cursor-pointer gap-2' onClick={ onToggleFavorite } style={{ zIndex: 100, alignItems: "end" }}>
            <i className="fa-regular fa-star" style={{color: isInFavorites ? "yellow" : "black"}}></i>
          </button>
        </div>
        <div className={styles.back_pokeball}>
          <img className={styles.back_pokeball_img} src="https://res.cloudinary.com/duzncuogi/image/upload/v1727160796/tita-pokedex/assets/icons/pokeball_mgeat3.png" alt="Pokeball" />
        </div>
      </div>

      {
        loading && <Spinner />
      }

{
          (!loading && !error) && (

      <Layout>
        <>
        <div className={styles.pokemon_box}>
          <img src={image} alt={`${pokemon?.name} Image`} className={styles.pokemon_image}/>
        </div>
        
        
            <div className='flex flex-col gap-em-3'>
          <div className="w-100 flex justify-content-center align-items-center gap-16 mt-em-4">
            {
              pokemon_types?.map((type: any, index: number) => (
                <Chip key={`${index}-${type.pokemon_v2_type.name}`} type={type.pokemon_v2_type.name} />
              ))
            }
          </div>

          <div className='w-100 flex flex-col justify-content-center flex-col gap-20'>
              <h4 className='font-size-24 text-center' style={{color}}>About</h4>
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
          </div>

          <p className='color-black font-size-14'>Eats Iron - And like sleeping all day long</p>

          <div className='flex flex-col gap-em-2'>
            <h4 className='font-size-24 text-center' style={{color}}>Base Stats</h4>
            
              <div className="w-100 flex flex-col gap-8">
                {
                  pokemon?.pokemon_v2_pokemonstats?.map((stat: any, index: number) => (
                  <div key={index} className='flex gap-10 justify-content-start align-items-center'>
                  <p style={{color, width: "30%"}}>{stat?.pokemon_v2_stat?.name.toLocaleUpperCase()}</p>
                  <div className="divider" />
                  <p>{stat?.base_stat}</p>
                  <div className="w-100">
                  <ProgressBar color={color} percentage={stat?.base_stat} />
                  </div>
                </div>
                  ))
                }
              </div>

          </div>

        </div>
        </>
      </Layout>
      )
    }
    </section>
  )
}
