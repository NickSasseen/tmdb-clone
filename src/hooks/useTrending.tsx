import { PagedResponse } from "@/models";
import TMDB from "@/services/tmdb";
import { MediaType, MovieOrShow, TimeWindow } from "@/types";
import { useEffect, useState } from "react";

const useTrending = (timeWindow: TimeWindow, mediaType: MediaType = "all") => {
  const [tw, setTimeWindow] = useState(timeWindow);
  const [mt, setMediaType] = useState(mediaType);
  const [trending, setTrending] = useState<MovieOrShow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    TMDB.get<PagedResponse<MovieOrShow>>(`trending/${mt}/${tw}`)
      .then(({ data: { results } }) => {
        setTrending(results);
        console.log(results);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [tw, mt]);

  return {
    trending,
    timeWindow: tw,
    mediaType: mt,
    loading,
    setTimeWindow,
    setMediaType,
  };
};

export default useTrending;
