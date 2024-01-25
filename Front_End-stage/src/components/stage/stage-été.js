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
import "../crud_etudiant/create_etudiant/style.css";
import * as api from "../../service/stageEté.js";
import { useNavigate } from "react-router-dom";
import MySideNav from "../sidenavs/sidenavactuel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateStageEté() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const id_etudiant = user?._id;
  const [StageEtéData, setStageEtéData] = useState({
    description: "",
    sujet: "",
    technologies: "",
    societe: "",
    duree: "",
    statutStage: "",
    dateDébutStage: "",
    dateFinStage: "",
    id_etudiant: id_etudiant,
  });
  const navigate = useNavigate();
  const [statutStage, setStatutStage] = React.useState("");
  const [status, setStatus] = React.useState("");

  const handleChange = (e) => {
    setStageEtéData({ ...StageEtéData, [e.target.name]: e.target.value });
    console.log(StageEtéData);
  };

  const handleChangeNiveau = (e) => {
    setStatutStage(e.target.value);
    setStageEtéData({ ...StageEtéData, statutStage: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.createStageEté(StageEtéData);
      toast("Stage ajouter avec succès!");

      // navigate("/espace-etudiant");
    } catch (error) {
      console.log(error);
    }
  };

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
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="grid">
              <Typography component="h1" variant="h5">
                Insérer sujet stage d'été{" "}
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
                    id="sujet"
                    label="sujet"
                    name="sujet"
                    data-test="sujet"
                    autoFocus
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="description"
                    name="description"
                    data-test="description"
                    autoFocus
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="societe"
                    label="societe"
                    name="societe"
                    data-test="societe"
                    autoFocus
                    onChange={handleChange}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="duree"
                    label="duree"
                    name="duree"
                    data-test="duree"
                    type="number"
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="technologies"
                    label="technologies"
                    name="technologies"
                    data-test="technologies"
                    autoFocus
                    onChange={handleChange}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="dateDébutStage"
                    label="Date début stage"
                    name="dateDébutStage"
                    data-test="dateDébutStage"
                    autoFocus
                    type="date"
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="dateFinStage"
                    label="Date fin stage"
                    name="dateFinStage"
                    data-test="dateFinStage"
                    autoFocus
                    type="date"
                    onChange={handleChange}
                  />
                  <label for="niveau">Statut de Stage</label>

                  <select
               labelId="statutStage"
               id="statutStage"
               data-test="statutStage"

               value={statutStage}
               label="statutStage"
               name="statutStage"
               style={{ width: "100%", height: "50px" }}

               onChange={handleChangeNiveau}
                               >
                    <option value={"pas encore commencé"}> pas encore commencé</option>
                    <option value={"en cours"}>en cours</option>
                    <option value={"validé"}>validé</option>
                  </select>
                 
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
                  <ToastContainer />
                </Grid>
              </Grid>
            </div>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}

export default CreateStageEté;
