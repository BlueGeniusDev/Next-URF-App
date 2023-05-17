import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CustomSelect from "./CustomSelect";
import { CustomTextField } from "./CustomTextField";
import MailBox from "./MailBox";
import AlertMessage from "./AlertMessage";
import { useMainContext } from "@/context";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& div.MuiPaper-root": {
    boxShadow: "none",
    width: "555px",
    borderRadius: "16px",
  },
  "& .MuiDialogTitle-root": {
    height: "59px",
  },
  "& .MuiDialogActions-root": {
    height: "59px",
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 15,
            top: 15,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function NewUserDialog(props) {
  const { language } = useMainContext();
  const [error, setError] = React.useState({});

  return (
    <BootstrapDialog
      onClose={props.closeDialog}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      className="mobile:hidden"
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={props.closeDialog}
      ></BootstrapDialogTitle>
      <DialogContent sx={{ px: "91px!important" }}>
        <h2
          style={{
            fontSize: "32px",
            color: "#16181D",
            fontWeight: 500,
            marginBottom: "24px",
          }}
        >
          {props.action === "add" ? language.createNewUser : language.editUser}
        </h2>
        <CustomSelect
          Label={language.name}
          data={props.data}
          placeholde={language.selectName}
          defaultValue={props.action === "add" ? "0" : props.selectedUser.id}
          fullWidth
        />
        <p
          className="text-sm mb-['7px'] mt-6"
          style={{
            color: error.hasOwnProperty("key")
              ? error.key === "mail"
                ? "#DA1212"
                : "#0553A4"
              : "#0553A4",
          }}
        >
          {language.email}
        </p>
        <MailBox
          className="w-full"
          error={
            error.hasOwnProperty("key")
              ? error.key === "mail"
                ? true
                : false
              : false
          }
          defaultValue={props.action === "add" ? "" : props.selectedUser.email}
        />
        <p className="text-sm text-[#0553A4] mb-['7px'] mt-6">{language.role}</p>
        <CustomTextField
          fullWidth
          variant="outlined"
          className="mb-6"
          defaultValue={props.action === "add" ? "" : props.selectedUser.role}
        />
        <div className="grid gap-4 grid-cols-2 mb-[10px]">
          <button
            className="box font-normal text-lg px-[5px] py-[14px] text-white bg-primaryBlue rounded-md"
            onClick={props.createNewUser}
          >
            {props.action === "add" ? language.createNewUser : language.edit}
          </button>
          <button
            className="box float-right font-normal text-lg px-[18px] py-[14px] text-black bg-white border-primaryBlue border rounded-md"
            sx={{ float: "right" }}
            onClick={props.closeDialog}
          >
            {language.cancel}
          </button>
        </div>
        {Object.keys(error).length !== 0 ? (
          <AlertMessage status="error" msg={error.msg}></AlertMessage>
        ) : (
          ""
        )}
      </DialogContent>
      <DialogActions />
    </BootstrapDialog>
  );
}
