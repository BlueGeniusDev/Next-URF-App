/**
 * Des: List Item
 * created_at: 2023.05.09
 * updated_at: 2023.05.09
 */

import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import CustomMenu from "./CustomMenu";

function Table(props) {
  const fnDelete = (i) => {
    console.log(i);
  };
  const fnReset = (i) => {
    console.log(i);
  };
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="text-left text-sm text-[#6C7E93]">
            <p className="hidden md:inline">Name</p>
          </th>
          <th className="hidden md:inline text-sm text-[#6C7E93]">Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item, index) => (
          <tr
            className="border-bottomColor border-b text-neutral600 text-lg m-0"
            key={index}
          >
            <td className="pb-2 pt-6">
              <p className="rounded-full bg-lighterBlue w-11 h-11 inline-block text-lg text-primaryBlue text-center align-middle mr-4 pt-2.5">
                {item.short}
              </p>
              {item.name}
            </td>
            <td className="hidden md:inline-block mt-7">{item.email}</td>
            <td className="mt-8 text-right">
              <IconButton aria-label="edit" onClick={(e) => props.editUser(item.id)}>
                <EditIcon />
              </IconButton>
              <CustomMenu i={item.id} fnDelete={fnDelete} fnReset={fnReset} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
