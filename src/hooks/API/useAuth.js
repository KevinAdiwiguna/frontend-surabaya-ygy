import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState([]);

  const authUser = async () => {
    try {
      const response = await axios.get("http://localhost:3001/me");
      setAuth(response.data.user);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };
  return {
    authUser,
    auth,
  };
};