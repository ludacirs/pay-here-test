import React from "react";
import { Grid } from "@mui/material";
import { Header } from "./components";

const App = () => {
  return (
    <Grid
      className={"container"}
      container
      alignContent={"flex-start"}
      width={"100%"}
      height={"100vh"}
    >
      <Header />
    </Grid>
  );
};

export default App;
