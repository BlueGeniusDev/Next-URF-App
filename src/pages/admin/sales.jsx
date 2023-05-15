/**
 * Des: Sales Admin page
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import SearchBox from "@/components/materials/SearchBox";
import Image from "next/image";
import userlist from "@/resource/userlist";
import Table from "@/components/materials/Table";
import NewUserDialog from "@/components/materials/Dialog";
import NewUserDialogMo from "@/components/materials/DialogMo";
import SuccessDialog from "@/components/materials/DialogSuccess";
import SuccessDialogMo from "@/components/materials/DialogSuccessMo";

const SalesAdmin = () => {
  const navigator = useRouter();

  const [openNewUser, setOpenNewUser] = useState(false);
  const [openSuccessUser, setSuccessUser] = useState(false);
  const [newUser, setNewUser] = useState({});
  const [selected, setSelected] = useState({});
  const [action, setAction] = useState("add");
  const btnNewUserClick = () => {
    setOpenNewUser(true);
    setAction("add");
  };
  const closeDialogNewUser = () => {
    setOpenNewUser(false);
  };
  const fnNewUser = () => {
    setOpenNewUser(false);
    setNewUser({ name: "123", password: "qwe" }); //=========================
    setSuccessUser(true);
  };
  const closeSuccessDialog = () => {
    setSuccessUser(false);
  };
  const editUser = (id) => {
    setAction("edit");
    setOpenNewUser(true);
    setSelected(userlist.find((item, index) => item.id === id));
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigator.push("/");
    }
  }, [navigator]);

  return (
    <main className="md:container mx-auto sm:px-6 px-10">
      <div className={openNewUser || openSuccessUser ? "mobile:hidden" : ""}>
        <h1 className="sm:text-[34.42px] text-[32px] font-medium text-[#16181D] block md:float-left mt-10 mb-10">
          Users
        </h1>
        <button
          className="box float-right font-normal md:mt-11 mb-11 text-lg pl-[23px] pr-[28.25px] py-[14px] text-white bg-primaryBlue rounded-md ml-4"
          onClick={btnNewUserClick}
        >
          <span>Create New User</span>
          <Image
            src="/plus.svg"
            alt="Logo"
            className="ml-2 mt-[6px] float-right"
            width={16}
            height={16}
          />
        </button>
        <SearchBox className="md:clear-both" />
        <Table data={userlist} editUser={editUser} />
      </div>
      <NewUserDialog
        openDialog={btnNewUserClick}
        closeDialog={closeDialogNewUser}
        createNewUser={fnNewUser}
        action={action}
        open={openNewUser}
        data={userlist}
        selectedUser={selected}
      />
      <NewUserDialogMo
        className={openNewUser ? "hidden mobile:block" : "hidden"}
        closeDialog={closeDialogNewUser}
        createNewUser={fnNewUser}
        action={action}
        open={openNewUser}
        data={userlist}
        selectedUser={selected}
      />
      <SuccessDialog
        //   openDialog={btnSuccessClick}
        closeDialog={closeSuccessDialog}
        data={newUser}
        open={openSuccessUser}
        name={newUser.name}
      />
      <SuccessDialogMo
        className={openSuccessUser ? "hidden mobile:block" : "hidden"}
        closeDialog={closeSuccessDialog}
        data={newUser}
        open={openSuccessUser}
        name={newUser.name}
      />
    </main>
  );
};

export default SalesAdmin;
