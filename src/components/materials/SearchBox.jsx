import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMainContext } from "@/context";

const searchBoxTheme = createTheme({
  components: {
    // Name of the component
    MuiPaper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          padding: "0!important",
          boxShadow: "none",
          backgroundColor: "#F0F1F4",
          borderRadius: "8px",
          padding: "4px!important",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          color: "#B6BEC9",
          padding: "12px!important",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        // Name of the slot
        input: {
          // Some CSS
          width: "18px!important",
          height: "18px!important",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        // Name of the slot
        root: {
          margin: "0px!important",
        },
        input: {
          // Some CSS
          margin: "0px!important",
          color: "#6C7E93",
          boxShadow: "none!important",
          border: "none",
          backgroundColor: "transparent!important",
          fontSize: "16px",
        },
      },
    },
  },
});

const SearchBox = (props) => {
  const { language } = useMainContext();

  return (
    <ThemeProvider theme={searchBoxTheme}>
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          maxWidth: 400,
        }}
        className={props.className}
      >
        <IconButton
          type="button"
          sx={{ p: "10px", color: "#B6BEC9" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={language.searchByName}
          inputProps={{ "aria-label": language.searchByName }}
          defaultValue={props.defaultValue}
          onChange={props.getSearch}
        />
      </Paper>
    </ThemeProvider>
  );
};

export default SearchBox;
