import React, { useEffect, useState } from 'react'
import { BreadCrumb } from '../../../../shared'
import { Layout } from '../../../layouts'
import { Link, useNavigate } from 'react-router-dom';
import { CommunityPokemonsContainer } from '../../../containers';
import { useFetchPokemons } from '../../../../hooks';

import styles from "./CommunityPage.module.css";

export default function CommunityPage() {
  const navigate = useNavigate();
  const {data, isLoading} = useFetchPokemons();
  
  return (
    <section className='root color-black-bg'>
        <>

        <div className="container">
            <BreadCrumb name={"Community"} path='/' />
            <div className='w-100 flex justify-content-end px-20'>
              <button onClick={() => navigate('/pokemon/create')} className='btn btn-primary'>
                Add Your Pokemon
              </button>
            </div>
            <div className={styles.back_pokeball}>
              <img className={styles.back_pokeball_img} src="https://res.cloudinary.com/duzncuogi/image/upload/v1727160796/tita-pokedex/assets/icons/pokeball_mgeat3.png" alt="Pokeball" />
            </div>
        </div>

        <Layout>
            <CommunityPokemonsContainer data={data} isLoading={isLoading} />
        </Layout>
        </>
    </section>
  )
}
