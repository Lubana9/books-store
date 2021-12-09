import React from "react";

import { Card } from "antd";
import { BookItemModule } from "src/modules/bookItem";
export type CardProps = {
  data: BookItemModule;
  onClick: (value: React.MouseEvent) => void;
};
const BookCard: React.FC<CardProps> = ({ data, onClick }) => {
  const { Meta } = Card;
  return (
    <Card
      onClick={onClick}
      hoverable
      style={{ width: 240 }}
      cover={<img alt="bookimg" src={data.volumeInfo.imageLinks?.thumbnail} />}
    >
      <Meta
        title={data.volumeInfo.title}
        description={data.volumeInfo.categories}
      />
      <Meta description={data.volumeInfo.publishedDate} />
    </Card>
  );
};

export default BookCard;
