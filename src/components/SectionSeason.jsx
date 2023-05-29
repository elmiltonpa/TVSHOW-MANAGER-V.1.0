import { useState } from "react";

const IMG = "https://image.tmdb.org/t/p/w500";

const SectionSeason = ({ season, episodes }) => {
  const [IsOpen, setIsOpen] = useState(false);
  console.log(episodes);
  return (
    <div className="h-full w-full">
      <div className="w-full flex justify-center items-center border-b-4 h-20">
        <button
          className="text-3xl w-full hover:text-blancoblanco font-semibold"
          onClick={() => setIsOpen(!IsOpen)}
        >
          Temporada {season}
        </button>
      </div>
      {IsOpen ? (
        <div className="h-full w-full bg-negropurpura">
          <div className="h-full w-full flex flex-col ">
            {episodes.map((episode) => (
              <div
                className="flex bg-blancoblanco border-b-[5px] border-negropurpura"
                key={episode.id}
              >
                <div className="">
                  <img width={250} src={IMG + episode.still_path} />
                </div>
                {/* <div className="w-[4%] items-center flex justify-center pb-4 text-xl  font-black text-purpuraoscuro">
                  <h1>
                    {season}x{episode.episode_number}
                  </h1>
                </div> */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex">
                    {/* <h1>Episode {episode.episode_number}</h1> */}
                    <h1 className="flex-1 pt-2 underline text-xl font-semibold flex justify-center items-center">
                      {episode.name}
                    </h1>
                  </div>
                  <div className="px-2">
                    <p className="text-center font-overview">
                      {episode.overview}
                    </p>
                  </div>
                  <div className="w-full  flex justify-center items-center text-xl  font-black text-purpuraoscuro">
                    <h1>
                      {season}x{episode.episode_number}
                    </h1>
                  </div>
                </div>
                <div className="w-[10%] bg-purpuraoscuro"></div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SectionSeason;
