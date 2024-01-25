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
import * as api from "../../service/authentification";
import styles from "./styles.module.css";
const theme = createTheme();

export default function SignupAlumni() {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    password: "",
    confirm: "",    
  });
  const user = JSON.parse(localStorage.getItem('profile'));
  const id = user._id;
  const handleChange = ({ currentTarget: input }) => {
    console.log(input.value);
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirm){
      try {
        const item = await api.change_password(id,data.password);
        console.log(item);
        
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    }else{
      setError("Mot de passes non conformes")
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
           Changer mon mot de passe
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
                  id="password"
                  onChange={handleChange}
                  value={data.password}
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="password"
                />
                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  value={data.confirm}
                  id="confirm"
                  label="Confirm password"
                  name="confirm"
                  type="password"
                  autoComplete="confirm"
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
              Enregistrer
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}