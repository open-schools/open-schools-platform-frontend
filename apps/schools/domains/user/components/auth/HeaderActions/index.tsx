import { Tabs } from "antd";
import Router from "next/router";
import React from "react";

import styles from "./styles/styles.module.scss";

interface ITabsActionsProps {
  currentActiveKey: string;
}

export const TabsAuthAction: React.FC<ITabsActionsProps> = (props) => {
  const { currentActiveKey } = props;

  const registerTab = "Регистрация";
  const signInTab = "Вход";

  return (
    <div className={styles.removeTabLine}>
      <Tabs
        defaultActiveKey={currentActiveKey}
        onChange={(activeKey) => Router.push(activeKey)}
        centered
        animated={false}
        size={"large"}
      >
        <Tabs.TabPane key="/auth/register?step=inputPhone" tab={registerTab} />
        <Tabs.TabPane key="/auth/signin" tab={signInTab} />
      </Tabs>
    </div>
  );
};
