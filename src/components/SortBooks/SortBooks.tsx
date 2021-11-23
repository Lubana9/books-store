import { Select } from "antd";
export type SortProps = {
  data: string;
  onSort: (value: string) => void;
};
const SortBooks: React.FC<SortProps> = ({ data, onSort }) => {
  return (
    <Select
      size="large"
      defaultValue="all"
      style={{ width: 120 }}
      onChange={onSort}
    >
      <Select value="All">All</Select>
      <Select value={data}>{data}</Select>
    </Select>
  );
};

export default SortBooks;
