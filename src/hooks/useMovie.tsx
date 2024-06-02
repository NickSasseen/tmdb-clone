import Movie from "@/models/movie";
import TMDB from "@/services/tmdb";
import { useEffect, useState } from "react";

const useMovie = (id: number) => {
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => {
    setLoading(true);

    const appendToResponse = [
      "keywords",
      "credits",
      "images",
      "videos",
      "recommendations",
    ];

    TMDB.get<Movie>(
      `/movie/${id}?append_to_response=${appendToResponse.join(
        ","
      )}&include_image_language=en&language=en-US`
    )
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
