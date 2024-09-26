import React from 'react'
import { CommunityPokemonCard } from '../../../components';

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
              <CommunityPokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        )
      }
      </div>
    </div>
  )
}
