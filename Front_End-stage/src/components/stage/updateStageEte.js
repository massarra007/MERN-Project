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
import * as api from "../../service/stageEté.js";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import MySideNav from "../sidenavs/sidenavactuel.js";

function UpdateStage() {
  const params = useParams();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
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
      id_etudiant:id_etudiant,

  });
 
  const navigate = useNavigate();
  const [statutStage, setStatutStage] = React.useState("");


  const handleChange = (e) => {
      setStageEtéData({ ...StageEtéData, [e.target.name]: e.target.value });
    
  };
 
  const handleChangeNiveau = (e) => {
      setStatutStage(e.target.value);
      setStageEtéData({ ...StageEtéData, statutStage: e.target.value });
    };
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updateEtudiant = await api.updateStage(StageEtéData, params.id);
      navigate("/mes-stage-ete");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try{
        console.log(params.id);
      const result = await api.getStageid(params.id)
      setStageEtéData(result)
    } catch (e) {
      console.log(e)
    }}
    fetchData()}, []) 

   

  return (
    <Container>
                     <MySideNav />

      <Paper elevation={3}   sx={{
        height:600
          }}>
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
                Modifier un stage d'été{" "}
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
                    fullWidth
                    id="sujet"
                    label="sujet"
                    name="sujet"
                    autoFocus
                    value={StageEtéData.sujet}
                    onChange={handleChange}
                  />
                 <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="description"
                    name="description"
                    autoFocus
                    value={StageEtéData.description}
                    onChange={handleChange}
                  />
                   <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="societe"
                    label="societe"
                    name="societe"
                    autoFocus
                    value={StageEtéData.societe}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="duree"
                    label="duree"
                    name="duree"
                   type="number"
                   value={StageEtéData.duree}
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
                   value={StageEtéData.technologies}
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
                    value={moment(StageEtéData.dateDébutStage).format("YYYY-MM-DD")}
                    autoFocus
                    type="Date"
                    onChange={handleChange}
                  />
                     <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="dateFinStage"
                    label="Date fin stage"
                    name="dateFinStage"
                    value={moment(StageEtéData.dateFinStage).format("YYYY-MM-DD")}

                    autoFocus
                    type="date"
                    onChange={handleChange}
                  />

<FormControl fullWidth sx={{mt:2}}>
                    <InputLabel id="Niveau">Statut de Stage</InputLabel>
                    <Select
                      labelId="statutStage"
                      id="statutStage"
                      label="statutStage"
                      name="statutStage"
                      value={StageEtéData.statutStage}
                      onChange={handleChangeNiveau}
                    >
                      <MenuItem value={"pas encore commencé"}>pas encore commencé</MenuItem>
                      <MenuItem value={"en cours"}>en cours</MenuItem>
                      <MenuItem value={"validé"}> validé   </MenuItem>
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
              </Box>
            </div>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}

export default UpdateStage;