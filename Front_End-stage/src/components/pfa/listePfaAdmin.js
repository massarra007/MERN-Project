import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import * as api from "../../service/pfa";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import MySideNav from "../sidenavs/sidenavAdmin.js";

function ReadPFA() {
  const [rows, setRows] = useState([]);
  const [idSelected, setIdSelected] = useState();

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
      field: "studentNames",
      headerName: "Etudiant",
      width: 200,
    },
    {
      field: "teacherNames",
      headerName: "Enseignant",
      width: 200,
    },
  ];

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
            const teacher = await api.getTeacherByPfaId(pfa._id);
            const teacherNames = teacher.map(
              (std) => `${std.firstname} ${std.lastname}`
            );
            return { ...pfa, technologyTitles, studentNames, teacherNames };
          })
        );
        setRows(updatedRows);
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

export default ReadPFA;
