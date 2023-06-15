import { Card as AntdCard } from "antd";
import { CardProps } from "antd/lib/card";
import React from "react";

export const Card: React.FC<CardProps> = ({ title, children, ...rest }) => {
  return (
    <AntdCard title={title} bordered={false}>
      {children}
    </AntdCard>
  );
};
