import { Card } from "antd";
import styles from "./StatCard.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

export default function StatCard({ title, value, icon }) {
  return (
    <Card className={cx("stat_card")}>
      <div className={cx("icon")}>{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </Card>
  );
}
