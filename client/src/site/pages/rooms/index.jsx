import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import RoomCard from "./../../components/room-card/index";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserAuth } from "../../../redux/slice/userAuthSlice";
import { Button, Result, Space, Spin } from "antd";

const Rooms = () => {
  const navigate = useNavigate();

  const { loading, data, error } = useSelector((state) => state.userAuthSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserAuth());
  }, [dispatch]);

  const useAuth = () => {
    return data && data;
  };

  const isAuth = useAuth();

  return loading ? (
    <Space size="middle">
      <Spin size="small" />
      <Spin />
      <Spin size="large" />
    </Space>
  ) : isAuth ? (
    <main id="rooms">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Rooms</title>
      </Helmet>
      <section className="sub-banner">
        <div className="container">
          <h1>Rooms</h1>
          <nav>
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="active">Rooms</li>
            </ol>
          </nav>
        </div>
      </section>
      <section className="room-cards">
        <div className="container">
          <RoomCard />
        </div>
      </section>
    </main>
  ) : (
    <Result
      status="403"
      title="You are not logged in"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button onClick={() => navigate("/sign-in")} type="primary">
          Log In
        </Button>
      }
    />
  );
};

export default Rooms;
