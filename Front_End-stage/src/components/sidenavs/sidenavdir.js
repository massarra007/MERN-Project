import React from 'react';
import { Button } from "@mui/material";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function MySideNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
  };
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const accessRights = user?.accessRights;
  const renderSideNavItem = (eventKey, iconClass, text) => (
    <NavItem eventKey={eventKey}>
      <NavIcon>
        <i className={iconClass} style={{ fontSize: "1em" }} />
      </NavIcon>
      <NavText>{text}</NavText>
    </NavItem>
  );

  const renderSideNavItems = () => {
    const sideNavItems = [];

    // Add access control logic here
   
     
      if (accessRights.includes("gestion-evenement")) {
        sideNavItems.push(renderSideNavItem("readall-evenement", "fa fa-fw fa-hashtag", "Gestion événement"));
      
     }

    if (accessRights.includes("gestion-enseignant")) {
      sideNavItems.push(renderSideNavItem("readall-enseignant", "fa fa-fw fa-hashtag", "Gestion enseignant"));
    
   }

  if (accessRights.includes("gestion-etudiant")) {
    sideNavItems.push(renderSideNavItem("readall-etudiant", "fa fa-fw fa-hashtag", "Gestion etudiant"));
  
  }

  if (accessRights.includes("gestion-pfas")) {
    sideNavItems.push(renderSideNavItem("readall-pfa-admin", "fa fa-fw fa-hashtag", "Liste des  pfas"));
  
  }

  if (accessRights.includes("gestion-pfes")) {
    sideNavItems.push(renderSideNavItem("readall-pfe", "fa fa-fw fa-hashtag", "Liste des  pfes"));
  
  }

  if (accessRights.includes("gestion-anneeUniversitaire")) {
    sideNavItems.push(renderSideNavItem("anneeuniver", "fa-regular fa-hashtag", "Ajouter Annee universitaire"));
    
  }

  if (accessRights.includes("gestion-administratif")) {
    sideNavItems.push(renderSideNavItem("gerer_droit_acces", "fa-regular fa-hashtag", "Gestion administratif"));
    
  }

    sideNavItems.push(renderSideNavItem("change-password", "fa-regular fa-hashtag", "Changer mot de passe"));
    sideNavItems.push(
      renderSideNavItem("signin", "fa-regular fa-hashtag", (
        <Button onClick={handleLogout}>Logout</Button>
      ))
    );
    return sideNavItems;
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

        {renderSideNavItems()}
        <NavItem eventKey="change-password"></NavItem>
        <NavItem eventKey="readall-evenement"></NavItem>
        <NavItem eventKey="readall-etudiant"></NavItem>
        <NavItem eventKey="readall-enseignant"></NavItem>
        <NavItem eventKey="readall-pfa-admin"></NavItem>
      </SideNav.Nav>
    </SideNav>
  );
}

export default MySideNav;
