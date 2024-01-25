import React, { Component } from "react";
import { MailLockOutlined } from "@mui/icons-material";
import { Badge, Button, IconButton } from "@mui/material";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { ToastContainer, toast } from "react-toastify";
import io from "socket.io-client";
import * as api from "../../service/notification";
function MySideNav() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
  };

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const statutEtudiant = user?.etat;

  return (
    <SideNav
      onSelect={(selected) => {
        console.log(selected);
        navigate("/" + selected);
      }}
      style={{ backgroundColor: "#3bb19b" }}
    >
      <SideNav.Toggle />

      <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="change-password">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Changer mot de passe</NavText>
        </NavItem>
        {statutEtudiant == "alumni" ? (
           <NavItem eventKey="update-cv-alumni">
           <NavIcon>
             <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
           </NavIcon>
           <NavText>Modifier CV</NavText>
         </NavItem>
        ) : null}
        <NavItem eventKey="addDemandes">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Ajouter demande de vacation/Expert </NavText>
        </NavItem>

        <NavItem eventKey="signin">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>
            <Button onClick={handleLogout}>Logout</Button>
          </NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}
export default MySideNav;
