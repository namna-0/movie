"use client";

import { MoreLikeMovies } from "@/app/_components/sectionProps/moreLikes";
import { useParams } from "next/navigation";
import { useState } from "react";

type Params = {
  id: string;
};
export default function Home() {
  const [page, setPage] = useState<number>(1);
  const { id } = useParams<Params>();
  return (
    <MoreLikeMovies
      url={`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`}
      page={page}
      setPage={setPage}
      id={id}
    ></MoreLikeMovies>
  );
}
