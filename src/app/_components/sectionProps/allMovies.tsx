"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Movie, Response } from "./movieSection";
import { MovieCard } from "../movieItems/movieCard";
import { Pages } from "../movieItems/pages";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, useSearchParams } from "next/navigation";
import { Params } from "@/app/similar/[id]/page";

export type AllMoviesProps = {
  url: string;
  title: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  className: string;
};
export const AllMovies = ({
  title,
  url,
  page,
  setPage,
  className,
}: AllMoviesProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [length, setLength] = useState<number[]>([0]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");
  const [totalResults, setTotalResults] = useState<number>(1);
  const { id } = useParams<Params>();
  useEffect(() => {
    const getMoviesByAxios = async () => {
      setLoading(true);
      const { data } = await axios.get<Response>(url, {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      });

      setMovies(data.results);
      if ((data.total_pages ?? 0) >= 500) {
        setTotalPages(500);
      } else {
        setTotalPages(data.total_pages ?? 0);
      }
      if ((data.total_results ?? 0) >= 1000) {
        setTotalResults(1000);
      } else {
        setTotalResults(data.total_results ?? 0);
      }
      setLoading(false);
    };
    getMoviesByAxios();
  }, [id, genre, page, url]);

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <h1 className=" text-3xl font-bold">{title}</h1>
      </div>
      <div className="flex-1 grid grid-cols-5 gap-8">
        {loading &&
          new Array(20).fill(0).map((_, index) => (
            <div key={index}>
              <Skeleton className="w-full h-[200px]" />
              <Skeleton className="mt-2" />
            </div>
          ))}
        {!loading &&
          movies.map((movie) => {
            return (
              <div key={movie.id}>
                <MovieCard
                  url={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  id={movie.id}
                  name={movie.title}
                  rating={movie.vote_average}
                ></MovieCard>
              </div>
            );
          })}
      </div>
      <Pages
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        length={length}
        setLength={setLength}
        page={page}
        setPage={setPage}
      ></Pages>
    </div>
  );
};
