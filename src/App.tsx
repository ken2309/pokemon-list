import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import { fetchAsyncPokemon, IPokemonSilce } from './redux/pokemonSlice';

import { fetchAsyncType, IPokemonTypeSilce } from './redux/pokemonTypeSlice';
import { STATUS } from './redux/status';
import { AppDispatch } from './redux/store';

function App() {
  let isRender = false;
  const dispatch = useDispatch<AppDispatch>();
  const listType: IPokemonTypeSilce = useSelector((state: any) => state.POKEMON_TYPE)
  const listPoke: IPokemonSilce = useSelector((state: any) => state.POKEMON)
  useEffect(
    () => {
      //== START initialize function
      if (!isRender) {
        dispatch(fetchAsyncType())
        dispatch(fetchAsyncPokemon())
        // eslint-disable-next-line react-hooks/exhaustive-deps
        isRender = true;
      }
      //== END initialize function

    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  console.log("======= listType =======");
  console.log(listType);
  console.log("=========================");
  console.log("======= listPoke =======");
  console.log(listPoke);
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
                    {listType.TYPE?.results?.map((item, index) =>
                      <button className='px-2 py-2 mx-2 my-2 border-red-900 border-2 rounded-md font-bold text-red-900' key={index}>
                        {item.name}
                      </button>
                    )}
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
              `${listPoke.POKEMON.count} results found.`
          }
        </div>
      </section>

      <section className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4'>
        {
          listPoke.status === STATUS.IDLE || listPoke.status === STATUS.LOADING ?
            <>loading</>
            :
            listPoke.status === STATUS.SUCCESS ?
              listPoke.currentList.map((item, index) =>
                <div key={index}>
                  <div className='h-24 w-24 mx-auto'>
                    <img src={item.sprites.other['official-artwork'].front_default} alt={item.name} title={item.name} loading="lazy" width="100" height="100" />
                  </div>
                  <div className='text-center'>
                    {item.name}
                  </div>
                </div>
              )
              :
              <>FAILED</>
        }
      </section>
      <div className="mt-8 flex justify-center">
        <button className="p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none" disabled={true}>Prev</button>
        <button className="p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none">Next</button></div>
    </div>
  );
}

export default App;
