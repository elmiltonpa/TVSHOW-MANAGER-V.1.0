import { useEffect, useState } from "react";
import seriesService from "../services/series";
import getUser from "../services/user";
import { AiFillDelete } from "react-icons/ai";
import Spinner from "../components/shared/Spinner";
import { Link } from "react-router-dom";

const MySeries = () => {
  const [series, setSeries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const session = JSON.parse(window.localStorage.getItem("session"));

  const handleDelete = async (e, id, token) => {
    e.preventDefault();
    try {
      await seriesService.deleteSerie(id, token);
      setSeries(series.filter((serie) => serie.id != id));
    } catch (error) {
      console.log(error);
    }
  };

  const { token } = session;
  useEffect(() => {
    const session = JSON.parse(window.localStorage.getItem("session"));
    const { username } = session;
    const fetchSeries = async () => {
      const User = await getUser(username);
      const series = await seriesService.getSeriesByUserId(User.id);
      setSeries(series);
      setIsLoading(false);
    };
    if (session) {
      fetchSeries();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen bg-negro flex justify-center pt-20 text-blancoblanco">
        <Spinner />
      </div>
    );
  }

  console.log(series);
  return (
    <div className="h-[90vh] flex flex-col items-center bg-purpura">
      <div className="bg-blancoblanco w-[70%] h-full px-44">
        <div className="py-5 h-[13%]">
          <h1 className="text-4xl text-center font-overview font-semibold">
            Mis series
          </h1>
          <h3 className="text-xl text-center font-noto font-normal">
            Si eliminas la serie eliminas todos los datos
          </h3>
        </div>
        <div className="h-[87%] flex flex-col gap-4 py-4 items-center">
          {series.length > 0 ? (
            series.map((serie, index) => (
              <div
                key={index}
                className="bg-blancoblanco shadow-seriefav shadow-negro flex w-[70%] h-[12%] "
              >
                <div className="w-[90%] pl-12 flex justify-center items-center">
                  <Link to={`/home/${serie.tv_id}`}>
                    <h1 className="text-xl font-semibold">{serie.tv_title}</h1>
                  </Link>
                </div>
                <div className="w-[10%] hover:bg-negro">
                  <button
                    onClick={(e) => handleDelete(e, serie.id, token)}
                    className="w-full h-full text-lg flex justify-center items-center hover:text-blancoblanco"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-2xl font-semibold text-negro">
              No hay datos
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MySeries;