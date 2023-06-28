import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "../pages/login";
import { Home } from "../pages/home";
import axios from "axios";
import { useEffect } from "react";
import {useAuth} from '../hooks/API/useAuth'
export const Routing = () => {
  const {auth,authUser} = useAuth()
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log(await axios.get("http://localhost:3001/me"));
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/:id" element={<Home />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
