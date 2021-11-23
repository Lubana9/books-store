import React, { useCallback } from "react";

import { Input } from "antd";
import "antd/dist/antd.css";
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
    />
  );
};

export default SearchInput;
