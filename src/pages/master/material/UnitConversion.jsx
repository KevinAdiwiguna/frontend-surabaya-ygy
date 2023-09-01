import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMe } from "../../../hooks/API/useMe";
import { toast, ToastContainer } from "react-toastify";
import { dateConverter } from "../../../components/dateConverter";

export const UnitConversion = () => {
  const { fetchMe, response } = useMe();
  const [unit, setUnit] = useState([]);
  const [content, setContent] = useState([]);
  const [contentUpdate, setContentUpdate] = useState([]);
  const [materialCode, setMaterialCode] = useState([]);
  const [myMaterialCode, getMaterialCode] = useState([]);
  const [getUnit, setGetUnit] = useState([]);
  const [getData, setGetData] = useState([]);
  const [modalData, setModalData] = useState([])
  const [modal, setModal] = useState(false)

  const closeModal = () => {
    setModal(false)
    setContentUpdate(0)
  }

  useEffect(() => {
    fetchMe();
  }, [!response]);

  const dataFetching = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/unitconversion`
      );
      setGetData(data.data);
    } catch (error) {}
  };

  const deleteData = async (params) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/unitconversion/${params}`
      );
      dataFetching();
      toast.success("Data Deleted", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
    });

    } catch (error) {}
  };

  const updateData = async (params) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/unitconversion/${params}`,
        {
          content: contentUpdate,
          changedBy: response.User,
        }
      );
      dataFetching();
      toast.success("Data Updated", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      
    }
  };

  const submitClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/unitconversion`, {
        materialCode: materialCode,
        unit: unit,
        content: content,
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
      toast.warn("Code Sudah Digunakan", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      });

    }
  };

  const getMyMaterialCode = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/material`
      );
      getMaterialCode(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyUnit = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/unit`
      );
      setGetUnit(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataFetching();
    getMyMaterialCode();
    getMyUnit();
  }, []);

  return (
    <div>
      <div className="text-2xl font-bold mb-4">Unit Conversion</div>
      <form onSubmit={submitClick}>
        <table className="border-separate border-spacing-2 w-1/2">
          <tr>
            <td className="text-right">Material Code: </td>
            <td>
              <select onChange={(e)=>{setMaterialCode(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" disabled selected hidden>
                  Pilih material code
                </option>
                {myMaterialCode.map((res, key) => {
                  return (
                    <option value={res.Code} key={key}>
                      {res.Code}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-right">Unit:</td>
            <td>
              <select onChange={(e)=>{setUnit(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%  ] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" disabled selected hidden>
                  Pilih unit
                </option>
                {getUnit.map((res, key) => {
                  return (
                    <option value={res.Code} key={key}>
                      {res.Code}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-right">1 Unit: </td>
            <td>
              <input
                onChange={(e)=>{setContent(e.target.value)}}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </td>
          </tr>

          <tr>
            <td></td>
            <td>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
              >
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
                Material Code
              </th>
              <th scope="col" className="px-6 py-3">
                Unit
              </th>
              <th scope="col" className="px-6 py-3">
                Content
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
              return (
            <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {res.MaterialCode}
              </th>
              <td className="px-6 py-4">{res.Unit}</td>
              <td className="px-6 py-4">{res.Content}</td>
              <td className="px-6 py-4">{res.CreatedBy}</td>
              <td className="px-6 py-4">{dateConverter(res.CreatedDate)}</td>
              <td className="px-6 py-4">{res.ChangedBy}</td>
              <td className="px-6 py-4">{dateConverter(res.ChangedDate)}</td>
              <td className="px-6 py-4">
                <button
                onClick={() => {deleteData(res.MaterialCode)}}
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete
                </button>
                <button
                      onClick={() => {
                        setModalData(res)
                        setModal(true)
                      }}
                  type="button"
                  className="focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                >
                  Update
                </button>
              </td>
            </tr>
              )
            })}
          </tbody>
        </table>
        <div></div>
      </div>
      <div className={`flex justify-center top-0 left-0 fixed items-center w-screen h-screen z-[5] ${modal ? 'block' : 'hidden'}`}>
        <div className={`bg-slate-50 fixed rounded-lg border border-black overflow-y-scroll p-5`}>
          <div className="space-y-6">
            <div className="text-2xl font-bold mb-4 ">Code: {modalData.MaterialCode}</div>
            <button
              onClick={() => {
                closeModal()
              }}
              className="absolute top-0 right-4 text-gray-600 hover:text-gray-800 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-[75%]">
              <table className='border-separate border-spacing-2'>
                <tr>
                  <td className='text-right'>Unit: </td>
                  <td>
                    <input value={modalData.Unit} disabled type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </td>
                </tr>
                <tr>
                  <td className='text-right'>1 Unit: </td>
                  <td>
                    <input placeholder={modalData.Content} onChange={(e)=>{setContentUpdate(e.target.value)}} min={0} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </td>
                </tr>
              </table>
              <button onClick={() => { updateData(modalData.MaterialCode) }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">Update</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};
