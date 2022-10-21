import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { Category } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

interface Paging {
  pagingFor: "category" | "search";
  startNum: number;
  categoryName?: string;
  id?: number;
  title?: string;
}

interface SearchPaging {
  pagingFor: "search";
  title: string;
}

interface CategoryPaging {
  pagingFor: "category";
  categoryName: string;
  id: number;
}

const Paging: React.FC<Paging & (CategoryPaging | SearchPaging)> = ({
  pagingFor,
  id,
  startNum,
  categoryName,
  title,
}) => {
  const [page, setPage] = useState<number>(startNum);

  const onClickBefore = (e: any, num: number) => {
    if (page !== 1) setPage((prev) => prev - num);
  };
  const onClickNext = (e: any, num: number) => {
    setPage((prev) => prev + num);
  };
  return (
    <>
      <div className="laptop:hidden">
        <ButtonGroup className="rounded flex p-1">
          <IconButton
            aria-label="before"
            icon={<MdArrowBackIos />}
            onClick={(e) => onClickBefore(e, 5)}
          />
          {pagingFor === "category" &&
            Array.from(Array(5).keys()).map((index) => (
              <Link
                key={index}
                href={{
                  pathname: `/category/${id}`,
                  query: { name: categoryName, page: index + page },
                }}
              >
                <Button className="w-10">{index + page}</Button>
              </Link>
            ))}
          {pagingFor === "search" &&
            Array.from(Array(5).keys()).map((index) => (
              <Link
                key={index}
                href={{
                  pathname: `/search`,
                  query: { page: index + page, title },
                }}
              >
                <Button className="w-10">{index + page}</Button>
              </Link>
            ))}
          <IconButton
            aria-label="after"
            icon={<MdArrowForwardIos />}
            onClick={(e) => onClickNext(e, 5)}
          />
        </ButtonGroup>
      </div>
      <div className="mobile:hidden">
        <ButtonGroup className="rounded flex p-1">
          <IconButton
            aria-label="before"
            icon={<MdArrowBackIos />}
            onClick={(e) => onClickBefore(e, 10)}
          />
          {pagingFor === "category" &&
            Array.from(Array(10).keys()).map((index) => (
              <Link
                key={index}
                href={{
                  pathname: `/category/${id}`,
                  query: { name: categoryName, page: index + page },
                }}
              >
                <Button className="w-10">{index + page}</Button>
              </Link>
            ))}
          {pagingFor === "search" &&
            Array.from(Array(10).keys()).map((index) => (
              <Link
                key={index}
                href={{
                  pathname: `/search`,
                  query: { page: index + page, title },
                }}
              >
                <Button className="w-10">{index + page}</Button>
              </Link>
            ))}
          <IconButton
            aria-label="after"
            icon={<MdArrowForwardIos />}
            onClick={(e) => onClickNext(e, 10)}
          />
        </ButtonGroup>
      </div>
    </>
  );
};

export default Paging;
