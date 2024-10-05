import React, { useEffect, useState } from 'react'
import { BreadCrumb, Chip, ProgressBar, Spinner } from '../../../shared'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { GET_POKEMON_INFO } from '../../../graphql';

import styles from "./DetailPage.module.css";
import { Layout } from '../../layouts';
import { getTypeColor } from '../../../utils';
import localFavorites from '../../../utils/localFavorites';

import confetti from 'canvas-confetti';
import { useDispatch, useSelector } from 'react-redux';
import { searchByIdAsync, selectPrevAndNextPokemonAsync } from '../../../redux';
import { PokemonDetailResponse } from '../../../interfaces/pokemon.interface';
import { AttributesContainer, BaseStatsContainer } from '../../containers';


export default function DetailPage() {
  const { nameOrId } = useParams<{ nameOrId: string }>();
  const [color, setColor] = useState("transparent");
  const [isInFavorites, setIsInFavorites] = useState<boolean>( false );

  const {prevPokemon, nextPokemon} = useSelector((store: any) => store);

  const dispatch = useDispatch();
  
  
  const navigate = useNavigate();

  const onToggleFavorite = () => {
    const favoritePokemon = {id: pokemon?.id!, name: pokemon?.name! };
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

  const { loading, error, data } = useQuery<PokemonDetailResponse>(
    GET_POKEMON_INFO,
    {
      variables: { name: nameOrId || "" },
    }
  );

  const pokemon = data?.pokemon_v2_pokemon[0];
  const pokemon_types = pokemon?.pokemon_v2_pokemontypes;

  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ pokemon?.id }.svg`;

  const paginatePokemon = (select: "prev" | "next") => {
    if (select === "prev" && !prevPokemon[0]?.name) return;
    if (select === "next" && !nextPokemon[0]?.name) return;

    if (select === "prev" && prevPokemon[0]?.name) {
      navigate(`/pokemon/${prevPokemon[0]?.name}`)
    }

    if (select === "next" && nextPokemon[0]?.name) {
      navigate(`/pokemon/${nextPokemon[0]?.name}`)
    }
  }
  
  useEffect(() => {
    if (pokemon?.id) {
      dispatch(selectPrevAndNextPokemonAsync(pokemon?.id));
      setIsInFavorites( localFavorites.existInFavorites(pokemon?.id) );
    }
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
       <BreadCrumb id={pokemon?.id} name={pokemon?.name || ''} path='/'/>

        <div className='w-100 flex justify-content-end px-20'>
          <button className='flex flex-col text-center font-size-24 cursor-pointer gap-2' onClick={ onToggleFavorite } style={{ zIndex: 100, alignItems: "end" }}>
            <i className="fa-regular fa-star" style={{color: isInFavorites ? "yellow" : "black"}}></i>
          </button>
        </div>
        <div className={styles.back_pokeball}>
          <img className={styles.back_pokeball_img} src="https://res.cloudinary.com/duzncuogi/image/upload/v1727160796/tita-pokedex/assets/icons/pokeball_mgeat3.png" alt="Pokeball" />
        </div>
      
      <div className="w-100 flex justify-content-between align-items-center gap-4">
      {
        prevPokemon.length > 0 && (
          <button className='btn' onClick={() => paginatePokemon("prev")}>
            <i className="fa-solid fa-chevron-left font-size-24"></i>
          </button>
        )
      }
      
      <div />
      {
        nextPokemon.length > 0 && (
          <button className='btn' onClick={() => paginatePokemon("next")}>
            <i className="fa-solid fa-chevron-right font-size-24"></i>
          </button>
        )
      }
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
              pokemon_types?.map((type, index: number) => (
                <Chip key={`${index}-${type.pokemon_v2_type.name}`} type={type.pokemon_v2_type.name} />
              ))
            }
          </div>

          <h4 className='font-size-24 text-center' style={{color}}>About</h4>

            {/* ATTRIBUTES */}
          <AttributesContainer color={color} weight='60,0 kg' height='1m' moves={['Mega Punch', 'Fire Punch']} />
            {/* END ATTRIBUTES */}

          <p className='color-black font-size-14'>Eats Iron - And like sleeping all day long</p>

          {/* BASE STATS */}
          <BaseStatsContainer stats={pokemon?.pokemon_v2_pokemonstats!} color={color} />
          {/* END BASE STATS */}


        </div>
        </>
      </Layout>
      )
    }
    </section>
  )
}
