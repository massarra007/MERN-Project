import {
  
    Typography,
 
    Grid,
    Paper,
    ListItem,
    List,
    ListItemText,
  } from "@mui/material";
  import { getCvbyiduser } from "../../../service/cv";
  import { Container } from "@mui/system";
  import React, { useEffect, useState } from "react";
  import Box from "@mui/material/Box";
  import * as api from "../../../service/etudiant";
  import { useParams } from "react-router-dom";

  import MySideNavAdmin  from "../../sidenavs/sidenavAdmin.js";
  import MySideNavDir from "../../sidenavs/sidenavdir.js";
 

import { getPfabyidEtudiant } from "../../../service/pfa";
import { getPfebyidEtudiant } from "../../../service/stagePfe";
 
  
  function DetailEtudiant() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const role = user?.role;
    const params = useParams();
    const iduser = params.id;
   

    const [CvData, setCvData] = useState({
      firstname: "",
      lastname: "",
      niveau: "",
      classe: "",
      Birth_date: "",
      adresse: "",
      email: "",
      phone: "",
      experiences: [
        {
          title: "",
          description: "",
          date_debut: "",
          date_fin: "",
        },
      ],
      stages: [
        {
          sujet: "",
          societe: "",
          duree: "",
          type: "",
        },
      ],
      id_user:iduser,
    });
  
    const [EtudiantData, setEtudiantData] = useState({
        firstname: "",
        lastname: "",
        niveau: "",
        classe: "",
        Birth_date: "",
        etat: "",
        email: "",
        phone: "",
        
      });
  
  
      const [PfaData, setPfaData] = useState({
        description: "",
        titre: "",
        sujet: "",
        technologies: [], // utiliser un tableau vide pour stocker les technologies sélectionnées
        id_etudiant:iduser,
      });
    

      const [PfeData, setPfeData] = useState({
        description: "",
        societe: "",
        sujet: "",
        statutStage: "",
        duree: "",
        pays: "",
        emailEnseignant: "",
        dateDébutStage: "",
        dateFinStage: "",
        technologies: "", // utiliser un tableau vide pour stocker les technologies sélectionnées
        id_etudiant:iduser,
      });
    
  

    useEffect(() => {
        async function fetchData() {
          try {
            const result = await api.getEtudiantbyid(iduser); 
            setEtudiantData(result);
    

            const result1 = await getCvbyiduser(iduser); // 
            setCvData(result1);

            const result2 = await getPfabyidEtudiant(iduser); // 
            setPfaData(result2);

            const result3 = await getPfebyidEtudiant(iduser); // 
            setPfeData(result3);
          } catch (error) {
            console.log(error);
          }
        }
      
        fetchData();
      }, [iduser]);


     
  
    return (
      <Container>
     {role === "administratif" ? <MySideNavAdmin /> : <MySideNavDir />}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Paper
          style={{
            width: "80%",
            padding: "20px",
            border: "1px solid black",
            height: "80vh",
            overflowY: "auto",
          }}
      >
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
          
          }}
        >
            <Grid item xs={6}>
              <React.Fragment>
           
               
                <div>
                {/*  <img src={ProfilePic} alt="Mon Image" />*/} 
                </div>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>

              
                <Typography variant="h5"gutterBottom> Detail : {EtudiantData.firstname} {EtudiantData.lastname}</Typography>

                <Typography variant="h5"gutterBottom> ..............................................................................................................................</Typography>  
                    
                    <Typography variant="h6" gutterBottom> Nom :  {EtudiantData.lastname}</Typography>
                  
                  
                    <Typography variant="h6"gutterBottom> Prenom :  {EtudiantData.firstname} </Typography>
                   
                    <Typography variant="h6"gutterBottom> Telephone : {EtudiantData.phone} </Typography>
                    <Typography variant="h6" gutterBottom>  Date de naissance :{EtudiantData.Birth_date}</Typography>

                   
                  
                  </Grid>

                 
                  </Grid>
              
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                   
                   
                    <Typography variant="h6" gutterBottom>  Classe : {EtudiantData.classe}</Typography>
                    <Typography  variant="h6" gutterBottom>   etat : {EtudiantData.etat}</Typography>
                    <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                      Experiences
                    </Typography>
  
                    <div>
                      {/* JSX code for rendering experience data */}
  
                      <ul>
                        {CvData.experiences.map((experience, index) => (
                          <li key={index}>
                            <strong>Title: </strong>
                            {experience?.title}
                            <br />
                            <strong>Description: </strong>
                            {experience?.description}
                            <br />
                            <strong>Date Debut: </strong>
                            {experience?.date_debut}
                            <br />
                            <strong>Date Fin: </strong>
                            {experience?.date_fin}
                            <br />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Grid>

                  
                  <Grid item container direction="column" xs={12} sm={6}>
                   
                    <Typography   variant="h6" gutterBottom>   Email :{EtudiantData.email}</Typography>
                   
                    <Typography variant="h6" gutterBottom>  Niveau :  {EtudiantData.niveau}   </Typography>
                  
                    <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                      Stages
                    </Typography>
                    {/* JSX code for rendering stage data */}
  
                    <ul>
                      {CvData.stages.map((stage, index) => (
                        <li key={index}>
                          <strong>Sujet: </strong>
                          {stage.sujet}
                          <br />
                          <strong>Societe: </strong>
                          {stage.societe}
                          <br />
                          <strong>Duree: </strong>
                          {stage.duree}
                          <br />
                          <strong>Type: </strong>
                          {stage.type}
                          <br />
                        </li>
                      ))}
                    </ul>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                   
                    

                    <Typography variant="h5"gutterBottom> ..............................................................................................................................</Typography>  
                    <Typography variant="h5"gutterBottom> PFA</Typography>  

                    <Typography variant="h6"gutterBottom> Description : {PfaData?.description} </Typography>
                    <Typography  variant="h6" gutterBottom>   Titre :  {PfaData?.titre} </Typography>
                    <Typography  variant="h6" gutterBottom>   Sujet :  {PfaData?.sujet} </Typography>
                   
  
                  </Grid>

                  <Grid item xs={12} sm={6}>
                   
                    

                   <Typography variant="h5"gutterBottom> ................</Typography>  
                   <Typography variant="h5"gutterBottom> PFE</Typography>  

                   <Typography variant="h6"gutterBottom> Description : {PfeData?.description} </Typography>
                   <Typography  variant="h6" gutterBottom>   Societe :  {PfeData?.societe} </Typography>
                   <Typography  variant="h6" gutterBottom>   Sujet :  {PfeData?.sujet} </Typography>
                  
 
                 </Grid>


                  
                  <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>


  
    

              </Grid>
  
 
            </Grid>







                </Grid>
              </React.Fragment>
            </Grid>
          
           
           
        </Box>
      </Paper>
      </div>
    </Container>
  );
}
  export default DetailEtudiant;
  