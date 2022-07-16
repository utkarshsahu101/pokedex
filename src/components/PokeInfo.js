import React from "react";

const PokeInfo = ({ data }) => {
  return (
    <>
      {!data ? (
        ""
      ) : (
        <>
          <div
            class="flex justify-between flex-wrap gap-8"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <img
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.id}.svg`}
              alt=""
              className="md:w-3/6 w-7/12 md:mx-0 mx-auto"
            />
            <div className=" md:mx-0 mx-auto">
              <h1 class="uppercase font-bold">{data.name}</h1>
              <div className="base-stat flex-col">
                {data.stats.map((poke) => {
                  return (
                    <h3>
                      {poke.stat.name}:{poke.base_stat}
                    </h3>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default PokeInfo;
