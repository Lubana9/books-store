import { Children } from "react";

import { Select } from "antd";
import { BookItemModule } from "src/modules/bookItem";
export type SortProps = {
  onSort: (e: any) => void;
};
const SortBooks: React.FC<SortProps> = ({ onSort }) => {
  return (
    <Select
      size="large"
      defaultValue="Sort"
      style={{ width: 120 }}
      onChange={onSort}
    >
      <Select value="Sort" disabled>
        Sort
      </Select>
      <Select value="Newest">Newest</Select>
      <Select value="Oldest">Oldest</Select>
    </Select>
  );
};

export default SortBooks;
