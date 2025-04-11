"use client";

import axios from "axios";
import { JSX, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  playIcon,
  star,
} from "../svgs/vectors";
import { Movie, Response } from "../sectionProps/movieSection";
import { Button } from "@/components/ui/button";
import { ACCESS_TOKEN } from "../sectionProps/allMovies";

type MovieSectionProps = {
  title: string;
};

export const NowPlaying = ({ title }: MovieSectionProps): JSX.Element => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMoviesByAxios = async () => {
      const { data } = await axios.get<Response>(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1 ",
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );

      setMovies(data.results);
    };
    getMoviesByAxios();
  }, []);

  console.log(movies);

  return (
    <div className=" flex w-screen overflow-x-hidden  ">
      <Carousel
        className=" w-screen overflow-x  "
        emulateTouch={true}
        autoPlay={true}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={30000}
        transitionTime={500}
        renderArrowNext={(onClickHandler, hasNext) => {
          return (
            <button
              className="absolute flex justify-center items-center right-11 top-1/2 z-2 w-10 h-10  pl-2 pt-2 bg-white rounded-full  shadow-lg"
              onClick={onClickHandler}
              disabled={!hasNext}
            >
              {" "}
              {ChevronRightIcon}
            </button>
          );
        }}
        renderArrowPrev={(onClickHandler, hasPrev) => {
          return (
            <button
              className="absolute flex justify-center items-center  left-11 top-1/2 z-2 w-10 h-10 bg-white rounded-full  shadow-lg"
              onClick={onClickHandler}
              disabled={!hasPrev}
            >
              {ChevronLeftIcon}
            </button>
          );
        }}
      >
        {movies.slice(0, 3).map((movie) => {
          return (
            <div key={movie.id} className=" flex  w-screen relative h-150 ">
              <img
                className=" flex absolute w-full h-full"
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              ></img>
              <div className="flex absolute  top-42 left-35 z-2">
                <div className="flex flex-col w-101 h-fit p-3 justify-start items-start rounded-lg text-white shadow-lg gap-4">
                  <div className="flex flex-col items-start justify-start gap-2">
                    <div className="text-sm capitalize">
                      {(title = "now playing")}
                    </div>
                    <h1 className="text-4xl">{movie.title}</h1>
                    <div className="flex justify-center items-center gap-1">
                      {star}
                      {movie.vote_average}
                      <p className="text-gray-400">/10</p>
                    </div>
                  </div>
                  <div className=" flex w-fit h-fit place-self-start text-xs">
                    {movie.overview}
                  </div>
                  <Button className="flex flex-row bg-white w-fit px-3 h-10 rounded-md hover:bg-gray-400 text-black gap-2  items-center justify-end ">
                    {playIcon}
                    <p className="capitalize "> watch trailer</p>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
