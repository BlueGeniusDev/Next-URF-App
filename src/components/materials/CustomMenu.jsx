import * as React from "react";
import Image from "next/image";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import { useMainContext } from "@/context";

const CustomMenu = (props) => {
  const { language } = useMainContext();
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
              <Image
                alt=""
                src="/trash.svg"
                width={14}
                height={18}
                className="inline"
              />{" "}
              <span className="text-base font-norma ml-2 mt-1">
                {language.delete}
              </span>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={(e) => {
                props.fnReset(props.i);
                handleClose();
              }}
            >
              <Image
                alt=""
                src="/resetPass.png"
                width={20}
                height={25}
                className="inline"
              />{" "}
              <span className="text-base font-norma ml-2 mt-1">
                {language.resetPassword}
              </span>
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </div>
  );
};

export default CustomMenu;
