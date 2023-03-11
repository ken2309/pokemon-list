import axiosClient from "./axios";
import { Api_get_all } from "../types/IApi";
class PokemonApi {
    getPokemon = () => axiosClient.get('/pokemon', { params: { limit: 1200 } });
    // getPokemon = (values: Api_get_all) => {
    //     const url = "/pokemon";
    //     const paramsOb = {
    //         page: values.page || 1,
    //         limit: values.limit || 1200
    //     }
    //     return axiosClient.get(url, { params: paramsOb })
    // };
    getPokemonDetail = (values: number | string) => axiosClient.get(`/pokemon/${values}`);

    getType = () => axiosClient.get('/type');
    getTypeDetail = (values: number | string) => axiosClient.get(`/type/${values}`);
}

const pokemonApi = new PokemonApi();
export default pokemonApi;
