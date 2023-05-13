import * as React from "react";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from '@mui/material/IconButton';

export default function CustomMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="inline float-right mt-1">
      <IconButton aria-label="edit" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={(e) => {
                props.fnDelete(props.i);
                handleClose();
              }}
            >
              <img src="/trash.svg" width={14} height={18} className="inline" />{" "}
              <span className="text-base font-norma ml-2 mt-1">Delete</span>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={(e) => {
                props.fnReset(props.i);
                handleClose();
              }}
            >
              <img src="/trash.svg" width={14} height={18} className="inline" />{" "}
              <span className="text-base font-norma ml-2 mt-1">
                Reset Password
              </span>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
}
