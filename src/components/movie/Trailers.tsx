import DetailSection from "./DetailSection";

import { DetailComponentProps } from "../../pages/movie/[id]";
import YouTube from "react-youtube";
import React from "react";
import Movie from "@/models/movie";

const Trailers = ({ item }: DetailComponentProps) => {
  item = item as Movie;
  const {
    videos: { results: videos },
  } = item;
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
          </div>
        ))}
      </div>
    </DetailSection>
  );
};

export default Trailers;
