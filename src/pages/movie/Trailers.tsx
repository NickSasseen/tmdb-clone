import { DetailSection } from "./DetailSection";
import { MovieDetailComponent } from "./[id]";
import YouTube from "react-youtube";
import React from "react";

export const Trailers = ({ movie }: MovieDetailComponent) => {
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
