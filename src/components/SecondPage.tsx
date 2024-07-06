import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import Post from "../models/post";
import DepartmentList from "./DepartmentList";

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 500 },
  ];

  const userDetails = localStorage.getItem("userDetails");
  if (!userDetails) {
    window.location.href = "/";
    return <div>You must enter your details before accessing this page.</div>;
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <div
        style={{
          marginLeft: 20,
          fontWeight: 600,
          marginBottom: 20,
          fontSize: 30,
        }}
      >
        Welcome, {JSON.parse(userDetails).name}!
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataGrid
          rows={posts}
          columns={columns}
          style={{ padding: 10, margin: 20 }}
        />
      )}
      <DepartmentList />
    </div>
  );
};

export default SecondPage;
