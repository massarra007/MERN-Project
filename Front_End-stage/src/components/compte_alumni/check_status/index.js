import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState} from "react";
import * as api from "../../../service/authentification.js";
import styles from "./style.css";

const theme = createTheme();

export default function CheckStatus() {
    const [code, setCode] = useState("");
    const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api.checkStatus(code);
      setMsg(data.message);
      setError("");
    } catch (error) {
      if (
        
        error.response.status === 400 
      ) {
        setError(error.response.data.message);
        setMsg("");
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Vérifier le status de compte alumni
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          
            <TextField
              margin="normal"
              required
              fullWidth
              id="numDoc"
              label="Numéro de dossier"
              onChange={(e) => setCode(e.target.value)}
              name="numDoc"             
              autoFocus
              placeholder="Le numéro a été envoyé par mail"  
            />     
            <div className={styles.container}> 
            {error && <div className={styles.error_msg}>{error}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>} 
            </div> 
           
                    
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              vérifier status
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/signupA" variant="body2">
                  Demander compte
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Se connecter"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}