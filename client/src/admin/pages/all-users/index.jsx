import React, { useEffect } from "react";
import { Button, message, Popconfirm, Table } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../../redux/slice/getAllUsers";
import axios from "axios";

const AllUsers = () => {
  const { loading, data, error } = useSelector((state) => state.getAllUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const confirm = (id) => {
    axios
      .delete(`http://localhost:8080/api/users/${id}`)
      .then(() =>
        dispatch(fetchAllUsers()).then(() => message.success("User Deleted"))
      );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Username",
      dataIndex: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      render: (isAdmin) => (isAdmin ? <p>Admin</p> : <p>User</p>),
    },
    {
      title: "Account Creating Date",
      dataIndex: "createdAt",
    },
    {
      title: "Make / Remove Admin",
      render: (data) =>
        data.isAdmin ? (
          <Button
            onClick={() => {
              axios
                .patch(`http://localhost:8080/api/removeAdmin/${data._id}`)
                .then(() =>
                  dispatch(fetchAllUsers()).then(() =>
                    message.info("You're removed his Admin status")
                  )
                );
            }}
            type="primary"
            danger
          >
            Remove Admin
          </Button>
        ) : (
          <Button
            onClick={() => {
              axios
                .patch(`http://localhost:8080/api/makeAdmin/${data._id}`)
                .then(() =>
                  dispatch(fetchAllUsers()).then(() =>
                    message.info("You're made him Admin")
                  )
                );
            }}
            type="primary"
          >
            Make Admin
          </Button>
        ),
    },
    {
      title: "Delete User",
      dataIndex: "_id",
      render: (id) => (
        <Popconfirm
          placement="bottomRight"
          title={"Are you sure to delete this user?"}
          description={"Delete the user"}
          onConfirm={() => confirm(id)}
          okText="Yes"
          cancelText="No"
          icon={
            <QuestionCircleOutlined
              style={{
                color: "red",
              }}
            />
          }
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
      />
    </div>
  );
};

export default AllUsers;
