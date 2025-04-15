"use client";

import { useState } from "react";
import { AllMovies } from "../_components/sectionProps/allMovies";

export default function Home() {
  const [page, setPage] = useState<number>(1);

  return (
    <AllMovies
      className="flex flex-col px-20 gap-8 mb-19"
      page={page}
      setPage={setPage}
      url={`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`}
      title="Top Rated Movies"
    ></AllMovies>
  );
}
