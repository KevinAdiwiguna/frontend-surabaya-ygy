import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/login";
import { Home } from "../pages/home";
import { useEffect } from "react";
import { useAuth } from "../hooks/API/useAuth";

export const Routing = () => {
  const { authUser } = useAuth();

  useEffect(() => {
    authUser();
  }, []);

  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/:id" element={<Home />} />
        <Route path="/" element={<Home />} />
    </Routes>
  );
};
