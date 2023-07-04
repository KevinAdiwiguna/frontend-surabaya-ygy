import React, { useEffect } from 'react'
import { useAuth } from '../hooks/API/useAuth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
    const { auth, authUser } = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        authUser()
    },[])

    const logout = async () => {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/logout`);
        navigate("/login");
        };

    return (
        <div>
            <div className='text-2xl font-bold mb-4'>Profile</div>
            <div>
                <table className='border-separate border-spacing-2 w-1/2'>
                    <tr>
                        <td>Username</td>
                        <td>
                        <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={auth?.username} required disabled />
                        </td>
                    </tr>
                    <tr>
                        <td>Role</td>
                        <td>
                        <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={auth?.role} required disabled />
                        </td>
                    </tr>
                </table>
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">Change Password</button>
                <button onClick={()=>logout()} type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none  mx-auto dark:focus:ring-red-800">Log Out</button>
            </div>
        </div>
    )
}
