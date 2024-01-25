import React, { Component }  from 'react';
import styles from "./styles.module.css";
import MySideNav from "../sidenavs/sidenavdir";
const EspacDirecteur = () => {
  return (
    <div className={styles.main_container}>
      <MySideNav />
    </div>
  );
};

export default EspacDirecteur;
