"use client";
import { Moon, purpleLogo, Sun } from "../svgs/vectors";
import { useSearchParams } from "next/navigation";
import { GenreMenu } from "./genreMenu";
import { SearchMenu } from "./searchMenu";
import { Button } from "@/components/ui/button";

type NavBarProps = {
  setIsDark: (value: boolean) => void;
  isDark: boolean;
};

export const NavBar = ({ setIsDark, isDark }: NavBarProps) => {
  const searchParams = useSearchParams();
  return (
    <div className='flex w-screen  ${` antialiased ${isDark ? "dark" : ""}`}'>
      <div className="flex w-full items-center px-20 py-[11.5px] dark:bg-black">
        <div className="flex w-full justify-between items-center ">
          <div className="text-indigo-700 flex gap-2 font-bold items-center text-xl">
            {purpleLogo} Movie Z
          </div>
          <div className="flex gap-3 w-122 h-full">
            <GenreMenu />
            <SearchMenu />
          </div>
          <Button
            onClick={() => {
              setIsDark(!isDark);
            }}
            className="w-9 h-9 border border-gray-400 rounded-xl dark:bg-black"
          >
            {isDark ? <Sun /> : <Moon />}
          </Button>
        </div>
      </div>
    </div>
  );
};
