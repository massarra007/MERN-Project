import React from "react";
import { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import * as api from "../../service/enseignant";
import Title from "./Title";
const App = () => {
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.getStats();
        setData(result["alumniByCountry"]);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      console.log(payload);
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };
  // Sample data
  const [data, setData] = useState();
  console.log(data);

  return (
    <React.Fragment>
      <Title>Statistiques par pays</Title>
      <ResponsiveContainer>
        <PieChart width={250} height={250}>
          <Pie
            data={data}
            outerRadius={50}
            innerRadius={30}
            fill="#4169E1"
            label={(entry) => entry._id}
            dataKey="count"
            nameKey="_id"
          />
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default App;
