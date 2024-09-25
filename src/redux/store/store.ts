import thunk from "redux-thunk";
import { createStore, applyMiddleware  } from "redux";

import { pokemonReducer } from "../reducers/pokemonReducer";


export const store = createStore(
    pokemonReducer,
    applyMiddleware(thunk)
);