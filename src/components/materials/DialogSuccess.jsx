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
import Image from "next/image";
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

export default function SuccessDialog(props) {
  const { language } = useMainContext();

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
        <div className="flex justify-center">
          <Image
            className="mb-10 mt-4"
            src="/CheckCircle.svg"
            alt="Logo"
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
          {language.createdSuccess1}
        </h2>
        <p>{language.createdSuccess2}</p>
        <p className="text-sm text-[#0553A4] mb-['7px'] mt-6">{language.name}</p>
        <CustomTextField fullWidth variant="outlined" value={props.data.name} />
        <p className="text-sm text-[#0553A4] mb-['7px'] mt-6">{language.password}</p>
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
          {language.goBackToDashboard}
        </button>
      </DialogContent>
      <DialogActions />
    </BootstrapDialog>
  );
}
