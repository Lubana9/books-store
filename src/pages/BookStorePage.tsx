/* eslint-disable no-console */
import { useCallback, useEffect, useState } from "react";

import BookCard from "@components/BookCard";
import SearchInput from "@components/input";
import SearchButton from "@components/SearchButton";
import "@styles/style.css";
import SortBooks from "@components/SortBooks";
import { Select, Skeleton, Space } from "antd";
import axios from "axios";
import { BookItemModule } from "src/modules/bookItem";

const BookStorePage: React.FC = () => {
  const [value, setValue] = useState("js");
  const [list, setList] = useState<BookItemModule[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [sort, setSort] = useState("");

  const [url, setUrl] = useState(
    `https://www.googleapis.com/books/v1/volumes?q=js&maxResults=40`
  );

  useEffect(() => {
    setIsLoading(true);
    axios.get(url).then((res: any) => {
      setIsLoading(false);
      setList(res.data.items);
    });
  }, [url]);
  const handelChange = (value: string) => {
    return setValue(value);
  };

  const sortedBooks = list.sort((a: BookItemModule, b: BookItemModule): any => {
    if (sort === "Newest") {
      return (
        parseInt(b.volumeInfo.publishedDate) -
        parseInt(a.volumeInfo.publishedDate)
      );
    } else if (sort === "Oldest") {
      return (
        parseInt(a.volumeInfo.publishedDate) -
        parseInt(b.volumeInfo.publishedDate)
      );
    }
  });
  const handelSort = (value: string) => {
    return setSort(value);
  };

  return (
    <div className="background--img">
      <div className="grid grid--1x2 ">
        <form className="input--group">
          <SearchInput onChange={handelChange} value={value} />
          <SearchButton
            onClick={() =>
              setUrl(
                `https://www.googleapis.com/books/v1/volumes?q=${value}&maxResults=40`
              )
            }
          />
        </form>
      </div>
      <div className=" container select--item sort_input">
        <Select
          defaultValue="Sort"
          style={{ width: 120 }}
          onChange={handelSort}
        >
          <Select value="Sort" disabled>
            Sort
          </Select>
          <Select value="Newest">Newest</Select>
          <Select value="Oldest">Oldest</Select>
        </Select>
      </div>

      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <div className="card--container grid grid--1x4">
            {sortedBooks.map((data: BookItemModule) => {
              return <BookCard key={data.id} data={data} />;
            })}
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default BookStorePage;
