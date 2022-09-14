import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import useQueryString from "@hooks/useQueryString";

function SearchInput(): JSX.Element {
  const { queryStringObject } = useQueryString();
  const [value, setValue] = useState(queryStringObject?.q ?? "");
  const navigate = useNavigate();

  const isValueEmpty = !value.length;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValueEmpty) {
      return;
    }
    navigate(`?q=${value}&page=1`);
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
