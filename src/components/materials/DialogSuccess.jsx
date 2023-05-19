import * as React from "react";
import { useRef } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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

const SuccessDialog = (props) => {
  const { language } = useMainContext();
  const passwordInputRef = useRef(null);

  const copyPassword = (e) => {
    const password = props.datas.password;
  };

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
            alt="CheckCircle"
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
        <p className="text-sm text-[#0553A4] mt-8">{language.name}</p>
        <input
          className="w-full text-base text-neutral600 px-4 py-3 bg-[#e6ebee]"
          defaultValue={props.datas.name}
          disabled
        />
        <p className="text-sm text-[#0553A4] mt-6">{language.password}</p>
        <label className="relative block">
          <span className="sr-only"></span>
          <input
            className="w-full text-base text-neutral600 px-4 py-3 bg-[#e6ebee]"
            defaultValue={props.datas.password}
            ref={passwordInputRef}
            disabled
          />
          <Image
            className="absolute inset-y-0 right-0 items-center p-2.5 cursor-pointer"
            src={"/duplicate.svg"}
            alt="duplicate"
            width={40}
            height={40}
            onClick={copyPassword}
          ></Image>
        </label>
        <button
          className="box font-normal text-lg my-10 px-[18px] py-[14px] text-white bg-primaryBlue rounded-md w-full"
          onClick={props.closeDialog}
        >
          {language.goBackToDashboard}
        </button>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default SuccessDialog;
