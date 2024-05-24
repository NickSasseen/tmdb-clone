import { DetailSection } from "./DetailSection";
import { MovieDetailComponent } from "./[id]";

export const Media = ({ movie }: MovieDetailComponent) => {
  const {
    videos: { results: videos },
    images: { backdrops, posters },
  } = movie;

  const items = [
    { tabText: "Videos", items: videos },
    { tabText: "Backdrops", items: backdrops },
    { tabText: "Posters", items: posters },
  ];

  return <DetailSection title="Media"></DetailSection>;
};
