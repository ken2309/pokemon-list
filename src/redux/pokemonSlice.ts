import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./status";
import pokemonApi from "../apis/pokemonApi";
import { IPokemon } from "../types/IPokemon";


export const fetchAsyncPokemon = createAsyncThunk(
  "POKEMON/fetchAsyncPokemon",
  async () => {
    try {
      const res = await pokemonApi.getPokemon();
      const resResult = res.data.results;
      const resultLength = res.data.results.length;
      const pokemonDetailArr = [];
      const perPage = 48;

      if (resultLength > 0) {
        if (resultLength > perPage) {
          let i = 0;
          do {
            const resp = await pokemonApi.getPokemonDetail(resResult[i].url.split("/").filter(Boolean).pop() + '');
            pokemonDetailArr.push(resp.data)
            i++;
          } while (i < perPage)
        }
        else {
          resResult.forEach(async (item: { name: string, url: string }) => {
            const resp = await pokemonApi.getPokemonDetail(item.url.split("/").filter(Boolean).pop() + '');
            pokemonDetailArr.push(resp.data)
          });
        }
      }
      return { ...res.data, currentList: pokemonDetailArr };
    } catch (error) {
      console.log(error);
    }
  }
);

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
      state.currentList = [ ...action.payload?.currentList ]
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