import { atom } from "recoil";

const searchValueAtom = atom({
  key: "searchValueAtom",
  default: "",
});

export default searchValueAtom;
