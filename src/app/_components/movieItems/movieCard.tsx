import Link from "next/link";
import { star } from "../svgs/vectors";

type MovieListProps = {
  url: string;
  name: string;
  rating: number;
  id: number;
};
export const MovieCard = ({ url, name, rating, id }: MovieListProps) => {
  return (
    <Link href={`/movie/${id}`}>
      <div className="w-9/10 aspect-[1/1.2] flex flex-col">
        <img
          className="w-full h-full rounded-t-lg object-cover"
          src={url}
          alt="Image"
        />
        <div className="flex flex-col h-[33%] dark:bg-[#27272A] bg-[#f1f1f8] rounded-b-lg p-[2%]">
          <div className="flex flex-row text-wrap items-center gap-[2%]">
            {star}
            <p className="text-[85%]">
              <span className="font-bold">{Math.floor(rating * 10) / 10}</span>
              <span className="text-[#71717A]">/10</span>
            </p>
          </div>
          <div className="text-wrap overflow-hidden">
            <p className="text-[85%]">{name}</p>{" "}
            {/* `text-[1em]`-ийг `text-base` гэж ашиглах боломжтой */}
          </div>
        </div>
      </div>
    </Link>
  );
};
