import React from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Meta } from "@utils/Meta";
import { Button } from "antd";
import "antd/dist/antd.css";

export type ButtonProps = {
  onClick: (e: React.MouseEvent) => void;
  isLoading?: Meta;
};
const SearchButton: React.FC<ButtonProps> = ({ onClick, isLoading }) => {
  return (
    <Button
      size="large"
      icon={<SearchOutlined />}
      onClick={onClick}
      disabled={isLoading === Meta.loading}
    />
  );
};

export default SearchButton;
