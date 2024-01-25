import React, { Component } from "react";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import * as api from "../../service/pfa";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, InputLabel, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MySideNav from "../sidenavs/sidenavactuel";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Popover from "@mui/material/Popover";

function PfaEtudiant() {
  const [rows, setRows] = useState([]);
  const [idSelected, setIdSelected] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const idu = user?._id;
  const iduser = idu;
  const navigate = useNavigate();
  const [PfaData, setPfaData] = useState({ id_etudiant:iduser });

  const handleSubmit =  (event) => {

    try {
       api.updatePfaIdEtudiant(PfaData, idSelected);
       window.location.reload();  
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.getPfaWithoutEtudiant();
        const updatedRows = await Promise.all(
          result.map(async (pfa) => {
            const technologies = await api.getTechnologiesByPfaId(pfa._id);
            const technologyTitles = technologies.map((tech) => tech.title);
            return { ...pfa, technologyTitles };
          })
        );
        setRows(updatedRows);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const columns = [
    { field: "titre", headerName: "sujet", width: 200 },
    {
      field: "nbre_etudiant",
      headerName: "Nombre d'étudiants",
      width: 200,
    },
    {
      field: "description",
      headerName: "Description PFA",
      width: 200,
    },
    {
      field: "technologyTitles",
      headerName: "Technologies",
      width: 200,
    },
    {
      field: "choisir",
      headerName: "Choisir",
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
                  Choisir
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
                    <Typography>Voulez vous choisir ce sujet de PFA</Typography>
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
                          handleSubmit();
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
    <Container maxWidth="md">
<MySideNav/>
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

export default PfaEtudiant;