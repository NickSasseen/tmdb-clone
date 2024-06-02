import Link from "next/link";
import DetailSection from "./DetailSection";

import { MovieDetailComponent } from "./[id]";
import TMDB from "@/services/tmdb";

const Recommendations = ({ movie }: MovieDetailComponent) => {
  const {
    recommendations: { results: recs },
  } = movie;
  return (
    <DetailSection title="Recommendations">
      <div className="carousel carousel-start">
        {recs
          .filter((r) => !!r.backdrop_path)
          .map((rec, index) => (
            <div className="carousel-item pr-2" key={index}>
              <Link href={`/movie/${rec.id}`}>
                <div className="card w-96 bg-base-100 shadow-xl image-full">
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
                {/* <img src={TMDB.getImageUrl(rec.backdrop_path)} alt={rec.title} /> */}
              </Link>
            </div>
          ))}
      </div>
    </DetailSection>
  );
};

export default Recommendations;