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
function MesPFE() {
  const [rows, setRows] = useState([]);
  const [idSelected, setIdSelected] = useState();
  const [enseignant, setEneseignat] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const idu = user?._id;
  const iduser = idu;
const navigate= useNavigate();


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
  
  
  ];
  
  useEffect(() => {

    async function fetchData() {
      
      try {
        const result = await api.getStageEnseignant(iduser);

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

export default MesPFE;
