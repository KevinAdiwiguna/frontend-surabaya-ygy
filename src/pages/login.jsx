import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, {
                username: username,
                password: password
            });
            navigate('/')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        } catch (error) {
            alert("password atau username yang anda masukan salah".toUpperCase())
        }
    };

    const loginCHeck = async () => {
        try {
            console.log(await axios.get(`${process.env.REACT_APP_API_BASE_URL}/me`))
            navigate('/')
        } catch (error) {
            navigate('/login')
        }
    }

    useEffect(() => {
        loginCHeck()
    }, [])




    return (
        <div style={{backgroundImage: `url("./images.png")`}} className="bg-center">
            <div className="flex justify-center items-center h-screen">
                <div className="border-4 border-double p-4 rounded-lg bg-red-600">
                    <h1 className="font-bold text-xl mb-4">Login Page</h1>
                    <form onSubmit={handleLogin} >
                        <div className="mb-2">
                            <label>Username</label>
                            <div>
                                <input type="text" className="border rounded-lg" onChange={(e) => setUsername(e.target.value.trim())}></input>
                            </div>
                        </div>
                        <div>
                            <label>Password</label>
                            <div>
                                <input type="password" className="border rounded-lg" onChange={(e) => setPassword(e.target.value.trim())}></input>
                            </div>
                        </div>
                        <input type="submit" className="border px-2 py-1 mt-4 cursor-pointer float-right bg-yellow-200 rounded-lg hover:bg-yellow-500 hover:text-white" value="Login" />
                    </form>
                </div>
            </div>
        </div>
    );
};
