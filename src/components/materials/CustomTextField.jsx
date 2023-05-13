import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export const CustomTextField = styled(TextField)(({ theme }) => ({
  "& fieldset": {
    border: "none",
  },
  "& .MuiInputBase-root": {
    backgroundColor: "#F0F1F4",
    padding: "10px",
    borderRadius: "8px",
    color: "#6C7E93",
  },
  "& input.MuiInputBase-input": {
    border: "none",
    boxShadow: "none",
    backgroundColor: "transparent"
  },
}));
