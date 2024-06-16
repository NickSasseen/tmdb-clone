import HeroSection from "@/components/shared/hero-section";
import useTvShow from "@/hooks/useTvShow";
import { useRouter } from "next/router";

const TvShow = () => {
  const router = useRouter();
  const { id } = router.query;
  const { tvShow, loading } = useTvShow(parseInt(id as string));
  if (!id) return <p>Uh oh....</p>;

  if (loading) return <p>Loading...</p>;
  if (!tvShow) return <p>no movie found</p>;

  return (
    <div className="max-w-full">
      <HeroSection item={tvShow} />
    </div>
  );
};

export default TvShow;
