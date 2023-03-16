import React from "react";
import "./index.scss";
import { Helmet } from "react-helmet";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404</title>
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button onClick={() => navigate("/")} type="primary">
            Back Home
          </Button>
        }
      />
    </>
  );
};

export default NotFound;
