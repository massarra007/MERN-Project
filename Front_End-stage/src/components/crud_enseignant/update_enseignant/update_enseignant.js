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
import "../create_enseignant/style.css";
import * as api from "../../../service/enseignant.js";
import { useNavigate, useParams } from "react-router-dom";

import MySideNavAdmin  from "../../sidenavs/sidenavAdmin.js";
import MySideNavDir from "../../sidenavs/sidenavdir.js";

function UpdateEnseignant() {
  const params = useParams();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const role = user?.role;
  const [EnseignantData, setEnseignantData] = useState({
    firstname: "",
    lastname: "",
    login: "",
    email: "",
    phone: "",
    status: "",
  });
  const navigate = useNavigate();
  const [status, setStatus] = React.useState("");

  const handleChange = (e) => {
    setEnseignantData({ ...EnseignantData, [e.target.name]: e.target.value });
    console.log(EnseignantData);
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
    setEnseignantData({ ...EnseignantData, status: status });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updateEnseignant = await api.updateEnseignant(
        EnseignantData,
        params.id
      );
      console.log(updateEnseignant);
      navigate("/readall-enseignant");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.getEnseignantbyid(params.id);
        setEnseignantData(result);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [params.id]);
  
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
                modifier un enseignant{" "}
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
                    value={EnseignantData.firstname}
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
                    value={EnseignantData.lastname}
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
                    value={EnseignantData.email}
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
                    value={EnseignantData.login}
                    label="login "
                    name="login"
                    autoFocus
                    onChange={handleChange}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={EnseignantData.phone}
                    id="phone"
                    label="numero de telephone"
                    name="phone"
                    autoFocus
                    onChange={handleChange}
                  />
                  <FormControl fullWidth>
                    <InputLabel id="staus">Status</InputLabel>
                    <Select
                      labelId="status"
                      id="status"
                      value={EnseignantData.status}
                      label="status"
                      onChange={handleChangeStatus}
                    >
                      <MenuItem value={"enseignant"}>enseignant</MenuItem>
                      <MenuItem value={"responsable formation"}>
                        responsable formation
                      </MenuItem>
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

export default UpdateEnseignant;
