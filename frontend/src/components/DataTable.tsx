import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await axios("https://reqres.in/api/users");

    setData(result.data.data);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Avatar</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any) => {
          return (
            <tr>
              <td>{item.id}</td>
              <td>{item.email}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>
                <img src={item.avatar} height={100} width={100} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default DataTable;
