"use client";
import {
  Children,
  createContext,
  PropsWithChildren,
  use,
  useContext,
  useEffect,
  useState,
} from "react";
import axios, { Axios } from "axios";
import { Movie } from "../sectionProps/movieSection";
import { ACCESS_TOKEN } from "../sectionProps/allMovies";

export const SearchContext = createContext({});
type SearchParams = {
  results: Movie[];
  Total_pages: number;
};
export const SearchProvider = ({ children }: PropsWithChildren) => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const getMovies = async () => {
      const { data } = await axios.get<SearchParams>(
        `https://api.themoviedb.org/3/search/movie?query=${search}&page=${page}&language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      setMovies(data.results);
    };
    if (search) {
      getMovies();
    }
  }, [search, page]);

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
export const useSearch = () => useContext(SearchContext);
