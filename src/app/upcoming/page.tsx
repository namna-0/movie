"use client";

import { useState } from "react";
import { AllMovies } from "../_components/sectionProps/allMovies";

export const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTliZDYxYzgzZTU3ZWIxNTg5YWM3NjQ0NmNkOTdmMCIsIm5iZiI6MTc0MzE1OTQzMi42ODksInN1YiI6IjY3ZTY4MDg4M2U2NWM4ZWE4OGJhM2YwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DBhVxhQL39JUnIfTbJeHpK8EpUmovimBXoy76TJZaCI";

  export default function Home() {
  const [page, setPage] = useState<number>(1);
  return (
    <AllMovies
      page={page}
      setPage={setPage}
      url={`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`}
      title="Up coming"
    ></AllMovies>
  );
}
