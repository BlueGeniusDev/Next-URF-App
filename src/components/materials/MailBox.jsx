import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMainContext } from "@/context";

const mailBoxTheme = createTheme({
  components: {
    // Name of the component
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          boxShadow: "none",
          backgroundColor: "#e6ebee",
          borderRadius: "8px",
          width: "100%!important",
          padding: "4px !important",
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
          color: "#30324f",
          boxShadow: "none!important",
          border: "none",
          backgroundColor: "transparent!important",
          padding: "0px !important"
        },
      },
    },
  },
});

const MailBox = (props) => {
  const { language } = useMainContext();

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
          placeholder={language.email}
          inputProps={{ "aria-label": "Email" }}
          defaultValue={props.defaultValue}
          onChange={props.getEmail}
        />
      </Paper>
    </ThemeProvider>
  );
};

export default MailBox;
