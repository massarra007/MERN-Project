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
  import * as api from "../../service/administratif";
  import { useNavigate, useParams } from "react-router-dom";
  
  import MySideNav from "../sidenavs/sidenavAdmin";
  
  function UpdateAdministratif() {
    const params = useParams();
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
    const [accessRights, setAccessRights] = React.useState([]);
  
    const handleChange = (e) => {
      setAdministratifData({ ...AdministratifData, [e.target.name]: e.target.value });
      console.log(AdministratifData);
    };
  
    const handleChangeAccessrights = (e) => {
      setAccessRights(e.target.value);
      setAdministratifData({ ...AdministratifData, accessRights: accessRights });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const Updateadministratif = await api.updateAdministratif(
          AdministratifData,
          params.id
        );
        console.log(Updateadministratif);
        navigate("/gerer_droit_acces");
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      async function fetchData() {
        try {
          const result = await api.getAdministratifbyid(params.id);
          setAdministratifData(result);
        } catch (e) {
          console.log(e);
        }
      }
      fetchData();
    }, [params.id]);
    
    return (
      <Container>
        <MySideNav />
  
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
                  modifier un administratif{" "}
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
                      value={AdministratifData.firstname}
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
                      value={AdministratifData.lastname}
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
                      value={AdministratifData.email}
                      id="email"
                      label="email"
                      name="email"
                      autoFocus
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="login"
                      value={AdministratifData.login}
                      label="login "
                      name="login"
                      autoFocus
                      onChange={handleChange}
                    />
  
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={AdministratifData.phone}
                      id="phone"
                      label="numero de telephone"
                      name="phone"
                      autoFocus
                      onChange={handleChange}
                    />
                    <FormControl fullWidth>
                      <InputLabel id=" accessRights">Droit d'acces</InputLabel>
                      <Select
                        labelId=" accessRights"
                        id=" accessRights"
                        value={AdministratifData.accessRights}
                        multiple
                        label=" accessRights"
                        onChange={handleChangeAccessrights}
                      >
                        <MenuItem value={"gestion-enseignant"}>gestion enseignant</MenuItem>
                        <MenuItem value={"gestion-etudiant"}>gestion etudiant</MenuItem>
                        <MenuItem value={"gestion-evenement"}>gestion evenement</MenuItem>
                        <MenuItem value={"gestion-pfas"}>Liste des pfas</MenuItem>
                       <MenuItem value={"gestion-pfes"}>Liste des pfes</MenuItem>
                       <MenuItem value={"gestion-anneeUniversitaire"}>Ajouter annee universitaire</MenuItem>
                       <MenuItem value={"gestion-administratif"}>Gestion administratif</MenuItem>
                      </Select>
                    </FormControl>
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
                      Modifier{" "}
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
  
  export default UpdateAdministratif;
  