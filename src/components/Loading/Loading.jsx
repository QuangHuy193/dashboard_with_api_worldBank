import React from "react";
import classNames from "classnames/bind";
import styles from "./Loading.module.scss";

const cx = classNames.bind(styles);

function Loading() {
  return (
    <div className={cx("overlay")}>
      <div className={cx("box")}>
        <div className={cx("spinner")}></div>
        <p className={cx("text")}>Đang tải dữ liệu...</p>
      </div>
    </div>
  );
}

export default Loading;
