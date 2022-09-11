import React from "react";
import { useRecoilState } from "recoil";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import tabAtom from "@recoil/tab";

const Header = () => {
  const [tabValue, setTabValue] = useRecoilState(tabAtom);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      component={"header"}
      className={"header"}
      width={"100%"}
      boxShadow={"-1px 0px 6px 0px black"}
    >
      <Box
        className={"header-logo"}
        padding={2}
        marginLeft={2}
        sx={{ cursor: "pointer" }}
      >
        <Typography variant="h4">Iusse Tarcker</Typography>
      </Box>

      <Tabs
        className={"header-tabs"}
        value={tabValue}
        onChange={handleChangeTab}
        variant={"fullWidth"}
      >
        <Tab label={"search repository"} />
        <Tab label={"issues"} />
      </Tabs>
    </Box>
  );
};

export default Header;
