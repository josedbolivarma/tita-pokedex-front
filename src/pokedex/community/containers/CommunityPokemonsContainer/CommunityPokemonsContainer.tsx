import React from 'react'
import { CommunityPokemonCard } from '../../../components';

import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../../../../graphql';
import { Link } from 'react-router-dom';

import styles from "./CommunityPokemonsContainer.module.css";
import { Spinner } from '../../../../shared';

export const CommunityPokemonsContainer = ({ loading, data, error }: any) => {
 
  if (error) return <pre>{error.message}</pre>

  return (
    <div className="w-100 h-100">
      {
        loading && <Spinner />
      }
      <div className={`${styles.grid} gap-8`}>
      {
        (!loading && !error) && (
          data?.map((pokemon: any) => (
            <Link key={pokemon.id} to={`/pokemon/community/${pokemon?.id}`}>
              <CommunityPokemonCard pokemon={pokemon} />
            </Link>
          ))
        )
      }
      </div>
    </div>
  )
}
