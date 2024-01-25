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
import * as api from "../../service/etudiant.js";
import moment from "moment";
import MySideNav from "../sidenavs/sidenavactuel.js";

function UpdateEtudiant() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
 
  const iduser = user?._id;
 
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
    visibility: "",
  });
  const [visibility, setVisibility] = useState("");
  const [openEtat, setOpenEtat] = useState(false);
  const [openNiveau, setOpenNiveau] = useState(false);
  const [openVisibility, setOpenVisibility] = useState(false);
  const [niveau, setNiveau] = React.useState("");
  const [etat, setEtat] = React.useState("");

  const handleChange = (e) => {
    setEtudiantData({ ...EtudiantData, [e.target.name]: e.target.value });
  };

  const handleCloseNiveau = () => {
    setOpenNiveau(false);
  };

  const handleOpenNiveau = () => {
    setOpenNiveau(true);
  };

  const handleCloseVisibility = () => {
    setOpenVisibility(false);
  };

  const handleOpenVisibility = () => {
    setOpenVisibility(true);
  };

  const handleCloseEtat = () => {
    setOpenEtat(false);
  };

  const handleOpenEtat = () => {
    setOpenEtat(true);
  };

  const handleChangeNiveau = (e) => {
    setNiveau(e.target.value);
    setEtudiantData({ ...EtudiantData, niveau: e.target.value });
  };
  

  const handleChangeEtat = (e) => {
    setEtat(e.target.value);
    setEtudiantData({ ...EtudiantData, etat: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
      const updatedEtudiant = {
        ...EtudiantData,
        visibility: visibility,
      };

      const updateEtudiant = await api.updateEtudiant(updatedEtudiant, iduser);
      console.log(updateEtudiant, "update");
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
      
        const result = await api.getEtudiantbyid(iduser);
        setEtudiantData(result);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [iduser]);

  return (
    <Container>
      <MySideNav />
      <Paper
        elevation={3}
        sx={{
          height: 600,
        }}
      >
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid">
              <Typography component="h1" variant="h5">
                Modifier Compte étudiant{" "}
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
                      value={EtudiantData.login}
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
                      autoFocus
                      type="date"
                      onChange={handleChange}
                    />
                    {/*
                    <FormControl fullWidth sx={{ mt: 3 }}>
                      <InputLabel id="Niveau">Niveau</InputLabel>
                      <Select 
                        labelId="Niveau"
                        id="Niveau"
                        value={EtudiantData.niveau}
                        label="Niveau"
                        name="niveau"
                        onChange={handleChangeNiveau}
                      >
                        <MenuItem value={"licence"}>Licence</MenuItem>
                        <MenuItem   value={"master"}>Master</MenuItem>
                        <MenuItem value={"cycle ingénieur"}>
                          Cycle ingénieur
                        </MenuItem>
                      </Select>
                      </FormControl> */}

                    <label htmlFor="Niveau">Niveau</label>

                    <select
                      open={openNiveau}
                      data-test="niveau"
                      onClose={handleCloseNiveau}
                      onOpen={handleOpenNiveau}
                      value={EtudiantData.niveau}
                      label="Niveau"
                      onChange={handleChangeNiveau}
                      style={{ width: "100%", height: "50px" }}
                    >
                      <option value={"licence"}>Licence</option>
                      <option value={"master"}>Master</option>
                      <option value={"cycle ingénieur"}>Cycle ingénieur</option>
                    </select>

                    {/* <FormControl fullWidth sx={{ mt: 3 }}>
                      <InputLabel id="staus">Etat</InputLabel>
                      <Select
                        labelId="etat"
                        id="etat"
                        value={EtudiantData.etat}
                        label="etat"
                        onChange={handleChangeEtat}
                      >
                        <MenuItem value={"alumni"}>Alumni</MenuItem>
                        <MenuItem value={"actuel"}>Actuel</MenuItem>
                      </Select>
                    </FormControl> */}

                    <label htmlFor="etat">Etat</label>

                    <select
                      open={openEtat}
                      data-test="etat"
                      onClose={handleCloseEtat}
                      onOpen={handleOpenEtat}
                      value={EtudiantData.etat}
                      label="etat"
                      onChange={handleChangeEtat}
                      style={{ width: "100%", height: "50px" }}
                    >
                      <option value={"alumni"}>Alumni</option>
                      <option value={"actuel"}>Actuel</option>
                    </select>

                    {/*  <FormControl fullWidth sx={{ mt: 3 }}>
                      <InputLabel id="visibility">Visibility</InputLabel>
                      <Select
                        labelId="visibility"
                        id="visibility"
                        value={EtudiantData.visibility}
                        label="Visibility"
                        onChange={(e) => setVisibility(e.target.value)}
                      >
                        <MenuItem value={"private"}>Private</MenuItem>
                        <MenuItem value={"public"}>Public</MenuItem>
                      </Select>
                  </FormControl> */}
                    <label htmlFor="visibility">Visibility</label>

                    <select
                      open={openVisibility}
                      data-test="visibility"
                      onClose={handleCloseVisibility}
                      onOpen={handleOpenVisibility}
                      value={EtudiantData.visibility}
                      label="visibility"
                      onChange={(e) => setVisibility(e.target.value)}
                      style={{ width: "100%", height: "50px" }}
                    >
                      <option value={"private"}>Private</option>
                      <option value={"public"}>Public</option>
                    </select>
                  </Grid>

                  <Grid item xs={3}></Grid>
                  <Grid item xs={6}>
                    <Button
                      type="submit"
                      data-test="modifier"
                      fullWidth
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