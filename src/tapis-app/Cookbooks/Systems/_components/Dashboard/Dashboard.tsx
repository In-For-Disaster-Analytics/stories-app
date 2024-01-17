import React from "react";
import { Link, Redirect } from "react-router-dom";
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
import styles from "./Dashboard.module.scss";
import "./Dashboard.scss";
import systemCookbooks from "catalog/systems";

type DashboardCardProps = {
  icon: string;
  link: string;
  name: string;
  text: string;
  created: boolean;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  link,
  name,
  text,
  created,
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
          <div>{text}</div>
        </CardTitle>
        <CardText>{}</CardText>
      </CardBody>
      <CardFooter className={styles["card-footer"]}>
        {created ? (
          <span>Installed</span>
        ) : (
          <Link to={link}>Create {name}</Link>
        )}
      </CardFooter>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  const { accessToken, claims } = useTapisConfig();

  const { isLoading, error, data: systems } = useSystemsList();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {/* <SectionHeader className="dashboard__section-header">
        Systems installable on {claims["tapis/tenant_id"]}
      </SectionHeader> */}
      <SectionHeader className="dashboard__section-header">
        Install a system using cookbooks
      </SectionHeader>
      <div className={styles.cards}>
        {accessToken ? (
          <>
            {systemCookbooks
              .filter((system) => system.spec.systemType === "LINUX")
              .sort((a, b) =>
                a.created === b.created ? 0 : a.created ? 1 : -1
              )
              .map((sys) => {
                sys.created = systems?.result?.find(
                  (s) => s.host === sys.spec.host
                )
                  ? true
                  : false;
                return (
                  <DashboardCard
                    key={sys.id}
                    icon="data-files"
                    name={sys.name}
                    text={sys.description}
                    link={`/cookbooks/systems/${sys.id}`}
                    created={sys.created}
                  />
                );
              })}
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
