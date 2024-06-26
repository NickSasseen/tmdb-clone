import Link from "next/link";
import DetailSection from "../shared/detail-section";

import { DetailComponentProps } from "../../pages/movie/[id]";
import TMDB from "@/services/tmdb";
import Movie from "@/models/movie";

const Recommendations = ({ item }: DetailComponentProps) => {
  item = item as Movie;
  const {
    recommendations: { results: recs },
  } = item;
  return (
    <DetailSection title="Recommendations">
      <div className="carousel carousel-center">
        {recs
          .filter((r) => !!r.backdrop_path)
          .map((rec, index) => (
            <div className="carousel-item pr-2" key={index}>
              <Link href={`/movie/${rec.id}`}>
                <div className="card w-60 md:w-96 bg-base-100 shadow-xl image-full">
                  <figure>
                    <img
                      src={TMDB.getImageUrl(rec.backdrop_path)}
                      alt={rec.title}
                    />
                  </figure>
                  <div className="card-body justify-end">
                    <h2 className="card-title">{rec.title}</h2>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </DetailSection>
  );
};

export default Recommendations;
