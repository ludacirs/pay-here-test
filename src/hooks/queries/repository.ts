import { useQuery } from "react-query";
import octokit from "@api";
import { REPOSITORY_KEY } from "./queryKeys";
const fetchSearchRepository = (q: string, page?: number) =>
  octokit.request("GET /search/repositories", { q, page });

export const useRepositoryByPage = (q: string, page: number) => {
  return useQuery(
    [REPOSITORY_KEY.SEARCH, { q, page }],
    () => fetchSearchRepository(q, page),
    {
      enabled: false,
    },
  );
};

export default useRepositoryByPage;
