import * as React from "react";
import MailBox from "./MailBox";
import CustomSelect from "./CustomSelect";
import { CustomTextField } from "./CustomTextField";
import AlertMessage from "./AlertMessage";
import Image from "next/image";
import { useMainContext } from "@/context";

export default function NewUserDialogMo(props) {
  const { language } = useMainContext();
  const [error, setError] = React.useState({});

  return (
    <div className={props.className}>
      <div style={{ position: "relative", height: "108px" }}>
        <Image
          src="/left-arrow.svg"
          alt="Logo"
          width={16}
          height={16}
          style={{ position: "absolute", left: "20px", top: "33px" }}
          onClick={props.closeDialog}
        />
      </div>
      <div sx={{ p: "0px 16px!important" }}>
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
        <p className="text-sm text-[#0553A4] mb-['7px'] mt-6">Role</p>
        <CustomTextField
          fullWidth
          variant="outlined"
          className="mb-6"
          defaultValue={props.action === "add" ? "" : props.selectedUser.role}
        />
        <div className="grid gap-4 grid-cols-2 mb-[10px]">
          <button
            className="box font-normal text-lg px-[18px] py-[14px] text-white bg-primaryBlue rounded-md"
            onClick={props.createNewUser}
          >
            {props.action === "add" ? language.createNewUser : language.editUser}
          </button>
          <button
            className="box float-right font-normal text-lg px-[5px] py-[14px] text-black bg-white border-primaryBlue border rounded-md"
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
      </div>
    </div>
  );
}
