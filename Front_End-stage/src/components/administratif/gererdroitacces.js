import React, { Component }  from 'react';
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import * as api from "../../service/administratif";
import { DataGrid } from "@mui/x-data-grid";

import { Box, Button } from "@mui/material";



import { Typography } from "@mui/material";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';

  import MySideNav from "../../components/sidenavs/sidenavAdmin";
 
  import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

  import MySideNavAdmin from "../../components/sidenavs/sidenavAdmin.js";


  
import MySideNavDir from "../../components/sidenavs/sidenavdir.js";
 
  
  function GererDoitAccess() {
    const [rows, setRows] = useState([]);
    const [idSelected, setIdSelected] = useState();
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const role = user?.role;

    const handleDelete = async () => {
        try {
          await api.deleteAdministratif(idSelected);
          window.location.reload(false);
        } catch (error) {
          console.log(error);
        }
      };
    
   
    
      const handleCreate = async () => {
        navigate("/create-administratif");
      };
  
  
    const columns = [
      { field: "firstname", headerName: "Nom", width: 130 },
      { field: "lastname", headerName: "Prénom", width: 130 },
      { field: "phone", headerName: "Phone", width: 130 },

      { field: "login", headerName: "Login", width: 130 },

      {
        field: "modifer",
        headerName: "Modifier",
        width: 130,
        renderCell: (params) => {
          return (
            <Button
              variant="contained"
              href={`/update-administratif/${idSelected}`}
              sx={{
                backgroundColor: "#00A36C",
                ":hover": { backgroundColor: "#00A36C" },
              }}
            >
              <EditIcon />
            </Button>
          );
        },
      },
      {
        field: "supprimer",
        headerName: "Supprimer",
        width: 130,
        renderCell: (params) => {
          return (
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>
                  <Button
                    variant="contained"
                    {...bindTrigger(popupState)}
                    sx={{
                      backgroundColor: "#FC4343",
                      ":hover": { backgroundColor: "#FC4343" },
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                  <Popover {...bindPopover(popupState)}>
                    <Box
                      sx={{
                        p: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography>
                        Voulez vous vraiment supprimer cet enseignant
                      </Typography>
                      <div className="buttons">
                        <Button
                          variant="contained"
                          className="confirm"
                          sx={{
                            m: 4,
                            backgroundColor: "#00A36C",
                            ":hover": { backgroundColor: "#00A36C" },
                          }}
                          onClick={() => {
                            handleDelete();
                            popupState.close();
                          }}
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
      }
    ];
  
    useEffect(() => {
      async function fetchData() {
        try {
          const result = await api.getAllAdministratif();
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
      
        {role === "administratif" ? <MySideNavAdmin /> : <MySideNavDir />}
  
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
           
          }}
        >
        
          <div style={{ height: 400 }}>
          <div>
            <center>
            <h2>
              <b>Liste des administratifs</b>
            </h2>
            </center>
          </div>

          <div style={{ float: "right" }}>
            <IconButton
              aria-label="add"
              color="secondary"
              onClick={handleCreate}
              style={{ color: "#000" }}
            >
              <AddBoxRoundedIcon />
            </IconButton>
          </div>
           
  
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
  export default GererDoitAccess;
  