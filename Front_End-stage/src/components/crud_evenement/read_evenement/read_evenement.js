import React, { Component }  from 'react';
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import * as api from "../../../service/evenement.js";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { Box, Button, Typography } from "@mui/material";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import IconButton from "@mui/material/IconButton";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import "./style.css";
import MySideNavAdmin from "../../sidenavs/sidenavAdmin.js";

import MySideNavDir from "../../sidenavs/sidenavdir.js";

function ReadEvenement() {
  const [rows, setRows] = useState([]);
  const [idSelected, setIdSelected] = useState();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const role = user?.role;

  const handleDelete = async () => {
    try {
      await api.deleteEvenement(idSelected);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = useState(false);
  const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
    const [annee,setAnnee]=useState();
    const handleChangeAnnee =async (e) => {
      setAnnee(e.target.value)
      console.log(e.target.value);
      const result = await api.getAllEvenementSaison(e.target.value);
      console.log(result, "res");
      setRows(result);

    }
  const navigate = useNavigate();

  const handleCreate = async () => {
    navigate("/create-evenement");
  };

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
    {
      field: "modifer",
      headerName: "Modifier",
      width: 130,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            href={`/update-evenement/${idSelected}`}
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
                      Voulez vous vraiment supprimer cet evenement
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
    },
  ];

  return (
    <Container>

{role === "administratif" ? <MySideNavAdmin /> : <MySideNavDir />}
         
   
      <label for="Année universitaire">Année universitaire</label>

<select
   data-test="anneeUvivgenerate"
   open={open}
   onClose={handleClose}
   onOpen={handleOpen}
   value={annee}
   label="anneeUviv"
   onChange={handleChangeAnnee} 
  style={{ width: "100%", height: "50px" }}
>
  <option value={"2021-2022"}>2021-2022</option>
  <option value={"2022-2023"}>2022-2023</option>
  <option value={"2023-2024"}>2023-2024</option>
  <option value={"2024-2025"}>2024-2025</option>
  <option value={"2026-2027"}>2026-2027</option>

</select>
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
              <b>Liste des evenements</b>
            </h2>
            </center>
          </div>
          <div style={{ float: "right" }}>
            <IconButton
             data-test="add-evenement"
              aria-label="add"
              color="secondary"
              onClick={handleCreate}
              style={{ color: "#000" }}
            >
              <AddBoxRoundedIcon />
            </IconButton>
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
            checkboxSelection
            disableRowSelectionOnClick
            hideFooter="true"
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

export default ReadEvenement;
