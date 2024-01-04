import React from "react";
import { Link } from "react-router-dom";
import { SectionHeader, LoadingSpinner, Icon } from "cookbooks-ui/_common";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardText,
} from "reactstrap";
import { useTapisConfig } from "tapis-hooks";
import { useList as useSystemsList } from "tapis-hooks/systems";
import { useList as useJobsList } from "tapis-hooks/jobs";
import { useList as useAppsList } from "tapis-hooks/apps";
import styles from "./Dashboard.module.scss";
import "./Dashboard.scss";
import CookbookCreator from "tapis-app/Cookbook/Creator";
import Apps from "tapis-app/Apps";

type DashboardCardProps = {
  icon: string;
  link: string;
  counter: string;
  name: string;
  text: string;
  loading: boolean;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  link,
  counter,
  name,
  text,
  loading,
}) => {
  return (
    <Card className={styles.card}>
      <CardHeader>
        <div className={styles["card-header"]}>
          <div>
            <Icon name={icon} className="dashboard__card-icon" />
          </div>
          <div>{name}</div>
        </div>
      </CardHeader>
      <CardBody>
        <CardTitle tag="h5">
          {loading ? (
            <LoadingSpinner placement="inline" />
          ) : (
            <div>{counter}</div>
          )}
        </CardTitle>
        <CardText>{text}</CardText>
      </CardBody>
      <CardFooter className={styles["card-footer"]}>
        <Link to={link}>Go to {name}</Link>
        <Icon name="push-right" />
      </CardFooter>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  const { accessToken, claims } = useTapisConfig();
  const systems = useSystemsList({});
  const jobs = useJobsList({});
  const apps = useAppsList({ select: "jobAttributes,version" });

  const renderNoApps = () => {
    return <CookbookCreator />;
  };

  const renderNoSystems = () => {
    return (
      <Card>
        <CardHeader>
          <div className={styles["card-header"]}>
            <div>
              <Icon name="data-files" className="dashboard__card-icon" />
            </div>
            <div>No systems available</div>
          </div>
        </CardHeader>
        <CardBody>
          <CardTitle tag="h5">
            <div>0 systems</div>
          </CardTitle>
          <CardText>
            You do not have access to any systems. Please contact your TAPIS
            administrator.
          </CardText>
        </CardBody>
      </Card>
    );
  };

  if (apps?.isLoading || jobs?.isLoading || systems?.isLoading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  if (systems?.data?.result?.length === 0) {
    return renderNoSystems();
  }

  if (apps?.data?.result?.length === 0) {
    return renderNoApps();
  }

  return (
    <div>
      <div className={styles.cards}>
        {accessToken ? (
          <>
            <Apps />
          </>
        ) : (
          <Card>
            <CardHeader>
              <div className={styles["card-header"]}>
                <div>
                  <Icon name="user" className="dashboard__card-icon" />
                </div>
                <div>You are not logged in</div>
              </div>
            </CardHeader>
            <CardBody>
              <CardTitle>Please log in to use TAPIS</CardTitle>
            </CardBody>
            <CardFooter className={styles["card-footer"]}>
              <Link to="/login">Proceed to login</Link>
              <Icon name="push-right" />
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
