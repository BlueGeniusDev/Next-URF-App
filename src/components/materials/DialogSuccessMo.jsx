import * as React from "react";
import { CustomTextField } from "./CustomTextField";

export default function SuccessDialogMo(props) {
  return (
    <div className={props.className}>
      <div className="flex justify-center">
        <img
          className="mb-10 mt-16"
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
      <CustomTextField fullWidth variant="outlined" value={props.data.name} />
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
    </div>
  );
}
