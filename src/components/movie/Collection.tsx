import useCollection from "@/hooks/useCollection";
import TMDB from "@/services/tmdb";
import DetailSection from "./DetailSection";
import { MovieDetailComponentProps } from "../../pages/movie/[id]";

const Collection = ({ movie }: MovieDetailComponentProps) => {
  const { collection, loading } = useCollection(movie.belongs_to_collection.id);

  if (loading) return <p>Loading...</p>;
  if (!collection) return <p>Collection not found...</p>;

  return (
    <DetailSection title="Collection">
      <div className="card w-full bg-base-100 shadow-xl image-full">
        <figure>
          <img
            src={TMDB.getImageUrl(
              movie.belongs_to_collection.backdrop_path,
              "w1280"
            )}
            alt={movie.belongs_to_collection.name}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Part of the {collection.name}</h2>
          <p>
            Includes {collection.parts.map((movie) => movie.title).join(", ")}
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">View the collection</button>
          </div>
        </div>
      </div>
    </DetailSection>
  );
};

export default Collection;
