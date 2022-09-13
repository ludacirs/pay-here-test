import React from "react";
import { useRecoilState } from "recoil";
import { FormControl, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import useRepository from "@hooks/queries/repository";
import searchValueAtom from "@recoil/searchValue";

function SearchInput(): JSX.Element {
  const [value, setValue] = useRecoilState(searchValueAtom);
  const isValueEmpty = !value.length;
  const { refetch: searchRepository } = useRepository(value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValueEmpty) {
      return;
    }
    searchRepository();
  };

  return (
    <FormControl fullWidth component={"form"} onSubmit={handleSubmit}>
      <TextField
        className={"search-input"}
        size={"small"}
        placeholder={"레포지토리를 검색하세요."}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        InputProps={{
          startAdornment: <SearchIcon sx={{ marginRight: 1 }} />,
          endAdornment: !isValueEmpty && (
            <CancelIcon
              sx={{ cursor: "pointer" }}
              onClick={() => setValue("")}
            />
          ),
        }}
      />
    </FormControl>
  );
}

export default SearchInput;
