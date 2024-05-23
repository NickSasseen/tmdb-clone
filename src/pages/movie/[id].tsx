import useMovie from "@/hooks/useMovie";
import Movie from "@/models/movie";
import TMDB, { TMDB_IMG_BASE } from "@/services/tmdb";
import { useRouter } from "next/router";
import {
  HiArrowRight,
  HiOutlineBookmark,
  HiOutlineHeart,
  HiOutlineViewList,
} from "react-icons/hi";

type MovieDetailComponent = {
  movie: Movie;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const HeroSection = ({ movie }: MovieDetailComponent) => {
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

  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${TMDB.getImageUrl(
          movie.backdrop_path,
          "w1280"
        )})`,
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>

      <div className="hero-content text-neutral-content w-full p-8">
        <div className="basis-1/4">
          <img
            className="rounded-md"
            src={TMDB.getImageUrl(movie.poster_path)}
          />
        </div>

        <div className="flex-1 p-4 self-start space-y-4">
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
            style={{ "--value": vote }}
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

const Keywords = ({ movie }: MovieDetailComponent) => {
  return (
    <div className="space-y-2">
      <h3 className="font-bold text-xl">Keywords</h3>
      <div className="flex flex-wrap">
        {movie.keywords.keywords.map((keyword, index) => (
          <div
            key={index}
            className="badge badge-outline px-4 py-4 text-md mr-2 my-1"
          >
            {keyword.name}
          </div>
        ))}
      </div>
    </div>
  );
};

const Cast = ({ movie }: MovieDetailComponent) => {
  const topTenCastMembers = movie.credits.cast
    .sort((first, second) => second.popularity - first.popularity)
    .slice(0, 10);

  return (
    <div className="space-y-2">
      <h3 className="font-bold text-xl">Top Billed Cast</h3>
      <div className="carousel carousel-center p-4 space-x-4">
        {topTenCastMembers.map((castMember) => (
          <div key={castMember.id} className="carousel-item w-1/2 md:w-1/6">
            <div className="flex-col space-y-1">
              <img
                src={TMDB.getImageUrl(castMember.profile_path)}
                className="rounded-md"
              />
              <p className="font-semibold text-md">{castMember.name}</p>
              <p className="font-extralight text-sm">{castMember.character}</p>
            </div>
          </div>
        ))}
        <div className="carousel-item w-1/2 md:w-1/6">
          <div className="flex flex-1 justify-center items-center">
            <div className="flex items-center space-x-2">
              <p>View more</p>
              <HiArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MyMovie() {
  const router = useRouter();
  const { id } = router.query;
  const { movie, loading } = useMovie(parseInt(id as string));

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>no movie found</p>;

  return (
    <>
      <HeroSection movie={movie} />

      <section className="flex p-4">
        <div className="basis-3/4 p-4">
          {/* Cast */}
          <Cast movie={movie} />
          <p>social</p>
          <p>media</p>
          <p>collection</p>
          <p>recommendations</p>
        </div>
        <div className="flex-1 space-y-8">
          <div className="flex-col space-y-4">
            {/* Info */}
            {[
              { title: "Status", text: movie.status },
              { title: "Original Language", text: movie.original_language },
              {
                title: "Budget",
                text: currencyFormatter.format(movie.budget),
              },
              {
                title: "Revenue",
                text: currencyFormatter.format(movie.revenue),
              },
            ].map((item, index) => (
              <div key={index}>
                <p className="font-bold underline">{item.title}</p>
                <p className="mt-1">{item.text}</p>
              </div>
            ))}
          </div>
          {/* Keywords */}
          <Keywords movie={movie} />
        </div>
      </section>
    </>
  );
}
