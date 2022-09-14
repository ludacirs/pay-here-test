import React from "react";
import { Grid, Pagination } from "@mui/material";
import useQeuryString from "@hooks/useQueryString";
import { useRepositoryByPage } from "@hooks/queries/repository";

const ListPagination = () => {
  const { queryStringObject, changeQueryString } = useQeuryString();
  const { data: repository } = useRepositoryByPage(
    queryStringObject.q as string,
    Number(queryStringObject.page),
  );

  // const result = useIssueByRepositories(bookmarks);

  const totalCount = repository?.data.total_count ?? 0;
  const page = queryStringObject?.page ?? 1;

  return (
    <Grid width={"100%"} container justifyContent={"center"}>
      <Pagination
        count={Math.ceil((totalCount > 1000 ? 1000 : totalCount) / 30)}
        page={Number(page)}
        color={"primary"}
        onChange={(_, value) => {
          changeQueryString({ page: value.toString() });
        }}
      />
    </Grid>
  );
};

export default ListPagination;
