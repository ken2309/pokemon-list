import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./status";
import pokemonApi from "../apis/pokemonApi";


export const fetchAsyncType = createAsyncThunk(
  "POKEMON_TYPE/fetchAsyncType",
  async () => {
    try {
      const res = await pokemonApi.getType();
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export interface IPokemonTypeSilce {
  TYPE: {
    count: number;
    next: any;
    previous: any;
    results: { name: string, url: string }[]
  },
  status: string;
}

const initialState: IPokemonTypeSilce = {
  TYPE: {
    count: 0,
    next: null,
    previous: null,
    results: [{ name: '', url: '' }]
  },
  status: STATUS.IDLE
};

const pokemonTypeSlice = createSlice({
  name: "POKEMON_TYPE",
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
    builder.addCase(fetchAsyncType.pending, (state, action) => {
      console.log("fetchAsyncType.pending");
      state.status = STATUS.LOADING
    })
    builder.addCase(fetchAsyncType.fulfilled, (state, action) => {
      console.log("fetchAsyncType.fulfilled");
      state.TYPE = { ...action.payload }
      state.status = STATUS.SUCCESS
    })
    builder.addCase(fetchAsyncType.rejected, (state, action) => {
      console.log("fetchAsyncType.rejected");
      state.status = STATUS.FAIL
    })
    //* END FETCHING TYPE Function
  }
});
const { actions } = pokemonTypeSlice;
export const { onChooseType, onSetEmptyType } = actions;
export default pokemonTypeSlice.reducer;