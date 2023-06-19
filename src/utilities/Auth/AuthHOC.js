import axios from "axios";
import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";

const AuthHOC = ({ WrappedComponent }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/check",
          {
            withCredentials: true,
          }
        );

        if (response.status === 202) {
          console.log(response);
          setIsAuth(true);
        }
      } catch (err) {
        console.log(err.response.status);
        if (err.response.status === 401) {
          setIsAuth(false);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  console.log(isAuth);

  useEffect(() => {
    if (isAuth === false) {
      console.log("Redirecting to /");
      navigate("/");
    }
  }, [isAuth]);

  if (isAuth) {
    return <WrappedComponent />;
  }
};

export default AuthHOC;