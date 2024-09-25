import React, { useEffect } from 'react';
import { Header } from '../../components';
import { Layout } from '../../layouts';
import { CardsContainer } from '../../containers';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../../../graphql';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonsAsync } from '../../../redux';

export default function HomePage() {
  const {pokemons, loading} = useSelector((store: any) => store);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonsAsync());
  }, []);

  return (
    <section className="root color-primary-bg">
      <Header />
      <Layout>
        <CardsContainer data={pokemons} loading={loading} />
      </Layout>
    </section>
  )
}
