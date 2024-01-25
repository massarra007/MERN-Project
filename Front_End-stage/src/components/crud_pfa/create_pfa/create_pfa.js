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
import React, { useState, useEffect } from "react";
import { Chip } from "@material-ui/core";
import Box from "@mui/material/Box";
import "./style.css";
import * as api from "../../../service/pfa.js";
import { useNavigate } from "react-router-dom";
import MySideNav from "../../enseignant/sidenavEnseignant";
import Autocomplete from "@mui/material/Autocomplete";
import { useParams } from "react-router-dom";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";

function CreatePfa() {
  const params = useParams();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const idu = user?._id;
  const iduser = idu;
  const [technologies, setTechnologies] = React.useState([]);
  const [newTechnology, setNewTechnology] = React.useState("");
  const [PfaData, setPfaData] = useState({
    description: "",
    titre: "",
    sujet: "",
    id_enseignant:iduser,
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
      const newPfa = await api.createPfa(PfaData);
      navigate("/readall-pfa");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await api.getAllTechnologies();
        setTechnologies(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTechnologies();
  }, []);

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
                Insérer un sujet PFA{" "}
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
                    name="titre"
                    autoFocus
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Description"
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
                    name="nbre_etudiant"
                    type="number"
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
                    Insérer{" "}
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

export default CreatePfa;
