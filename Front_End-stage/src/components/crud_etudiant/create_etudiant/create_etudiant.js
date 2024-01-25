import {
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import "./style.css";
import * as api from "../../../service/etudiant.js";
import { useNavigate } from "react-router-dom";
import MySideNavAdmin  from "../../sidenavs/sidenavAdmin.js";
import MySideNavDir from "../../sidenavs/sidenavdir.js";

function CreateEtudiant() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const role = user?.role;
  const [EtudiantData, setEtudiantData] = useState({
    firstname: "",
    lastname: "",
    niveau: "",
    classe: "",
    Birth_date: "",
    etat: "",
    phone: "",
    password: "",
    role: "etudiant",
    email: "",
    login: "",
  });
  const navigate = useNavigate();
  const [niveau, setNiveau] = React.useState("");
  const [status, setStatus] = React.useState("");

  const handleChange = (e) => {
    setEtudiantData({ ...EtudiantData, [e.target.name]: e.target.value });
    console.log(EtudiantData);
  };

  const handleChangeNiveau = (e) => {
    setNiveau(e.target.value);
    setEtudiantData({ ...EtudiantData, niveau: e.target.value });
  };
  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
    setEtudiantData({ ...EtudiantData, etat: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newEtudiant = await api.createEtudiant(EtudiantData);
      console.log(newEtudiant);
      navigate("/readall-etudiant");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
    {role === "administratif" ? <MySideNavAdmin /> : <MySideNavDir />}
      <Paper
        elevation={3}
        sx={{
          height: 600,
        }}
      >
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid">
              <Typography component="h1" variant="h5">
                Créer un étudiant{" "}
              </Typography>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 12 }}
              >
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstname"
                    label="nom"
                    name="firstname"
                    data-test="firstname"
                    autoFocus
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastname"
                    label="prénom"
                    name="lastname"
                    data-test="lastname"
                    autoFocus
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="phone"
                    label="phone"
                    name="phone"
                    type={"number"}
                    data-test="phone"
                    autoFocus
                    onChange={handleChange}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="email"
                    name="email"
                    data-test="email"
                    
                    autoFocus
                    onChange={handleChange}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="login"
                    label="login"
                    name="login"
                    data-test="login"
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="password"
                    name="password"
                    data-test="password"
                    type={"password"}
                    autoFocus
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="classe"
                    label="classe"
                    name="classe"
                    data-test="classe"
                    autoFocus
                    onChange={handleChange}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="Birth_date"
                    label="date"
                    name="Birth_date"
                    data-test="Birth_date"
                    autoFocus
                    type="date"
                    onChange={handleChange}
                  />
              

                  <label for="niveau">Niveau</label>

                  <select
                    name="niveau"
                    labelId="Niveau"
                    id="Niveau"
                    value={niveau}
                    label="Niveau"
                    data-test="niveau"
                    style={{ width: "100%", height: "50px" }}
                    onChange={handleChangeNiveau}
                  >
                    <option value={"licence"}>Licence</option>
                    <option value={"master"}>Master</option>
                    <option value={"cycle ingénieur"}>Cycle ingénieur</option>
                  </select>

                  <label for="niveau">Etat</label>

                  <select
                    labelId="etat"
                    id="staus"
                    value={status}
                    data-test="etat"
                    label="etat"
                    onChange={handleChangeStatus}
                    style={{ width: "100%", height: "50px" }}
                  >
                    <option value={"alumni"}>Alumni</option>
                    <option value={"actuel"}>Actuel</option>
                  </select>
                  {/*   <FormControl fullWidth sx={{ mt: 3 }}>
                    <InputLabel id="staus">Etat</InputLabel>
                    <Select
                      labelId="etat"
                      id="etat"
                      value={status}
                      data-test="etat"
                      label="etat"
                      onChange={handleChangeStatus}
                    >
                      <MenuItem value={"alumni"}>Alumni</MenuItem>
                      <MenuItem value={"actuel"}>Actuel</MenuItem>
                    </Select>
                  </FormControl> */}
                </Grid>

                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    fullWidth
                    data-test="ajouter"
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      m: 4,
                      backgroundColor: "#00A36C",
                      ":hover": { backgroundColor: "#00A36C" },
                    }}
                  >
                    Ajouter{" "}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}

export default CreateEtudiant;
