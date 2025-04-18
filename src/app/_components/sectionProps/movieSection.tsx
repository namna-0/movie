"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MovieCard } from "../movieItems/movieCard";
import { Skeleton } from "@/components/ui/skeleton";

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  popularity: number;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
};

export type Response = {
  results: Movie[];
  total_pages?: number;
  total_results?: number;
};
export type MovieSectionProps = {
  url: string;
  title: string;
  path: string;
  id?: string;
};
export const MovieSection = ({ url, title, path }: MovieSectionProps) => {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getMoviesByAxios = async () => {
      setLoading(true);
      const { data } = await axios.get<Response>(url, {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      });
      setMovies(data.results);
      setLoading(false);
    };
    getMoviesByAxios();
  }, [url]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{title}</h1>
        <Link href={path}>
          <Button>
            <span className="flex items-center">
              see more <ArrowRight />
            </span>
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-8">
        {loading == true &&
          new Array(10).fill(0).map((_, index) => (
            <div className="mx-auto w-full max-w-sm rounded-md animate-pulse">
              <div className="w-9/10 aspect-[1/1.2] flex flex-col">
                <div className="w-full h-full rounded-t-lg object-cover bg-[#f1f1f8]"></div>
                <div className="flex flex-col min-h-[33%] dark:bg-[#27272A] bg-[#f1f1f8] rounded-b-lg p-[2%]">
                  <div className="flex flex-row text-wrap items-center gap-[2%]"></div>
                  <div className="text-wrap overflow-hidden">
                    <p className="text-[85%]"></p>
                    {/* `text-[1em]`-ийг `text-base` гэж ашиглах боломжтой */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        {!(loading == true) &&
          movies.slice(0, 10).map((movie) => {
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
    </div>
  );
};
