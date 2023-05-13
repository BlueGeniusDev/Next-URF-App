import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { CustomTextField } from "./CustomTextField";

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
export default function SuccessDialog(props) {
  return (
    <BootstrapDialog
      onClose={props.closeDialog}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      className="mobile:hidden"
      // sx={{ width: "555px", height: "544px", borderRadius: "16px" }}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={props.closeDialog}
      ></BootstrapDialogTitle>
      <DialogContent sx={{ px: "91px!important" }}>
        <div className="flex justify-center">
          <img
            className="mb-10 mt-4"
            src="/CheckCircle.svg"
            width={58.33}
            height={58.33}
          />
        </div>
        <h2
          style={{
            fontSize: "32px",
            color: "#16181D",
            fontWeight: 500,
            marginBottom: "24px",
          }}
        >
          The user was created
        </h2>
        <p>An email will be sent to the user with this information to login</p>
        <p className="text-sm text-[#0553A4] mb-['7px'] mt-6">Name</p>
        <CustomTextField
          fullWidth
          variant="outlined"
          value={props.data.name}
        />
        <p className="text-sm text-[#0553A4] mb-['7px'] mt-6">Password</p>
        <CustomTextField
          fullWidth
          variant="outlined"
          className="mb-6"
          value={props.data.password}
        />
        <button
          className="box font-normal text-lg px-[18px] py-[14px] text-white bg-primaryBlue rounded-md w-full"
          onClick={props.closeDialog}
        >
          Go back to dashboard
        </button>
      </DialogContent>
      <DialogActions />
    </BootstrapDialog>
  );
}
