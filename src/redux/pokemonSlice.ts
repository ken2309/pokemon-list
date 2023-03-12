import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./status";
import pokemonApi from "../apis/pokemonApi";
import { IPokemonType, IPokemon } from "../types/IPokemon";
import { perPage } from "../constant";


export const fetchAsyncPokemon = createAsyncThunk(
  "POKEMON/fetchAsyncPokemon",
  async () => {
    try {
      const res = await pokemonApi.getPokemon();
      let pokemonDetailArr: any = [];
      return { ...res.data, currentList: pokemonDetailArr };
    } catch (error) {
      console.log(error);
    }
  }
);

// export const fetchAsyncPokemonDetail = createAsyncThunk('POKEMON/fetchAsyncPokemonDetail', async (item: { name: string; url: string }) => {
//   try {
//     const res = await pokemonApi.getPokemonDetail(item.url.split("/").filter(Boolean).pop() + '');
//     return
//   } catch (error) {
//     console.log(error);
//   }
// })


export interface IPokemonSilce {
  POKEMON: {
    count: number;
    next: any;
    previous: any;
    results: { name: string, url: string }[]
  },
  currentList: IPokemon[],
  status: string
}

const initialState: IPokemonSilce = {
  POKEMON: {
    count: 0,
    next: null,
    previous: null,
    results: [{ name: '', url: '' }]
  },
  currentList: [],
  status: STATUS.IDLE
};

const pokemonSlice = createSlice({
  name: "POKEMON",
  initialState,
  reducers: {
    onChooseType: (state, { payload }) => {
      // state = payload;
    },
    onSetEmptyType: (state) => {
      // state.choose_cate = null
    }
  },
  extraReducers: (builder) => {
    //* START FETCHING TYPE Function
    builder.addCase(fetchAsyncPokemon.pending, (state, action) => {
      console.log("fetchAsyncPokemon.pending");
      state.status = STATUS.LOADING
    })
    builder.addCase(fetchAsyncPokemon.fulfilled, (state, action) => {
      console.log("fetchAsyncPokemon.fulfilled");
      state.POKEMON = { ...action.payload }
      state.currentList = [...action.payload?.currentList]
      state.status = STATUS.SUCCESS
    })
    builder.addCase(fetchAsyncPokemon.rejected, (state, action) => {
      console.log("fetchAsyncPokemon.rejected");
      state.status = STATUS.FAIL
    })
    //* END FETCHING TYPE Function
  }
});
const { actions } = pokemonSlice;
export const { onChooseType, onSetEmptyType } = actions;
export default pokemonSlice.reducer;