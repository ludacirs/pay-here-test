import React, { CSSProperties } from "react";
import { useRecoilValue } from "recoil";
import bookmarkAtom from "@recoil/bookmark";
import useIssueByRepositories from "@hooks/queries/issue";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { grey } from "@mui/material/colors";

const IssueList = () => {
  const bookmarks = useRecoilValue(bookmarkAtom);

  const result = useIssueByRepositories(bookmarks);

  const isFinishedAll = result.some(({ isLoading }) => isLoading);

  if (isFinishedAll) {
    return <>loading...</>;
  }

  const issues = result.map(({ data }) => data?.data).flatMap((v) => v);

  const IssueItem = ({
    index,
    style,
  }: {
    index: number;
    style: CSSProperties;
  }) => {
    const { id, html_url, state, created_at, title } = issues[index]!;

    return (
      <ListItem
        style={style}
        key={id}
        sx={{
          padding: `16px 0`,
          borderBottom: `1px solid ${grey[100]}`,
        }}
      >
        <ListItemButton>
          <ListItemIcon>{/* todo: octicon 으로 바꾸기 */}</ListItemIcon>
          <ListItemText>{title}</ListItemText>
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
            itemCount={issues.length}
            itemSize={60}
          >
            {IssueItem}
          </FixedSizeList>
        )}
      </AutoSizer>
    </Box>
  );
};

export default IssueList;
