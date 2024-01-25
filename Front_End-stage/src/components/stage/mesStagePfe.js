import React, { Component } from "react";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import * as api from "../../service/stagePfe.js";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, InputLabel, Typography } from "@mui/material";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
import MySideNav from "../sidenavs/sidenavactuel.js";

function MesStagePFE() {
  const [rows, setRows] = useState([]);
  const [idSelected, setIdSelected] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const id = user?._id;
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await api.deleteStagePfe(idSelected);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

 const handlenavigate = async()=>{
  navigate("/inserer-stage-pfe")
 }



  const columns = [
    { field: "sujet", headerName: "Sujet", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    {
      field: "technologies",
      headerName: "Technologies",
      width: 160,
    },
    {
      field: "societe",
      headerName: "Société",
      width: 160,
    },
    { field: "duree", headerName: "Durée  ", width: 130 },

    {
      field: "modifer",
      headerName: "Modifier",
      width: 130,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            href={`/update-stagepfe/${idSelected}`}
            sx={{
              backgroundColor: "#00A36C",
              ":hover": { backgroundColor: "#00A36C" },
            }}
          >
            Modifier
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
                  Supprimer
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
                      Voulez vous vraiment supprimer ce stage
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

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.getStagePfeByID(id);
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
          {rows.length > 0 ? null : (
            <div style={{ display: "flex" }}>
              <IconButton
                aria-label="add"
                color="secondary"
                onClick={handlenavigate}
                style={{ color: "#000" }}
              >
                <AddIcon />
              </IconButton>
            </div>
          )}

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

export default MesStagePFE;
