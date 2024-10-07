import React, { useEffect } from 'react';
import { Header, Pagination } from '../../components';
import { Layout } from '../../layouts';
import { CardsContainer } from '../../containers';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../../../graphql';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonsAsync } from '../../../redux';
import { usePagination } from '../../../hooks';

export default function HomePage() {
  const {pokemons, maxItems, loading} = useSelector((store: any) => store);
  const { page, limit, offset, nextPage, prevPage, backToHome } = usePagination();
  
  let perPage = 12;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonsAsync(limit, offset));
  }, [page]);

  return (
    <section className="w-100 root color-primary-bg">
      <Header />
      <Layout>
        <CardsContainer data={pokemons} loading={loading} />
      </Layout>

      <Pagination
        page={page}
        perPage={perPage}
        prevPage={prevPage}
        nextPage={nextPage}
        maxItems={maxItems}
      />
    </section>
  )
}
