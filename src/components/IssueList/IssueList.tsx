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
  Skeleton,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { IssueClosedIcon, IssueOpenedIcon } from "@primer/octicons-react";
import { RepositoryChip } from "@components/RepositoryChip";
import { format } from "date-fns";

const IssueList = () => {
  const bookmarks = useRecoilValue(bookmarkAtom);

  const result = useIssueByRepositories(bookmarks);

  const isFinishedAll = result.some(({ isLoading }) => isLoading);

  if (isFinishedAll) {
    return <>loading...</>;
  }

  const issues = result
    .map(({ data }) => data?.data)
    .flatMap((v) => v)
    .filter((v) => v && v.pull_request)
    .sort((a, b) => (a!.created_at > b!.created_at ? -1 : 1));

  const IssueItem = ({
    index,
    style,
  }: {
    index: number;
    style: CSSProperties;
  }) => {
    const data = issues[index];
    if (!data) {
      return <Skeleton variant="rectangular" />;
    }
    const { id, html_url, state, created_at, title } = data;
    const [owner, repo] = getRepositoryNameByIssueUrl(html_url).split("/");

    return (
      <ListItem
        style={style}
        key={id}
        sx={{
          padding: `16px 0`,
          borderBottom: `1px solid ${grey[100]}`,
        }}
      >
        <ListItemButton
          component="a"
          target={"_blank"}
          href={html_url}
          sx={{ width: "100%" }}
        >
          <ListItemIcon>{getIconByState(state)}</ListItemIcon>
          <Box display={"flex"} alignItems={"baseline"} gap={2} width={"90%"}>
            <ListItemText
              sx={{ width: "10%" }}
              primary={<RepositoryChip owner={owner} repo={repo} />}
              secondary={format(new Date(created_at), "yyyy-MM-dd")}
            />
            <ListItemText
              sx={{ width: `calc(100% - 200px)` }}
              primary={<Typography noWrap>{title}</Typography>}
            />
          </Box>
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
            itemSize={90}
          >
            {IssueItem}
          </FixedSizeList>
        )}
      </AutoSizer>
    </Box>
  );
};

export default IssueList;

const getIconByState = (state: string) => {
  switch (state) {
    case "open":
      return <IssueOpenedIcon size={24} />;
    case "closed":
      return <IssueClosedIcon size={24} />;
  }
};

const getRepositoryNameByIssueUrl = (htmlURL: string) =>
  htmlURL.split("https://github.com/")[1].split("/issues/")[0];
