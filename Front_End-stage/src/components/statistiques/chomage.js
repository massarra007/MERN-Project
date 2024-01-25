import { useTheme } from "@mui/material/styles";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import { useState, useEffect } from "react";
import * as api from "../../service/enseignant";

const StatistiqueChomageLineChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.getStatChomage();

      setData(response);
    };

    fetchData();
  }, []);

  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Statistiques de chômage par promotion</Title>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="_id"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Durée de chômage (jours)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="moyenne_chomage"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default StatistiqueChomageLineChart;
