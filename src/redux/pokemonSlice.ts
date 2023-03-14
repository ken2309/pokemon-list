import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./status";
import pokemonApi from "../apis/pokemonApi";
import { IPokemon } from "../types/IPokemon";
import { perPage } from "../constant";


export const fetchAsyncPokemon = createAsyncThunk(
  "POKEMON/fetchAsyncPokemon",
  async () => {
    try {
      const res = await pokemonApi.getPokemon();
      return { ...res.data };
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
  currentList: { name: string, url: string }[],
  savingList: string[],
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
  savingList: ["{ type_name: '', pokemon: [] }"],
  status: STATUS.IDLE
};

const pokemonSlice = createSlice({
  name: "POKEMON",
  initialState,
  reducers: {
    pushToSavingList: (state, { payload }) => {
      console.log("======= pushToSavingList =======");
      // console.log(payload);
    },

    filterPokemon: (state, { payload }) => {
      let curArr = [...payload.curPokemonList];
      let saveArr = [...state.savingList];
      switch (payload.isActive) {
        case "first":
          curArr = [...payload.pokemonList];
          let obj = { type_name: payload.type_name, pokemon: [...payload.pokemonList] };
          saveArr = [JSON.stringify(obj)];
          break;
        case true:
          let draftArr: { name: string, url: string }[] = [];
          let obj2 = { type_name: payload.type_name, pokemon: [...payload.pokemonList] };
          saveArr.push(JSON.stringify(obj2));
          draftArr = payload.curPokemonList.filter((e: { name: string, url: string }) => [...payload.pokemonList].some((i: { name: string, url: string }) => e.name === i.name));
          curArr = [...draftArr];
          break;
        case false:
          let obj3 = { type_name: payload.type_name, pokemon: [...payload.pokemonList] };
          let idx = saveArr.findIndex(e => e === JSON.stringify(obj3));
          if (idx > -1) {
            saveArr.splice(idx, 1);
          }
          console.log([...payload.pokemonList], [...payload.curPokemonList])
          let draft2 = saveArr.map(e => JSON.parse(e));
          let draft3: any = [];
          draft2.forEach((e: any) => { draft3.push(...e.pokemon) });
          curArr = [...draft3]
          console.log(curArr);
          break;
        default:
          curArr = state.POKEMON.results;
          break;
      }
      state.currentList = [...curArr];
      state.savingList = [...saveArr]
    }
  },
  extraReducers: (builder) => {
    //* START FETCHING TYPE Function
    builder.addCase(fetchAsyncPokemon.pending, (state, action) => {
      state.status = STATUS.LOADING
    })
    builder.addCase(fetchAsyncPokemon.fulfilled, (state, action) => {
      state.POKEMON = { ...action.payload }
      state.currentList = [...action.payload?.results];
      state.status = STATUS.SUCCESS
    })
    builder.addCase(fetchAsyncPokemon.rejected, (state, action) => {
      state.status = STATUS.FAIL
    })
    //* END FETCHING TYPE Function
  }
});
const { actions } = pokemonSlice;
export const { pushToSavingList, filterPokemon } = actions;
export default pokemonSlice.reducer;