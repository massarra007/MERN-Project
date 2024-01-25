import React, { Component }  from 'react';
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import * as api from "../../service/stagePfe.js";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, InputLabel, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import MySideNav from "./sidenavEnseignant.js";
import moment from "moment";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Popover from "@mui/material/Popover";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PersonIcon from "@mui/icons-material/Person";

import {io} from "socket.io-client";

function PfeEnseignant() {
  const [rows, setRows] = useState([]);
  const [idSelected, setIdSelected] = useState();
  const [enseignant, setEneseignat] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const idu = user?._id;
  const iduser = idu;
const navigate= useNavigate();
const [StagePFEData, setStagePFEData] = useState({
 
  id_enseignant:iduser,
  emailEnseignant:user.email

});
/* const [socket, setSocket] = useState(null);
 */
 const handleSubmit =  (event) => {

  try {
     api.updateStage(StagePFEData, idSelected);

    toast("votre sujet a affecté avec succés!");
    navigate("/liste-mes-pfe");

  } catch (error) {
    console.log(error);
  }
};

  const columns = [
    { field: "sujet", headerName: "Sujet", width: 200 },
    { field: "description", headerName: "Description", width: 220 },
    {
      field: "technologies",
      headerName: "Technologies",
      width: 140,
    },
    {
      field: "emailEtudiant",
      headerName: "Etudiant",
      width: 140,
    },
    { field: "societe", headerName: "Societe ", width: 80 },
    { field: "statutStage", headerName: "Statut de Stage ", width: 120 },
   
    {
        field: "dateDébutStage",
        headerName: "Date Début Stage",
        width: 120,
        renderCell: (params) => {
          return (
            <Typography>
              {moment(params.row.dateDébutStage).format("YYYY-MM-DD")}
            </Typography>
          );
        },
      },
    {
        field: "dateFinStage",
        headerName: "Date Fin Stage",
        width: 120,
        renderCell: (params) => {
          return (
            <Typography>
              {moment(params.row.dateFinStage).format("YYYY-MM-DD")}
            </Typography>
          );
        },
      },
      {
        field: "cv",
        headerName: "Voir CV",
        width: 130,
        renderCell: (params) => {
          const studentName = params.value;
          return (
            <Button
              variant="contained"
              href={`/cv-viewpfe/${idSelected}`}
              sx={{
                backgroundColor: "#2979ff",
                ":hover": { backgroundColor: "#2979ff" },
              }}
            >
              <PersonIcon />
            </Button>
          );
        },
      },
      {
        field: "encadrer",
        headerName: "Encadrer",
        width: 130,
        renderCell: (params) => {
          return (
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
              
                <div>
                  <Button
                  data-test="encadrer"
                    variant="contained"
                    {...bindTrigger(popupState)}
                    sx={{
                      backgroundColor: "#FC4343",
                      ":hover": { backgroundColor: "#FC4343" },
                    }}
                  >
                    Encadrer
                  </Button>
                  <Popover
                    {...bindPopover(popupState)}
                 
                  >
                    <Box
                      sx={{
                        p: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography>
                        Voulez vous choisir encadrer cet étudiant
                      </Typography>
                      <div className="buttons">
                        <Button
                                          data-test="confirm-encadrer"

                          variant="contained"
                          className="confirm"
                          sx={{
                            m: 4,
                            backgroundColor: "#00A36C",
                            ":hover": { backgroundColor: "#00A36C" },
                          }}
                          onClick={()=>{handleSubmit(); popupState.close()}}
                        >
                          Oui
                        </Button>
                        <Button
                          variant="contained"
                          className="annuler"
                          sx={{
                            backgroundColor: "#FC4343",
                            ":hover": { backgroundColor: "#FC4343" },
                          }}
                          onClick={popupState.close}
  >
                          Annuler
                        </Button>
                      </div>

                    </Box>
                  </Popover>
                </div>
              )}
            </PopupState>
          );
        },
      },
  
  ];

  useEffect(() => {
    async function fetchData() {
      try {

        

        const result = await api.getPFENotencadred();

        setRows(result);
      console.log(result);
  

      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <Container maxWidth="md">
               <MySideNav />

      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ height: 400 }}>
        
         
          
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick

            getRowId={(row) => row._id}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setIdSelected(newRowSelectionModel.toString());
            }}
          />
        </div>
      </Box>
    </Container>
  );
}

export default PfeEnseignant;
