import { Grid } from "@mui/material";
import tabAtom from "@recoil/tab";
import React from "react";
import { useRecoilValue } from "recoil";
import { Header, IssueList, RepositoryList, SearchInput } from "./components";

const App = () => {
  const tabValue = useRecoilValue(tabAtom);
  const content =
    tabValue === 1 ? (
      <IssueList />
    ) : (
      <>
        <SearchInput />
        <RepositoryList />
      </>
    );

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
        {content}
      </Grid>
    </Grid>
  );
};

export default App;
