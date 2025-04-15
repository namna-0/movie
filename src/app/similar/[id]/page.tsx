"use client";

import { AllMovies } from "@/app/_components/sectionProps/allMovies";
import { useParams } from "next/navigation";
import { useState } from "react";

export type Params = {
  id: string;
};
export default function Home() {
  const [page, setPage] = useState<number>(1);
  const { id } = useParams<Params>();
  return (
    <AllMovies
      className="flex flex-col px-20 gap-8 mb-19"
      url={`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`}
      page={page}
      setPage={setPage}
      title="More like this"
    ></AllMovies>
  );
}
