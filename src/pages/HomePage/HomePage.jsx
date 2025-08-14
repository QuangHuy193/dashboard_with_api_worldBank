import React, { useState } from "react";
import { Layout } from "antd";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import classnames from "classnames/bind";
import styles from "./HomePage.module.scss";
import { sidebarMenuItems } from "../../utils/constant";
import Loading from "../../components/Loading/Loading";

const cx = classnames.bind(styles);
const { Content } = Layout;

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [menuKey, setMenuKey] = useState("dashboard");

  const renderContent = () => {
    const menu = sidebarMenuItems.find((item) => item.key === menuKey);
    if (!menu) return <h1>404 - Không tìm thấy trang</h1>;

    const Component = menu.component;
    if (menu.isLoading) {
      return <Component setIsLoading={setIsLoading} />;
    }

    return <Component />;
  };

  return (
    <>
      {isLoading && <Loading />}
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
    </>
  );
}
