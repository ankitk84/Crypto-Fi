// import React, { useState } from "react";
// import { TextField } from "@mui/material";


// export const Search = ({ onSearch }) => {
//   const [search, setSearch] = useState("");

//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       onSearch(search);
//     }
//   };

//   return (
//     <TextField
//       label="Search"
//       variant="outlined"
//       value={search}
//       onChange={handleSearchChange}
//       onKeyPress={handleKeyPress}
//       fullWidth
//     />
//   );
// };

// export default Search;
import React, { useState } from "react";
// import TextField from "@mui/material/TextField";


const SearchField = ({ setSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSearch(e.target.value);
  };

  
  const containerStyle = {
    
   
    marginInlineStart: 'auto' , 
    // color:"black",
    border:"1px solid silver",
    // marginTop: -50,
     marginRight: 10,
    padding:5,
    // ,marginLeft:'auto',
    borderRadius:5,
    };

  return (
   <div style={{maxWidth:350,textAlign:"center",}}>
     <input 
      placeholder="Search for a crypto"
      variant="outlined"
      style={containerStyle}
      value={inputValue}
      onChange={handleInputChange}
    >
    </input>
  
   </div>
  );
};

export default SearchField;
