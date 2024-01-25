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
        <NavItem eventKey="ajout-pfe">
          <NavIcon>
            <i className="fa fa-fw fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Ajouter sujet PFE</NavText>
        </NavItem>
        <NavItem eventKey="ajouter-stage">
          <NavIcon>
            <i className="fa fa-fw fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Ajouter stage</NavText>
        </NavItem>
        <NavItem eventKey="update-cv">
          <NavIcon>
            <i className="fa-regular fa-hashtag" style={{ fontSize: "1em" }} />
          </NavIcon>
          <NavText>Modifier CV</NavText>
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
