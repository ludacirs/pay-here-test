import { useQueries } from "react-query";
import octokit from "@api";
import { Bookmark } from "@recoil/bookmark/atom";
import { ISSUE_KEY } from "./queryKeys";

const fetchSearchIssueByRepository = ({ owner, repo }: Bookmark) =>
  octokit
    .request(`GET /repos/{owner}/{repo}/issues`, {
      owner,
      repo,
    })
    .catch((e) => {
      throw e;
    });

const useIssueByRepositories = (bookmarks: Bookmark[]) =>
  useQueries(
    bookmarks.map((bookmark) => {
      return {
        queryKey: [ISSUE_KEY.SEARCH, bookmark],
        queryFn: () => fetchSearchIssueByRepository(bookmark),
      };
    }),
  );

export default useIssueByRepositories;
