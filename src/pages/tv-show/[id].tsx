import HeroSection from "@/components/shared/hero-section";
import RadialProgress from "@/components/shared/radial-progress";
import useTvShow from "@/hooks/useTvShow";
import { getFormattedDate, getRuntime } from "@/services/shared";
import { useRouter } from "next/router";
import { HiPlay } from "react-icons/hi";

const TvShow = () => {
  const router = useRouter();
  const { id } = router.query;
  const { tvShow, loading } = useTvShow(parseInt(id as string));
  if (!id) return <p>Uh oh....</p>;

  if (loading) return <p>Loading...</p>;
  if (!tvShow) return <p>no movie found</p>;

  const vote = (tvShow.vote_average * 10).toFixed(0);

  return (
    <div className="max-w-full">
      <HeroSection item={tvShow} />

      <div className="sm:hidden">
        <div className="p-4 space-y-2">
          <h2 className="font-bold text-xl text-center">
            {tvShow.name}{" "}
            {tvShow.first_air_date && (
              <span className="font-thin text-lg">
                ({new Date(tvShow.first_air_date).getFullYear()})
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
            <span>{getFormattedDate(tvShow.first_air_date)}</span>
            <div className="divider divider-horizontal divider-error" />
            {/* <span>{getRuntime(movie.runtime)}</span> */}
            <div className="divider divider-horizontal divider-error" />
            <button className="btn btn-sm btn-outline">
              <HiPlay />
              Play trailer
            </button>
            <span className="basis-full text-center">
              {tvShow.genres.map((item, index) => (
                <>
                  {item.name}
                  {index < tvShow.genres.length - 1 && ", "}
                </>
              ))}
            </span>
          </div>

          <div className="pt-2">
            <p className="italic font-thin">{tvShow.tagline}</p>
            <h2 className="font-bold text-lg">Overview</h2>
            <p>{tvShow.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvShow;
