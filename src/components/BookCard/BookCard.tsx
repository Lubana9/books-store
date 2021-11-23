import React from "react";

import { Card } from "antd";
export type CardProps = {
  data: any;
  onClick?: (e: React.MouseEvent) => void;
};
const BookCard: React.FC<CardProps> = ({ data }) => {
  const { Meta } = Card;
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="bookimg" src={data} />}
    >
      <Meta title={data} description={data} />
      <Meta description={data} />
    </Card>
  );
};

export default BookCard;
