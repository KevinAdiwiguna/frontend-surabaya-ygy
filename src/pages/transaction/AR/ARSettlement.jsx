import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useMe } from "../../../hooks/API/useMe";
import CustomerPayment from "./CustomerPayment";
import CashierReceipt from "../KBM/CashierReceipt";

const ARSettlement = () => {
  const { fetchMe, response } = useMe();
  const currentDate = new Date().toISOString().slice(0, 16);
  const [seriesVal, setSeriesVal] = useState("");
  const [getMySeries, setGetSeries] = useState([]);
  const [docDate, setDocDate] = useState();
  const [requestList, setRequestList] = useState("");
  const [getMyRequestList, setGetRequestList] = useState([]);
  const [info, setInfo] = useState("");
  const [getMyCustomerPayment, setGetCustomerPayment] = useState({});
  const [getCashierReceipt, setGetCashierReceipt] = useState({});
  const [difference, setDifference] = useState(0);

  useEffect(() => {
    fetchMe();
  }, [!response]);

  const getSeries = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/seriescode/CUSTOMER PAYMENT`
      );
      setGetSeries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRequestList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/arrequestlistu`
      );
      setGetRequestList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getARDetail = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/arsettlement/${requestList}`
      );
      setGetCashierReceipt(response?.data?.banding);
      setGetCustomerPayment(response?.data?.settle);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDifference(
      getMyCustomerPayment?.TotalPayment - getCashierReceipt?.TotalDebet
    );
  }, [getMyCustomerPayment?.TotalPayment, getCashierReceipt?.TotalDebet]);

  useEffect(() => {
    getARDetail();
  }, [requestList]);

  const handleDocDateChange = (e) => {
    const selectedDocDate = e.target.value;
    setDocDate(selectedDocDate);
  };

  const generateDocDate = () => {
    const today = new Date(docDate);
    const year = today.getFullYear().toString().substring(2);
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return year + month + day;
  };

  const submitClick = async (e) => {
    e.preventDefault();
    if (difference !== 0) {
      return toast.error(
        "Masih ada difference.",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        }
      );
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/arsettlement`, {
        series: seriesVal,
        docDate: docDate,
        arReqListNo: requestList,
        totalValue: getCashierReceipt?.TotalDebet,
        information: info,
        status: "OPEN",
        createdBy: response?.User,
        changedBy: response?.User,
        generateDocDate: generateDocDate(),
      });
      toast.success("Data Created", {
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
    getRequestList();
    getSeries();
  }, []);

  console.log(getCashierReceipt);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl font-bold mb-4">AR Settlement</div>
      </div>
      <form onSubmit={submitClick}>
        <div className="w-full">
          <div className="flex justify-start items-start flex-col">
            <table className="border-separate border-spacing-2 ">
              <tr>
                <td className="text-right">Series: </td>
                <td>
                  <select
                    onChange={(e) => setSeriesVal(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected hidden>
                      Pilih series
                    </option>
                    {getMySeries.map((res, key) => {
                      return (
                        <option value={res.Series} key={key}>
                          {res.Series}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="text-right">Doc Date: </td>
                <td>
                  <input
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                    min={currentDate}
                    value={docDate}
                    onChange={handleDocDateChange}
                  />
                </td>
              </tr>

              <tr>
                <td className="text-right">Request List: </td>
                <td>
                  <select
                    required
                    onChange={(e) => setRequestList(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected hidden>
                      Pilih Request List
                    </option>
                    {getMyRequestList.map((res, key) => {
                      return (
                        <option value={res.DocNo} key={key}>
                          {res.DocNo}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="text-right">Information:</td>
                <td>
                  <input
                    onChange={(e) => {
                      setInfo(e.target.value);
                    }}
                    type="text"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                  />
                </td>
              </tr>
            </table>
          </div>
          <div className="flex gap-5 overflow-x-auto">
            <table className="w-[50%] text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    DocNo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Series
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Payment
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{getMyCustomerPayment?.DocNo}</td>
                  <td className="px-6 py-4">{getMyCustomerPayment?.Series}</td>
                  <td className="px-6 py-4">{getMyCustomerPayment?.Status}</td>
                  <td className="px-6 py-4">
                    {getMyCustomerPayment?.TotalPayment}
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="w-[50%] text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    DocNo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Series
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Debet
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{getCashierReceipt?.DocNo}</td>
                  <td className="px-6 py-4">{getCashierReceipt?.Series}</td>
                  <td className="px-6 py-4">{getCashierReceipt?.Status}</td>
                  <td className="px-6 py-4">{getCashierReceipt?.TotalDebet}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <table>
            <tr>
              <td>Total Customer Payment</td>
              <td>
                <input
                  type="number"
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={getMyCustomerPayment?.TotalPayment}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td>Total Cashier Receipt</td>
              <td>
                <input
                  type="number"
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={getCashierReceipt?.TotalDebet}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td>Difference</td>
              <td>
                <input
                  type="number"
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={difference}
                  disabled
                />
              </td>
            </tr>
          </table>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ARSettlement;
