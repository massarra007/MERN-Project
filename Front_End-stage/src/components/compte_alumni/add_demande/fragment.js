import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import * as api from "../../../service/etudiant";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const theme = createTheme();

export default function SignupAlumni() {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    matiere: "",
    description: "",
  });
  const user = JSON.parse(localStorage.getItem("profile"));
  const id = user._id;
  const handleChange = ({ currentTarget: input }) => {
    console.log(input.value);
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const item = {
        idAlumni: id,
        status: false,
        vacation: true,
        expert: false,
        matiere: data.matiere,
        description: data.description,
      };
      const result = await api.addDemande(item);
      toast("Votre de demande de vacation est ajouté avec succès");
      setData({ matiere: "", description: "" });
      console.log(result);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const addDemExpert = async (e) => {
    e.preventDefault();

    try {
      const item = {
        idAlumni: id,
        status: false,
        vacation: false,
        expert: true,
        matiere: data.matiere,
        description: data.description,
      };
      const result = await api.addDemande(item);
      toast("Votre de demande de contrat expert est ajouté avec succès");
      setData({ matiere: "", description: "" });
      console.log(result);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Ajouter demande de vacation
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="matiere"
                  onChange={handleChange}
                  label="Matière"
                  name="matiere"
                  type="text"
                  value={data.matiere}
                  autoComplete="matiere"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  id="description"
                  label="Description"
                  name="description"
                  type="text"
                  value={data.description}
                  autoComplete="description"
                />
              </Grid>
            </Grid>
            {error && <div className={styles.error_msg}>{error}</div>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ajouter demande de vacation
            </Button>
            <Button
              type="reset"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={addDemExpert}
            >
              Ajouter demande d'expert
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
