import Cast from "@/components/shared/cast";
import DetailSection from "@/components/shared/detail-section";
import HeroSection from "@/components/shared/hero-section";
import RadialProgress from "@/components/shared/radial-progress";
import useTvShow from "@/hooks/useTvShow";
import { getFormattedDate } from "@/services/shared";
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
            <span>{tvShow.number_of_seasons} seasons</span>
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

      <section className="p-4 md:flex md:p-8 md:space-x-4">
        <div className="md:basis-3/4 space-y-4 overflow-x-auto">
          {/* Cast */}
          <Cast item={tvShow} sectionTitle="Series Cast" />

          {/* <Trailers item={movie} /> */}
          {/* <Recommendations item={movie} /> */}
        </div>

        <div className="md:flex-1 space-y-4">
          <DetailSection title="Information">
            <div className="flex flex-wrap p-2">
              {/* Info */}
              {[
                { title: "Status", text: tvShow.status },
                { title: "Original Language", text: tvShow.original_language },
              ].map((item, index) => (
                <div key={index} className="basis-1/2 p-2">
                  <p className="font-bold underline">{item.title}</p>
                  <p className="mt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </DetailSection>

          {/* Keywords */}
          {/* <Keywords item={tvShow} /> */}
        </div>
      </section>
    </div>
  );
};

export default TvShow;
