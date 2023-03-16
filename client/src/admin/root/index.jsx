import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAuth } from "../../redux/slice/userAuthSlice";
import Aside from "../layouts/aside";
import { Button, Result, Space, Spin } from "antd";

const AdminRoot = () => {
  const { loading, data, error } = useSelector((state) => state.userAuthSlice);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserAuth());
  }, [dispatch]);

  const useAuth = () => {
    return data?.isAdmin;
  };

  const isAuth = useAuth();

  return loading ? (
    <Space size="middle">
      <Spin size="small" />
      <Spin />
      <Spin size="large" />
    </Space>
  ) : isAuth ? (
    <div
      style={{
        display: "flex",
        maxWidth: "1600px",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <Aside />
      <>
        <Outlet />
      </>
    </div>
  ) : (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button onClick={() => navigate("/")} type="primary">
          Back Home
        </Button>
      }
    />
  );
};

export default AdminRoot;
