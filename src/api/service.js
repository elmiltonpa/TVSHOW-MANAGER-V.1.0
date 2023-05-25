import axios from "axios";
import getApiKey from "../services/getApikey";

const API_KEY = await getApiKey();

// const API_KEY = "a80c7159f4cda3c1c89186637908e44f";

const searchTvSeasonById = async (id, number) => {
  const request = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}/season/${number}?api_key=${API_KEY}&language=es`
  );
  return request.data;
};

const searchTvShow = async (query) => {
  const request = await axios.get(`
    https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=es&query=${query}`);
  return request.data;
};

const searchTvShowById = async (id) => {
  const request = await axios.get(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=es`
  );
  return request.data;
};

const popularTvShow = async () => {
  const request = await axios.get(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=es`
  );
  return request.data;
};
export default {
  searchTvShow,
  popularTvShow,
  searchTvShowById,
  searchTvSeasonById,
};
