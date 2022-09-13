import { useQuery } from "react-query";
import octokit from "@api";
import { REPOSITORY_KEY } from "./queryKeys";
import { ReturnTypeOf } from "@octokit/core/dist-types/types";

const fetchSearchRepository = (q: string) =>
  octokit.request("GET /search/repositories", { q });

const useRepository = (q: string) => {
  return useQuery([REPOSITORY_KEY.SEARCH], () => fetchSearchRepository(q), {
    enabled: false,
  });
};

export default useRepository;

export type OctoRepository = ReturnTypeOf<typeof useRepository>["data"];
