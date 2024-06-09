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
          <div
            className="carousel-item basis-7/12 md:basis-1/3 pr-4 max-w-screen"
            key={trailer.key}
          >
            <iframe
              className="w-full"
              src={"https://www.youtube.com/embed/" + trailer.key}
            ></iframe>
            {/* <YouTube videoId={trailer.key} iframeClassName="w-full" /> */}
          </div>
        ))}
      </div>
    </DetailSection>
  );
};

export default Trailers;
