import * as React from "react";
import { CustomTextField } from "./CustomTextField";
import Image from "next/image";
import { useMainContext } from "@/context";

const SuccessDialogMo = (props) => {
  const { language } = useMainContext();

  const copyPassword = (e) => {
    const password = props.datas.password;
  };

  return (
    <div className={props.className}>
      <div className="flex justify-center">
        <Image
          className="mb-10 mt-16"
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
        <Image
          className="absolute inset-y-0 right-0 items-center p-2.5 cursor-pointer"
          src={"/duplicate.svg"}
          alt="duplicate"
          width={40}
          height={40}
          onClick={copyPassword}
        ></Image>
        <input
          className="w-full text-base text-neutral600 px-4 py-3 bg-[#e6ebee]"
          defaultValue={props.datas.password}
          disabled
        />
      </label>
      <button
        className="box font-normal text-lg my-10 px-[18px] py-[14px] text-white bg-primaryBlue rounded-md w-full"
        onClick={props.closeDialog}
      >
        {language.goBackToDashboard}
      </button>
    </div>
  );
};

export default SuccessDialogMo;
