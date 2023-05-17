import * as React from "react";
import { CustomTextField } from "./CustomTextField";
import Image from "next/image";
import { useMainContext } from "@/context";

export default function SuccessDialogMo(props) {
  const { language } = useMainContext();

  return (
    <div className={props.className}>
      <div className="flex justify-center">
        <Image
          className="mb-10 mt-16"
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
    </div>
  );
}
