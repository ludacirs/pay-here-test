import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { RepositoryChip } from "@components/RepositoryChip";
import { setStorageItem } from "@lib/storage";
import bookmarkAtom, { Bookmark } from "@recoil/bookmark";
import tabAtom from "@recoil/tab";

const Header = () => {
  const [tabValue, setTabValue] = useRecoilState(tabAtom);
  const setBookmarks = useSetRecoilState(bookmarkAtom);
  const bookmarks = useRecoilValue(bookmarkAtom);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDelete = ({ owner, repo }: Bookmark) => {
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
              <RepositoryChip
                key={owner + repo}
                owner={owner}
                repo={repo}
                onDelete={() => handleDelete({ owner, repo })}
                sx={{ width: "20%" }}
              />
            );
          })}
        </Stack>
      )}
    </Box>
  );
};

export default Header;
