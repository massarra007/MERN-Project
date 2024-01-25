import React, { Component } from "react";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import * as api from "../../service/pfa";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, InputLabel, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MySideNav from "../sidenavs/sidenavres";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Popover from "@mui/material/Popover";

function ValiderPfa() {
  const [rows, setRows] = useState([]);
  const [idSelected, setIdSelected] = useState();
  const [PfaData, setPfaData] = useState({ isValidated:"" });
 
  const navigate = useNavigate();


  const handleSubmit =  (event) => {

    try {
       api.updatePfaIsValidated(PfaData, idSelected);
       window.location.reload();  
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.getPfaNotValidated();
        const updatedRows = await Promise.all(
          result.map(async (pfa) => {
            const technologies = await api.getTechnologiesByPfaId(pfa._id);
            const technologyTitles = technologies.map((tech) => tech.title);
            const teacher = await api.getTeacherByPfaId(pfa._id);
            const teacherNames = teacher.map(
              (std) => `${std.firstname} ${std.lastname}`
            );
            const student = await api.getStudentByPfaId(pfa._id);
            const studentNames = student.map(
              (std) => `${std.firstname} ${std.lastname}`
            );
            return { ...pfa, technologyTitles, teacherNames, studentNames};
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
      width: 100,
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
        field: "teacherNames",
        headerName: "Enseignant",
        width: 200,
      },
      {
        field: "studentNames",
        headerName: "Etudiant",
        width: 200,
      },
      {
        field: "isAffected",
        headerName: "Affecté",
        width: 100,
      },
    {
      field: "valider",
      headerName: "Valider",
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
                  Valider
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
                    <Typography>Voulez vous valider ce sujet de PFA</Typography>
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
export default ValiderPfa;