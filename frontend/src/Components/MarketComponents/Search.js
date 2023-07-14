import React, { useState } from "react";
import { TextField } from "@mui/material";


export const Search = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch(search);
    }
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      value={search}
      onChange={handleSearchChange}
      onKeyPress={handleKeyPress}
      fullWidth
    />
  );
};

export default Search;