import useMovie from "@/hooks/useMovie";
import Movie from "@/models/movie";
import TMDB, { TMDB_IMG_BASE } from "@/services/tmdb";
import { useRouter } from "next/router";
import { HeroSection } from "./HeroSection";
import { Cast } from "./Cast";
import { DetailSection } from "./DetailSection";
import { Collection } from "./Collection";
import { Keywords } from "./Keywords";
import { Media } from "./Media";
import { Recommendations } from "./Recommendations";

export type MovieDetailComponent = {
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
  if (!id) return <p>Uh oh....</p>;
  const { movie, loading } = useMovie(parseInt(id as string));

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>no movie found</p>;

  return (
    <div className="max-w-full">
      <HeroSection className="hidden md:grid" movie={movie} />

      <div className="md:hidden">
        {/* Backdrop */}
        <img
          className="w-full"
          src={TMDB.getImageUrl(movie.backdrop_path, "w1280")}
          alt={movie.title}
        />

        <div className="flex p-4">
          <div className="basis-1/3">
            <img
              className="rounded-md"
              src={TMDB.getImageUrl(movie.poster_path)}
              alt={movie.title}
            />
          </div>

          <div className="flex-1 px-2">
            <div className="card bg-base-100 shadow-xl rounded-md">
              <div className="card-body">
                <h2 className="card-title">{movie.title}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="p-4 md:flex md:p-8 md:space-x-4">
        <div className="md:basis-3/4 space-y-4 overflow-x-auto">
          {/* Cast */}
          <Cast movie={movie} />

          {movie.belongs_to_collection?.id && <Collection movie={movie} />}

          <Media movie={movie} />
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
