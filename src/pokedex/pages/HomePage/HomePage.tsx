import React, { useEffect } from 'react';
import { Header, Pagination } from '../../components';
import { Layout } from '../../layouts';
import { CardsContainer } from '../../containers';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../../../graphql';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonsAsync, getPokemonsByTypeAsync } from '../../../redux';
import { usePagination } from '../../../hooks';
import { useSearchParams } from 'react-router-dom';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const {pokemons, maxItems, loading} = useSelector((store: any) => store);
  const { page, limit, offset, nextPage, prevPage, backToHome } = usePagination();

  const type = searchParams.get("type");
  
  let perPage = 12;

  const dispatch = useDispatch();

  useEffect(() => {
    if (type) {
      dispatch(getPokemonsByTypeAsync(limit, offset, type!));
    } else {
      dispatch(getPokemonsAsync(limit, offset));
    }
  }, [page, type]);

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
