import { lazy, LazyExoticComponent } from "react";

type JSXComponent = () => JSX.Element;

interface Route {
    to: string;
    path: string;
    Component: LazyExoticComponent<JSXComponent> | JSXComponent;
    name: string;
}

const lazy1 = lazy(() => import(/* webpackChunkName: "LazyHomePage" */'../pokedex/pages/HomePage/HomePage'));
const lazy2 = lazy(() => import(/* webpackChunkName: "LazyDetailPage" */'../pokedex/pages/DetailPage/DetailPage'));
const lazy3 = lazy(() => import(/* webpackChunkName: "LazyFavoritesPage" */'../pokedex/pages/FavoritesPage/FavoritesPage'));

// Community
const lazy4 = lazy(() => import(/* webpackChunkName: "LazyFavoritesPage" */'../pokedex/community/pages/CommunityPage/CommunityPage'));
const lazy5 = lazy(() => import(/* webpackChunkName: "LazyFavoritesPage" */'../pokedex/community/pages/CreatePage/CreatePage'));
const lazy6 = lazy(() => import(/* webpackChunkName: "LazyFavoritesPage" */'../pokedex/community/pages/CommunityDetailPage/CommunityDetailPage'));


export const routes: Route[] = [
    {
        to: '/',
        path: '/',
        Component: lazy1,
        name: 'Home Page'
    },
    {
        to: '/pokemon',
        path: '/pokemon/:nameOrId',
        Component: lazy2,
        name: 'Detail Page'
    },
    {
        to: '/favorites',
        path: '/favorites',
        Component: lazy3,
        name: 'Favorites Page'
    },
    {
        to: '/community',
        path: '/community',
        Component: lazy4,
        name: 'Community Page'
    },
    {
        to: '/pokemon/create',
        path: '/pokemon/create',
        Component: lazy5,
        name: 'Create Pokemon Page'
    },
    {
        to: '/pokemon/edit/:id',
        path: '/pokemon/edit/:id',
        Component: lazy5,
        name: 'Edit Pokemon Page'
    },
    {
        to: '/pokemon/community/:id',
        path: '/pokemon/community/:id',
        Component: lazy6,
        name: 'Community Detail Page'
    }
]