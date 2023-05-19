/**
 * Des: signin page
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

// third-party libraries
import { useState, useEffect } from "react";
import Link from "next/link";

// import components
import { FaRegEye, FaRegEyeSlash, FaRegEnvelope } from "react-icons/fa";
import AlertMessage from "@/components/materials/AlertMessage";

// using context
import { useMainContext } from "@/context";

const SignIn = () => {
  // global states
  const { language, loginImg, login, accessToken, isAuthed } = useMainContext();

  // states
  const [viewPs, setViewPs] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [validAlerts, setValidAlerts] = useState({
    email: "",
    password: "",
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

  // validates
  const validateEmail = (val = values.email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!regex.test(val)) {
      return language.invalidEmail;
    } else {
      return "";
    }
  };
  const validatePassword = (val = values.password) => {
    if (val.length < 8) {
      return language.passValid1;
    }
    const regex = /[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!regex.test(val)) {
      return language.passValid2;
    }
    return "";
  };

  // function to login
  const handleLogin = async () => {
    if (values.email === "") {
      viewValid("email", language.required);
      return;
    }
    if (validateEmail() !== "") {
      viewValid("email", validateEmail());
      return;
    }
    if (values.password === "") {
      viewValid("password", language.required);
      return;
    }
    if (validatePassword() !== "") {
      viewValid("password", validatePassword());
      return;
    }

    setIsLoading(true);
    await login(values);
    if (localStorage.getItem("loginMsg")) {
      setAlertStatus("error");
      setAlertMsg(localStorage.getItem("loginMsg"));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      await isAuthed();
    };
    checkAuth();
  });

  return (
    <main className="grid grid-cols-12 gap-5 mobile:mx-4 middle:mx-4 m-10 md:h-[460px] lg:h-[620px] xl:h-[720px]">
      <div className="h-[450px] md:col-span-5 middle:col-span-12 mobile:col-span-12 middle:p-0 mobile:p-0 p-4 md:mt-6 lg:mt-20 xl:mt-40 xxl:mt-40 md:mx-2 xl:mx-16 xxl:mx-20 bg-white rounded-md border-gray border-1 border border-solid drop-shadow-md">
        <h1 className="text-3xl text-lightBlack mb-6 font-bold">
          {language.welcomeBack}
        </h1>
        <div className="mb-3">
          <label
            className={`mb-1 text-sm block ${
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
              className={`mobile:pl-8 mobile:px-2 placeholder:text-slate-400 text-md w-full block rounded-lg border-1 bg-transparent py-3 pl-12 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input ${
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
            <h6 className="text-errorRed p-3"></h6>
          ) : (
            <h6 className="text-errorRed">{validAlerts.email}</h6>
          )}
        </div>
        <div className="mb-3">
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
              className={`mobile:px-2 placeholder:text-slate-400 text-md w-full block rounded-lg border-1 bg-transparent py-3 pl-5 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input ${
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
            <h6 className="text-errorRed p-3"></h6>
          ) : (
            <h6 className="text-errorRed">{validAlerts.password}</h6>
          )}
        </div>
        <div className="mb-3">
          <Link href="/auth/forgotPassword" className=" text-primaryBlue">
            {language.forgotPassword}
          </Link>
        </div>
        <div className="mb-3">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="w-5 h-5 rounded text-lightBlue bg-white border-blue-700 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-blue-700 focus:shadow-none focus: "
          />
          <label
            htmlFor="remember"
            className="mb-1 pl-2 text-rememberColor dark:text-white text-sm cursor-pointer"
          >
            {language.rememberMe}
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-10">
          <button
            className="box px-6 py-3 text-base text-white bg-primaryBlue rounded-md"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? `${language.login} ...` : language.login}
          </button>
          <Link
            href="/auth/signup"
            className="box px-6 py-3 text-bas bg-white text-neutral800 border-primaryBlue border rounded-md text-center"
          >
            {language.create}
          </Link>
        </div>
        {alertMsg && (
          <AlertMessage status={alertStatus} msg={alertMsg}></AlertMessage>
        )}
      </div>
      <div
        className="md:h-[480px] lg:h-[640px] xl:h-[760px] hidden md:block md:col-span-7 bg-svg bg-no-repeat rounded-md bg-left bg-cover max-h-auto"
        style={{
          backgroundImage: `url('/images/login/${loginImg}.svg')`,
          imageRendering: "pixelated",
        }}
      ></div>
    </main>
  );
};

export default SignIn;
