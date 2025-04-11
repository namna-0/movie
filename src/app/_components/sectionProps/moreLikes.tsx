"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN, Movie, Response } from "./movieSection";
import Link from "next/link";
import { star } from "../svgs/vectors";
import { Pages } from "../movieItems/pages";
import { MovieCard } from "../movieItems/movieCard";

export type MoreLikesProps = {
  id: string;
  page: number;
  url: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};
export const MoreLikeMovies = ({ url, id, page, setPage }: MoreLikesProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [length, setLength] = useState<number[]>([0]);
  useEffect(() => {
    const getMoviesByAxios = async () => {
      const { data } = await axios.get<Response>(url, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
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
  }, [id, page]);

  return (
    <div className="flex flex-col w-screen px-20 gap-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className=" text-3xl font-bold">more like this</h1>
      </div>
      <div className="grid grid-cols-5 gap-8">
        {movies.map((movie, index) => {
          return (
            <div key={index}>
              <MovieCard
                url={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                name={movie.title}
                rating={movie.vote_average}
                id={movie.id}
              />
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
