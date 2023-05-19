import * as React from "react";
import { MenuItem, Select } from "@mui/material";
import { styled } from "@mui/material/styles";

const MySelect = styled(Select)(({ theme }) => ({
  "& fieldset": {
    border: "none",
  },
  "& .MuiInputBase-input": {
    fontSize: "16px",
    backgroundColor: "#e6ebee!important",
    color: "#6C7E93",
  },
  "& .MuiInputBase-root.Mui-focused": {
    border: "2px solid black!important",
  },
  "& .MuiSelect-select": {
    backgroundColor: theme.palette.primary.backgroundColor,
    border: "none",
  },
}));

const CustomSelect = (props) => {
  return (
    <>
      <MySelect
        onChange={props.getName}
        defaultValue={props.defaultValue}
        fullWidth={props.fullWidth}
        error={props.error}
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
    </>
  );
};

export default CustomSelect;
