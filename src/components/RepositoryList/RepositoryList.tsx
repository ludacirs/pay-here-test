import React, { CSSProperties, useEffect, useState } from "react";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  Alert,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Snackbar,
} from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { useRecoilState } from "recoil";
import { useRepositoryByPage } from "@hooks/queries/repository";
import { setStorageItem } from "@lib/storage";
import bookmarkAtom, { Bookmark } from "@recoil/bookmark";
import { RepoIcon } from "@primer/octicons-react";
import useQeuryString from "@hooks/useQueryString";

const RepositoryList = () => {
  const [open, setOpen] = useState(false);
  const { queryStringObject } = useQeuryString();
  const [bookmark, setBookmark] = useRecoilState(bookmarkAtom);
  const {
    data: repository,
    isFetching,
    refetch: searchRepository,
  } = useRepositoryByPage(
    queryStringObject.q as string,
    Number(queryStringObject.page),
  );

  useEffect(() => {
    queryStringObject.q && queryStringObject.page && searchRepository();
  }, [queryStringObject.q, queryStringObject.page]);

  if (isFetching) {
    return (
      <>
        {Array(20)
          .fill(1)
          .map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              animation={"wave"}
              width={"100%"}
              height={60}
              sx={{ margin: `4px 0` }}
            />
          ))}
      </>
    );
  }

  const repositories = repository?.data?.items ?? [];

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddBookMark = ({ owner, repo }: Bookmark) => {
    setBookmark((prevState) => {
      const prevLength = prevState.length;

      const nextState = prevState.filter(
        ({ owner: prevOwner, repo: prevRepo }) =>
          !(prevOwner === owner && prevRepo === repo),
      );
      if (nextState.length >= 4) {
        handleClick();
        return nextState;
      }

      if (prevLength === nextState.length) {
        // add
        setStorageItem("BOOK_MARKED_REPOSITORY", [
          ...nextState,
          { owner, repo },
        ]);
        return [...nextState, { owner, repo }];
      }

      setStorageItem("BOOK_MARKED_REPOSITORY", nextState);
      return nextState;
    });
  };

  const RepositoryListItem = ({
    index,
    style,
  }: {
    index: number;
    style: CSSProperties;
  }) => {
    const fullName = repositories[index]?.full_name ?? "";
    const ownerName = repositories[index].owner?.login ?? null;
    const repoName = repositories[index].name;

    if (!ownerName) {
      return null;
    }
    const selected = bookmark.some(
      ({ owner, repo }) => owner === ownerName && repo === repoName,
    );

    return (
      <ListItem
        style={style}
        key={index}
        sx={{
          padding: `16px 0`,
          borderBottom: `1px solid ${grey[100]}`,
          bgcolor: selected ? blueGrey[300] : "none",
        }}
        onClick={() => handleAddBookMark({ owner: ownerName, repo: repoName })}
      >
        <ListItemButton>
          <ListItemIcon>
            <RepoIcon size={24} />
          </ListItemIcon>

          <ListItemText>{fullName}</ListItemText>
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Box style={{ width: "100%", height: "100%" }}>
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            width={width}
            height={height}
            itemCount={repositories.length}
            itemSize={60}
          >
            {RepositoryListItem}
          </FixedSizeList>
        )}
      </AutoSizer>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="error" sx={{ width: "100%" }} onClose={handleClose}>
          레포지토리는 최대 4개까지 등록할 수 있습니다.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RepositoryList;
