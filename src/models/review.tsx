export default interface Review {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: Date;
  id: string;
  updated_at: Date;
  url: string;
}
