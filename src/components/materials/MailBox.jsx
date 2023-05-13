import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const mailBoxTheme = createTheme({
  components: {
    // Name of the component
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          boxShadow: "none",
          backgroundColor: "#F0F1F4",
          borderRadius: "8px",
          width: "100%!important",
          padding: "4px!important",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: "#B6BEC9",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        // Name of the slot
        input: {
          // Some CSS
          color: "#6C7E93",
          boxShadow: "none!important",
          border: "none",
          backgroundColor: "transparent!important",
        },
      },
    },
  },
});

export default function MailBox(props) {
  return (
    <ThemeProvider theme={mailBoxTheme}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          border: props.error ? "1px solid red!important" : "none",
        }}
      >
        <IconButton
          type="button"
          sx={{ p: "10px", color: props.error ? "#DA1212" : "#B6BEC9" }}
          aria-label="search"
        >
          <EmailOutlinedIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Email"
          inputProps={{ "aria-label": "Email" }}
          defaultValue={props.defaultValue}
        />
      </Paper>
    </ThemeProvider>
  );
}
