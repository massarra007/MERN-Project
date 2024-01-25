import React, { Component } from "react";
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
        <NavItem eventKey="administratif">
          <NavIcon>
            <i className="fa fa-fw fa-home" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Home</NavText>
        </NavItem>
        <NavItem eventKey="readall-etudiant" data-test="gestion-etudiant">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Gestion Etudiant</NavText>
        </NavItem>
        <NavItem eventKey="charts" data-test="gestion-etudiant2">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Statistiques Etudiants</NavText>
        </NavItem>

        <NavItem eventKey="readall-enseignant" data-test="gestion-enseignant">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Gestion Enseignant</NavText>
        </NavItem>

        <NavItem eventKey="readall-evenement" data-test="readall-evenement">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Gestion evenement</NavText>
        </NavItem>

        <NavItem eventKey="change-password">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Change mon Mot de passe</NavText>
        </NavItem>

        <NavItem eventKey="readall-pfa-admin">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Liste des pfa</NavText>
        </NavItem>
        <NavItem eventKey="readall-pfe"  data-test="readall-pfe">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Liste des pfe</NavText>
        </NavItem>

        <NavItem eventKey="statistics-pfe" data-test="readall-statistics">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Statistiques des pfe</NavText>
        </NavItem>

        <NavItem eventKey="anneeuniver" data-test="anneeuniver">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Année universitaire</NavText>
        </NavItem>
        <NavItem eventKey="validDemand">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Demandes vacations</NavText>
        </NavItem>
        <NavItem eventKey="validExpert">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Demandes contrat expert</NavText>
        </NavItem>
        <NavItem eventKey="gerer_droit_acces" >
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Gestion des administratifs</NavText>
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
