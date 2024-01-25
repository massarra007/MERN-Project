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
  import * as api from "../../service/administratif";
  import { useNavigate } from "react-router-dom";
  import MySideNav from "../../components/sidenavs/sidenavAdmin";
  import MySideNavAdmin from "../../components/sidenavs/sidenavAdmin.js";

import MySideNavDir from "../../components/sidenavs/sidenavdir.js";

  
  function CreateAdministratif() {
    const [AdministratifData, setAdministratifData] = useState({
      lastname: "",
      firstname: "",
      email: "",
      login: "",
      password: "",
      phone: "",
      role: "directeur",
      accessRights: []
    });
    const navigate = useNavigate();
    const [accessRights, setAccessRights] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const role = user?.role;
  
  
    const handleChange = (e) => {
      setAdministratifData({ ...AdministratifData, [e.target.name]: e.target.value });
      console.log(AdministratifData);
    };

    const handleAccessChange = (event) => {
      const { value } = event.target;
      setAccessRights(value);
      setAdministratifData({ ...AdministratifData, [event.target.name]: event.target.value });
    };

    const handleAccesChange = (e) => {
      if (e.target.name === "accessRights") {
        const selectedOptions = Array.isArray(e.target.value)
          ? e.target.value.filter((option) => option.selected).map((option) => option.value)
          : [];
        setAccessRights(selectedOptions); // Update the accessRights state
        setAdministratifData({ ...AdministratifData, [e.target.name]: selectedOptions });
      } else {
        setAdministratifData({ ...AdministratifData, [e.target.name]: e.target.value });
      }
    };
    
      
 
  
    const handleSubmit = async (administratif) => {
      administratif.preventDefault();
  
      try {
        const newAdministratif = await api.createAdministratif(AdministratifData);
        console.log(newAdministratif);
        navigate("/gerer_droit_acces");
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <Container>
       
           {role === "administratif" ? <MySideNavAdmin /> : <MySideNavDir />}
  
        <Paper elevation={3} className="paper">
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
                  Ajouter un administratif{" "}
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
                      label="prenom "
                      name="firstname"
                      autoFocus
                      onChange={handleChange}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="lastname"
                      label="nom"
                      name="lastname"
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
                      autoFocus
                      onChange={handleChange}
                    />
                      <FormControl fullWidth>
    <InputLabel id="accessRights-label">Droits d'accès</InputLabel>
    <Select
      labelId="accessRights-label"
      id="accessRights"
      name="accessRights"
      multiple
      value={accessRights}
      onChange={handleAccessChange}
      renderValue={(selected) => selected.join(",")}
    >
      <MenuItem value={"gestion-etudiant"}>Gestion étudiant</MenuItem>
      <MenuItem value={"gestion-enseignant"}>Gestion enseignant</MenuItem>
      <MenuItem value={"gestion-evenement"}>Gestion événement</MenuItem>
      <MenuItem value={"gestion-pfas"}>Liste des pfas</MenuItem>
      <MenuItem value={"gestion-pfes"}>Liste des pfes</MenuItem>
      <MenuItem value={"gestion-anneeUniversitaire"}>Ajouter annee universitaire</MenuItem>
      <MenuItem value={"gestion-administratif"}>gestion administratifs</MenuItem>
    </Select>
  </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="phone"
                      label="numero de telephone"
                      name="phone"
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
                      autoFocus
                      onChange={handleChange}
                    />
  
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
     


                  </Grid>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={6}>
                    <Button
                      type="submit"
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
  
  export default CreateAdministratif;
  