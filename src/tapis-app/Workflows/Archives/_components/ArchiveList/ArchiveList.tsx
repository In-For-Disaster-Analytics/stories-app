import React from "react";
import { Link } from "react-router-dom";
import { useList } from "tapis-hooks/workflows/archives";
import { Workflows } from "@tapis/tapis-typescript";
import { QueryWrapper } from "cookbooks-ui/_wrappers";
import styles from "./ArchiveList.module.scss";
import { SectionMessage, Icon } from "cookbooks-ui/_common";
import { Toolbar } from "../../../_components";

type ArchiveListParams = {
  groupId: string;
};

const ArchiveList: React.FC<ArchiveListParams> = ({ groupId }) => {
  const { data, isLoading, error } = useList({ groupId });
  const archives: Array<Workflows.Archive> = data?.result ?? [];

  return (
    <QueryWrapper isLoading={isLoading} error={error}>
      <div id="-archives-list">
        <h2>
          Archives <span className={styles["count"]}>{archives.length}</span>
        </h2>
        <Toolbar buttons={["createarchive"]} groupId={groupId} />
        <div className={styles["container"]}>
          {archives.length ? (
            archives.map((archive, i) => {
              let evenodd: string = i % 2 > 0 ? styles["odd"] : styles["even"];
              let last: string =
                i === archives.length - 1 ? styles["last"] : "";
              return (
                <Link
                  to={`/workflows/archives/${groupId}/${archive.id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className={`${styles["archive"]} ${evenodd} ${last}`}>
                    <span>
                      <Icon name="folder" /> {archive.id}
                    </span>
                  </div>
                </Link>
              );
            })
          ) : (
            <SectionMessage type="info">No archives</SectionMessage>
          )}
        </div>
      </div>
    </QueryWrapper>
  );
};

export default ArchiveList;
