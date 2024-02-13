import React from "react";
import { SectionHeader as CommonSectionHeader } from "tapis-ui/_common";
import styles from "./LayoutSections.module.scss";
import { ReactNodeLike } from "prop-types";

export const LayoutHeader: React.FC<
  React.PropsWithChildren<{ type?: string; children: ReactNodeLike }>
> = ({ children, type }) => {
  return (
    <div className={type && styles[type]}>
      <CommonSectionHeader>{children}</CommonSectionHeader>
    </div>
  );
};

export const LayoutNavWrapper: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return <div className={styles.nav}>{children}</div>;
};

export const LayoutBody: React.FC<
  React.PropsWithChildren<{ constrain?: boolean }>
> = ({ children, constrain }) => {
  return (
    <div className={`${styles.body} ${constrain ? styles.constrain : ""}`}>
      <div className={styles.detail}>{children}</div>
    </div>
  );
};
