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
import { useList as useJobsList } from "tapis-hooks/jobs";
import { useList as useAppsList } from "tapis-hooks/apps";
import styles from "./Dashboard.module.scss";
import "./Dashboard.scss";
import systems from "catalog/systems";
import { sys } from "typescript";

type DashboardCardProps = {
  icon: string;
  link: string;
  name: string;
  text: string;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  link,
  name,
  text,
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
        <Link to={link}>Create {name}</Link>
        <Icon name="push-right" />
      </CardFooter>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  const { accessToken, claims } = useTapisConfig();

  return (
    <div>
      <SectionHeader className="dashboard__section-header">
        Dashboard for {claims["tapis/tenant_id"]}
      </SectionHeader>
      <div className={styles.cards}>
        {accessToken ? (
          <>
            {systems.map((sys) => {
              return (
                <DashboardCard
                  icon="data-files"
                  name={sys.name}
                  text={sys.description}
                  link={`/cookbooks/systems/${sys.id}`}
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
