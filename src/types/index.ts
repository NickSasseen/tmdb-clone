import Movie from "@/models/movie";
import TvShow from "@/models/tv-show";

export type TimeWindow = "day" | "week";
export type MediaType = "movie" | "tv" | "person" | "all";

export type MovieOrShow = Movie | TvShow;

export type IdAndName = {
  id: number;
  name: string;
};