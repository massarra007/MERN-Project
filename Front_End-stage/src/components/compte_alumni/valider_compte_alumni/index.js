import React, { Component } from "react";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import * as api from "../../../service/enseignant.js";
import { DataGrid } from "@mui/x-data-grid";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { Box, Button, Typography } from "@mui/material";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import "./style.css";
import MySideNav from "../../sidenavs/sidenavAdmin.js";

function ValidAlumnis() {
  const [rows, setRows] = useState([]);
  const [idSelected, setIdSelected] = useState();
  const [choix, setChoix] = useState("Nouveau");

  const handleChange = () => {
    if (choix === "Nouveau") {
      setChoix("Reportés");
      fetchData();
    } else {
      setChoix("Nouveau");
      fetchData();
    }
  };

  const handleReport = async () => {
    try {
      await api.reportDemande(idSelected);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAccept = async () => {
    try {
      await api.acceptDemande(idSelected);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchData = async () => {
    try {
      const items = await api.getAlumnis();
      if (choix === "Nouveau") {
        setRows(items["false"]);
      } else {
        setRows(items["true"]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    { field: "firstname", headerName: "Prénom", width: 100 },
    {
      field: "lastname",
      headerName: "Nom",
      width: 100,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "date_diplome",
      headerName: "Date soutenance",
      width: 125,
    },
    { field: "date_embauche", headerName: "Date embauche", width: 125 },
    { field: "promotion", headerName: "Promotion", width: 90, align: "center" },
    {
      field: "Accepter",
      headerName: "Accepter",
      width: 90,
      renderCell: (params) => {
        return (
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <Button
                  variant="contained"
                  {...bindTrigger(popupState)}
                  sx={{
                    backgroundColor: "#228B22",
                    ":hover": { backgroundColor: "#7CFC00" },
                  }}
                >
                  <DoneOutlineIcon />
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
                      Voulez vous approuver ce compte alumni
                    </Typography>
                    <div className="buttons">
                      <Button
                        variant="contained"
                        className="confirm"
                        sx={{
                          m: 4,
                          backgroundColor: "#00A36C",
                          ":hover": { backgroundColor: "#7CFC00" },
                        }}
                        onClick={() => {
                          handleAccept();
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
                          ":hover": { backgroundColor: "#FF0000" },
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
    {
      field: "Reporter",
      headerName: "Reporter",
      width: 90,
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
                    ":hover": { backgroundColor: "#FF0000" },
                  }}
                >
                  <ThumbDownAltIcon />
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
                      Voulez vous vraiment reporter cette demande?
                    </Typography>
                    <div className="buttons">
                      <Button
                        variant="contained"
                        className="confirm"
                        sx={{
                          m: 4,
                          backgroundColor: "#00A36C",
                          ":hover": { backgroundColor: "#7CFC00" },
                        }}
                        onClick={() => {
                          handleReport();
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
                          ":hover": { backgroundColor: "#FF0000" },
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
          <div>
            <h1>
              <b>Liste des {choix} alumnis</b>
            </h1>
          </div>

          <div style={{ float: "right" }}>
            <button value={choix} onClick={handleChange}>
              {choix}
            </button>
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

export default ValidAlumnis;
