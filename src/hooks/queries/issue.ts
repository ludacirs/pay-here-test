import { useQueries } from "react-query";
import octokit from "@api";
import { Bookmark } from "@recoil/bookmark/atom";
import { ISSUE_KEY } from "./queryKeys";

interface FetchSearchIssueByRepository extends Bookmark {
  page?: number;
}

const fetchSearchIssueByRepository = ({
  owner,
  repo,
  page,
}: FetchSearchIssueByRepository) =>
  octokit.request(`GET /repos/{owner}/{repo}/issues`, {
    owner,
    repo,
    page,
    state: "all",
    sort: "created",
  });

const useIssueByRepositories = (bookmarks: Bookmark[], page?: number) =>
  useQueries(
    bookmarks.map((bookmark) => {
      return {
        queryKey: [ISSUE_KEY.SEARCH, bookmark, page],
        queryFn: () => fetchSearchIssueByRepository({ ...bookmark, page }),
      };
    }),
  );

export default useIssueByRepositories;
