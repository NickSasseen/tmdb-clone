import TMDB from "@/services/tmdb";
import {
  HiOutlineBookmark,
  HiOutlineHeart,
  HiOutlineViewList,
} from "react-icons/hi";
import { DetailComponentProps } from "../../pages/movie/[id]";
import { getRuntime } from "@/services/shared";
import { MovieOrShow } from "@/types";

const HeroSection = ({ item, className }: DetailComponentProps) => {
  const getVote = (voteAverage: number) => (voteAverage * 10).toFixed(0);

  const buttonRow = (
    <div className="flex space-x-5">
      <button className="btn btn-lg btn-circle btn-outline text-xl">
        <HiOutlineViewList />
      </button>
      <button className="btn btn-lg btn-circle btn-outline text-xl">
        <HiOutlineHeart />
      </button>
      <button className="btn btn-lg btn-circle btn-outline text-xl">
        <HiOutlineBookmark />
      </button>
    </div>
  );

  const style: { [key: string]: string } = {
    "--value": getVote(item.vote_average),
  };

  return (
    <div
      className={`hero ${className}`}
      style={{
        backgroundImage: `url(${TMDB.getImageUrl(
          item.backdrop_path,
          "w1280"
        )})`,
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>

      <div className="hero-content text-neutral-content p-8 w-full justify-start md:justify-normal">
        <div className="basis-1/4">
          <img
            className="rounded-md"
            src={TMDB.getImageUrl(item.poster_path)}
          />
        </div>

        <div className="flex-1 p-4 self-start space-y-4 hidden md:block">
          <TitleAndReleaseDate item={item} />

          <h3 className="flex space-x-4 items-center text-lg">
            <div className="space-x-1">
              {item.genres.map((genre) => (
                // change these to buttons later
                <div key={genre.id} className="badge badge-outline px-2 py-4">
                  {genre.name}
                </div>
              ))}
            </div>
            {"title" in item && <span>{getRuntime(item.runtime)}</span>}
          </h3>

          <div
            className="radial-progress text-primary"
            style={style}
            role="progressbar"
          >
            {getVote(item.vote_average)}%
          </div>

          {buttonRow}

          <div>
            <p className="italic font-thin text-lg mb-2">{item.tagline}</p>
            <h2 className="font-bold text-xl">Overview </h2>
            <p>{item.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TitleAndReleaseDate = ({ item }: { item: MovieOrShow }) => {
  if ("title" in item) {
    return (
      <h1 className="font-bold text-4xl">
        {item.title}{" "}
        {item.release_date && (
          <span className="font-thin">
            ({new Date(item.release_date).getFullYear()})
          </span>
        )}
      </h1>
    );
  }

  if ("name" in item) {
    return (
      <h1 className="font-bold text-4xl">
        {item.name}{" "}
        {item.first_air_date && (
          <span className="font-thin">
            ({new Date(item.first_air_date).getFullYear()})
          </span>
        )}
      </h1>
    );
  }
};

export default HeroSection;
