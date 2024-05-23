import Movie from "@/models/movie";
import TMDB from "@/services/tmdb";
import { useEffect, useState } from "react";

const useMovie = (id: number) => {
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    TMDB.get<Movie>(`/movie/${id}?append_to_response=keywords,credits`)
      .then(({ data }) => {
        console.log("movie", data);
        setMovie(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  return { movie, loading };
};

export default useMovie;
