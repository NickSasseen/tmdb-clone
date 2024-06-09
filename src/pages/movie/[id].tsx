import useMovie from "@/hooks/useMovie";
import Movie from "@/models/movie";
import TMDB, { TMDB_IMG_BASE } from "@/services/tmdb";
import { useRouter } from "next/router";
import HeroSection from "../../components/movie/HeroSection";
import Cast from "../../components/movie/Cast";
import Collection from "../../components/movie/Collection";
import Trailers from "../../components/movie/Trailers";
import Recommendations from "../../components/movie/Recommendations";
import DetailSection from "../../components/movie/DetailSection";
import Keywords from "../../components/movie/Keywords";
import RadialProgress from "@/components/shared/radial-progress";
import { getRuntime } from "@/services/shared";
import { HiPlay } from "react-icons/hi";

export type MovieDetailComponentProps = {
  movie: Movie;
  className?: string;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function MyMovie() {
  const router = useRouter();
  const { id } = router.query;
  const { movie, loading } = useMovie(parseInt(id as string));
  if (!id) return <p>Uh oh....</p>;

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>no movie found</p>;

  const vote = (movie.vote_average * 10).toFixed(0);

  const getFormattedDate = (date: string) => {
    const pad = (x: number) => x.toString().padStart(2, "0");

    const theDate = new Date(date);
    const day = pad(theDate.getDate());
    const month = pad(theDate.getMonth() + 1);
    const year = theDate.getFullYear();

    return [month, day, year].join("/");
  };

  return (
    <div className="max-w-full">
      <HeroSection movie={movie} />

      <div className="md:hidden">
        <div className="p-4 space-y-2">
          <h2 className="font-bold text-xl text-center">
            {movie.title}{" "}
            {movie.release_date && (
              <span className="font-thin text-lg">
                ({new Date(movie.release_date).getFullYear()})
              </span>
            )}
          </h2>

          <div className="flex">
            <div className="basis-1/5 text-xs">
              <RadialProgress value={+vote} size="3rem" />
            </div>

            <div className="flex flex-1 items-center justify-center">
              <button>Vote/rank button</button>
            </div>
          </div>

          <div className="flex justify-center items-baseline flex-wrap text-sm space-x-1 space-y-1">
            <span>{getFormattedDate(movie.release_date)}</span>
            <div className="divider divider-horizontal divider-error" />
            <span>{getRuntime(movie.runtime)}</span>
            <div className="divider divider-horizontal divider-error" />
            <button className="btn btn-sm btn-outline">
              <HiPlay></HiPlay>
              Play trailer
            </button>
            <span className="basis-full text-center">
              {movie.genres.map((item, index) => (
                <>
                  {item.name}
                  {index < movie.genres.length - 1 && ", "}
                </>
              ))}
            </span>
          </div>

          <div className="pt-2">
            <p className="italic font-thin">{movie.tagline}</p>
            <h2 className="font-bold text-lg">Overview</h2>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>

      <section className="p-4 md:flex md:p-8 md:space-x-4">
        <div className="md:basis-3/4 space-y-4 overflow-x-auto">
          {/* Cast */}
          <Cast movie={movie} />

          {movie.belongs_to_collection?.id && <Collection movie={movie} />}

          <Trailers movie={movie} />
          <Recommendations movie={movie} />
        </div>

        <div className="md:flex-1 space-y-4">
          <DetailSection title="Information">
            <div className="flex flex-wrap p-2">
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
                <div key={index} className="basis-1/2 p-2">
                  <p className="font-bold underline">{item.title}</p>
                  <p className="mt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </DetailSection>

          {/* Keywords */}
          <Keywords movie={movie} />
        </div>
      </section>
    </div>
  );
}
