import Collection from "@/models/collection";
import Movie from "@/models/movie";
import TMDB from "@/services/tmdb";
import { useEffect, useState } from "react";

const useCollection = (id: number) => {
  const [collection, setCollection] = useState<Collection>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    TMDB.get<Collection>(`/collection/${id}`)
      .then(({ data }) => {
        setCollection(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  return { collection, loading };
};

export default useCollection;
