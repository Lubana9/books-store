/* eslint-disable no-console */
import { useCallback, useState } from "react";

import SearchInput from "@components/input";
import SearchButton from "@components/SearchButton";
import "@styles/style.css";
import SortBooks from "@components/SortBooks";
import { Space } from "antd";

const BookStorePage: React.FC = () => {
  const [value, setValue] = useState("");
  const handelChange = (value: string) => {
    console.log(value);
    return setValue(value);
  };
  const handelClick = () => {
    console.log(value);
    return value;
  };
  const handelSort = (value: string) => {
    console.log(value);
  };
  return (
    <div>
      <form className="container">
        <SearchInput onChange={handelChange} value={value} />
        <SearchButton onClick={handelClick} />
      </form>
      <div className="container">
        <Space size="middle">
          Categories:
          <SortBooks data={"cat"} onSort={handelSort} />
          Sorting by: <SortBooks data={"relev"} onSort={handelSort} />
        </Space>
      </div>
    </div>
  );
};

export default BookStorePage;
