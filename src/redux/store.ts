import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./pokemonSlice";
import pokemonTypeSlice from "./pokemonTypeSlice";

const rootReducer = {
  POKEMON_TYPE: pokemonTypeSlice,
  POKEMON: pokemonSlice,
};
const store = configureStore({
    reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch
export default store;
