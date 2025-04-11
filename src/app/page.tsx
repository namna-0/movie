"use client";

import { NowPlaying } from "./_components/movieItems/nowPlaying";
import { MovieSection } from "./_components/sectionProps/movieSection";

export default function Home() {
  return (
    <div className=" flex flex-col justify-center dark:bg-black gap-13 mt-6 items-center mb-13">
      <NowPlaying title="Now Playing"></NowPlaying>
      <div className="flex flex-col gap-13 px-20">
        <MovieSection
          title="Upcoming"
          url="https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
          path="/upcoming"
        />
        <MovieSection
          title="Popular"
          url="https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
          path="/popular"
        />
        <MovieSection
          title="Top Rated"
          url="https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
          path="/top_rated"
        />
      </div>
    </div>
  );
}
