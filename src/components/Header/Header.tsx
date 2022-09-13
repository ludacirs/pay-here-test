import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Box, Chip, Stack, Tab, Tabs, Typography } from "@mui/material";
import tabAtom from "@recoil/tab";
import bookmarkAtom, { Bookmark } from "@recoil/bookmark";
import { stringToRGB } from "@lib/string";
import { setStorageItem } from "@lib/storage";

const Header = () => {
  const [tabValue, setTabValue] = useRecoilState(tabAtom);
  const bookmarks = useRecoilValue(bookmarkAtom);

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
      {!!bookmarks.length && (
        <Stack
          justifyContent={"center"}
          direction="row"
          spacing={2}
          padding={2}
        >
          {bookmarks.map(({ owner, repo }) => {
            return (
              <RepositoryChip key={owner + repo} owner={owner} repo={repo} />
            );
          })}
        </Stack>
      )}
    </Box>
  );
};

export default Header;

const RepositoryChip = ({ owner, repo }: Bookmark) => {
  const setBookmarks = useSetRecoilState(bookmarkAtom);

  const handleDelete = () => {
    setBookmarks((prev) => {
      const nextBookmarks = prev.filter(
        ({ owner: prevOwner, repo: prevRepo }) =>
          !(prevOwner === owner && prevRepo === repo),
      );

      setStorageItem("BOOK_MARKED_REPOSITORY", nextBookmarks);
      return nextBookmarks;
    });
  };

  return (
    <Chip
      variant="filled"
      label={
        <Typography noWrap>
          {owner}/{repo}
        </Typography>
      }
      onDelete={handleDelete}
      sx={{
        bgcolor: `#${stringToRGB(owner + repo)}`,
        width: "20%",
      }}
    />
  );
};
