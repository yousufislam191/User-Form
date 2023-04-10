import { React, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Button, Card, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
let firstRender = true;

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const refreshToken = async () => {
    const res = await axios
      .get("http://localhost:5000/api/refresh", {
        withCredentials: true,
      })
      .catch((err) => {
        // console.log(err);
        return notify(err.response.status, err.response.data.message);
      });
    const data = await res.data;
    return data;
  };

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/user", {
        withCredentials: true,
      })
      .catch((err) => {
        // console.log(err);
        return notify(err.response.status, err.response.data.message);
      });
    const data = await res.data;
    return data;
  };

  const sendLogoutRequest = async () => {
    const res = await axios.get("http://localhost:5000/api/logout", {
      withCredentials: true,
    });
    if (res.statusCode === 200) {
      return res;
    }
    return new Error("Couldn't log out");
  };

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sendRequest().then((data) => setUser(data.user));
    }
    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.user));
    }, 1000 * 29);
    return () => clearInterval(interval);
  }, []);

  const notify = (status, message) => {
    if (status !== 200) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleLogout = () => {
    sendLogoutRequest().then((data) => console.log(data));
  };

  return (
    <>
      <ToastContainer />
      {user && (
        <div className="root">
          <Typography
            className="text-center mb-3 mt-3"
            variant="h4"
            color="primary"
          >
            Welcome to Dashboard
          </Typography>
          <Card className="form ms-auto me-auto">
            <h2>Name: {user.name}</h2>
            <h4>Email: {user.email}</h4>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              // onClick={() => {
              //   // navigate("/signin");
              //   handleLogout();
              // }}
              onClick={handleLogout()}
            >
              Logout
            </Button>
          </Card>
        </div>
      )}
    </>
  );
};

export default Dashboard;
