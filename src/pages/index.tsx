import Image from "next/image";
import { Inter } from "next/font/google";
import useTrending from "@/hooks/useTrending";
import Trending from "@/components/trending";
import Popular from "@/components/popular";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col md:justify-between p-4 md:p-24 ${inter.className}`}
    >
      <Trending />

      <Popular />
    </main>
  );
}
