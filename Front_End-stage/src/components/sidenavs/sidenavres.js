import React, { Component } from "react";
import { Button } from "@mui/material";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function MySideNav() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
  };

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const statutEnseignant = user?.status;

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
        <NavItem eventKey="enseignant-responsable">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Home</NavText>
        </NavItem>
        {statutEnseignant == "responsable formation" ? (
          <NavItem eventKey="list-pfa">
            <NavIcon>
              <i
                className="fa-regular fa-hashtag"
                style={{ fontSize: "1em" }}
              />
            </NavIcon>
            <NavText>Liste PFAs</NavText>
          </NavItem>
        ) : null}
        {statutEnseignant == "responsable formation" ? (
          <NavItem eventKey="valider-pfa">
            <NavIcon>
              <i
                className="fa-regular fa-hashtag"
                style={{ fontSize: "1em" }}
              />
            </NavIcon>
            <NavText>Valider PFAs</NavText>
          </NavItem>
        ) : null}

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
