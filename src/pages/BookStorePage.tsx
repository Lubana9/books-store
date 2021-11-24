/* eslint-disable no-console */
import { useCallback, useEffect, useState } from "react";

import BookCard from "@components/BookCard";
import SearchInput from "@components/input";
import SearchButton from "@components/SearchButton";
import "@styles/style.css";
import SortBooks from "@components/SortBooks";
import { Meta } from "@utils/Meta";
import { useLocalStore } from "@utils/UseLocalStore";
import { Select, Skeleton, Space } from "antd";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { BookItemModule } from "src/modules/bookItem";
import GBookStore from "src/store/GBookStore";

const BookStorePage: React.FC = () => {
  const gBookStore = useLocalStore(() => new GBookStore());
  // useEffect(() => {
  //   setIsLoading(true);
  //   axios.get(url).then((res: any) => {
  //     setIsLoading(false);
  //     setList(res.data.items);
  //   });
  // }, [url]);
  // const handelChange = (value: string) => {
  //   return setValue(value);
  // };

  useEffect(() => {
    gBookStore.getBooksList({
      BookName: "js",
    });
  }, [gBookStore]);

  const handelChange = useCallback(
    (value: string): string => {
      return gBookStore.setValue(value);
    },
    [gBookStore]
  );
  const handelClick = useCallback(() => {
    gBookStore.getBooksList({
      BookName: gBookStore.value,
    });
  }, [gBookStore]);
  const sortedBooks = gBookStore.list.sort(
    (a: BookItemModule, b: BookItemModule): any => {
      if (gBookStore.sort === "Newest") {
        return (
          parseInt(b.volumeInfo.publishedDate) -
          parseInt(a.volumeInfo.publishedDate)
        );
      } else if (gBookStore.sort === "Oldest") {
        return (
          parseInt(a.volumeInfo.publishedDate) -
          parseInt(b.volumeInfo.publishedDate)
        );
      }
    }
  );
  const handelSort = (value: string) => {
    return gBookStore.setSort(value);
  };

  return (
    <div className="background--img">
      <div className="grid grid--1x2 ">
        <form className="input--group">
          <SearchInput onChange={handelChange} value={gBookStore.value} />
          <SearchButton onClick={handelClick} isLoading={gBookStore.meta} />
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

      {gBookStore.meta === Meta.loading ? (
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

export default observer(BookStorePage);
