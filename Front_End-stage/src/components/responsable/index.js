import React, { Component }  from 'react';
import styles from "./styles.module.css";
import Sidebar from "../sidenavs/sidenavres";
const Main = () => {
  return (
    <div className={styles.main_container}>
      <Sidebar />
    </div>
  );
};

export default Main;