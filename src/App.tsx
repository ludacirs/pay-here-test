import React from "react";
import { Grid } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Header, IssueList, RepositoryList, SearchInput } from "./components";

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
      <Grid container padding={2} height={"calc(100% - 220px)"}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchInput />
                <RepositoryList />
              </>
            }
          />
          <Route path="/issues" element={<IssueList />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default App;
