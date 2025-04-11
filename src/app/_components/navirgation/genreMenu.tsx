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
import { ChevronRightIcon, searchIcon } from "../svgs/vectors";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ACCESS_TOKEN } from "../sectionProps/allMovies";

export type Genre = { id: number; name: string };
export type GenresRes = {
  genres: Genre[];
};

export const GenreMenu = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const router = useRouter();
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [IsSelect, setIsSelect] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");

  useEffect(() => {
    const getGenres = async () => {
      const { data } = await axios.get<GenresRes>(
        `https://api.themoviedb.org/3/genre/movie/list?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setGenres(data.genres);
    };

    getGenres();
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "1") {
      setIsSelect(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", IsSelect ? "1" : "false");
  }, [IsSelect]);
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-3">
        <NavigationMenuItem className="w-22 ">
          <NavigationMenuTrigger className="flex w-full h-10  border rounded-2xl dark:text-white border-gray-600 item-center p-1 justify-center gap-2 ">
            <ChevronDownIcon
              className="relative top-[1px] dark:fill-white size-3 transition duration-300 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
            <p className="dark:text-white">genre</p>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink className="flex w-100 h-fit  dark:text-black flex-wrap-reverse bg-white p-5 -m-4 gap-2">
              <div className="flex  flex-col items-start gap-2 border-b-1 pb-2">
                <h1>Genres</h1>
                <p>See lists of movies by genre</p>
              </div>
              <div className="flex flex-wrap gap-4">
                {genres.map(({ id, name }) => (
                  <Link key={id} href={`/search?genre=${id}`}>
                    <Badge
                      variant={genre === id.toString() ? "default" : "outline"}
                      className="flex items-center gap-2"
                    >
                      {name}
                      {ChevronRightIcon}
                    </Badge>
                  </Link>
                ))}
              </div>
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
