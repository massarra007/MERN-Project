import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import * as api from "../../../service/etudiant";

const theme = createTheme();

export default function SignupAlumni() {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    login: "",
    password: "",
    email: "",
    phone: "",
    Birth_date: "",
    pays: "",
    societe: "",
    promotion: 2023,
    date_diplome: "",
    date_embauche: "",    
  });
  const handleChange = ({ currentTarget: input }) => {
    console.log(input.value);
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.newAlumni(data);
      window.location = "/check";
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            S'incrire alumni
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  onChange={handleChange}
                  value={data.firstname}
                  id="firstname"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  onChange={handleChange}
                  value={data.lastname}
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="login"
                  onChange={handleChange}
                  value={data.login}
                  required
                  fullWidth
                  id="login"
                  label="login"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  onChange={handleChange}
                  value={data.email}
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  value={data.phone}
                  id="phone"
                  label="phone"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  value={data.Birth_date}
                  id="birth"
                  label="Birth date"
                  name="Birth_date"
                  type="date"
                  autoComplete="birth"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="pays"
                  onChange={handleChange}
                  value={data.pays}
                  label="Pays de résidence"
                  name="pays"
                  autoComplete="pays"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="societe"
                  onChange={handleChange}
                  value={data.societe}
                  label="Societé"
                  name="societe"
                  autoComplete="societe"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="propotion"
                  onChange={handleChange}
                  value={data.promotion}
                  label="Promotion"
                  name="promotion"
                  type="number"
                  autoComplete="promotion"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="datediplome"
                  onChange={handleChange}
                  value={data.date_diplome}
                  label="Date d'obtention du diplome"
                  name="date_diplome"
                  type="date"
                  autoComplete="datediplome"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="embauche"
                  onChange={handleChange}
                  value={data.date_embauche}
                  label="Date d'embauche"
                  name="date_embauche"
                  type="date"
                  autoComplete="embauche"
                />
              </Grid>
            </Grid>
            {error && { error }}{" "}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enregistrer
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
