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
import { Chip } from "@material-ui/core";
import * as api from "../../../service/pfa.js";
import { useNavigate, useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";

import MySideNav from "../../enseignant/sidenavEnseignant";

function UpdatePfa() {
  const params = useParams();

  const [technologies, setTechnologies] = React.useState([]);
  const [newTechnology, setNewTechnology] = React.useState("");
  const [PfaData, setPfaData] = useState({
    description: "",
    titre: "",
    sujet: "",
    nbre_etudiant: "",
    technologies: [], // utiliser un tableau vide pour stocker les technologies sélectionnées
  });

  const [TechnologieData, setTechnologieData] = useState({
    title: "",
  });

  const navigate = useNavigate();

  //const filter = createFilterOptions();

  const handleChange = (e) => {
    setPfaData({ ...PfaData, [e.target.name]: e.target.value });
    console.log(PfaData);
  };

  const handleTechnologiesChange = (event, values) => {
    console.log("Selected Technologies:", values);
    setPfaData({ ...PfaData, technologies: values.map((tech) => tech.title) }); // stocker les ObjectIds des technologies sélectionnées
  };

  const handleNewTechnologyChange = (event) => {
    setNewTechnology(event.target.value);
  };

  const handleAddNewTechnology = async (event) => {
    event.preventDefault();
    if (newTechnology) {
      try {
        // Ajouter la nouvelle technologie à la table "technologie"
        const response = await api.createTechnologie({ title: newTechnology });
        const newTech = response.data;
        // Mettre à jour la liste des technologies
        setTechnologies([...technologies, newTech]);
        // Ajouter la nouvelle technologie aux technologies sélectionnées
        setPfaData({
          ...PfaData,
          technologies: [...PfaData.technologies, newTech.title],
        });
        // Vider le champ pour ajouter une nouvelle technologie
        setNewTechnology("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const options = technologies.map((tech) => ({
    title: tech.title,
    // _id: tech._id,
  }));


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatePfa = await api.updatePfa(PfaData, params.id);
      console.log(updatePfa);
      navigate("/readall-pfa");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const pfaResult = await api.getPfabyid(params.id);
        setPfaData(pfaResult);

        const technologiesResult = await api.getAllTechnologies();
        setTechnologies(technologiesResult.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [params.id]);

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
                Modifier un sujet PFA{" "}
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
                    label="Sujet"
                    value={PfaData.sujet}
                    name="sujet"
                    autoFocus
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="titre"
                    label="titre"
                    value={PfaData.titre}
                    name="titre"
                    autoFocus
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="description"
                    value={PfaData.description}
                    name="description"
                    autoFocus
                    onChange={handleChange}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="nbre_etudiant"
                    label="Nombre d'étudiants"
                    value={PfaData.nbre_etudiant}
                    name="nbre_etudiant"
                    type="number"
                    disabled
                    autoFocus
                    onChange={handleChange}
                  />

                  <Autocomplete
                    multiple
                    id="technologies-autocomplete"
                    options={options}
                    getOptionLabel={(option) => option.title}
                    onChange={handleTechnologiesChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Technologies"
                        placeholder="Sélectionnez des technologies"
                      />
                    )}
                  />
                  <TextField
                    value={newTechnology}
                    onChange={handleNewTechnologyChange}
                    label="Add New Technology"
                    variant="outlined"
                    fullWidth
                  />
                  <button onClick={handleAddNewTechnology}>Add</button>
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

export default UpdatePfa;