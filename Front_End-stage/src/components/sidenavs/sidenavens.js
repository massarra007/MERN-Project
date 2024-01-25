import React, { Component }  from 'react';
import { Button } from "@mui/material";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useNavigate } from "react-router-dom";
function MySideNav() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
  };
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
