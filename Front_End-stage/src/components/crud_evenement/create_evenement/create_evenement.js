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
import * as api from "../../../service/evenement.js";
import { useNavigate } from "react-router-dom";
import MySideNavAdmin from "../../sidenavs/sidenavAdmin.js";

import MySideNavDir from "../../sidenavs/sidenavdir.js";

function CreateEvenement() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const role = user?.role;
  const [EvenementData, setEvenementData] = useState({
    eventName: "",
    eventDate: "",
    eventType: "",
    description: "",
    location: "",
    saison:""
  });
  const navigate = useNavigate();

  const [eventType, setEventType] = React.useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
    const [anneeUviv, setAnneeUviv] =useState({AnneeUniv:"" });
    const [annee,setAnnee]=useState();
    const handleChangeannee = (e) => {
      setEvenementData({...EvenementData, saison: e.target.value});

setAnnee(e.target.value);
    }
  const handleChange = (e) => {
    setEvenementData({ ...EvenementData, [e.target.name]: e.target.value });

    console.log(EvenementData);
  };

  const handleChangeEventType = (e) => {
    setEventType(e.target.value);
    setEvenementData({ ...EvenementData, eventType: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newEvenement = await api.createEvenement(EvenementData);
      console.log(newEvenement);
      navigate("/readall-evenement");
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
                Ajouter un évènement{" "}
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
                    id="eventName"
                    label="titre "
                    name="eventName"
                    data-test="eventName"
                    autoFocus
                    onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="eventDate"
                    label="date"
                    name="eventDate"
                    data-test="eventDate"
                    autoFocus
                    type="date"
                    onChange={handleChange}
                  />
                 <label for="niveau">type</label>
                    <select
                      labelId="eventType"
                      id="eventType"
                      value={eventType}
                      label="Type"
                      name="eventType"
                      data-test="eventType"
                      onChange={handleChangeEventType}
                      style={{ width: "100%", height: "50px" }}
                    >
                       <option value={"JPO"}>JPO</option>
                       <option value={"Formation"}>Formation</option>
                       <option value={"Journée d'integration"}>
                        Journée d'integration
                        </option>
                    </select>
                
                </Grid>
                <Grid item xs={6}>
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
                    id="location"
                    label="location"
                    name="location"
                    data-test="location"
                    autoFocus
                    onChange={handleChange}
                  />
      {/*           <FormControl sx={{ mt: 5, }} fullWidth>
        <InputLabel id="demo-controlled-open-select-label">Année universitaire</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={annee}
          label="anneeUviv"
          onChange={handleChangeannee}
        >
        
          <MenuItem value={"2021-2022"}>2021-2022
</MenuItem>
          <MenuItem value={"2022-2023"}>2022-2023</MenuItem>
          <MenuItem value={"2023-2024"}>2023-2024</MenuItem>
          <MenuItem value={"2024-2025"}>2024-2025</MenuItem>
          <MenuItem value={"2025-2026"}>2025-2026</MenuItem>
          <MenuItem value={"2026-2027"}>2026-2027</MenuItem>

        </Select>
      </FormControl>  */}
      <label for="Année universitaire">Année universitaire</label>

<select
   data-test="anneeUvivgenerate"
   open={open}
   onClose={handleClose}
   onOpen={handleOpen}
   value={annee}
   label="anneeUviv"
   onChange={handleChangeannee}
  style={{ width: "100%", height: "50px" }}
>
  <option value={"2021-2022"}>2021-2022</option>
  <option value={"2022-2023"}>2022-2023</option>
  <option value={"2023-2024"}>2023-2024</option>
  <option value={"2024-2025"}>2024-2025</option>
  <option value={"2026-2027"}>2026-2027</option>

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
                </Grid>
              </Grid>
            </div>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}

export default CreateEvenement;
