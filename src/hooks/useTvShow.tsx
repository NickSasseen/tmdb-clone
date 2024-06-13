import TvShow from "@/models/tv-show";
import TMDB from "@/services/tmdb";
import { useEffect, useState } from "react";

const useTvShow = (id: number) => {
  const [tvShow, setTvShow] = useState<TvShow>();
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

    TMDB.get<TvShow>(
      `/tv/${id}?append_to_response=${appendToResponse.join(
        ","
      )}&include_image_language=en&language=en-US`
    )
      .then(({ data }) => {
        console.log("tv show", data);
        setTvShow(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  return { tvShow, loading };
};

export default useTvShow;
