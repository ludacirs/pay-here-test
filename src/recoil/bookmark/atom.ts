import { atom } from "recoil";
import { getStorageItem } from "@lib/storage";

const bookmarkAtom = atom<Bookmark[]>({
  key: "bookmarkAtom",
  default: getStorageItem("BOOK_MARKED_REPOSITORY") ?? [],
});

export default bookmarkAtom;

export interface Bookmark {
  owner: string;
  repo: string;
}
