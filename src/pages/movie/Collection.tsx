import useCollection from "@/hooks/useCollection";
import TMDB from "@/services/tmdb";
import DetailSection from "./DetailSection";
import { MovieDetailComponent } from "./[id]";

const Collection = ({ movie }: MovieDetailComponent) => {
  const { collection, loading } = useCollection(movie.belongs_to_collection.id);

  if (loading) return <p>Loading...</p>;
  if (!collection) return <p>Collection not found...</p>;

  return (
    <DetailSection title="Collection">
      <div
        className="card bg-base-100 shadow-xl img-full h-80"
        style={{
          backgroundImage: `url(${TMDB.getImageUrl(
            movie.belongs_to_collection.backdrop_path,
            "w1280"
          )})`,
        }}
      >
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