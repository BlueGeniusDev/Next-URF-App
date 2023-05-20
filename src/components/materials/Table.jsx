/**
 * Des: List Item
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import CustomMenu from "./CustomMenu";
import { useMainContext } from "@/context";

const Table = (props) => {
  const { language } = useMainContext();

  const fnDelete = (i) => {
    props.delUser(i);
  };
  const fnReset = (i) => {
    props.resetPass(i);
  };

  const getShort = (name) => {
    const myArray = name.split(" ");
    var short = "";
    myArray.map((item) => {
      short = short + item[0];
    });
    if (short.length === 1) short = short + name[1];

    return short.toUpperCase();
  };

  return (
    <table className="table-auto w-full">
      <thead className="hidden md:contents">
        <tr>
          <th className="text-left text-sm text-neutral500">{language.name}</th>
          <th className="text-left text-sm text-neutral500">
            {language.email}
          </th>
          <th className="text-left text-sm text-neutral500">{language.role}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.data.length === 0 ? (
          <tr className="border-bottomColor border-b text-neutral600 text-lg m-0 text-center">
            <td colSpan="3">{language.noSalesUsers}</td>
          </tr>
        ) : (
          props.data.map((item, index) => (
            <tr
              className="border-bottomColor border-b text-neutral600 text-lg"
              key={index}
            >
              <td className="py-2">
                <p className="rounded-full bg-[#c2dbfd] w-11 h-11 inline-block text-lg text-primaryBlue text-center align-middle mr-4 pt-2.5">
                  {getShort(item.name)}
                </p>
                {item.name}
              </td>
              <td className="middle:hidden mobile:hidden py-2">{item.email}</td>
              <td className="middle:hidden mobile:hidden py-2">
                {item.salesRole}
              </td>
              <td className="text-right py-2">
                <IconButton
                  aria-label="edit"
                  onClick={(e) => props.editUser(item.id)}
                >
                  <EditIcon />
                </IconButton>
                <CustomMenu i={item.id} fnDelete={fnDelete} fnReset={fnReset} />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
