import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { useTable, useRowSelect, usePagination, useSortBy } from "react-table";
import IndeterminateCheckbox from "./Checkbox";
import "./table.css";

const BasicTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "",
        accessor: "link",
        Cell: (row) => (
          <a
            href={
              "https://jsonplaceholder.typicode.com/users/" +
              (Number(row.cell.row.id) + Number(1))
            }
          >
            Подробнее
          </a>
        ),
      },
      {
        Header: "username",
        accessor: "username",
      },
      {
        Header: "email",
        accessor: "email",
      },
      {
        Header: "website",
        accessor: "website",
      },
      {
        Header: "Delete",
        id: "delete",

        Cell: (row) => (
          <button
            onClick={() => {
              let temp_users = [...users];
              temp_users.splice(row.cell.row.id, 1);
              setUsers(temp_users);
            }}
          >
            Delete
          </button>
        ),
      },
    ],
    [users]
  );
  const data = useMemo(() => users, [users]);

  const tableInstance = useTable(
    { columns, data },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    setPageSize,
    state,
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <>
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            </>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <>
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <>
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      </>
                    );
                  })}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <div className="page-info">
        <span>
          Page {""}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </>
  );
};

export default BasicTable;
