import React, { useEffect, useState } from 'react'
import styles from "./Card.module.css";
import { capitalize, formatId } from '../../../utils';
import { Pokemon } from '../../../interfaces/pokemon.interface';
import { ImageWithSkeleton } from '../../skeletons';

export const Card = ({pokemon}: {pokemon: Pokemon}) => {
  const [image, setImage] = useState(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ pokemon.id }.svg`);
  const handleImageError = () => {
    setImage("https://res.cloudinary.com/duzncuogi/image/upload/v1727226113/tita-pokedex/assets/icons/who_is_this_pokemon_iyosk9.png"); // Si la imagen no carga correctamente
  };

  return (
    <div className={styles.root}>
        <p className={`${styles.mark} color-black`} style={{fontSize: "10px"}}>{(pokemon?.community) ? "𝒎𝒂𝒓𝒌 #" : "#"}{formatId(pokemon?.id)}</p>
        <div className={styles.box}>
            {/* <img className={styles.pokemon} src={(pokemon?.community && pokemon?.img) ? pokemon?.img : image} alt="Pokemon" onError={handleImageError} /> */}
            <ImageWithSkeleton
              pokemon={(pokemon?.community && pokemon?.img) ? pokemon?.img : image}
              image={image}
              handleImageError={handleImageError}
            />
            <p className="color-black font-size-14">{capitalize(pokemon?.name)}</p>
        </div>
        <div className={`${styles.divider_shadow}`} />
    </div>
  )
}
