import TMDB from "@/services/tmdb";
import {
  HiOutlineBookmark,
  HiOutlineHeart,
  HiOutlineViewList,
} from "react-icons/hi";
import { MovieDetailComponentProps } from "../../pages/movie/[id]";

const HeroSection = ({ movie, className }: MovieDetailComponentProps) => {
  const hrs = Math.floor(movie.runtime / 60);
  const mins = movie.runtime % 60;
  const runtime = `${hrs}hrs ${mins}m`;

  const vote = (movie.vote_average * 10).toFixed(0);

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

  const style: { [key: string]: string } = { "--value": vote };

  return (
    <div
      className={`hero ${className}`}
      style={{
        backgroundImage: `url(${TMDB.getImageUrl(
          movie.backdrop_path,
          "w1280"
        )})`,
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>

      <div className="hero-content text-neutral-content p-8 w-full justify-start md:justify-normal">
        <div className="basis-1/4">
          <img
            className="rounded-md"
            src={TMDB.getImageUrl(movie.poster_path)}
          />
        </div>

        <div className="flex-1 p-4 self-start space-y-4 hidden md:block">
          <h1 className="font-bold text-4xl">
            {movie.title}{" "}
            {movie.release_date && (
              <span className="font-thin">
                ({new Date(movie.release_date).getFullYear()})
              </span>
            )}
          </h1>

          <h3 className="flex space-x-4 items-center text-lg">
            <div className="space-x-1">
              {movie.genres.map((genre) => (
                // change these to buttons later
                <div key={genre.id} className="badge badge-outline px-2 py-4">
                  {genre.name}
                </div>
              ))}
            </div>
            <span>{runtime}</span>
          </h3>

          <div
            className="radial-progress text-primary"
            style={style}
            role="progressbar"
          >
            {vote}%
          </div>

          {buttonRow}

          <div>
            <p className="italic font-thin text-lg mb-2">{movie.tagline}</p>
            <h2 className="font-bold text-xl">Overview </h2>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
