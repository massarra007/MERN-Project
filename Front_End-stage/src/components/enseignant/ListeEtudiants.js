import React, { Component }  from 'react';
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import * as api from "../../service/etudiant";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { Box, Button, Typography } from "@mui/material";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import PersonIcon from '@mui/icons-material/Person';

import { useNavigate } from "react-router-dom";

import MySideNav from "./sidenavEnseignant";

function ListeEtudiants() {
  const [rows, setRows] = useState([]);
  const [idSelected, setIdSelected] = useState();
  const navigate = useNavigate();

  const handlenavigate = async () => {
    navigate("/create-etudiant");
  };

  const columns = [
    { field: "firstname", headerName: "Nom", width: 130 },
    { field: "lastname", headerName: "Prénom", width: 130 },
    {
      field: "phone",
      headerName: "Numéro de téléphone",
      width: 160,
    },
    {/*
      field: "Birth_date",
      headerName: "Date de naissance",
      width: 160,
      renderCell: (params) => {
        return (
          <Typography>
            {moment(params.row.Birth_date).format("YYYY-MM-DD")}
          </Typography>
        );
        },
    */ },
    { field: "niveau", headerName: "Niveau ", width: 130 },
    { field: "classe", headerName: "Classe ", width: 130 },
    { /*field: "etat", headerName: "etat ", width: 130*/ },
    {
        field: "cv",
        headerName: "Voir CV",
        width: 130,
        renderCell: () => {
          return (
            <Button
              variant="contained"
              href={`/cv-etudiant/${idSelected}`}
              sx={{
                backgroundColor: "#2979ff",
                ":hover": { backgroundColor: "#2979ff" },
              }}
            >
              <PersonIcon />
            </Button>
          );
        },
      }
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.getAllEtudiant();
        console.log(result);
        setRows(result);
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
          data-test="row-etudiant"
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

export default ListeEtudiants;
