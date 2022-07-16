import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import PokeInfo from "./PokeInfo";
import PokemonCard from "./PokemonCard";
const baseUrl = "https://pokeapi.co/api/v2/pokemon/";
const Body = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(baseUrl);
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();
  const [modalStatus, setModalStatus] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState("");
  const [filterApplied, setFilterApplied] = useState(false);

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    if (res.data.next || res.data.previous || res.data.results) {
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
      getPokemon(res.data.results);
    } else {
      setNextUrl("");
      setPrevUrl("");
      setPokeData((state) => {
        state = [res.data];
        return state;
      });
    }
    setLoading(false);
  };

  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  useEffect(() => {
    if (url) {
      pokeFun();
    }
  }, [url]);

  return (
    <div
      class="w-full p-6 "
      onClick={() => modalStatus && setModalStatus(false)}
    >
      <input
        class=" w-full border-violet-500"
        value={searchBarValue}
        placeholder="Search pokemon by pressing name or id..."
        onChange={(e) => {
          setSearchBarValue(e.target.value);
        }}
        onKeyUp={(event) => {
          console.log(url, searchBarValue);
          if (event.key === "Enter" && searchBarValue) {
            setUrl(baseUrl + searchBarValue.toLowerCase());
          } else if (searchBarValue === "") {
            setUrl(baseUrl);
          }
        }}
        id={"search"}
        name={"search"}
      />
      <div class="flex justify-center flex-wrap">
        <PokemonCard
          pokemon={pokeData}
          loading={loading}
          infoPokemon={(poke) => setPokeDex(poke)}
          setModalStatus={setModalStatus}
        />
      </div>
      <div class="flex justify-center flex-wrap gap-x-2.5">
        {prevUrl && (
          <button
            onClick={() => {
              setPokeData([]);
              setUrl(prevUrl);
            }}
            class="px-5 py-1 bg-blue-700 text-white rounded-md"
          >
            Previous
          </button>
        )}
        {nextUrl && (
          <button
            onClick={() => {
              setPokeData([]);
              setUrl(nextUrl);
            }}
            class="px-5 py-1 bg-blue-700 text-white rounded-md"
          >
            Next
          </button>
        )}
      </div>
      {modalStatus && (
        <Modal setModalStatus={setModalStatus}>
          <PokeInfo data={pokeDex} />
        </Modal>
      )}
    </div>
  );
};

export default Body;
