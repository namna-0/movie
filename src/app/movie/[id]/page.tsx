"use client";
import { ACCESS_TOKEN } from "@/app/_components/sectionProps/allMovies";
import { MovieSection } from "@/app/_components/sectionProps/movieSection";
import { star } from "@/app/_components/svgs/vectors";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Params = {
  id: string;
};
type MovieDetails = {
  adult: boolean;
  title: string;
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
};

const MoviePage = () => {
  const { id } = useParams<Params>();
  const [runTime, setRunTime] = useState<number | string>(0);
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const RunTime = (runTime: number) => {
    const hours = Math.floor(runTime / 60);
    const minutes = runTime % 60;
    return `${hours}h ${minutes}m`;
  };
  useEffect(() => {
    const getMovie = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setMovie(data);
    };
    getMovie();
  }, [id]);

  useEffect(() => {
    if (movie) {
      setRunTime(RunTime(movie.runtime));
    }
  }, [movie]);
  return (
    <div className="pt-13 px-30 pb-28">
      <div className="flex w-full flex-col items-center gap-8">
        <div className="flex w-full flex-col items-center gap-6">
          <div className="flex w-full justify-between ">
            <div className="flex flex-col gap-1 ">
              <h1 className="text-xl font-semibold">{movie?.title}</h1>
              <div className="flex gap-0.5">
                <p>{movie?.release_date}</p>· {"lala"}·<span>{runTime}</span>
              </div>
            </div>
            <div className="flex w-[83px] flex-col">
              <p className="h-1/4"> Rating:</p>
              <div className="h-3/4 flex gap-1 items-center">
                {star}
                <div>
                  <p>
                    {movie?.vote_average}
                    <span className="text-gray-500">/10</span>
                  </p>
                  <p className="text-gray-500"> {movie?.vote_count}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full gap-8 h-100">
            <div className=" w-1.5/4.5 h-full ">
              <img
                className="w-full h-full rounded-sm"
                alt="poster"
                src={"https://image.tmdb.org/t/p/original" + movie?.poster_path}
              />
            </div>
            <img
              className="w-3/4.5 h-full rounded-sm"
              alt="backdrop"
              src={"https://image.tmdb.org/t/p/original" + movie?.backdrop_path}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex  gap-2">
            {movie?.genres.map((genre) => {
              return (
                <Link href={`/genres/${genre.id}`} key={genre.id}>
                  <div
                    key={genre.id}
                    className="text-sm w-fit font-bold rounded-full border border-gray-400 p-1  "
                  >
                    {genre.name}
                  </div>
                </Link>
              );
            })}
          </div>
          <p className="text-secondary-foreground">{movie?.overview}</p>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <MovieSection
            url={`https://api.themoviedb.org/3/movie/${movie?.id}/similar?language=en-US&page=1`}
            title="More Like This"
            path={`/similar/${movie?.id}`}
          ></MovieSection>
        </div>
      </div>
    </div>
  );
};
export default MoviePage;
