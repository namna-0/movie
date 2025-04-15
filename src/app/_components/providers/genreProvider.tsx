"use client";
import axios from "axios";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
export const GenreContext = createContext<GenresRes>({ genres:[] });
export type Genre = { id: number; name: string };
export type GenresRes = {
  genres: Genre[];
};
export const GenreProvider = ({ children }: PropsWithChildren) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  useEffect(() => {
    const getGenres = async () => {
      const { data } = await axios.get<GenresRes>(
        `https://api.themoviedb.org/3/genre/movie/list?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          },
        }
      );
      setGenres(data.genres);
    };

    getGenres();
  }, []);

  return (
    <GenreContext.Provider value={{ genres }}>{children}</GenreContext.Provider>
  );
};
export const useGenres = () => useContext(GenreContext);
