import React from 'react'
import { Card } from '../../components';

import styles from "./CardsContainer.module.css";
import { Link } from 'react-router-dom';
import { Spinner } from '../../../shared';
import { Pokemon } from '../../../interfaces/pokemon.interface';

type Props = {
  loading: boolean,
  data: Pokemon[],
  error?: any
}

export const CardsContainer = ({ loading, data, error }: Props) => {
  if (error) return <pre>{error.message}</pre>

  return (
    <div className="w-100 h-100">
    {
      loading && <Spinner />
    }
        <div className={`${styles.grid}`}>
      {
        (!loading && !error) && (
          data?.map((pokemon: Pokemon) => (
            <Link key={`${pokemon.id}-${pokemon?.name}`} to={(pokemon?.community) ? `/pokemon/community/${pokemon?.id}` : `/pokemon/${pokemon?.name}`}>
              <Card pokemon={pokemon} />
            </Link>
          ))
        )
      }
    </div>
    </div>
  )
}
