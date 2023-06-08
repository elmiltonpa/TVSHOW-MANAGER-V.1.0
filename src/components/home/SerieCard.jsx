import { useNavigate } from "react-router-dom";
import useSeries from "../../utils/useSeries";

const BASE_URL = "https://image.tmdb.org/t/p/w500/";

const SerieCard = ({ serie, token, user, setSeriesAdded, seriesAdded }) => {
  const navigate = useNavigate();
  const { handleSubmit, handleDelete } = useSeries();

  return (
    <div className="flex my-3 w-full bg-blanco">
      <div className="gap-x-2 w-[78%] border-r-4">
        <div className="flex gap-x-2">
          <div className="h-full ">
            <img className="" src={BASE_URL + serie.poster_path} width={200} />
          </div>
          <div className="h-[300px] w-[73%] flex flex-col flex-1 pr-5 pl-3 justify-between py-3 items-center">
            <div className="flex flex-col gap-y-2 items-center h-[80%]">
              <h1 className="text-3xl font-black font-lato text-center">
                {serie.name}
              </h1>
              <p className="text-base overflow-auto  font-overview text-center">
                {serie.overview}
              </p>
            </div>
            <div className="items-center border-t-2 w-full flex justify-center">
              {seriesAdded.includes(serie.id) ? (
                <button
                  onClick={(e) =>
                    handleDelete(e, serie.id, setSeriesAdded, seriesAdded)
                  }
                  className="text-lg hover:bg-purpuraoscuro hover:text-blanco px-10 font-semibold text-amarillo3"
                >
                  QUITAR DE FAVORITOS
                </button>
              ) : (
                <button
                  onClick={(e) =>
                    handleSubmit(
                      e,
                      serie.id,
                      user,
                      token,
                      setSeriesAdded,
                      seriesAdded
                    )
                  }
                  className="text-lg hover:bg-purpuraoscuro hover:text-blanco px-10 font-semibold text-purpuraoscuro"
                >
                  AGREGAR A FAVORITOS
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[22%] bg-purpuraoscuro py-1 px-5">
        <div className="flex h-full flex-col justify-between py-[10px] w-full items-center">
          <div>
            <span className="text-3xl font-semibold text-blanco">
              {serie.first_air_date.slice(0, 4)}
            </span>
          </div>
          <div>
            <div className="text-center text-blanco">
              {serie.genres.map((genre) => genre.name).join(", ")}
            </div>
          </div>
          <div className="text-center">
            <div>
              <h2 className="text-blanco text-lg">
                Seasons: <span>{serie.number_of_seasons}</span>
              </h2>
            </div>
            <div className="">
              <h2 className="text-blanco text-lg">
                Episodes: <span>{serie.number_of_episodes}</span>
              </h2>
            </div>
          </div>
          <div>
            <h2 className="text-amarillo text-2xl font-semibold">
              {parseFloat(serie.vote_average.toFixed(2))}
            </h2>
          </div>
          <div className="">
            <button
              onClick={() => navigate(`/home/${serie.id}`)}
              className="text-lg hover:bg-blanco hover:text-purpuraoscuro px-10  text-blanco font-semibold text-"
            >
              VER DETALLES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SerieCard;