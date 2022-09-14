import React from "react";
import { Grid, Pagination } from "@mui/material";
import useQeuryString from "@hooks/useQueryString";
import { useRepositoryByPage } from "@hooks/queries/repository";

const ListPagination = () => {
  const { queryStringObject, changeQueryString, pathname } = useQeuryString();
  const { data: repository } = useRepositoryByPage(
    queryStringObject.q as string,
    Number(queryStringObject.page),
  );
  const totalCount = getTotalCount(pathname, repository?.data.total_count);
  const page = queryStringObject?.page ?? 1;

  return (
    <Grid width={"100%"} container justifyContent={"center"}>
      <Pagination
        count={totalCount}
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

const getTotalCount = (pathname: string, repositoryTotalCount?: number) => {
  if (pathname.includes("issues")) {
    return Infinity;
  }
  if (!repositoryTotalCount) {
    return 0;
  }
  return Math.ceil(
    (repositoryTotalCount > 1000 ? 1000 : repositoryTotalCount) / 30,
  );
};
