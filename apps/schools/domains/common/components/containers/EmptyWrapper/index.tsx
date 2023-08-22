import React from "react";
import styles from "./styles/styles.module.scss";
import classNames from "classnames";
import { EmptyWrapperProps } from "./interfaces";
import Image from "next/image";
import duckEmptyPage from "@public/image/duckEmptyPage.svg";
import { Typography } from "antd";
import { Button } from "@domains/common/components/button";

const EmptyWrapper: React.FC<EmptyWrapperProps> = (props) => {
  const { children } = props

  if (!props.data) {
    return (
      <div className={styles.container}>
        <Typography.Title level={1}>{props.pageTitle}</Typography.Title>
        <div className={classNames(styles.duckContainer, props.className)} style={props.style}>
          <Image style={{ height: '60%', width: '100%', }} src={duckEmptyPage} alt={'Duck with a magnifying glass'}/>
          <div>{props.titleText}</div>
          <div>{props.descriptionText}</div>
          <Button>{props.buttonText}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default EmptyWrapper;
