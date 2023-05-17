/**
 * Des: signin page
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

// third-party libraries
import { useState } from "react";
import { useRouter } from "next/router";

// react components
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import AlertMessage from "@/components/materials/AlertMessage";

// using context
import { useMainContext } from "@/context";

import { auth } from "../api/auth";

const SetNewPassword = () => {
  const navigator = useRouter();
  // get global states
  const { language, selectedLang } = useMainContext();

  // states
  const [viewPs, setViewPs] = useState([0, 0]);
  const [values, setValues] = useState({
    password: "",
    cpassword: "",
  });
  const [validAlerts, setValidAlerts] = useState({
    password: "",
    cpassword: "",
    blank: "",
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

  // validate password
  const validatePassword = (val = values.password) => {
    if (val.length < 8) {
      return language.passValid1;
    }
    const regex = /(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!regex.test(val)) {
      return language.passValid2;
    }
    return "";
  };

  // validate confirm password
  const validateCPassword = (val = values.cpassword) => {
    if (val !== values.password) {
      return language.notMatchPassword;
    }
    return "";
  };

  // function to send for set new password
  const setNewPassword = async () => {
    if (values.password === "") {
      viewValid("password", language.required);
      return;
    }
    if (values.cpassword === "") {
      viewValid("cpassword", language.required);
      return;
    }
    if (validatePassword() !== "") {
      viewValid("password", validatePassword());
      return;
    }
    if (validateCPassword() !== "") {
      viewValid("cpassword", validateCPassword());
      return;
    }

    function gotToLogin() {
      localStorage.removeItem("token");
      navigator.push("/auth/signin");
      setIsLoading(false);
      setAlertMsg("");
    }

    setIsLoading(true);
    const res = await auth(
      "forgot-password/process",
      {
        newPassword: values.password,
        token: localStorage.getItem("token"),
      },
      selectedLang
    );
    if (res.code) {
      setAlertStatus("error");
      setIsLoading(false);
    } else {
      setAlertStatus("success");
      setTimeout(gotToLogin, 2000);
    }
    setAlertMsg(res.message);
  };

  return (
    <main className="fflex justify-center mobile:mx-2 mx-auto sm:max-w-none">
      <div className="h-82 mobile:w-auto w-[460px] mobile:p-5 p-10 mobile:my-4 my-20 bg-white rounded-md border-gray border-1 border border-solid drop-shadow-md">
        <h1 className="text-3xl text-lightBlack my-5 font-bold text-center">
          {language.enterYourNewPassword}
        </h1>
        <div className="my-5">
          <label
            className={`mb-1 mobile:text-sm block ${
              validAlerts.password === ""
                ? "text-inputLabelColor"
                : "text-errorRed"
            }`}
          >
            {language.password}
          </label>
          <label className="relative block">
            <span className="sr-only"></span>
            <button
              className="absolute inset-y-0 right-0 items-center pr-3"
              onClick={() => setViewPs([!viewPs[0], viewPs[1]])}
            >
              <span className="text-[#6c7e93] text-xl">
                {viewPs[0] ? (
                  <FaRegEyeSlash
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  />
                ) : (
                  <FaRegEye
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  />
                )}
              </span>
            </button>
            <input
              value={values.password}
              className={`mobile:p-1 placeholder:text-slate-400 text-md w-full block rounded-lg border-1 bg-transparent py-3 pl-5 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input ${
                validAlerts.password === ""
                  ? "focus:border-primaryBlue active:border-primaryBlue"
                  : "border-errorRed focus:border-errorRed active:border-errorRed active:border-2"
              }`}
              placeholder={language.password}
              type={viewPs[0] ? "text" : "password"}
              name="Password"
              onChange={(e) => {
                changeValue("password", e);
                viewValid("password", validatePassword(e.target.value));
              }}
            />
          </label>
          {validAlerts.password === "" ? (
            <></>
          ) : (
            <h6 className="text-errorRed">{validAlerts.password}</h6>
          )}
        </div>
        <div className="mb-16">
          <label
            className={`mb-1 mobile:text-sm block ${
              validAlerts.cpassword === ""
                ? "text-inputLabelColor"
                : "text-errorRed"
            }`}
          >
            {language.confirmPassword}
          </label>
          <label className="relative block mb-4">
            <span className="sr-only"></span>
            <button
              className="absolute inset-y-0 right-0 items-center pr-3"
              onClick={() => setViewPs([viewPs[0], !viewPs[1]])}
            >
              <span className="text-[#6c7e93] text-xl">
                {viewPs[1] ? (
                  <FaRegEyeSlash
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  />
                ) : (
                  <FaRegEye
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  />
                )}
              </span>
            </button>
            <input
              value={values.cpassword}
              className={`mobile:p-1 placeholder:text-slate-400 text-md w-full block rounded-lg border-1 bg-transparent py-3 pl-5 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input ${
                validAlerts.cpassword === ""
                  ? "focus:border-primaryBlue active:border-primaryBlue"
                  : "border-errorRed focus:border-errorRed active:border-errorRed active:border-2"
              }`}
              placeholder={language.password}
              type={viewPs[1] ? "text" : "password"}
              name="confirmPassword"
              onChange={(e) => {
                changeValue("cpassword", e);
                viewValid("cpassword", validateCPassword(e.target.value));
              }}
            />
          </label>
          {validAlerts.cpassword === "" ? (
            <></>
          ) : (
            <h6 className="text-errorRed">{validAlerts.cpassword}</h6>
          )}
        </div>
        <div>
          <button
            className="box px-6 py-3 text-base text-white bg-primaryBlue rounded-md w-full"
            onClick={setNewPassword}
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

export default SetNewPassword;
