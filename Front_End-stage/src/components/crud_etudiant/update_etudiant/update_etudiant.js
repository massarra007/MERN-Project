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
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "../create_etudiant/style.css";
import * as api from "../../../service/etudiant.js";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import MySideNavAdmin  from "../../sidenavs/sidenavAdmin.js";
import MySideNavDir from "../../sidenavs/sidenavdir.js";

function UpdateEtudiant() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const role = user?.role;
  const params = useParams();
  const [EtudiantData, setEtudiantData] = useState({
    firstname: "",
    lastname: "",
    niveau: "",
    classe: "",
    Birth_date: "",
    etat: "",
    phone: "",

    login: "",
    email: "",
  });

  const navigate = useNavigate();
  const [niveau, setNiveau] = React.useState("");
  const [etat, setEtat] = React.useState("");

  const handleChange = (e) => {
    setEtudiantData({ ...EtudiantData, [e.target.name]: e.target.value });
  };

  const handleChangeNiveau = (e) => {
    setNiveau(e.target.value);
    setEtudiantData({ ...EtudiantData, niveau: niveau });
  };
  const handleChangeEtat = (e) => {
    setEtat(e.target.value);
    setEtudiantData({ ...EtudiantData, etat: etat });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updateEtudiant = await api.updateEtudiant(EtudiantData, params.id);
      console.log(updateEtudiant, "upaeate");
      navigate("/readall-etudiant");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.getEtudiantbyid(params.id);
        setEtudiantData(result);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [params.id]);

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
                Modifier un étudiant{" "}
              </Typography>
              <Box
                sx={{
                  marginTop: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 12 }}
                >
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      value={EtudiantData.firstname}
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
                      value={EtudiantData.lastname}
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
                      id="login"
                      label="login"
                      name="login"
                      data-test="login"

                      value={EtudiantData.login}
                      autoFocus
                      onChange={handleChange}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      data-test="email"

                      label="email"
                      name="email"
                      value={EtudiantData.email}
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
                      data-test="phone"

                      value={EtudiantData.phone}
                      autoFocus
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={EtudiantData.classe}
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
                      value={moment(EtudiantData.Birth_date).format(
                        "YYYY-MM-DD"
                      )}
                      id="Birth_date"
                      label="date"
                      name="Birth_date"
                      data-test="Birth_date"

                      autoFocus
                      type="date"
                      onChange={handleChange}
                    />

                    <FormControl fullWidth sx={{ mt: 3 }}>
                      <InputLabel id="Niveau">Niveau</InputLabel>
                      <Select
                        labelId="Niveau"
                        id="Niveau"
                        value={EtudiantData.niveau}
                        label="Niveau"
                        name="niveau"
                        data-test="niveau"

                        onChange={handleChangeNiveau}
                      >
                        <MenuItem value={"licence"}>Licence</MenuItem>
                        <MenuItem value={"master"}>Master</MenuItem>
                        <MenuItem value={"cycle ingénieur"}>
                          Cycle ingénieur
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 3 }}>
                      <InputLabel id="staus">Etat</InputLabel>
                      <Select
                        labelId="etat"
                        id="etat"
                        data-test="etat"

                        value={EtudiantData.etat}
                        label="etat"
                        onChange={handleChangeEtat}
                      >
                        <MenuItem value={"alumni"}>Alumni</MenuItem>
                        <MenuItem value={"actuel"}>Actuel</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={6}>
                    <Button
                      type="submit"
                      fullWidth
                      data-test="modifier"

                      variant="contained"
                      sx={{
                        mt: 3,
                        mb: 2,
                        m: 4,
                        backgroundColor: "#00A36C",
                        ":hover": { backgroundColor: "#00A36C" },
                      }}
                    >
                      Modifier{" "}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}

export default UpdateEtudiant;
