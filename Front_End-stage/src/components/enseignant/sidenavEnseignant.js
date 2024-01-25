import React, { Component }  from 'react';
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
        <NavItem eventKey="enseignant">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Home</NavText>
        </NavItem>
        <NavItem eventKey="readall-pfa">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Gestion PFAs</NavText>
        </NavItem>
        <NavItem eventKey="liste-pfe" data-test="liste-pfe">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Liste des pfe</NavText>
        </NavItem>
        
        <NavItem eventKey="liste-mes-pfe" data-test='liste-mes-pfe'>
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>mes pfe</NavText>
        </NavItem>
        
        <NavItem eventKey="liste-mes-pfa">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Mes PFAs</NavText>
        </NavItem> 
        
        <NavItem eventKey="liste-des-etudiants">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Liste des etudiants</NavText>
        </NavItem>

        <NavItem eventKey="signin">
        <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText><Button onClick={handleLogout}>Logout</Button></NavText>
       
        </NavItem>
    
      </SideNav.Nav>
    </SideNav>
  );
}
export default MySideNav;
