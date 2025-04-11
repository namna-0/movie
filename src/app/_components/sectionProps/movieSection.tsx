"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MovieCard } from "../movieItems/movieCard";

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
export const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTliZDYxYzgzZTU3ZWIxNTg5YWM3NjQ0NmNkOTdmMCIsIm5iZiI6MTc0MzE1OTQzMi42ODksInN1YiI6IjY3ZTY4MDg4M2U2NWM4ZWE4OGJhM2YwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DBhVxhQL39JUnIfTbJeHpK8EpUmovimBXoy76TJZaCI";

export type Response = {
  results: Movie[];
  total_pages?: number;
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

  useEffect(() => {
    const getMoviesByAxios = async () => {
      const { data } = await axios.get<Response>(url, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      setMovies(data.results);
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
        {movies.slice(0, 10).map((movie, index) => {
          return (
            <div key={index}>
              <MovieCard
                url={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                name={movie.title}
                id={movie.id}
                rating={movie.vote_average}
              ></MovieCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};
