"use client";

import useTrending from "@/hooks/useTrending";
import { isMovie, isShow } from "@/models";
import { TMDB_IMG_BASE } from "@/services/tmdb";
import { MovieOrShow, TimeWindow } from "@/types";
import { Button, ButtonGroup, Rating, RatingStar } from "flowbite-react";

type TrendingProps = {
  carousel?: boolean;
  showMediaType?: boolean;
};

export default function Trending({ carousel, showMediaType }: TrendingProps) {
  const {
    trending,
    timeWindow,
    mediaType,
    loading,
    setTimeWindow,
    setMediaType,
  } = useTrending("day");

  const timeWindowOptions: { buttonText: string; value: TimeWindow }[] = [
    { buttonText: "Today", value: "day" },
    { buttonText: "This week", value: "week" },
  ];

  const getCarouselItem = (item: MovieOrShow) => {
    const title: string = isMovie(item) ? item.title : item.name;
    return (
      <div key={item.id} className="carousel-item w-1/2">
        <div className="flex-col space-y-1">
          <img
            className="rounded-md"
            src={`${TMDB_IMG_BASE}/w500${item.poster_path}`}
            alt={title}
          />

          <div className="flex items-center space-x-1">
            <Rating>
              <RatingStar />
            </Rating>
            <span className="text-xs">{item.vote_average.toFixed(1)}</span>
          </div>

          <p className="font-semibold">{title}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center md:items-start md:justify-normal space-x-4 my-4">
        <h2 className="text-2xl md:text-4xl tracking-wider md:tracking-widest">
          Trending
        </h2>
        <ButtonGroup>
          {timeWindowOptions.map((option, index) => (
            <Button
              key={index}
              color={`${timeWindow === option.value ? "red" : "gray"}`}
              onClick={() => setTimeWindow(option.value)}
            >
              {option.buttonText}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <div className="carousel carousel-center max-w-sm p-4 space-x-4 rounded-box">
        {trending.map((item) => getCarouselItem(item))}
      </div>
    </>
  );
}
