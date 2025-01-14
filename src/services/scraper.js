import axios from "axios";


const APIURL = "http://localhost:3002/api/scraper";

// credentrials = {token, url, id}

const scraper = async (credentials) => {
  const request = await axios.post(`${APIURL}/save`, credentials);
  return request;
};

const getLinks = async (credentials) => {
  const { idSerie, username } = credentials;
  const request = await axios.get(`${APIURL}/links`, {
    params: { idSerie, username }
  });
  return request;
}

export default { scraper, getLinks };