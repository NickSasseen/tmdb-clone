import DetailSection from "./DetailSection";
import { MovieDetailComponent } from "./[id]";

const Keywords = ({ movie }: MovieDetailComponent) => {
  return (
    <DetailSection title="Keywords">
      <div className="flex flex-wrap">
        {movie.keywords.keywords.map((keyword, index) => (
          <button
            key={index}
            className="btn btn-outline btn-error text-md mr-2 my-1"
          >
            <span className="text-gray-50">{keyword.name}</span>
          </button>
        ))}
      </div>
    </DetailSection>
  );
};

export default Keywords;
