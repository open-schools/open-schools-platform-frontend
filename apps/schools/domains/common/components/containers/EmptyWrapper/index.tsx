import React from "react";
import styles from "./styles/styles.module.scss";
import classNames from "classnames";
import {EmptyWrapperProps} from "./interfaces";
import Image from "next/image";
import duckEmptyPage from "@public/image/duckEmptyPage.svg";
import {Typography} from "antd";
import {Button} from "@domains/common/components/button";

const EmptyWrapper: React.FC<EmptyWrapperProps> = (props) => {
    const {children} = props

    if (!props.isLoading && (!props.data || props.data.count === 0)) {
        return (
            <div className={classNames(styles.container, props.className)}>
                <Typography.Title level={1}>{props.pageTitle}</Typography.Title>
                <div className={styles.duckContainer}>
                    <Image src={duckEmptyPage} alt={'Duck with a magnifying glass'}/>
                    <div className={styles.textContainer}>
                        <Typography.Title className={styles.titleText} level={4}>{props.titleText}</Typography.Title>
                        <span className={styles.descriptionText}>{props.descriptionText}</span>
                        <Button className={styles.button} onClick={props.handleRunTask}>
                            {props.buttonText}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            {children}
        </div>
    );
};

export default EmptyWrapper;
