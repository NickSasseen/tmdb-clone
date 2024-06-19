import DetailSection from "../shared/detail-section";
import { DetailComponentProps } from "../../pages/movie/[id]";
import Movie from "@/models/movie";

const Keywords = ({ item }: DetailComponentProps) => {
  item = item as Movie;

  return (
    <DetailSection title="Keywords">
      <div className="flex flex-wrap">
        {item.keywords.keywords.map((keyword, index) => (
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
