"use client";

import useTrending from "@/hooks/useTrending";
import { TMDB_IMG_BASE } from "@/services/tmdb";
import { TimeWindow } from "@/types";
import {
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  Rating,
  RatingStar,
} from "flowbite-react";
import Image from "next/image";

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

  return (
    <>
      <div className="flex justify-between items-center md:items-start md:justify-normal space-x-4 my-4">
        <h2 className="text-2xl md:text-4xl tracking-wider md:tracking-widest">
          Trending
        </h2>
        <ButtonGroup>
          {timeWindowOptions.map((two, index) => (
            <Button
              key={index}
              color={`${timeWindow === two.value ? "red" : "gray"}`}
              onClick={() => setTimeWindow(two.value)}
            >
              {two.buttonText}
            </Button>
          ))}
        </ButtonGroup>
      </div>

      <div className="flex flex-wrap">
        {trending.map((trending) => {
          return (
            <div className="basis-1/2 p-2 space-y-2">
              <img
                className="w-full rounded-lg"
                src={`${TMDB_IMG_BASE}/w500${trending.poster_path}`}
                alt={trending.title}
              />

              <div className="flex items-center space-x-1">
                <Rating>
                  <RatingStar />
                </Rating>
                <span className="text-xs">
                  {trending.vote_average.toFixed(1)}
                </span>
              </div>

              <p className="font-semibold">{trending.title}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
