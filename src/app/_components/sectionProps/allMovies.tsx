"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { s } from "motion/react-client";
import Link from "next/link";
import { Movie, Response } from "./movieSection";
import { MovieCard } from "../movieItems/movieCard";
import { Pages } from "../movieItems/pages";

export type AllMoviesProps = {
  url: string;
  title: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};
export const AllMovies = ({ title, url, page, setPage }: AllMoviesProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [length, setLength] = useState<number[]>([0]);

  useEffect(() => {
    const getMoviesByAxios = async () => {
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
    };
    getMoviesByAxios();
  }, [page, url]);

  return (
    <div className="flex flex-col w-screen px-20 gap-8 mb-19">
      <div className="flex justify-between items-center mb-4">
        <h1 className=" text-3xl font-bold">{title}</h1>
      </div>
      <div className="grid grid-cols-5 gap-8">
        {movies.map((movie, index) => {
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
