import React, { CSSProperties } from "react";
import { FixedSizeList } from "react-window";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useRecoilValue, useSetRecoilState } from "recoil";
import searchValueAtom from "@recoil/searchValue";
import useRepository from "@hooks/queries/repository";
import { setStorageItem } from "@lib/storage";
import bookmarkAtom, { Bookmark } from "@recoil/bookmark/atom";

const RepositoryList = () => {
  const searchValue = useRecoilValue(searchValueAtom);
  const setBookmark = useSetRecoilState(bookmarkAtom);

  const { data: repository } = useRepository(searchValue);

  const repositories = repository?.data?.items ?? [];

  const handleAddBookMark = ({ owner, repo }: Bookmark) => {
    setStorageItem("BOOK_MARKED_REPOSITORY", { owner, repo });
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

    if (ownerName) {
      handleAddBookMark({ owner: ownerName, repo: repoName });
    }

    return (
      <ListItem
        style={style}
        key={index}
        sx={{
          padding: `16px 0`,
          borderBottom: `1px solid ${grey[100]}`,
        }}
      >
        <ListItemButton>
          <ListItemIcon>
            {/* todo: octicon 으로 바꾸기 */}
            <LibraryBooksIcon />
          </ListItemIcon>

          <ListItemText>{fullName}</ListItemText>
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <FixedSizeList
      width={"100%"}
      height={360}
      itemCount={repositories.length}
      itemSize={60}
    >
      {RepositoryListItem}
    </FixedSizeList>
  );
};

export default RepositoryList;
