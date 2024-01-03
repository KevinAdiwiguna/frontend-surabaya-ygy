import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        user: username,
        password: password
      });
      navigate("/Dashboard");
    } catch (error) {
      setErrorMessage("Incorrect username or password");
      setIsModalOpen(true);
    }
  };  

  const loginCheck = async () => {
    try {
      console.log(await axios.get(`${process.env.REACT_APP_API_BASE_URL}/me`));
      navigate("/Dashboard");
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    loginCheck();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };

  return (
    <div
      className="bg-center bgku"
    >
      <div className="flex justify-center items-center h-screen">
        <div className="border-4 border-double p-4 rounded-lg bg-red-600">
          <h1 className="font-bold text-xl mb-4">Login Page</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-2">
              <label className="text-white">Username</label>
              <div>
                <input
                  type="text"
                  className="border rounded-lg px-2 py-1"
                  onChange={(e) => setUsername(e.target.value.trim())}
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="text-white">Password</label>
              <div>
                <input
                  type="password"
                  className="border rounded-lg px-2 py-1"
                  onChange={(e) => setPassword(e.target.value.trim())}
                />
              </div>
            </div>
            <input
              type="submit"
              className="border px-2 py-1 mt-4 cursor-pointer float-right bg-yellow-200 rounded-lg hover:bg-yellow-500 hover:text-white"
              value="Login"
            />
          </form>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal fixed inset-0 flex items-center justify-center"
        overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50"
        portalClassName="modal-portal"
      >
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-red-600 font-bold">Error</h2>
          <p>{errorMessage}</p>
          <button
            className="bg-red-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-red-700"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};
