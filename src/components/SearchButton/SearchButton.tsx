import React from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import "antd/dist/antd.css";
export type ButtonProps = {
  onClick: (e: React.MouseEvent) => void;
};
const SearchButton: React.FC<ButtonProps> = ({ onClick }) => {
  return <Button size="large" icon={<SearchOutlined />} onClick={onClick} />;
};

export default SearchButton;
