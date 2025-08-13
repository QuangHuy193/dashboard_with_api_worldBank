import React, { useState } from "react";
import { Layout } from "antd";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import classnames from "classnames/bind";
import styles from "./HomePage.module.scss";
import { sidebarMenuItems } from "../../utils/constant";

const cx = classnames.bind(styles);
const { Content } = Layout;

export default function Dashboard() {
  const [menuKey, setMenuKey] = useState("dashboard");

  const renderContent = () => {
    const menu = sidebarMenuItems.find((item) => item.key === menuKey);
    return menu?.component || <h1>404 - Không tìm thấy trang</h1>;
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div className={cx("dashboard-header")}>
        <Header />
      </div>

      <div className={cx("dashboard-sidebar")}>
        <Sidebar onMenuClick={(key) => setMenuKey(key)} />
      </div>

      {/* Content cuộn */}
      <Layout className={cx("dashboard-content")}>
        <Content
          style={{
            background: "#fff",
            padding: 20,
            minHeight: "100%",
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}
