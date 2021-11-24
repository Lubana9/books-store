import React, { useCallback } from "react";

import { Input } from "antd";
import "antd/dist/antd.css";
import "@styles/style.css";
export type InputProps = {
  onChange: (value: string) => void;
  value: string;
};
const SearchInput: React.FC<InputProps> = ({ onChange, value }) => {
  const handelChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      onChange(e.currentTarget.value);
    },
    [onChange]
  );
  return (
    <Input
      placeholder="Search for books..."
      onChange={handelChange}
      value={value}
      allowClear
      size="large"
      type="search"
      className="sort_input"
    />
  );
};

export default SearchInput;
