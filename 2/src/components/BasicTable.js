import React, { useState, useMemo, useEffect } from "react";
import ReactSwitch from "react-switch";
import { useTable } from "react-table";
import { getEmployeesAPI } from "./data";
import "./table.css";
import axios from "axios";
import ToggleSwitch from "./Switch";

const Salary = ({ date, salary }) => {
  return (
    <>
      <div className="salary-block">
        <div className="salary-block-description">
          <h3 className="salary-block-value">{salary}</h3>
          <h5 className="salary-block-date">{date}</h5>
        </div>
        <div>
          <button className="salary-block-button"></button>
        </div>
      </div>
    </>
  );
};

const BasicTable = () => {
  const [employees, setEmployees] = useState([]);

  const data = useMemo(
    () => [
      {
        id: 0,
        name: "Иван Иваныч", // в реестре: ИМЯ
        position: "Директор", // Должность
        social: {
          // Социальные статусы
          resident: true, //Резидент
          pensioner: false, // Пенсионер
          disabled: false, // Инвалид
        },
        salaries: [
          // оклады
          {
            date: "10.10.2020",
            sum: "85000",
          },
          {
            date: "10.11.2020",
            sum: "95000",
          },
        ],
      },
      {
        id: 1,
        name: "Имя Фамилия", // в реестре: ИМЯ
        position: "web-разработчик", // Должность
        social: {
          // Социальные статусы
          resident: false, //Резидент
          pensioner: false, // Пенсионер
          disabled: false, // Инвалид
        },
        salaries: [
          // оклады
          {
            date: "10.10.2020",
            sum: "85000",
          },
          {
            date: "10.11.2020",
            sum: "95000",
          },
        ],
      },
    ],
    [employees]
  );

  console.log(employees);
  // functions for salaries

  const COLUMNS = [
    {
      Header: "ФИО",
      Footer: "ФИО",
      accessor: "name",
    },
    {
      Header: "Должность",
      Footer: "Должность",
      accessor: "position",
    },
    {
      Header: "Социальные статусы",
      Cell: (row) => {
        return (
          <>
            <div>
              <ul>
                <li>Резидент</li>
                <li>Пенсионер</li>
                <li>Инвалид</li>
              </ul>
            </div>
          </>
        );
      },
    },
    {
      Header: "Оклады",
      Cell: (row) => {
        return (
          <>
            {/* <Salary date={employees[0].salaries[0].date} salary={"85 000,00"} /> */}
            <Salary date={"19.09.2021"} salary={"154 000,00"} />
          </>
        );
      },
    },
    {
      Header: "Действия",
      Cell: (row) => {
        return (
          <>
            <div className="moves">
              <button className="copy-btn btn">Скопировать</button>
              <button className="edit-btn btn">Изменить</button>
              <button
                onClick={() => {
                  let temp_employees = [...employees];
                  console.log(temp_employees);

                  temp_employees.splice(row.cell.row.id, 1);
                  setEmployees(temp_employees);
                  console.log(employees);
                }}
                className="delete-btn btn"
              >
                Удалить
              </button>
            </div>
          </>
        );
      },
    },
  ];

  const columns = useMemo(() => COLUMNS, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <>
      <div className="header-div">
        <h1 className="header">Работники</h1>
        <button className="header-btn">Добавить работника</button>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default BasicTable;
