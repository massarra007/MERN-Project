import { Badge, IconButton } from "@mui/material";
import React, { Component }  from 'react';
import styles from "../administratif/styles.module.css";

import { MailLockOutlined } from "@mui/icons-material";

import MySideNavActuel from "../sidenavs/sidenavactuel";
import MySideNavAlumni from "../sidenavs/sidenavAlum";
import {  useState } from "react";

const EspacEtudiant = () => {



  return (
    <div className={styles.main_container}>
      <MySideNavActuel /> 
    </div>
  );
};

export default EspacEtudiant;
