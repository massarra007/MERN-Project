import React, { Component } from "react";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import * as api from "../../../service/pfa.js";
import { DataGrid } from "@mui/x-data-grid";

import { Box, Button, Typography } from "@mui/material";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import IconButton from "@mui/material/IconButton";
import { getCvByUser } from "../../../service/cv.js";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import MySideNav from "../../enseignant/sidenavEnseignant";

function ReadPfa() {
  const [rows, setRows] = useState([]);
  const [idSelected, setIdSelected] = useState();

  const handleDelete = async () => {
    try {
      await api.deletePfa(idSelected);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const handleCreate = async () => {
    navigate("/create-pfa");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.getAllPfa();
        const updatedRows = await Promise.all(
          result.map(async (pfa) => {
            const technologies = await api.getTechnologiesByPfaId(pfa._id);
            const technologyTitles = technologies.map((tech) => tech.title);
            const student = await api.getStudentByPfaId(pfa._id);
            const studentNames = student.map(
              (std) => `${std.firstname} ${std.lastname}`
            );
            return { ...pfa, technologyTitles, studentNames };
          })
        );
        setRows(updatedRows);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const handleCVView = async (studentName) => {
    const [firstname, lastname] = studentName.split(" ");
    try {
      const cvData = await getCvByUser(firstname, lastname);
      // Navigate to the CV view page passing the student's CV data
      navigate(`/cv-view`, { state: { cvData } });
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  

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
      field: "studentNames",
      headerName: "Etudiant",
      width: 200,
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
            href={`/cv-view/${idSelected}`}
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
      field: "modifier",
      headerName: "Modifier",
      width: 130,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            href={`/update-pfa/${idSelected}`}
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
                      Voulez vous vraiment supprimer ce pfa
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
              <b>Liste des pfas</b>
            </h1>
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

export default ReadPfa;
