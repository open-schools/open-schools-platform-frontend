import { Button as BaseButton } from "antd";
import { ButtonProps } from "antd/lib/button";
import React from "react";

export type IButton = ButtonProps;

export const Button: React.FC<IButton> = ({ ...rest }) => {
  return <BaseButton {...rest} data-testid="btn" />;
};
