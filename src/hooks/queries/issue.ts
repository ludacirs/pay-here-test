import { useQuery } from "react-query";
import octokit from "@api";
import { ReturnTypeOf } from "@octokit/core/dist-types/types";
import { Bookmark } from "@recoil/bookmark/atom";
import { ISSUE_KEY } from "./queryKeys";

const fetchSearchIssueByRepository = ({ owner, repo }: Bookmark) =>
  octokit.request(`GET /repos/{owner}/{repo}/issues`, {
    owner,
    repo,
  });

const useIssueByRepository = ({ owner, repo }: Bookmark) => {
  return useQuery(
    [ISSUE_KEY.SEARCH],
    () => fetchSearchIssueByRepository({ owner, repo }),
    {
      enabled: false,
    },
  );
};

export default useIssueByRepository;

export type OctoRepository = ReturnTypeOf<typeof useIssueByRepository>["data"];
