import React, { useState, useEffect, useMemo, useRef } from "react";
import ClientDataService from "../services/ClientService";
import { useTable } from "react-table";
import moment from "moment";

const TutorialsList = (props) => {
  const [clientList, setClientList] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const tutorialsRef = useRef();

  tutorialsRef.current = clientList;
  console.log(clientList, 'clientList')
  useEffect(() => {
    getclientList();
  }, []);

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const getclientList = () => {
    ClientDataService.getAll()
      .then((response) => {
        console.log(response.data, 'response')
        setClientList(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    getclientList();
  };

  const removeAllTutorials = () => {
    ClientDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    ClientDataService.findByTitle(searchTitle)
      .then((response) => {
        setClientList(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editClient = (rowIndex) => {
    const id = tutorialsRef.current[rowIndex]._id;

    props.history.push("/clientList/" + id);
  };

  const deleteClient = (rowIndex) => {
    const id = tutorialsRef.current[rowIndex]._id;
    console.log(tutorialsRef.current[rowIndex], id, 'id')
    ClientDataService.remove(id)
      .then((response) => {
        refreshList();
        // setClientList(response.data);
        // props.history.push("/clientList");

        // let newTutorials = [...tutorialsRef.current];
        // newTutorials.splice(rowIndex, 1);
// 
        // setClientList(newTutorials);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Full Name",
        accessor: "fullName",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Mobile number",
        accessor: "mobile",
      },
      {
        Header: "Email Id",
        accessor: "email",
      },
      {
        Header: "DOB",
        accessor: "dob",
        Cell: (props) => {
          return moment(props.value).format('DD/MM/YYYY');
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => editClient(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteClient(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: clientList,
  });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllTutorials}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default TutorialsList;
