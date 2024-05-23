import axios, { RawAxiosRequestHeaders } from "axios";

const TMDB_API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmU5ZjhhOTkwNmZkZGFlYjY0YmNlZTQ4NGUzN2IwYSIsInN1YiI6IjYxMzkxYjVmOWYwZTE5MDA2N2Y1M2I2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t-F2xTDFZSAZqYuPQVRaIeho_5s6_PJVqyLKnQh9itI";
const TMDB_IMG_BASE = "https://image.tmdb.org/t/p";
const TMDB_URL_BASE = "https://api.themoviedb.org/3";

const TMDB_HEADERS: RawAxiosRequestHeaders = {
  Accept: "application/json",
  Authorization: `Bearer ${TMDB_API_KEY}`,
};

const TMDB = {
  get: <T,>(url: string, params?: string) => {
    return axios<T>({
      baseURL: TMDB_URL_BASE,
      headers: TMDB_HEADERS,
      url: url,
      params: params,
    });
  },
  getImageUrl: (path: string, size: string = "w500") => {
    return `${TMDB_IMG_BASE}/${size}${path}`;
  },
};



export default TMDB;
export { TMDB_IMG_BASE };
