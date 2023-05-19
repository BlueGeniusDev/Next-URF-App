/**
 * Des: Sales Admin page
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

import SearchBox from "@/components/materials/SearchBox";
import Image from "next/image";
import Table from "@/components/materials/Table";
import NewUserDialog from "@/components/materials/Dialog";
import SuccessDialog from "@/components/materials/DialogSuccess";
import SuccessDialogMo from "@/components/materials/DialogSuccessMo";
import jwtDecode from "jwt-decode";
import { useMainContext } from "@/context";

import {
  getPredefinedUsers,
  getSalesUsers,
  createSalesUser,
  delSalesUser,
} from "../api/admin";

const SalesAdmin = () => {
  const { language, selectedLang } = useMainContext();
  const navigator = useRouter();

  const [alertMsg, setAlertMsg] = useState("");
  const [alertStatus, setAlertStatus] = useState("");
  const [openNewUser, setOpenNewUser] = useState(false);
  const [openSuccessUser, setSuccessUser] = useState(false);
  const [newUser, setNewUser] = useState({});
  const [selected, setSelected] = useState({});
  const [predefinedUserId, setPredefinedUserId] = useState(0);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [action, setAction] = useState("add");
  const [predefinedUsers, setPredefinedUsers] = useState([]);
  const [salesUsers, setSalesUsers] = useState([]);

  const getSalesUsersData = useCallback(async () => {
    const salesUsersData = await getSalesUsers(selectedLang);
    if (salesUsersData.code) {
      // handle error
    } else {
      setSalesUsers(salesUsersData.data);
    }
  }, [selectedLang]);

  const getPredefinedUsersData = useCallback(async () => {
    const predefinedUsersData = await getPredefinedUsers(selectedLang);
    if (predefinedUsersData.code) {
    } else {
      setPredefinedUsers(predefinedUsersData.users);
    }
  }, [selectedLang]);

  const btnNewUserClick = () => {
    setOpenNewUser(true);
    setAction("add");
  };
  const closeDialogNewUser = () => {
    setOpenNewUser(false);
    setAlertMsg("");
  };
  const closeSuccessDialog = () => {
    setSuccessUser(false);
    setNewUser({});
  };
  const getName = (e) => {
    setPredefinedUserId(e.target.value);
  };
  const getEmail = (e) => {
    setEmail(e.target.value);
  };
  const getRole = (e) => {
    setRole(e.target.value);
  };

  const validateEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const fnNewUser = async () => {
    if (action === "add") {
      if (predefinedUserId === 0) {
        setAlertStatus("error");
        setAlertMsg(language.selectNameError);
        return;
      }
      if (email === "") {
        setAlertStatus("error");
        setAlertMsg(`${language.required} ${language.email}`);
        return;
      }
      if (!validateEmail(email)) {
        setAlertStatus("error");
        setAlertMsg(language.invalidEmail);
        return;
      }
      if (role === "") {
        setAlertStatus("error");
        setAlertMsg(`${language.select} ${language.role}`);
        return;
      }

      // here create api
      const data = {
        email: email,
        predefinedUserId: predefinedUserId,
        role: role,
      };

      const res = await createSalesUser(data, selectedLang);
      if (!res.code) {
        const item = await predefinedUsers.find(
          (obj) => obj.id === predefinedUserId
        );
        setNewUser({ name: item.name, password: res.password });
        setOpenNewUser(false);
        setSuccessUser(true);
        setAlertMsg("");
        await getSalesUsersData();
        await getPredefinedUsersData();
      } else {
      }
    } else {
    }
  };
  const editUser = (id) => {
    setAction("edit");
    setOpenNewUser(true);
    setSelected(salesUsers.find((item) => item.id === id));
  };
  const delUser = async (id) => {
    const res = await delSalesUser(id, selectedLang);
    await getSalesUsersData();
  };
  const resetPass = async (id) => {
    console.log(id);
  };

  useEffect(() => {
    async function process() {
      await getSalesUsersData();
      await getPredefinedUsersData();

      if (!localStorage.getItem("accessToken")) {
        const jwt_payload = jwtDecode(localStorage.getItem("accessToken"));
        if (jwt_payload.organizationRole !== "admin-sales") {
          navigator.push("/");
        }
      }
    }
    process();
  }, [getSalesUsersData, getPredefinedUsersData, selectedLang, navigator]);

  return (
    <main className="mx-10 mobile:mx-4">
      <div className={openNewUser || openSuccessUser ? "mobile:hidden" : ""}>
        <h1 className="sm:text-[34.42px] text-[32px] font-medium text-[#16181D] block md:float-left mt-10 mb-10">
          {language.users}
        </h1>
        <button
          className="box float-right font-normal md:mt-11 text-lg pl-[23px] pr-[28.25px] py-[14px] mobile:px-3 text-white bg-primaryBlue rounded-md ml-4"
          onClick={btnNewUserClick}
        >
          <span>{language.createNewUser}</span>
          <Image
            src="/plus.svg"
            alt="plus"
            className="ml-2 mt-[6px] float-right"
            width={16}
            height={16}
          />
        </button>
        <SearchBox className="md:clear-both mb-6" />
        <Table
          data={salesUsers}
          delUser={delUser}
          editUser={editUser}
          resetPass={resetPass}
        />
      </div>
      <NewUserDialog
        openDialog={btnNewUserClick}
        closeDialog={closeDialogNewUser}
        getName={getName}
        alertMsg={alertMsg}
        alertStatus={alertStatus}
        getEmail={getEmail}
        getRole={getRole}
        createNewUser={fnNewUser}
        action={action}
        open={openNewUser}
        data={predefinedUsers}
        selectedUser={selected}
        role={role}
      />
      <SuccessDialog
        closeDialog={closeSuccessDialog}
        datas={newUser}
        open={openSuccessUser}
      />
      <SuccessDialogMo
        className={openSuccessUser ? "hidden mobile:block p-6" : "hidden"}
        closeDialog={closeSuccessDialog}
        datas={newUser}
        open={openSuccessUser}
      />
    </main>
  );
};

export default SalesAdmin;
