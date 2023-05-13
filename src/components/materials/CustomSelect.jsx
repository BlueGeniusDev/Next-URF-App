import * as React from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/material/styles";

const MySelect = styled(Select)(({ theme }) => ({
  "& fieldset": {
    border: "none",
  },
  "& .MuiInputBase-input": {
    fontSize: "16px",
    backgroundColor: "#F0F1F4!important",
    color: "#6C7E93",    
  },
  "& .MuiInputBase-root.Mui-focused": {
    border: "2px solid black!important",
  },
  "& .MuiSelect-select": {
    backgroundColor: theme.palette.primary.backgroundColor,
    border: "none",
    // "&:focus": {
    //   borderRadius: "8px",
    //   border: "2px solid " + theme.palette.primary.main,
    // },
  },
}));

export default function CustomSelect(props) {
  return (
    <>
      <p className="text-sm text-[#0553A4] mb-['7px']">{props.Label}</p>
      {/* <FormControl> */}
      <MySelect
        fullWidth={props.fullWidth}
        error={props.error}
        onChange={props.nameChange}
        defaultValue={props.defaultValue}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem disabled value="0">
          {props.placeholde}
        </MenuItem>
        {props.data.map((item, index) => (
          <MenuItem value={item.id} key={index}>
            {item.name}
          </MenuItem>
        ))}
      </MySelect>
      {/* </FormControl> */}
    </>
  );
}
