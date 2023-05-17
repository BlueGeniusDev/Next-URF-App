/**
 * Des: signin page
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

// third-party libraries
import { useState } from "react";
import { useRouter } from "next/router";

// react components
import { FaRegEnvelope } from "react-icons/fa";
import AlertMessage from "@/components/materials/AlertMessage";

// using context
import { useMainContext } from "@/context";

// import api
import { auth } from "../api/auth";

const ForgotPassword = () => {
  const navigator = useRouter();
  // get global states
  const { language, selectedLang } = useMainContext();

  // states
  const [values, setValues] = useState({
    email: "",
  });
  const [validAlerts, setValidAlerts] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertStatus, setAlertStatus] = useState("");

  // change states
  const changeValue = (field, e) => {
    setValues({ ...values, [field]: e.target.value });
  };
  const viewValid = (field, val) => {
    setValidAlerts({ ...validAlerts, [field]: val });
  };

  // validate email
  const validateEmail = (val = values.email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!regex.test(val)) {
      return language.invalidEmail;
    } else {
      return "";
    }
  };

  // function to send verification
  const sendVerify = async () => {
    if (values.email === "") {
      viewValid("email", language.required);
      return;
    }
    if (validateEmail() !== "") {
      viewValid("email", validateEmail());
      return;
    }

    function gotToSetNewPass() {
      localStorage.setItem("token", res.token);
      navigator.push("/auth/setNewPassword");
      setIsLoading(false);
      setAlertMsg("");
    }

    setIsLoading(true);
    const res = await auth(
      "forgot-password/request",
      values,
      selectedLang
    );
    if (res.code) {
      setAlertStatus("error");
      setIsLoading(false)
    } else {
      setAlertStatus("success");
      setTimeout(gotToSetNewPass, 2000);
    }
    setAlertMsg(res.message);
  };

  return (
    <main className="flex justify-center mobile:mx-2 mx-auto sm:max-w-none">
      <div className="h-82 mobile:w-auto w-[460px] mobile:p-5 p-10 mobile:my-4 my-20 bg-white rounded-md border-gray border-1 border border-solid drop-shadow-md">
        <h1 className="text-3xl text-lightBlack my-5 font-bold">
          {language.resetYourPassword}
        </h1>
        <p className="text-base text-lightBlack my-5 font-normal">
          {language.resetPassDes}
        </p>
        <div className="mb-16">
          <label
            className={`mb-1 mobile:text-sm block ${
              validAlerts.email === ""
                ? "text-inputLabelColor"
                : "text-errorRed"
            }`}
          >
            {language.email}
          </label>
          <label className="relative block">
            <span className="sr-only"></span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-5 mobile:pl-2">
              <div className="text-[#bdbdbd] text-xl">
                <FaRegEnvelope />
              </div>
            </span>
            <input
              value={values.email}
              className={`mobile:pl-8 mobile:p-1 placeholder:text-slate-400 text-md w-full block rounded-lg border-1 bg-transparent py-3 pl-12 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input ${
                validAlerts.email === ""
                  ? "focus:border-primaryBlue active:border-primaryBlue"
                  : "border-errorRed focus:border-errorRed active:border-errorRed active:border-2"
              }`}
              placeholder={language.email}
              type="text"
              name="Email"
              onChange={(e) => {
                changeValue("email", e);
                viewValid("email", validateEmail(e.target.value));
              }}
            />
          </label>
          {validAlerts.email === "" ? (
            <></>
          ) : (
            <h6 className="text-errorRed">{validAlerts.email}</h6>
          )}
        </div>
        <div>
          <button
            className="box px-6 py-3 text-base text-white bg-primaryBlue rounded-md w-full"
            onClick={sendVerify}
            disabled={isLoading}
          >
            {isLoading ? `${language.continue} ...` : language.continue}
          </button>
        </div>
        {alertMsg && (
          <AlertMessage status={alertStatus} msg={alertMsg}></AlertMessage>
        )}
      </div>
    </main>
  );
};

export default ForgotPassword;
