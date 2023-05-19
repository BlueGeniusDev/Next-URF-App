import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export const CustomTextField = styled(TextField)(({ theme }) => ({
  "& fieldset": {
    border: "none",
  },
  "& .MuiInputBase-root": {
    backgroundColor: "#e6ebee",
    padding: "10px",
    borderRadius: "8px",
    color: "#30324f",
  },
  "& input.MuiInputBase-input": {
    border: "none",
    boxShadow: "none",
    backgroundColor: "transparent"
  },
}));
