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
  const [value, setValue] = useState("search+terms");
  const [list, setList] = useState<BookItemModule[]>([]);
  const [loading, setIsLoading] = useState(false);
  const [sort, setSort] = useState("");
  const apiKey = "AIzaSyD3G6hLz-Kmkaufk0SYiI6nhQB2KzhLSFM";

  const [url, setUrl] = useState(
    `https://www.googleapis.com/books/v1/volumes?q=search+terms&maxResults=40`
  );
  const [isError, setIsError] = useState(false);
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
        parseInt(b.volumeInfo.publishedDate.substring(0, 4)) -
        parseInt(a.volumeInfo.publishedDate.substring(0, 4))
      );
    } else if (sort === "Oldest") {
      return (
        parseInt(a.volumeInfo.publishedDate.substring(0, 4)) -
        parseInt(b.volumeInfo.publishedDate.substring(0, 4))
      );
    }
  });
  const handelSort = () => {
    return sortedBooks;
  };

  return (
    <div className="background--img">
      <div className="container">
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
      <div className=" container select--item">
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
        <div>Loading ...</div>
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
