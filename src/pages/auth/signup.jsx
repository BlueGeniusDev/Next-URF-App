/**
 * Des: signup page
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

// third-party libraries
import { useState, useEffect } from "react";
import Link from "next/link";

// import components
import {
  FaRegEnvelope,
  FaMapMarkerAlt,
  FaRegEye,
  FaRegEyeSlash,
} from "react-icons/fa";
import { BsPhone } from "react-icons/bs";
import AlertMessage from "@/components/materials/AlertMessage";

// using context
import { useMainContext } from "@/context";

// import sign-in api
import { auth } from "../api/auth";

const SignUp = () => {
  // get global states
  const { language, selectedLang, isAuthed } = useMainContext();

  // states
  const [viewPs, setViewPs] = useState([0, 0]);
  const [cpassword, setCpassword] = useState("");
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    email: "",
    mailingAddress: "",
    company: "",
    phone: "",
    postalCode: "",
    password: "",
    role: "crew",
  });
  const [validAlerts, setValidAlerts] = useState({
    email: "",
    phone: "",
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
  const changeCPassword = (value) => {
    setCpassword(value);
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
    const regex = /(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!regex.test(val)) {
      return language.passValid2;
    }
    return "";
  };
  const validateCPassword = (val = cpassword) => {
    if (val !== values.password) {
      return language.notMatchPassword;
    }
    return "";
  };
  const viewValid = (field, val) => {
    setValidAlerts({ ...validAlerts, [field]: val });
  };

  // function to create new user
  const create = async () => {
    if (values.name === "") {
      viewValid("blank", "name");
      return;
    }
    if (values.lastName === "") {
      viewValid("blank", "lastName");
      return;
    }
    if (values.company === "") {
      viewValid("blank", "company");
      return;
    }
    if (values.email === "") {
      viewValid("email", language.required);
      return;
    }
    if (values.phone === "") {
      viewValid("blank", "phone");
      return;
    }
    if (values.mailingAddress === "") {
      viewValid("blank", "mailingAddress");
      return;
    }
    if (values.postalCode === "") {
      viewValid("blank", "postalCode");
      return;
    }
    if (values.password === "") {
      viewValid("password", language.required);
      return;
    }
    if (cpassword === "") {
      viewValid("cpassword", language.required);
      return;
    }
    if (validateEmail() !== "") {
      viewValid("email", validateEmail());
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

    setIsLoading(true);
    const res = await auth("auth/sign-up", values, selectedLang);
    if (!res.code) {
      setAlertStatus("success");
    }
    setAlertMsg(res.message);
    setIsLoading(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      await isAuthed();
    };
    checkAuth();
  });

  return (
    <main className="md:container md:mx-auto mobile:mx-0 mobile:w-full mobile:max-w-none">
      <div className="mt-10 middle:mx-12 md:mx-16 lg:mx-48 mobile:p-4 p-8 bg-white  rounded-md border-gray border-1 border border-solid drop-shadow-md mobile:m-0">
        <h2 className="text-3xl text-lightBlack mb-6 font-bold">
          {language.register}
        </h2>
        <div className="grid grid-cols-2 gap-8 mobile:gap-2">
          <div className="mb-3">
            <label
              className={`mb-1 mobile:text-sm block ${
                validAlerts.blank === "name"
                  ? "text-errorRed"
                  : "text-inputLabelColor"
              }`}
            >
              {language.name}
            </label>
            <input
              type="text"
              placeholder={language.name}
              value={values.name}
              className={`mobile:px-2 placeholder:text-slate-400 placeholder:text-md w-full rounded-lg border-1 bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input ${
                validAlerts.blank === "name"
                  ? "border-errorRed focus:border-errorRed focus: border-2 active:border-errorRed active:border-2"
                  : "focus:border-primaryBlue active:border-primaryBlue"
              }`}
              onChange={(e) => {
                changeValue("name", e);
                setValidAlerts({ ...validAlerts, blank: "" });
              }}
            />
            {validAlerts.blank === "name" ? (
              <h6 className="text-errorRed">{language.required}</h6>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-3">
            <label
              className={`mb-1 mobile:text-sm block ${
                validAlerts.blank === "lastName"
                  ? "text-errorRed"
                  : "text-inputLabelColor"
              }`}
            >
              {language.lastName}
            </label>
            <input
              type="text"
              placeholder={language.lastName}
              value={values.lastName}
              className={`mobile:px-2 placeholder:text-slate-400 placeholder:text-md w-full rounded-lg border-1 bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input ${
                validAlerts.blank === "lastName"
                  ? "border-errorRed focus:border-errorRed focus: border-2 active:border-errorRed active:border-2"
                  : "focus:border-primaryBlue active:border-primaryBlue"
              }`}
              onChange={(e) => {
                changeValue("lastName", e);
                setValidAlerts({ ...validAlerts, blank: "" });
              }}
            />
            {validAlerts.blank === "lastName" ? (
              <h6 className="text-errorRed">{language.required}</h6>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 mobile:grid-cols-1 mobile:gap-0">
          <div className="mb-3">
            <label
              className={`mb-1 mobile:text-sm block ${
                validAlerts.blank === "company"
                  ? "text-errorRed"
                  : "text-inputLabelColor"
              }`}
            >
              {language.company}
            </label>
            <input
              type="text"
              placeholder={language.company}
              value={values.company}
              className={`mobile:px-2 placeholder:text-slate-400 text-md w-full rounded-lg border-1 bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input ${
                validAlerts.blank === "company"
                  ? "border-errorRed focus:border-errorRed focus: border-2 active:border-errorRed active:border-2"
                  : "focus:border-primaryBlue active:border-primaryBlue"
              }`}
              onChange={(e) => {
                changeValue("company", e);
                setValidAlerts({ ...validAlerts, blank: "" });
              }}
            />
            {validAlerts.blank === "company" ? (
              <h6 className="text-errorRed">{language.required}</h6>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 mobile:grid-cols-1 mobile:gap-0">
          <div className="mb-3">
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
              <></>
            ) : (
              <h6 className="text-errorRed">{validAlerts.email}</h6>
            )}
          </div>
          <div className="mb-3">
            <label
              className={`mb-1 mobile:text-sm block ${
                validAlerts.blank === "phone"
                  ? "text-errorRed"
                  : "text-inputLabelColor"
              }`}
            >
              {language.phone}
            </label>
            <label className="relative block">
              <span className="sr-only"></span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-5 mobile:pl-2">
                <div className="text-[#bdbdbd] text-xl">
                  <BsPhone />
                </div>
              </span>
              <input
                value={values.phone}
                className={`mobile:pl-8 mobile:px-2 placeholder:text-slate-400 text-md w-full block rounded-lg border-1 bg-transparent py-3 pl-12 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input ${
                  validAlerts.blank === "phone"
                    ? "border-errorRed focus:border-errorRed focus: border-2 active:border-errorRed active:border-2"
                    : "focus:border-primaryBlue active:border-primaryBlue"
                }`}
                placeholder={language.phone}
                type="text"
                name="Phone"
                onChange={(e) => {
                  changeValue("phone", e);
                  setValidAlerts({ ...validAlerts, blank: "" });
                }}
              />
            </label>
            {validAlerts.blank === "phone" ? (
              <h6 className="text-errorRed">{language.required}</h6>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 mobile:gap-2">
          <div className="mb-3">
            <label
              className={`mb-1 mobile:text-sm block ${
                validAlerts.blank === "mailingAddress"
                  ? "text-errorRed"
                  : "text-inputLabelColor"
              }`}
            >
              {language.mailingAddress}
            </label>
            <label className="relative block">
              <span className="sr-only"></span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-5 mobile:pl-2">
                <div className="text-[#bdbdbd] text-xl">
                  <FaMapMarkerAlt />
                </div>
              </span>
              <input
                value={values.mailingAddress}
                className={`mobile:pl-8 mobile:px-2 placeholder:text-slate-400 text-md w-full block rounded-lg border-1 bg-transparent py-3 pl-12 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input ${
                  validAlerts.blank === "mailingAddress"
                    ? "border-errorRed focus:border-errorRed focus: border-2 active:border-errorRed active:border-2"
                    : "focus:border-primaryBlue active:border-primaryBlue"
                }`}
                placeholder={language.mailingAddress}
                type="text"
                name="mailingAddress"
                onChange={(e) => {
                  changeValue("mailingAddress", e);
                  setValidAlerts({ ...validAlerts, blank: "" });
                }}
              />
            </label>
            {validAlerts.blank === "mailingAddress" ? (
              <h6 className="text-errorRed">{language.required}</h6>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-3">
            <label
              className={`mb-1 mobile:text-sm block ${
                validAlerts.blank === "postalCode"
                  ? "text-errorRed"
                  : "text-inputLabelColor"
              }`}
            >
              {language.postalCode}
            </label>
            <input
              type="text"
              value={values.postalCode}
              placeholder={language.postalCode}
              className={`mobile:px-2 placeholder:text-slate-400 placeholder:text-md w-full rounded-lg border-1 bg-transparent py-3 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input ${
                validAlerts.blank === "postalCode"
                  ? "border-errorRed focus:border-errorRed focus: border-2 active:border-errorRed active:border-2"
                  : "focus:border-primaryBlue active:border-primaryBlue"
              }`}
              onChange={(e) => {
                changeValue("postalCode", e);
                setValidAlerts({ ...validAlerts, blank: "" });
              }}
            />
            {validAlerts.blank === "postalCode" ? (
              <h6 className="text-errorRed">{language.required}</h6>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 mobile:grid-cols-1 mobile:gap-0">
          <div className="grid grid-cols-1">
            <div className="mb-3">
              <label
                className={`mb-1 mobile:text-sm block ${
                  validAlerts.password === ""
                    ? "text-inputLabelColor"
                    : "text-errorRed"
                }`}
              >
                {language.setYourPassword}
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
                <></>
              ) : (
                <h6 className="text-errorRed">{validAlerts.password}</h6>
              )}
            </div>
            <div className="mb-3">
              <label
                className={`mb-1 mobile:text-sm block ${
                  validAlerts.cpassword === ""
                    ? "text-inputLabelColor"
                    : "text-errorRed"
                }`}
              >
                {language.confirmPassword}
              </label>
              <label className="relative block">
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
                  value={cpassword}
                  className={`mobile:px-2 placeholder:text-slate-400 text-md w-full block rounded-lg border-1 bg-transparent py-3 pl-5 px-5 font-medium outline-none transition disabled:cursor-default disabled:bg-whiter dark:bg-form-input ${
                    validAlerts.cpassword === ""
                      ? "focus:border-primaryBlue active:border-primaryBlue"
                      : "border-errorRed focus:border-errorRed active:border-errorRed active:border-2"
                  }`}
                  placeholder={language.password}
                  type={viewPs[1] ? "text" : "password"}
                  name="confirmPassword"
                  onChange={(e) => {
                    changeCPassword(e.target.value);
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
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-6 gap-8 mobile:grid-cols-1">
          <div className="grid grid-cols-2 gap-8">
            <button
              className="bg-primaryBlue text-white rounded-md w-full h-12 hover:bg-[rgba(16,77,150,0.85)]"
              onClick={create}
              disabled={isLoading}
            >
              {isLoading
                ? `${language.createAccount} ...`
                : language.createAccount}
            </button>
            <Link
              href="signin"
              className="box px-6 py-3 text-bas bg-white text-neutral800 border-primaryBlue border rounded-md text-center pt-2.5"
            >
              {language.cancel}
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-1 mt-0 gap-8 mobile:grid-cols-1">
          <div className="grid grid-cols-2 gap-8">
            {alertMsg && (
              <AlertMessage status={alertStatus} msg={alertMsg}></AlertMessage>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
