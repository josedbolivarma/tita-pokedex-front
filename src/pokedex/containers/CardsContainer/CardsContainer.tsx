import React from 'react'
import { Card } from '../../components';

import styles from "./CardsContainer.module.css";
import { Link } from 'react-router-dom';
import { Spinner } from '../../../shared';

export const CardsContainer = ({ loading, data, error }: any) => {
 
  if (error) return <pre>{error.message}</pre>

  return (
    <div className="w-100 h-100">
    {
      loading && <Spinner />
    }
        <div className={`${styles.grid}`}>
      {
        (!loading && !error) && (
          data?.map((pokemon: any) => (
            <Link key={pokemon.id} to={`/pokemon/${pokemon.name}`}>
              <Card pokemon={pokemon} />
            </Link>
          ))
        )
      }
    </div>
    </div>
  )
}
