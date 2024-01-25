import { Badge, IconButton } from "@mui/material";
import React, { Component }  from 'react';
import styles from "../administratif/styles.module.css";

import { MailLockOutlined } from "@mui/icons-material";


import MySideNavAlumni from "../sidenavs/sidenavAlum";
import {  useState } from "react";

const EspacEtudiant = () => {



  return (
    <div className={styles.main_container}>
      <MySideNavAlumni /> 
    </div>
  );
};

export default EspacEtudiant;
