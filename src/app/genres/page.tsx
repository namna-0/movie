"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGenres } from "../_components/providers/genreProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { Movie } from "../_components/sectionProps/movieSection";
import { ChevronRightIcon, removeIcon } from "../_components/svgs/vectors";
import { Badge } from "@/components/ui/badge";
import { MovieCard } from "../_components/movieItems/movieCard";
import { Pages } from "../_components/movieItems/pages";
import { AllMovies } from "../_components/sectionProps/allMovies";

const GenrePage = () => {
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");
  const { genres } = useGenres();
  const [page, setPage] = useState<number>(1);
  return (
    <div className="flex gap-4 py-12 px-20">
      <div className="w-[388px] flex flex-col gap-5">
        <div>
          <h1 className="text-2xl font-semibold">Genres</h1>
          <p>See lists of movies by genre</p>
        </div>
        <div className="flex w-full flex-wrap gap-4">
          {genres.map(({ id, name }) => (
            <Link key={id} href={`/genres?genre=${id}`}>
              <Badge
                variant={genre === id.toString() ? "default" : "outline"}
                className="flex items-center gap-2"
              >
                {name}
                {!(genre == id.toString()) && ChevronRightIcon}
                {genre == id.toString() && removeIcon}
              </Badge>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-[1px] bg-slate-300 mx-4" />
      <div>
        <AllMovies
        className=""
          title={`20 result in '${
            genres.find((g) => g.id.toString() === genre)?.name ||
            "selected genre"
          }'`}
          page={page}
          setPage={setPage}
          url={`https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${genre}&page=${page}`}
        ></AllMovies>
      </div>
    </div>
  );
};

export default GenrePage;
