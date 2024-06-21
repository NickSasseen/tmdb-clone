import TMDB from "@/services/tmdb";
import { HiArrowRight } from "react-icons/hi";
import { DetailComponentProps } from "../../pages/movie/[id]";
import DetailSection from "../shared/detail-section";
import Movie from "@/models/movie";

const Cast = ({ item }: DetailComponentProps) => {
  const movie = item as Movie;

  const topTenCastMembers = movie.credits.cast
    .sort((first, second) => second.popularity - first.popularity)
    .slice(0, 10);

  return (
    <DetailSection title="Top Billed Cast">
      <div className="carousel carousel-center p-4 space-x-4">
        {topTenCastMembers.map((castMember) => (
          <div key={castMember.id} className="carousel-item w-1/3 md:w-1/6">
            <div className="flex-col space-y-1">
              <img
                src={TMDB.getImageUrl(castMember.profile_path)}
                className="rounded-md"
              />
              <p className="font-semibold text-md">{castMember.name}</p>
              <p className="font-extralight text-sm">{castMember.character}</p>
            </div>
          </div>
        ))}
        <div className="carousel-item w-1/2 md:w-1/6">
          <div className="flex flex-1 justify-center items-center">
            <div className="flex items-center space-x-2">
              <p>View more</p>
              <HiArrowRight />
            </div>
          </div>
        </div>
      </div>
    </DetailSection>
  );
};

export default Cast;
