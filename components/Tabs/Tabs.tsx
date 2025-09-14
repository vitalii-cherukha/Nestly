import React from "react";
import clsx from "clsx";
import {
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabsProps,
  TabListProps,
  TabPanelProps,
  TabProps,
} from "react-tabs";

import css from ".Tabs.module.css";
import "react-tabs/style/react-tabs.css";
import Loader from "../Loader/Loader";

interface TabItem {
  title: string;
  node: React.ReactNode;
  isLoading: boolean;
  errorMessage?: string;
  isError?: boolean;
}

interface Props {
  items: TabItem[];
  tabsProps?: TabsProps;
  tabListProps?: TabListProps;
  tabProps?: TabProps;
  tabPanelProps?: TabPanelProps;
}

export function CustomTabs({
  items,
  tabsProps,
  tabListProps,
  tabProps,
  tabPanelProps,
}: Props) {
  const renderTabs = React.useCallback(
    ({ title }: TabItem, i: number) => {
      return (
        <Tab
          key={i}
          className={clsx(css.tab)}
          selectedClassName={css["tab-selected"]}
          {...tabProps}
        >
          {title}
        </Tab>
      );
    },
    [tabProps]
  );

  const renderTabsPanels = React.useCallback(
    ({ node, isLoading, errorMessage, isError }: TabItem, i: number) => {
      const getContent = () => {
        switch (true) {
          case isLoading:
            return <Loader />;
          case isError:
            return <div className={css["tab-error"]}>{errorMessage}</div>;
          default:
            return node;
        }
      };
      return (
        <TabPanel
          key={i}
          className={clsx(css["tab-panel"])}
          selectedClassName={clsx(css["tab-panel-selected"])}
          {...tabPanelProps}
        >
          {getContent()}
        </TabPanel>
      );
    },
    [tabPanelProps]
  );

  return (
    <Tabs {...tabsProps}>
      <TabList className={clsx(css["tab-list"])} {...tabListProps}>
        {items.map(renderTabs)}
      </TabList>

      {items.map(renderTabsPanels)}
    </Tabs>
  );
}
