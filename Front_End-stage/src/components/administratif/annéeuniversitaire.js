import React from "react";
import styles from "./styles.module.css";
import Sidebar from "../sidenavs/sidenavAdmin";
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { useState } from "react";
import * as api from '../../service/saison'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ExistSaison=() =>{
  return <div>
    <p>Saison Existe déja</p>
  </div>
        }
const AnneeUniv = () => {
  const [existe, setExiste] = useState(false);

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };
      const [anneeUviv, setAnneeUviv] =useState({AnneeUniv:"" });
      const [annee,setAnnee]=useState();
      const handleChange = (e) => {
        setAnnee(e.target.value)
        setAnneeUviv({...anneeUviv, AnneeUniv: e.target.value});

      }
      
const  handleSubmit = async(event)=>{
    event.preventDefault();

    try {
  

   
      await api.createSaison(anneeUviv);
      toast("Saison ajouter avec succès!");
      const findSaison=  await api.findSaison(anneeUviv);
      if(findSaison){        setExiste(true)}
     

     // navigate("/espace-etudiant");
    } catch (error) {
      console.log(error);
    }
}
  return (
    <div className={styles.main_container}>
      <Sidebar />
      <Paper elevation={3}  sx={{
        height:500
          }}>
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >            <form onSubmit={handleSubmit}>

                        <div className="grid">

       <Typography component="h1" variant="h5">
                Générer une année universitaire
              </Typography>


           {/*    <FormControl sx={{ mt: 5, }} fullWidth>
        <InputLabel id="demo-controlled-open-select-label">Année universitaire</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={annee}
          label="anneeUviv"
          onChange={handleChange}
        >
        
          <MenuItem value={"2021-2022"}>2021-2022
</MenuItem>
          <MenuItem value={"2022-2023"}>2022-2023</MenuItem>
          <MenuItem value={"2023-2024"}>2023-2024</MenuItem>
          <MenuItem value={"2024-2025"}>2024-2025</MenuItem>
          <MenuItem value={"2025-2026"}>2025-2026</MenuItem>
          <MenuItem value={"2026-2027"}>2026-2027</MenuItem>

        </Select>
      </FormControl>
 */}

      <label for="Année universitaire">Année universitaire</label>

<select
   open={open}
   data-test="anneeUvivgenerate"
   onClose={handleClose}
   onOpen={handleOpen}
   value={annee}
   label="anneeUviv"
   onChange={handleChange}
  style={{ width: "100%", height: "50px" }}
>
  <option value={"2021-2022"}>2021-2022</option>
  <option value={"2022-2023"}>2022-2023</option>
  <option value={"2023-2024"}>2023-2024</option>
  <option value={"2024-2025"}>2024-2025</option>
  <option value={"2026-2027"}>2026-2027</option>

</select>

      <Button
                      type="submit"
                      fullWidth
                      data-test="ajouteranneeUniv"

                      variant="contained"
                      sx={{
                        mt: 10,
                        mb: 2,
                        backgroundColor: "#00A36C",
                        ":hover": { backgroundColor: "#00A36C" },
                      }}
                    >
                      Ajouter{" "}
                    </Button>
                    <ToastContainer/>
      </div>
      </form>

    {existe ? < ExistSaison />: null} 
    </Box>
    </Paper>
    </div>
  );
};

export default AnneeUniv;
