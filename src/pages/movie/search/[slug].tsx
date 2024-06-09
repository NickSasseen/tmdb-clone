import { useRouter } from "next/router";

const MovieSearch = () => {
  const router = useRouter();
  const { slug } = router.query;

  console.log(slug);

  return <h1>here...</h1>;
};

export default MovieSearch;
