"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";
import {
  ArrowRight,
  ChevronRightIcon,
  searchIcon,
  star,
} from "../svgs/vectors";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../svgs/loading";
import { Button } from "@/components/ui/button";
import { ACCESS_TOKEN } from "@/app/upcoming/page";

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  release_date: number;
  genre_ids: number[];
  id: number;
  popularity: number;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: string;
};
type Response = {
  results: Movie[];
  total_pages: number;
};
export const SearchMenu = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<Number>(1);
  const [length, setLength] = useState<number[]>([1]);
  const [search, setSearch] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    const getMoviesByAxios = async () => {
      setLoading(true);
      const { data } = await axios.get<Response>(
        `https://api.themoviedb.org/3/search/movie?query=${search}&language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setMovies(data.results);
      setLoading(false);
      setTotalPage(data.total_pages);
    };
    getMoviesByAxios();
  }, [page, search]);
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="w-100">
          <NavigationMenuTrigger className=" flex w-full h-10 border border-gray-500 gap-2 rounded-xl  p-1 items-center justify-center ">
            {searchIcon}
            <input
              onChange={(event) => setSearch(event.target.value)}
              className="w-11/12 h-full flex  text-gray-500 dark:text-white border-0"
              placeholder="Search.."
              type="search"
            ></input>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-0">
            <NavigationMenuLink className="flex w-100 h-fit flex-wrap-reverse bg-white p-5 -m-4  gap-2">
              {search == "" && <div className="w-full h-10"></div>}
              {!(search == "") && (
                <div>
                  {loading == false && (
                    <div className="flex w-full h-fit flex-col p-3  dark:text-black dark:bg-zinc-600  bg-white gap-3">
                      {movies > [] && (
                        <div>
                          {movies.slice(0, 5).map((item: Movie) => (
                            <div
                              key={item.id}
                              className="flex p-2 border-b-2 pb-3 gap-4 "
                            >
                              <img
                                className="w-17 h-27 rounded-2xl"
                                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                              ></img>
                              <div className="flex flex-col gap-4">
                                <div className="flex flex-col">
                                  <h1 className="text-2xl">{item.title}</h1>
                                  <div className="flex">
                                    {star}
                                    {item.vote_average}
                                    <span className="text-gray-400">/10</span>
                                  </div>
                                </div>
                                <div className="w-full flex items-center justify-between">
                                  <time>{item.release_date}</time>
                                  <Link
                                    href={`/movie/${item.id}`}
                                    key={item.id}
                                  >
                                    <Button>See more {ArrowRight}</Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ))}
                          <Link href="/search">
                            <Button>see all results for "{search}"</Button>
                          </Link>
                        </div>
                      )}
                      {!(movies > []) && (
                        <div className="w-full h-20 flex justify-center items-center">
                          {" "}
                          No results found.
                        </div>
                      )}
                    </div>
                  )}
                  {loading == true && (
                    <div className="w-full h-20 flex justify-center items-center">
                      {Loading}
                    </div>
                  )}
                </div>
              )}
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
