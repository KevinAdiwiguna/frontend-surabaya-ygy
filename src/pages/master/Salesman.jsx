import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMe } from "../../hooks/API/useMe";
import { dateConverter } from "../../components/dateConverter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Salesman = () => {
  const { fetchMe, response } = useMe();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    fetchMe();
  }, [!response]);

  const dataFetching = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/salesman`);
      setGetData(data.data);
    } catch (error) {
      if (error.response) {
        toast.error(`${error.response.data.msg}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else if (error.request) {
        console.error("Request Error:", error.request);
        toast.error("Network error. Please check your internet connection.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const deleteData = async (params) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/salesman/${params}`);
      dataFetching();
      toast.success("Data Deleted", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      if (error.response) {
        toast.error(`${error.response.data.msg}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else if (error.request) {
        console.error("Request Error:", error.request);
        toast.error("Network error. Please check your internet connection.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const submitClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/salesman`, {
        code: code,
        name: name,
        address: address,
        city: city,
        phone: phone,
        mobile: mobile,
        createdBy: response.User,
        changedBy: response.User,
      });
      dataFetching();
      toast.success("Data Saved", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      if (error.response) {
        toast.error(`${error.response.data.msg}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else if (error.request) {
        console.error("Request Error:", error.request);
        toast.error("Network error. Please check your internet connection.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else {
        console.error("Error:", error.message);
      }
    }
  };
  useEffect(() => {
    dataFetching();
  }, []);

  return (
    <div>
      <div className="text-2xl font-bold mb-4">Salesman</div>
      <form onSubmit={submitClick}>
        <table className="border-separate border-spacing-2 w-1/2">
          <tr>
            <td className="text-right">Code: </td>
            <td>
              <input
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Isi kode"
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Name: </td>
            <td>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Isi nama"
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Address: </td>
            <td>
              <input
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Isi alamat"
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">City: </td>
            <td>
              <input
                type="text"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Isi kota"
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Phone: </td>
            <td>
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                type="text"
                pattern="[0-9]+"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Isi nomor telpon"
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Mobile: </td>
            <td>
              <input
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Isi nomor hp"
                required
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">
                Save
              </button>
            </td>
          </tr>
        </table>
      </form>

      <div className="relative overflow-x-auto pt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Code
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile
              </th>
              <th scope="col" className="px-6 py-3">
                Created By
              </th>
              <th scope="col" className="px-6 py-3">
                Created Date
              </th>
              <th scope="col" className="px-6 py-3">
                Changed By
              </th>
              <th scope="col" className="px-6 py-3">
                Changed Date
              </th>
              <th scope="col" className="px-6 py-3">
                Control
              </th>
            </tr>
          </thead>
          <tbody>
            {getData.map((res, key) => {
              console.log(getData);
              return (
                <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {res.Code}
                  </th>
                  <td className="px-6 py-4">{res.Name}</td>
                  <td className="px-6 py-4">{res.Address}</td>
                  <td className="px-6 py-4">{res.City}</td>
                  <td className="px-6 py-4">{res.Phone}</td>
                  <td className="px-6 py-4">{res.Mobile}</td>
                  <td className="px-6 py-4">{res.CreatedBy}</td>
                  <td className="px-6 py-4">{dateConverter(res.CreatedDate)}</td>
                  <td className="px-6 py-4">{res.ChangedBy}</td>
                  <td className="px-6 py-4">{dateConverter(res.ChangedDate)}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => deleteData(res.Code)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                      Delete
                    </button>
                    <button type="button" className="focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div></div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};
