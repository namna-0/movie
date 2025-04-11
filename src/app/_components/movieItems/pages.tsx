"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect } from "react";
type PagesProps = {
  totalPages: number;
  setTotalPages: (value: number) => void;
  length: number[];
  setLength: (value: number[]) => void;
  page: number;
  setPage: (value: number) => void;
};

export const Pages = ({
  totalPages,
  setTotalPages,
  length,
  setLength,
  page,
  setPage,
}: PagesProps) => {
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePage = (page: number) => {
    setPage(page);
  };
  useEffect(() => {
    if (page == 1 || page == 2) {
      setLength([2, 3]);
    }
    if (page >= 3) {
      setLength([page, page + 1]);
    }
    if (page >= totalPages - 2) {
      setLength([totalPages - 2, totalPages - 1]);
    }
    if (page == totalPages) {
      setLength([totalPages - 2, totalPages - 1]);
    }
  }, [page, totalPages]);
  return (
    <Pagination>
      <PaginationContent>
        {page > 0 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                handlePrev();
              }}
            />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink isActive={page == 1} onClick={() => setPage(1)}>
            1
          </PaginationLink>
        </PaginationItem>
        {page > 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {length.slice(0, 2).map((item) => (
          <PaginationItem
            className={`${
              page == item ? "border-solid rounded-sm border" : ""
            }`}
            key={item}
          >
            <PaginationLink
              onClick={() => {
                setPage(item);
              }}
            >
              {item}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page <= totalPages - 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink
            isActive={page == totalPages}
            onClick={() => setPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              handleNext();
            }}
          ></PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
