import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMe } from "../../../hooks/API/useMe";
import { dateConverter } from "../../../components/dateConverter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const { fetchMe , response } = useMe()

  const [getData, setGetData] = useState([])
  const [type, setType] = useState()
  const [name, setName] = useState()
  const [level, setLevel] = useState()
  const [accountGroup, setAccountGroup] = useState()
  const [journal, setJournal] = useState(false)
  const [department, setDepartment] = useState(false)
  const [getMyCurrency, setGetMyCurrency] = useState([])
  const [currency, setCurrency] = useState([])
  const [parentNo, setParentNo] = useState("")
  const accountGroupVal = ['AKTIVA LANCAR','AKTIVA TIDAK LANCAR','AKTIVA TETAP','AKTIVA LAIN-LAIN','KEWAJIBAN LANCAR','KEWAJIBAN JANGKA PANJANG','MODAL & RUGI/LABA','PENJUALAN','HARGA POKOK JUALAN', 'BIAYA PRODUKSI', 'BIAYA PENJUALAN', 'BIAYA UMUM & ADMINISTRASI LAIN', 'PENDAPATAN & BEBAN LAIN']
  
  const getCurrency = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/currency`)
    setGetMyCurrency(response.data)
  }

  const dataFetching = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/account`
      );
      setGetData(res.data);
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
    e.preventDefault()
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/account`, {
        accountNo: type,
        name: name,
        level: level,
        accountGroup: accountGroup,
        parentNo: parentNo,
        isJournal: journal,
        department: department,
        currency: currency,
        createdBy: response.User,
        changedBy: response.User,
      })
      dataFetching()
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

  useEffect(()=>{
    fetchMe()
  },[!response])

  useEffect(()=>{
    dataFetching()
    getCurrency()
  },[])

  return (
    <div>
      <div className="text-2xl font-bold mb-4">Account</div>
      <form onSubmit={submitClick}>
        <table className="border-separate border-spacing-2 w-1/2">
          <tr>
            <td className="text-right">Account No: </td>
            <td>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                onChange={(e) => setType(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Name: </td>
            <td>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
                onChange={(e)=> setName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Level: </td>
            <td>
              <input
                type="number"
                className="bg-gray-50 border border-gray-300 w-[30%] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                onChange={(e)=> setLevel(e.target.value)}
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Account Group: </td>
            <td>
              <select onChange={(e)=> setAccountGroup(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected hidden>Pilih Group</option>
                {accountGroupVal.map((data)=> {
                  return (
                    <option value={data}>{data}</option>
                  )
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-right">Parent No: </td>
            <td>
              <select onChange={(e)=> setParentNo(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected hidden>Pilih Parent</option>
                {getData.map((data)=>{
                  return (
                    <option value={data.AccountNo}>{data.AccountNo}</option>
                  )
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-right">Journal</td>
            <td>
              <input
                onChange={(e)=> setJournal(e.target.value)}
                type="checkbox"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Deparment: </td>
            <td>
              <input
                onChange={(e)=>setDepartment(e.target.value)}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Currency: </td>
            <td>
              <select onChange={(e)=> setCurrency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected hidden>Pilih Currency</option>
                {getMyCurrency.map((data)=>{
                  return (
                    <option value={data.Code}>{data.Code}</option>
                  )
                })}
              </select>
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
                Account No
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Level
              </th>
              <th scope="col" className="px-6 py-3">
                Account Group
              </th>
              <th scope="col" className="px-6 py-3">
                Parent No
              </th>
              <th scope="col" className="px-6 py-3">
                Journal
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Currency
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
            </tr>
          </thead>
          <tbody>
            {getData.map((res,key)=>{
              return (
                <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {res.AccountNo}
                </th>
                <td className="px-6 py-4">{res.Name}</td>
                <td className="px-6 py-4">{res.Level}</td>
                <td className="px-6 py-4">{res.AccountGroup}</td>
                <td className="px-6 py-4">{res.ParentNo}</td>
                <td className="px-6 py-4">{res.IsJournal === false ? 'false' : 'true'}</td>
                <td className="px-6 py-4">{res.Department}</td>
                <td className="px-6 py-4">{res.Currency}</td>
                <td className="px-6 py-4">{res.CreatedBy}</td>
                <td className="px-6 py-4">{dateConverter(res.CreatedDate)}</td>
                <td className="px-6 py-4">{res.ChangedBy}</td>
                <td className="px-6 py-4">{dateConverter(res.ChangedDate)}</td>
              </tr>
            )})}
          </tbody>
        </table>
        <div></div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Account;
