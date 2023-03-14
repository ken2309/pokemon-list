import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "./status";
import pokemonApi from "../apis/pokemonApi";
import { IPokemonType } from "../types/IPokemon";


export const fetchAsyncType = createAsyncThunk(
  "POKEMON_TYPE/fetchAsyncType",
  async () => {
    try {
      const res = await pokemonApi.getType();
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
    results: IType[],
  },
  TYPE_DETAIL: IPokemonType[]
  status: string;
}

export interface IType {
  name: string,
  url: string,
  isActive: boolean
}

const initialState: IPokemonTypeSilce = {
  TYPE: {
    count: 0,
    next: null,
    previous: null,
    results: [{ name: '', url: '', isActive: false }]
  },
  TYPE_DETAIL: [],
  status: STATUS.IDLE
};

const pokemonTypeSlice = createSlice({
  name: "POKEMON_TYPE",
  initialState,
  reducers: {
    pushTypeDetail: (state, { payload }) => {
      state.TYPE_DETAIL.push(payload);
      // console.log(payload);
    },
    onChooseType: (state, { payload }) => {
      state.TYPE.results[payload].isActive = !state.TYPE.results[payload].isActive;
    },
    onSetEmptyType: (state) => {
      // state.choose_cate = null
    }
  },
  extraReducers: (builder) => {
    //* START FETCHING TYPE Function
    builder.addCase(fetchAsyncType.pending, (state, action) => {
      // console.log("fetchAsyncType.pending");
      state.status = STATUS.LOADING
    })
    builder.addCase(fetchAsyncType.fulfilled, (state, action) => {
      // console.log("fetchAsyncType.fulfilled");
      // let draftArr = { ...action.payload };
      // let draftObj;
      // for (let i = 0; i <= draftArr.results.length; i++) {
      //   draftObj = { ...draftArr.results[i] };
      //   draftArr.results[i] = {
      //     ...draftObj,
      //     isActive: false
      //   };
      // }
      state.TYPE = { ...action.payload }
      state.status = STATUS.SUCCESS
    })
    builder.addCase(fetchAsyncType.rejected, (state, action) => {
      // console.log("fetchAsyncType.rejected");
      state.status = STATUS.FAIL
    })
    //* END FETCHING TYPE Function
  }
});
const { actions } = pokemonTypeSlice;
export const { onChooseType, onSetEmptyType, pushTypeDetail } = actions;
export default pokemonTypeSlice.reducer;