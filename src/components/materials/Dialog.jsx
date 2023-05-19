import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CustomSelect from "./CustomSelect";
import { CustomTextField } from "./CustomTextField";
import MailBox from "./MailBox";
import AlertMessage from "./AlertMessage";
import { useMainContext } from "@/context";
import { Select, Option } from "@material-tailwind/react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& div.MuiPaper-root": {
    boxShadow: "none",
    width: "555px",
    borderRadius: "16px",
    margin: "0px !important",
  },
  "& .MuiDialogTitle-root": {
    height: "59px",
  },
  "& .MuiDialogActions-root": {
    height: "59px",
  },
}));

const BootstrapDialogTitle = (props) => {
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
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const NewUserDialog = (props) => {
  const { language } = useMainContext();
  const [error, setError] = React.useState({});

  return (
    <BootstrapDialog
      onClose={props.closeDialog}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={props.closeDialog}
      ></BootstrapDialogTitle>
      <DialogContent className="mobile:px-8 px-20 pb-10 m-0">
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
        <p className="text-sm text-[#0553A4] mb-['7px'] mt-6">
          {language.name}
        </p>
        {props.action === "add" ? (
          <CustomSelect
            Label={language.name}
            data={props.data}
            getName={props.getName}
            placeholde={language.selectName}
            defaultValue="0"
            flag="name"
            fullWidth
          />
        ) : (
          <input
            className="w-full text-base text-neutral600 px-4 py-3 bg-[#e6ebee]"
            defaultValue={props.selectedUser.name}
            disabled
          />
        )}
        <p className="text-sm text-[#0553A4] mb-['7px'] mt-6">
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
          getEmail={props.getEmail}
          defaultValue={props.action === "add" ? "" : props.selectedUser.email}
        />
        <p className="text-sm text-[#0553A4] mb-['7px'] mt-6">
          {language.role}
        </p>
        <CustomSelect
          Label={language.name}
          data={[
            { id: "Contractors", name: "Contractors" },
            { id: "Sales", name: "Sales" },
            { id: "Admin", name: "Admin" },
          ]}
          getRole={props.getRole}
          flag="role"
          placeholde={language.select}
          defaultValue={
            props.action === "add" ? "0" : props.selectedUser.salesRole
          }
          fullWidth
        />
        <div className="grid gap-4 grid-cols-2 mb-[10px] mt-[16px]">
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

        {props.alertMsg && (
          <AlertMessage
            status={props.alertStatus}
            msg={props.alertMsg}
          ></AlertMessage>
        )}
      </DialogContent>
    </BootstrapDialog>
  );
};

export default NewUserDialog;
