import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useMe } from "../../../hooks/API/useMe";

const CashierReceipt = () => {
  const { fetchMe, response } = useMe();
  const currentDate = new Date().toISOString().slice(0, 16);
  const [docDate, setDocDate] = useState(currentDate);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [ seriesVal, setSeriesVal ] = useState()
  const [getMySeries, setGetSeries] = useState([])
  const [requestList, setRequestList] = useState()
  const [getMyRequestList,setGetRequestList] = useState([])
  const [info,setInfo] = useState()
  const [giroInfo,setGiroInfo] = useState()
  const [giroDetail, setGiroDetail] = useState([])
  const [giroNo, setGiroNo] = useState("")
  const [giroValue, setGiroValue] = useState(0)
  const [giroValueLocal, setGiroValueLocal] = useState(0)
  const [getMyCustomer,setGetCustomer] = useState([])
  const [getMyBank, setGetBank] = useState([])
  const [dueDate, setDueDate] = useState()
  const [exchangeRate, setExchangeRate] = useState(1)
  const [customer, setCustomer] = useState()
  const [bank, setBank] = useState()
  const [getMyTransactionType, setGetTransactionType] = useState([])
  const [getMyCurrency, setGetCurrency] = useState([])
  const [detail,setDetail] = useState([])
  const [type, setType] = useState("")
  const [detailValue, setDetailValue] = useState(0)
  const [detailExchangeRate, setDetailExchangeRate] = useState(1)
  const [detailValueLocal, setDetailValueLocal] = useState(0)
  const [detailCurrency, setDetailCurrency] = useState("")
  const [giroDetailCurrency, setGiroDetailCurrency] = useState("")
  const [totalValue, setTotalValue] = useState(0)
  const [giroTotalValue, setGiroTotalValue] = useState(0)

	const handleDocDateChange = (e) => {
    const selectedDocDate = e.target.value;
    setDocDate(selectedDocDate);

    setDeliveryDate("");
  };

  const getCurrency = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/currency`)
      setGetCurrency(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getTransactionType = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/transactiontype/CASHIER`)
      setGetTransactionType(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getRequestList = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/arrequestlistp`);
      setGetRequestList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBank = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/masterbank`)
      setGetBank(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getCustomer = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/customer`)
      setGetCustomer(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getSeries = async () => {
    try {      
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/seriescode/CASHIER RECEIPT`);
      setGetSeries(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMe();
  }, [!response]);

  const submitClick = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/CashierReceipt`, {
        generateDocDate: generateDocDate(),
        series: seriesVal,
        docDate: docDate,
        arReqListNo: requestList,
        totalDebet: totalValue,
        totalCredit: 0,
        totalGiro: giroTotalValue,
        information: info,
        status: "OPEN",
        printCounter: 0,
        printedBy: "",
        printedDate: null,
        createdBy: response.User,
        changedBy: response.User,
        cashierReceiptGArray: giroDetail,
        cashierReceiptDArray: detail,
      })
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

  const handleDetail = () => {
    const giroLainCoy = {type,detailCurrency,detailExchangeRate,detailValue,detailValueLocal}
    
    for (let key in giroLainCoy) {
      if (!giroLainCoy[key]) {
        toast.warn(key + " pada Detail tidak boleh kosong", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
        return;
      }
    }
    setDetail([
      ...detail, {
        transType: type,
        currency: detailCurrency,
        exchangeRate: detailExchangeRate,
        value: detailValue,
        valueLocal: detailValueLocal,
        info: "",
        dc: "D"
      }
    ])
  }

  const handleGiroDetail = () => {
    const giroLainCoy = {customer,bank,giroNo,giroDetailCurrency,dueDate,giroValue,exchangeRate,giroValueLocal}
    
    for (let key in giroLainCoy) {
      if (!giroLainCoy[key]) {
        toast.warn(key + " pada Giro Detail tidak boleh kosong", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
        return;
      }
    }

    setGiroDetail([
      ...giroDetail, {
        customerCode: customer,
        bank: bank,
        giroNo: giroNo,
        currency: giroDetailCurrency,
        dueDate: dueDate,
        giroValue: giroValue,
        exchangeRate: exchangeRate,
        clearExchangeRate: 0,
        giroValueLocal: giroValueLocal,
        information: giroInfo,
        status: 'OPEN'
      }
    ])
  }

  const generateDocDate = () => {
    const today = new Date(docDate);
    const year = today.getFullYear().toString().substring(2);
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return year + month + day;
  };

  useEffect(()=>{
    setGiroValueLocal(giroValue * exchangeRate)
  },[giroValue, exchangeRate])

  useEffect(()=>{
    setDetailValueLocal(detailValue * detailExchangeRate)
  },[detailValue, detailExchangeRate])

  useEffect(()=>{
    setTotalValue(
      giroTotalValue + (detail.reduce((total,item) => total + item.valueLocal, 0))
    )
  },[detail,giroTotalValue])

  useEffect(()=>{
    setGiroTotalValue(
      giroDetail.reduce((total,item) => total + item.giroValueLocal, 0)
    )
  },[giroDetail])

  useEffect(()=>{
    getSeries()
    getRequestList()
    getCustomer()
    getBank()
    getTransactionType()
    getCurrency()
  },[])

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl font-bold mb-4">Cashier Receipt</div>
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
              <tr>
                <td className="text-right"></td>
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
          </div>
          <table className="border-separate border-spacing-2 ">
            <tr>
                <td className="text-xl font-bold">
                  Detail
                </td>
              </tr>
              <tr>
                <td className="text-right">Transaction Type:</td>
                <td>
                  <select onChange={(e)=> setType(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option disabled selected hidden>
                      Pilih Type
                    </option>
                    {getMyTransactionType.map((res, key) => {
                      return (
                        <option key={key} value={res.Type}>
                          {res.Type}
                        </option>
                      );
                    })}
                  </select>
                </td>
                <td className="text-right">Currency:</td>
                <td>
                <td>
                  <select onChange={(e)=> setDetailCurrency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option disabled selected hidden>
                      Pilih Currency
                    </option>
                    {getMyCurrency.map((res, key) => {
                      return (
                        <option key={key} value={res.Code}>
                          {res.Code}
                        </option>
                      );
                    })}
                  </select>
                </td>
                </td>
                <td className="text-right">Value:</td>
                <td>
                  <input onChange={(e)=> setDetailValue(e.target.value)} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min="0" />
                </td>
                <td className="text-right">Exchange Rate:</td>
                <td>
                  <input type="number" onChange={(e)=> setDetailExchangeRate(e.target.value)} className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min="0" />
                </td>
                <td>
                <button
                  onClick={() => {
                    handleDetail()
                  }}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
                >
                  Add
                </button>
                </td>
              </tr>
              <tr>
              <td className="text-right">Value Local:</td>
                <td>
                  <input value={detailValueLocal} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min="0" />
                </td>
              </tr>
            </table>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    TransType
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Currency
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Value
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ExchangeRate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Value Local
                  </th>
                </tr>
              </thead>
              <tbody>
                {detail.map((res, key) => {
                  return (
                    <tr
                      key={key}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{res.transType}</td>
                      <td className="px-6 py-4">{res.currency}</td>
                      <td className="px-6 py-4">{res.value}</td>
                      <td className="px-6 py-4">{res.exchangeRate}</td>
                      <td className="px-6 py-4">{res.valueLocal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <table className="border-separate border-spacing-2 ">
            <tr>
                <td className="text-xl font-bold">
                  Giro
                </td>
              </tr>
              <tr>
                <td className="text-right">Customer:</td>
                <td>
                  <select onChange={(e)=>setCustomer(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option disabled selected hidden>
                      Pilih Customer
                    </option>
                    {getMyCustomer.map((res, key) => {
                      return (
                        <option key={key} value={res.Code}>
                          {res.Code}
                        </option>
                      );
                    })}
                  </select>
                </td>
                <td className="text-right">Bank:</td>
                <td>
                <select onChange={(e)=> setBank(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option disabled selected hidden>
                      Pilih Bank
                    </option>
                    {getMyBank.map((res, key) => {
                      return (
                        <option key={key} value={res.Code}>
                          {res.Code}
                        </option>
                      );
                    })}
                  </select>
                </td>
                <td className="text-right">Giro No:</td>
                <td>
                  <input type="text" onChange={(e)=> setGiroNo(e.target.value)} className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min="0" />
                </td>
                <td className="text-right">Currency:</td>
                <td>
                <select onChange={(e)=> setGiroDetailCurrency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option disabled selected hidden>
                      Pilih Currency
                    </option>
                    {getMyCurrency.map((res, key) => {
                      return (
                        <option key={key} value={res.Code}>
                          {res.Code}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
              <tr>
              <td className="text-right">Due Date:</td>
                <td>
                <input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  onChange={(e) => setDueDate(e.target.value)}
                />
                </td>
                <td className="text-right">Giro Value:</td>
                <td>
                  <input type="number" onChange={(e)=> setGiroValue(e.target.value)} className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min="0" />
                </td>
                <td className="text-right">Exchange Rate:</td>
                <td>
                  <input type="number" onChange={(e)=> setExchangeRate(e.target.value)} className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min="0" />
                </td>
                <td className="text-right">Giro Value Local:</td>
                <td>
                  <input disabled value={giroValueLocal} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min="0" />
                </td>
                <button
                  onClick={() => {
                    handleGiroDetail()
                  }}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
                >
                  Add
                </button>
              </tr>
              <tr>
              <td className="text-right">Information:</td>
                <td>
                  <input type="text" onChange={(e)=> setGiroInfo(e.target.value)} className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min="0" />
                </td>
              </tr>
            </table>
          <div className="text-xl font-bold mb-4">Giro Detail</div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    CustomerCode
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bank
                  </th>
                  <th scope="col" className="px-6 py-3">
                    GiroNo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DueDate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Currency
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Giro Value
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ExchangeRate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Giro Value Local
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Information
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {giroDetail.map((res, key) => {
                  return (
                    <tr
                      key={key}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{res.customerCode}</td>
                      <td className="px-6 py-4">{res.bank}</td>
                      <td className="px-6 py-4">{res.giroNo}</td>
                      <td className="px-6 py-4">{res.dueDate}</td>
                      <td className="px-6 py-4">{res.currency}</td>
                      <td className="px-6 py-4">{res.giroValue}</td>
                      <td className="px-6 py-4">{res.exchangeRate}</td>
                      <td className="px-6 py-4">{res.giroValueLocal}</td>
                      <td className="px-6 py-4">{res.information}</td>
                      <td className="px-6 py-4">{res.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
            <table>
              <tr>
              <td className="text-right">Total Value:</td>
                <td>
                  <input value={totalValue} disabled type="number"  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min="0" />
                </td>
              <td className="text-right">Total Giro Value:</td>
                <td>
                  <input value={giroTotalValue} disabled type="number"  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min="0" />
                </td>
              </tr>
            </table>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default CashierReceipt;
