import {
    TextField,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Paper
  } from "@mui/material";
  import { Container } from "@mui/system";
  import React, { useEffect, useState } from "react";
  import Box from "@mui/material/Box";
  import "../create_evenement/style.css"
  import * as api from "../../../service/evenement.js";
  import { useNavigate , useParams} from "react-router-dom";
  import moment from "moment";
  import MySideNavAdmin from "../../sidenavs/sidenavAdmin.js";

  import MySideNavDir from "../../sidenavs/sidenavdir.js";

function UpdateEvenement() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const role = user?.role;
  const params = useParams();
  const [EvenementData, setEvenementData] = useState({
    eventName: "",
    eventDate: "",
    eventType: "",
    description: "",
    location: "",
  });
  const navigate = useNavigate();
  const [eventType, seteventType] = React.useState("");

  const handleChange = (e) => {
    setEvenementData({ ...EvenementData, [e.target.name]: e.target.value });
    console.log(EvenementData);
  };

  const handleChangeEventType = (e) => {
    seteventType(e.target.value);
    setEvenementData({ ...EvenementData, eventType: eventType });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const updateEvenement = await api.updateEvenement(
        EvenementData,
        params.id
      );
      console.log(updateEvenement);
      navigate("/readall-evenement");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.getEvenementbyid(params.id);
        setEvenementData(result);
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
                modifier un evenement{" "}
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
                    value={EvenementData.eventName}
                    fullWidth
                    id="eventName"
                    label="titre "
                    name="eventName"
                    autoFocus
                    onChange={handleChange}
                  />

                  <FormControl fullWidth>
                    <InputLabel id="eventType">Type</InputLabel>
                    <Select
                      labelId="eventType"
                      id="eventType"
                      value={EvenementData.eventType}
                      label="Type"
                      name="eventType"
                      onChange={handleChangeEventType}
                    >
                      <MenuItem value={"JPO"}>JPO</MenuItem>
                      <MenuItem value={"Formation"}>Formation</MenuItem>
                      <MenuItem value={"Journée d'integration"}>
                        Journée d'integration
                      </MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={moment(EvenementData.eventDate).format("YYYY-MM-DD")}
                    id="eventDate"
                    label="date"
                    name="eventDate"
                    autoFocus
                    type="date"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    value={EvenementData.description}
                    label="description "
                    name="description"
                    autoFocus
                    onChange={handleChange}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="location"
                    value={EvenementData.location}
                    label="location"
                    name="location"
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

export default UpdateEvenement;
