import React from "react";

const PokemonCard = ({ pokemon, loading, infoPokemon, setModalStatus }) => {
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((item) => {
          return (
            <div
              class="rounded w-48 h-50 m-5 bg-white shadow-lg"
              onClick={() => {
                infoPokemon(item);
                setModalStatus(true)
              }}
            >
              <p class="mx-2 py-2 text-center text-gray-700 font-semibold">
                <h2 class="uppercase">{item.name}</h2>
                <h2>{item.id}</h2>
                <p>
                  {item.types.map((type) => type["type"]["name"]).join(", ")}
                </p>
                <img src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${item.id}.svg`} alt="" class="mx-auto w-1/2" />
              </p>
            </div>
          );
        })
      )}
    </>
  );
};

export default PokemonCard;
