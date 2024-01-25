import React from "react";
import { useState, useEffect } from "react";
import MySideNav from "../sidenavs/sidenavAdmin";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  CartesianGrid,
  XAxis,
  ComposedChart,
  Line,
} from "recharts";
import * as api from "../../service/statistics";
import { Box, Grid, Typography } from "@mui/material";
import { Legend } from "chart.js";

const Statistique = () => {
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [data3, setData3] = useState();
  const [data4, setData4] = useState();

  console.log(data);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.getStats();
        setData(result["pfeBySociete"]);
        setData2(result["pfeByTechnologie"]);
        setData3(result["pfeByEnseignant"]);
        setData4(result["pfeByPays"]);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <MySideNav />
      <Box
        sx={{
          marginTop: 0,
          marginBottom: 10,
        }}
      >
        <Typography
          sx={{
            color: "blue",
            fontSize: 20,
          }}
        >
          {" "}
          Voir les Statistique sur les PFE
        </Typography>
      </Box>
      <div className="grid">
        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
          <Grid item xs={3}>
            <div style={{ height: 400, width: 300 }}>
              <Typography>Statistiques par societé</Typography>

              <ResponsiveContainer>
                <BarChart
                  width={400}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={20}
                >
                  <XAxis
                    dataKey="_id"
                    scale="point"
                    padding={{ left: 3, right: 3 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar
                    dataKey="count"
                    fill="#8884d8"
                    background={{ fill: "#eee" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div style={{ height: 400, width: 300 }}>
              <Typography>Statistiques par pays</Typography>

              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={300} height={300}>
                  <Pie
                    dataKey="count"
                    nameKey="_id"
                    isAnimationActive={false}
                    data={data4}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Pie
                    dataKey="count"
                    data={data4}
                    cx={500}
                    cy={200}
                    innerRadius={40}
                    outerRadius={80}
                    fill="#82ca9d"
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div style={{ height: 400, width: 300 }}>
              <Typography>Statistiques par technologies</Typography>

              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    data={data2}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    innerRadius={40}
                    fill="#4682B4"
                    label={(entry) => entry._id}
                    dataKey="count"
                    nameKey="_id"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div style={{ height: 400, width: 300 }}>
              <Typography>Statistiques par enseignant</Typography>

              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  width={500}
                  height={400}
                  data={data3}
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="_id" scale="band" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" barSize={20} fill="#413ea0" />
                  <Line type="monotone" dataKey="count" stroke="#ff7300" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Statistique;
