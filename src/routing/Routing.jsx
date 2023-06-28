import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "../pages/login";
import { Home } from "../pages/home";
import { useEffect } from "react";
import { useAuth } from "../hooks/API/useAuth";


export const Routing = () => {
  const { auth, authUser } = useAuth()

  useEffect(() => {
    authUser()
  }, []);

  console.log(auth)
  return (
    <Routes>
      <Route path="/login" element={<Login me={auth} />} />
      <Route path="/:id" element={<Home me={auth} />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
 