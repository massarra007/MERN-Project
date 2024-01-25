import React, { Component }  from 'react';
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import * as api from "../../../service/evenement.js";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { Box, Typography } from "@mui/material";



import MySideNav from "../../sidenavs/sidenavactuel.js";

function ReadEvenement() {
  const [rows, setRows] = useState([]);
  



  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.getAllEvenement();
        setRows(result);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const columns = [
    { field: "eventName", headerName: "Titre", width: 130 },
    {
      field: "eventDate",
      headerName: "Date ",
      width: 160,
      renderCell: (params) => {
        return (
          <Typography>
            {moment(params.row.eventDate).format("YYYY-MM-DD")}
          </Typography>
        );
      },
    },
    { field: "eventType", headerName: "Type ", width: 130 },
    { field: "description", headerName: "description ", width: 130 },
    { field: "location", headerName: "location ", width: 130 },
   
  ];

  return (
    <Container>
      <MySideNav/>
 


      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          height: "60vh",
          width: "100vh",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
         
        <div style={{ height: 400 , width: 700 }}>
          <div>
            <h1><center> <b>Liste des evenements</b></center>
             
            </h1>
          </div>
         

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
           // checkboxSelection
           // disableRowSelectionOnClick
            hideFooter="true"
            getRowId={(row) => row._id}
          
          />
        </div>
      </Box>
    </Container>
  );
}

export default ReadEvenement;
