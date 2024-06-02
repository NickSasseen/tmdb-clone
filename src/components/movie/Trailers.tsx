import DetailSection from "./DetailSection";

import { MovieDetailComponentProps } from "../../pages/movie/[id]";
import YouTube from "react-youtube";
import React from "react";

const Trailers = ({ movie }: MovieDetailComponentProps) => {
  const {
    videos: { results: videos },
  } = movie;
  const trailers = videos.filter((v) => v.type === "Trailer");

  return (
    <DetailSection title="Trailers">
      <div className="carousel">
        {trailers.map((trailer, index) => (
          <div className="carousel-item max-w-screen" key={trailer.key}>
            <YouTube videoId={trailer.key} />
          </div>
        ))}
      </div>
    </DetailSection>
  );
};

export default Trailers;
