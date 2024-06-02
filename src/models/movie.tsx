import Review from "./review";
import CastMember from "./castMember";
import CrewMember from "./crewMember";
import { PagedResponse } from "./paged-response";
import { IdAndName } from "@/types";
import Video from "./video";
import Image from "./image";

export default interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: IdAndName[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  // append to response items
  keywords: { keywords: IdAndName[] };
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  reviews: PagedResponse<Review>;
  images: {
    backdrops: Image[];
    logos: Image[];
    posters: Image[];
  };
  recommendations: PagedResponse<Movie>;
  videos: {
    results: Video[];
  };
}

const isMovie = (obj: any): obj is Movie => {
  return "title" in obj;
};
export { isMovie };
