import React, { CSSProperties } from "react";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";
import { useRecoilState, useRecoilValue } from "recoil";
import searchValueAtom from "@recoil/searchValue";
import useRepository from "@hooks/queries/repository";
import { setStorageItem } from "@lib/storage";
import bookmarkAtom, { Bookmark } from "@recoil/bookmark";
import { RepoIcon } from "@primer/octicons-react";

const RepositoryList = () => {
  const searchValue = useRecoilValue(searchValueAtom);
  const [bookmark, setBookmark] = useRecoilState(bookmarkAtom);

  const { data: repository, isFetching } = useRepository(searchValue);

  if (isFetching) {
    return Array(20)
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
      ));
  }

  const repositories = repository?.data?.items ?? [];

  const handleAddBookMark = ({ owner, repo }: Bookmark) => {
    setBookmark((prevState) => {
      const prevLength = prevState.length;

      const nextState = prevState.filter(
        ({ owner: prevOwner, repo: prevRepo }) =>
          !(prevOwner === owner && prevRepo === repo),
      );
      if (nextState.length >= 4) {
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
    </Box>
  );
};

export default RepositoryList;
