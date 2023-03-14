import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import BtnType from './components/BtnType';
import PokemonDetail from './components/PokemonDetail';
import { perPage } from './constant';
import { fetchAsyncPokemon, IPokemonSilce } from './redux/pokemonSlice';

import { fetchAsyncType, IPokemonTypeSilce } from './redux/pokemonTypeSlice';
import { STATUS } from './redux/status';
import { AppDispatch } from './redux/store';

function App() {
  let isRender = false;
  const dispatch = useDispatch<AppDispatch>();
  const listType: IPokemonTypeSilce = useSelector((state: any) => state.POKEMON_TYPE)
  const listPoke: IPokemonSilce = useSelector((state: any) => state.POKEMON)
  const [dataRange, setRange] = useState([0, - perPage])
  useEffect(
    () => {
      //== START initialize function
      if (!isRender) {
        dispatch(fetchAsyncType())
        dispatch(fetchAsyncPokemon());
        // eslint-disable-next-line react-hooks/exhaustive-deps
        isRender = true;
      }
      // if (dataRange[1] < 0) { setRange([0, listPoke.POKEMON.results.length - perPage]); }
      //== END initialize function
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handlePaginationClick = (type: string) => {
    switch (type) {
      case "next":
        setRange([dataRange[0] + perPage, dataRange[1] - perPage]);
        break;
      case "prev":
        setRange([dataRange[0] - perPage, dataRange[1] + perPage]);
        break;
      default:
        break;
    }
  }
  console.log("home", listPoke.currentList[0]);
  return (
    <div className="App">
      <section className='mx-auto max-w-screen-xl'>
        <div className='flex items-center mx-4 my-4'>
          <div className='mr-2 my-4 font-bold self-start'>
            Types
          </div>
          <div>
            {
              listType.status === STATUS.IDLE || listType.status === STATUS.LOADING ?
                <>loading</>
                :
                listType.status === STATUS.SUCCESS ?
                  <div>
                    {listType.TYPE?.results?.map((item, index) => <BtnType key={index} type={item} listTypeOnChoose={listType.TYPE.results.filter(e => e.isActive)} typeDetail={listType.TYPE_DETAIL[index]} curPokemonList={listPoke.currentList} index={index} />)}
                  </div>
                  :
                  <>FAILED</>
            }
          </div>
        </div>
        <div className="my-12 mx-4 font-bold">
          {
            listPoke.status === STATUS.IDLE || listPoke.status === STATUS.LOADING ?
              <>loading</>
              :
              listPoke.status === STATUS.SUCCESS &&
              `${listPoke.currentList.length} results found.`
          }
        </div>
      </section>

      <section className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4'>
        {
          listPoke.status === STATUS.IDLE || listPoke.status === STATUS.LOADING ?
            <>loading</>
            :
            listPoke.status === STATUS.SUCCESS ?
              listPoke.currentList.slice(dataRange[0], -dataRange[1]).map((item, index) =>
                <PokemonDetail key={index} name={item.name} url={item.url} />
              )
              :
              <>FAILED</>
        }
      </section>
      {listPoke.status === STATUS.SUCCESS &&
        listPoke.POKEMON.results.length > perPage &&
        <div className="mt-8 flex justify-center">
          <button className="p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none" disabled={dataRange[0] === 0} onClick={() => handlePaginationClick('prev')}>Prev</button>
          <button className="p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none" disabled={dataRange[1] === listPoke.currentList.length || listPoke.currentList.length <= perPage} onClick={() => handlePaginationClick('next')}>Next</button>
        </div>
      }
    </div>
  );
}

export default App;
