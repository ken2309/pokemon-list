import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import pokemonApi from "../apis/pokemonApi";
import { filterPokemon } from "../redux/pokemonSlice";
import { IType, onChooseType, pushTypeDetail } from "../redux/pokemonTypeSlice";
import { IPokemonType } from "../types/IPokemon";

const BtnType = (values: any) => {
  const dispatch = useDispatch();
  let isRender = false;
  const { type, index, typeDetail, listTypeOnChoose, curPokemonList }: { type: IType, index: number, typeDetail: IPokemonType, listTypeOnChoose: IType[], curPokemonList: { name: string, url: string }[] } = values;
  let btnClass = "px-2 py-2 mx-2 my-2 border-red-900 border-2 rounded-md font-bold ";
  (type && type.isActive) ? btnClass += "text-white bg-red-900" : btnClass += "text-red-900";
  const handleTypeClick = (idx: number) => {
    let typeActive;
    if (listTypeOnChoose.length === 1 && listTypeOnChoose[0].name === type.name) {
      typeActive = "ide";
    }
    else if (listTypeOnChoose.length === 0 && !type.isActive) {
      typeActive = "first";
    }
    else {
      typeActive = !type.isActive;
    }
    console.log({ isActive: typeActive, type_name: type.name, pokemonList: handleFlatPokemonArray(typeDetail.pokemon) });
    dispatch(onChooseType(idx));
    dispatch(filterPokemon({ isActive: typeActive, type_name: type.name, pokemonList: handleFlatPokemonArray(typeDetail.pokemon), curPokemonList: curPokemonList }));
  }
  const fetchDetailType = async () => {
    const res = await pokemonApi.getTypeDetail(type.url.split("/").filter(Boolean).pop() + '');
    dispatch(pushTypeDetail(res.data));

    // console.log(res);
  }
  useEffect(() => {
    if (!isRender) {
      fetchDetailType();
    }
    return () => {
      isRender = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // console.log("BTN Type =====", values);
  return (
    <button onClick={() => handleTypeClick(index)} className={btnClass} key={index}>
      {type?.name}
    </button>
  )
}

// util function 
function handleFlatPokemonArray(poArr: { pokemon: { name: string, url: string }, slot: number }[]) {
  let res: { name: string, url: string }[] = [];
  poArr.forEach(e => res.push({
    name: e.pokemon.name,
    url: e.pokemon.url
  }))
  return res;
}
export default React.memo(BtnType);

