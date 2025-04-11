"use client";

import { useState } from "react";
import { AllMovies } from "../_components/sectionProps/allMovies";


export default function Home() {
  const [page, setPage] = useState<number>(1);
  return (
    <AllMovies
      page={page}
      setPage={setPage}
      url={`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`}
      title="popular movies"
    ></AllMovies>
  );
}
