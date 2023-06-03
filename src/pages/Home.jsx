import { useEffect, useRef, useState } from "react";
import SearchBar from "../components/SearchBar";
import api from "../api/service";
import SerieCard from "../components/SerieCard";
import { useLocation, useNavigate } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchSerie = ({ token, user }) => {
  const [serie, setSerie] = useState(null);
  const searchRef = useRef();
  const navigate = useNavigate();

  const query = useQuery();
  const search = query.get("s");

  const Filtro = (series) => {
    const newSeries = series.filter(
      (serie) =>
        serie.overview.length < 650 &&
        serie.overview !== "" &&
        serie.poster_path !== null
    );

    return newSeries;
  };

  useEffect(() => {
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }

    searchRef.current = setTimeout(async () => {
      if (search === null || search === "") {
        const response = await api.popularTvShow().then((res) => res);
        const promesas = response.results.map((serie) =>
          api.searchTvShowById(serie.id)
        );
        Promise.all(promesas).then((data) => {
          setSerie(Filtro(data));
        });
      } else {
        const response = await api.searchTvShow(search).then((res) => res);

        const promesas = response.results.map((serie) =>
          api.searchTvShowById(serie.id)
        );

        Promise.all(promesas).then((data) => {
          setSerie(Filtro(data));
        });
      }
    }, 1000);

    if (!search) {
      navigate("/home");
    }
  }, [search, navigate]);

  useEffect(() => {
    document.title = "Home - TvShowManager";
  }, []);

  return (
    <div
      className={`${
        serie && serie.length == 1 ? "h-screen" : ""
      } bg-negro px-32 py-2`}
    >
      <div className="">
        <SearchBar setSerie={setSerie} />

        {serie ? (
          serie.length == 0 ? (
            <div className="h-screen text-blanco text-3xl flex justify-center">
              No se encontraron series :(
            </div>
          ) : (
            serie.map((serieItem) => (
              <div
                className="flex-col gap-3 h-full bg-grisclaro"
                key={serieItem.id}
              >
                <SerieCard serie={serieItem} token={token} user={user} />
              </div>
            ))
          )
        ) : (
          <div className="h-screen text-blanco text-3xl flex justify-center">
            Cargando...
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSerie;