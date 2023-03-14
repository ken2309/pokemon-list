import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IPokemonSilce, pushToSavingList } from "../redux/pokemonSlice";
import pokemonApi from "../apis/pokemonApi";
import { IPokemon } from "../types/IPokemon";

const PokemonDetail = (props: { key: number; name: string, url: string }) => {
  const [poke, setPoke] = useState<IPokemon|null>();
  const dispatch = useDispatch();
  const listPoke: IPokemonSilce = useSelector((state: any) => state.POKEMON)

  const fetchDetailPokemon = async () => {
    const res = await pokemonApi.getPokemonDetail(props.url.split("/").filter(Boolean).pop() + '');
    // dispatch(pushToSavingList(res.data));
    setPoke(res.data);
  }
  useEffect(() => {
      setPoke(null);
      fetchDetailPokemon();
      // if (listPoke.savingList.filter(e => e.name === props.name).length <= 0) {
      // }
      // else {
      //   setPoke(listPoke.currentList.filter(e => e.name === props.name)[0]);
      // }
  }, [props.name])
  // console.log("PokemonDetail ====== ",props);
  return (
    <div>
      <div className='h-24 w-24 mx-auto'>
        <img src={poke?.sprites.other['official-artwork'].front_default} alt={props.name} title={props.name} loading="lazy" width="100" height="100" />
      </div>
      <div className='text-center'>
        {props.name}
      </div>
    </div>
  )
}
export default React.memo(PokemonDetail);