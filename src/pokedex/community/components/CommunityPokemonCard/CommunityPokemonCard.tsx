import React from 'react'
import styles from "./CommunityPokemonCard.module.css";
import { formatId } from '../../../../utils';
import { useNavigate } from 'react-router-dom';
import { useFetchPokemons } from '../../../../hooks';

export const CommunityPokemonCard = ({pokemon}: any) => {
    const {deletePokemon} = useFetchPokemons();
    const navigate = useNavigate();


    return (
        <div className={`${styles.root}`}>
            <div className="flex justify-content-between align-items-center">
                <div className='flex align-items-center gap-2'>
                    <img className="avatar-sm" src="https://res.cloudinary.com/duzncuogi/image/upload/v1727196398/tita-pokedex/assets/icons/ash_kechum_qitr01.png" alt="User Avatar" />
                    <div className='flex flex-col gap-2'>
                        <span className='color-black font-size-14'>Created by</span>
                        <p className='color-black'>John Doe</p>
                    </div>
                </div>
                <p className={`${styles.mark} color-black`} style={{fontSize: "10px"}}>#{formatId(pokemon?.id)}</p>
            </div>
            <div className={styles.box}>
                <img className={styles.pokemon} src={pokemon.img} alt="Pokemon" />
                <p className="color-black font-size-14">{pokemon.name}</p>
                <div className="flex align-items-center gap-4">
                <button className='btn btn-primary' onClick={() => deletePokemon(pokemon?.id)}>
                <i className="fa-solid fa-trash"></i>
                </button>
                <button className='btn btn-primary' onClick={() => navigate(`/pokemon/community/${pokemon?.id}`)}>
                <i className="fa-solid fa-eye"></i>
                </button>
                <button className='btn btn-primary' onClick={() => navigate(`/pokemon/edit/${pokemon?.id}`)}>
                <i className="fa-solid fa-pencil"></i>
                </button>
                </div>
            </div>
            <div className={`${styles.divider_shadow}`} />
        </div>
    )
}
