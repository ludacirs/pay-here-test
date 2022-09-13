import { Repository } from "@hooks/queries/queryKeys";
import { OctoRepository } from "@hooks/queries/repository";
import React from "react";
import { useQueryClient } from "react-query";

const RepositoryList = () => {
  const queryClient = useQueryClient();

  const cachedRepositories = queryClient.getQueryData<OctoRepository>(
    Repository.Search,
  );

  const repositories = cachedRepositories?.data?.items ?? [];

  return <React.Fragment></React.Fragment>;
};

export default RepositoryList;
