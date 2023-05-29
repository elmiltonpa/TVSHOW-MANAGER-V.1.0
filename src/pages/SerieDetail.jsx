/* eslint-disable indent */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/service";
import { useNavigate } from "react-router-dom";
import getUser from "../services/user";
import serieService from "../services/series";
import SerieProfile from "../components/SerieProfile";

const IMG = "https://image.tmdb.org/t/p/w500/";

const SerieDetail = ({ token, user }) => {
  const [serie, setSerie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();

  const handleSubmit = async (e, serieId) => {
    e.preventDefault();
    try {
      if (!token) {
        navigate("/login");
        return;
      }

      const User = await getUser(user.username);

      const userSeries = await serieService.getSeriesByUserId(User.id);

      const serieAlreadyAdded = userSeries.some(
        (serie) => serie.tv_id == serieId
      );

      if (serieAlreadyAdded) {
        console.log("serie ya agregada");
        return;
      }

      await serieService.createSerie({ id: serieId }, token);
    } catch (error) {
      console.log("no hay token pa");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const request = await api.searchTvShowById(id);
      setSerie(request);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center pb-56 bg-blancoblanco text-3xl font-bold">
        Cargando...
      </div>
    );
  }

  return (
    <div className=" bg-negro pb-10">
      <div className=" bg-neg flex justify-center pb-10 pt-10">
        <div className="w-[75%] bg-blanco p-5 rounded-md flex flex-col gap-3">
          <div className="flex gap-4">
            <img
              className="h-full rounded-lg"
              width={270}
              src={IMG + serie.poster_path}
              alt=""
            />
            <div className="">
              <div className="flex gap-1 ">
                <h1 className="text-negro text-4xl pb-3 font-bold">
                  {serie.name}
                </h1>
              </div>
              <h1 className="pt-1 font-mono">
                {serie.tagline ? `"${serie.tagline}"` : null}
              </h1>
              <div className="flex py-2">
                <h3 className="text-purpuraoscuro text-xl font-black font-lato">
                  {serie.first_air_date.slice(0, 4)}
                </h3>
                <span
                  className={`px-5 font-bold ${
                    serie.status == "Ended"
                      ? "text-rojo"
                      : `${
                          serie.status == "Returning Series"
                            ? "text-verde"
                            : `${
                                serie.status == "Canceled" ? "text-negro" : null
                              }`
                        }`
                  }`}
                >
                  {serie.status}
                </span>
              </div>
              <p className="py-2 border-t-2 font-overview font-medium text-lg">
                {serie.overview}
              </p>
            </div>
          </div>
          <div className="flex justify-evenly gap-44">
            <div>
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl font-semibold text-purpuraoscuro">
                  TEMPORADAS: {serie.number_of_seasons}
                </h1>
                <h1 className="text-xl font-semibold text-purpuraoscuro">
                  EPISODIOS: {serie.number_of_episodes}
                </h1>
              </div>
            </div>
            <div className="items-center pl-4 flex flex-col justify-center">
              <h1 className="text-lg font-normal">
                {serie.created_by.length > 0
                  ? `Created by: ${serie.created_by
                      .map((created) => created.name)
                      .join(", ")}`
                  : null}
              </h1>
              <h1 className="text-lg font-medium">
                {serie.genres.map((genre) => genre.name).join(", ")}
              </h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-purpuraoscuro text-2xl font-black">
                {parseFloat(serie.vote_average.toFixed(1))}/10
              </h2>
              <span className="font-medium">
                {serie.vote_count} votos de usuarios
              </span>
            </div>
          </div>
          <div className="w-full border-t-2 flex py-3 justify-center">
            <button
              className="text-lg hover:bg-purpuraoscuro hover:text-blancoblanco px-10 font-semibold text-purpuraoscuro"
              onClick={(e) => handleSubmit(e, id)}
            >
              AGREGAR A FAVORITOS
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="w-[75%] ">
          <SerieProfile />
        </div>
      </div>
    </div>
  );
};

export default SerieDetail;