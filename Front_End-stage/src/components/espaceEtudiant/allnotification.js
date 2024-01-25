import React, { Component } from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import MySideNav from "../sidenavs/sidenavactuel";
import { useEffect, useState } from "react";
import * as api from "../../service/notification";

function AllNotification() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log(user._id);
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await api.getNotificationseen(user._id);
        console.log(result, "res");
        setData(result);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);
  return (
    <Container>
      <MySideNav />
      <Paper
        elevation={3}
        sx={{
          height: 600,
        }}
      >
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Mes notification
          </Typography>
          <div className="grid">
            <div>
              {!data
                ? null
                : data.map((data) => (
                    <div>
                      <div>{data.body}</div>
                    </div>
                  ))}
            </div>
          </div>
        </Box>
      </Paper>
    </Container>
  );
}

export default AllNotification;
