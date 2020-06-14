import React, {useEffect, useState} from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import ReactLoading from 'react-loading';
import { useTable } from "react-table";

import Navbar from "./Navbar";
import "../styles/style.css";

export default function Home() {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true); // here 
    getUsersData();
    console.log(loading)
  }, [])
  
  const columns = React.useMemo(
    () => [
      {
        Header: "Username",
        accessor: "username"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Age",
        accessor: "age"
      },
      {
        Header: "Phone Number",
        accessor: "phone"
      },
      {
        Header: "Country",
        accessor: "country"
      },
      {
        Header: "Company",
        accessor: "company"
      }
    ],
    []
  );

  const getUsersData = () => {
    
    axios({
      url: "/api/users",
      method: "GET",
    })
      .then(function (response) {
        if (response.status === 200){ 
          
          const usersdata= response.data.results
          setData(usersdata)
  
          console.log("GOT MY DATA :)");
          console.log(data)
        }
          
        else {
          setData([{username:"",email:"",age:"",phone:"",country:"",company:""}])
          console.log("response.message");
          console.log(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally( ()=> {
        setLoading(false);
      });
  }


  return (
  <div>
    <Navbar/>
    <h1>Our Users</h1>

    {loading 
    ? <ReactLoading className="loading" type={"spin"} color={"#19bb34"} height={200}  />
    : <div className="profileDataDiv">
      <CssBaseline />
      <Table columns={columns} data={data} />      
      </div>}
    
    
  </div>);
  
}

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);


function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <StyledTableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableCell>
            ))}
          </StyledTableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <StyledTableRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </StyledTableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
}



