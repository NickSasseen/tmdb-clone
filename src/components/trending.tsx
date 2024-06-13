"use client";

import useTrending from "@/hooks/useTrending";
import { isMovie, isShow } from "@/models";
import { TMDB_IMG_BASE } from "@/services/tmdb";
import { MovieOrShow, TimeWindow } from "@/types";
import Link from "next/link";

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

  const getCarouselItem = (item: MovieOrShow, index: number) => {
    const title: string = isMovie(item) ? item.title : item.name;
    const type: string = isMovie(item) ? "movie" : "tv-show";
    return (
      <Link
        key={item.id}
        id={`item${index}`}
        className="carousel-item w-1/2 md:w-1/6"
        href={`/${type}/${item.id}`}
      >
        <div className="flex-col space-y-1">
          <img
            className="rounded-md"
            src={`${TMDB_IMG_BASE}/w500${item.poster_path}`}
            alt={title}
          />

          <div className="flex items-center space-x-1">
            <div className="rating rating-sm">
              <input
                readOnly
                type="radio"
                name="rating-1"
                className="mask mask-star bg-primary"
              />
            </div>
            <span className="text-xs">{item.vote_average.toFixed(1)}</span>
          </div>

          <p className="font-semibold">{title}</p>
        </div>
      </Link>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center md:items-start md:justify-normal space-x-4 my-4">
        <h2 className="text-2xl md:text-4xl tracking-wider md:tracking-widest">
          Trending
        </h2>
        <div className="join">
          {timeWindowOptions.map((option, index) => (
            <button
              key={index}
              aria-label={option.buttonText}
              className={`join-item btn btn-outline ${
                timeWindow === option.value ? "btn-active" : ""
              }`}
              onClick={() => {
                setTimeWindow(option.value);
              }}
            >
              {option.buttonText}
            </button>
          ))}
        </div>
      </div>

      <div className="carousel carousel-center p-4 space-x-4 rounded-box">
        {trending.map((item, index) => getCarouselItem(item, index))}
      </div>
    </>
  );
}
