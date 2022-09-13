import { atom } from "recoil";

const bookmarkAtom = atom<Bookmark[]>({
  key: "bookmarkAtom",
  default: [],
});

export default bookmarkAtom;

export interface Bookmark {
  owner: string;
  repo: string;
}
