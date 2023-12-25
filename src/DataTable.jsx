import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component"; // Make sure to import DataTable from the library
import {useNavigate} from 'react-router-dom'
const DataTableComponent = () => {
  const [data, setData] = useState([]);
  const URL =process.env.REACT_APP_BASE_URL;
const navigate = useNavigate()
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("aaijamunte"); // validated from backend
    if (!isLoggedIn) {
      navigate('/')
    }
    getallField();
  },[]);
  const getallField = async() => {

    try {
        const res = await fetch(`${URL}/alldata`, {});
        const fetchedData = await res.json(); 
        setData(fetchedData.data);
        console.log(fetchedData);
        
      } catch (error) {
        console.log(error);
      }
    };

  const DataColumns = [
    {
      name: "BusService",
      selector: (row) => row.busServiceName,
    },
    {
      name: "StartPoint",
      selector: (row) => row.startPoint,
    },
    {
      name: "EndPoint",
      selector: (row) => row.endPoint,
    },
    {
      name: "Stops",
      cell: (row) => (
        <div>
          {row.stops.map((stop, index) => (
            <div key={index}>{stop}</div>
          ))}
        </div>
      ),
    },
    {
      name: "Message",
      selector: (row) => row.message,
    },
  ];

  return (
    <div className="container">
    <DataTable
      // customStyles={tableHeaderstyle} // Assuming tableHeaderstyle is defined
      pagination
      columns={DataColumns}
      data={data}
      selectableRows
      highlightOnHover
      fixedHeader
      paginationRowsPerPageOptions={[10, 30, 50, 100]}
    />
    </div>
  );
};

export default DataTableComponent;
