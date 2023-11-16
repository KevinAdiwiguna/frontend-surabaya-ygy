import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useMe } from "../../../hooks/API/useMe";

const CashierReceipt = () => {
  const { fetchMe, response } = useMe();
  const currentDate = new Date().toISOString().slice(0, 16);
  const [docDate, setDocDate] = useState(currentDate);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [seriesVal, setSeriesVal] = useState()
  const [getMySeries, setGetSeries] = useState([])
  const [requestList, setRequestList] = useState()
  const [getMyRequestList, setGetRequestList] = useState([])
  const [info, setInfo] = useState()
  const [giroInfo, setGiroInfo] = useState()
  const [giroDetail, setGiroDetail] = useState([])
  const [giroNo, setGiroNo] = useState("")
  const [giroValue, setGiroValue] = useState(0)
  const [giroValueLocal, setGiroValueLocal] = useState(0)
  const [getMyCustomer, setGetCustomer] = useState([])
  const [getMyBank, setGetBank] = useState([])
  const [dueDate, setDueDate] = useState()
  const [exchangeRate, setExchangeRate] = useState(1)
  const [customer, setCustomer] = useState()
  const [bank, setBank] = useState()
  const [getMyTransactionType, setGetTransactionType] = useState([])
  const [getMyCurrency, setGetCurrency] = useState([])
  const [detail, setDetail] = useState([])
  const [type, setType] = useState("")
  const [detailValue, setDetailValue] = useState(0)
  const [detailExchangeRate, setDetailExchangeRate] = useState(1)
  const [detailValueLocal, setDetailValueLocal] = useState(0)
  const [detailCurrency, setDetailCurrency] = useState("")
  const [giroDetailCurrency, setGiroDetailCurrency] = useState("")
  const [totalValue, setTotalValue] = useState(0)
  const [giroTotalValue, setGiroTotalValue] = useState(0)
  const [Modal, setModal] = useState(false);

  const [AllDocNo, setAllDOcNo] = useState([]);

  const getAllDocNo = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/cashierreceipt`
    );
    setAllDOcNo(response.data);
  };

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
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/arrequestlistpu`);
      setGetRequestList(response.data);
      console.log(response.data)
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
    const giroLainCoy = { type, detailCurrency, detailExchangeRate, detailValue, detailValueLocal }

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
    const giroLainCoy = { customer, bank, giroNo, giroDetailCurrency, dueDate, giroValue, exchangeRate, giroValueLocal }

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
        transType: "",
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

  useEffect(() => {
    setGiroValueLocal(giroValue * exchangeRate)
  }, [giroValue, exchangeRate])

  useEffect(() => {
    setDetailValueLocal(detailValue * detailExchangeRate)
  }, [detailValue, detailExchangeRate])

  useEffect(() => {
    setTotalValue(
      giroTotalValue + (detail.reduce((total, item) => total + item.valueLocal, 0))
    )
  }, [detail, giroTotalValue])

  useEffect(() => {
    setGiroTotalValue(
      giroDetail.reduce((total, item) => total + item.giroValueLocal, 0)
    )
  }, [giroDetail])

  useEffect(() => {
    getSeries()
    getRequestList()
    getCustomer()
    getBank()
    getTransactionType()
    getCurrency()
    getAllDocNo()
  }, [])

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
                    required
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
                  <button
                    type="button"
                    onClick={() => setModal(!Modal)}
                    className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none mx-auto dark:focus:ring-yellow-800"
                  >
                    Update
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
                <select onChange={(e) => setType(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                  <select onChange={(e) => setDetailCurrency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                <input onChange={(e) => setDetailValue(e.target.value)} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" min="0" />
              </td>
              <td className="text-right">Exchange Rate:</td>
              <td>
                <input type="number" onChange={(e) => setDetailExchangeRate(e.target.value)} className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" min="0" />
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
                <input value={detailValueLocal} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" min="0" />
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
                <select onChange={(e) => setCustomer(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                <select onChange={(e) => setBank(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                <input type="text" onChange={(e) => setGiroNo(e.target.value)} className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" min="0" />
              </td>
              <td className="text-right">Currency:</td>
              <td>
                <select onChange={(e) => setGiroDetailCurrency(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                <input type="number" onChange={(e) => setGiroValue(e.target.value)} className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" min="0" />
              </td>
              <td className="text-right">Exchange Rate:</td>
              <td>
                <input type="number" onChange={(e) => setExchangeRate(e.target.value)} className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" min="0" />
              </td>
              <td className="text-right">Giro Value Local:</td>
              <td>
                <input disabled value={giroValueLocal} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" min="0" />
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
                <input type="text" onChange={(e) => setGiroInfo(e.target.value)} className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" min="0" />
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
                <input value={totalValue} disabled type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" min="0" />
              </td>
              <td className="text-right">Total Giro Value:</td>
              <td>
                <input value={giroTotalValue} disabled type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" min="0" />
              </td>
            </tr>
          </table>
        </div>
      </form>
      <ModalComp
        response={response}
        Modal={Modal}
        setModal={setModal}
        AllDocNo={AllDocNo}
        getTransType={getMyTransactionType}
        getCurrency={getMyCurrency}
        getCustomerCode={getMyCustomer}
        getBank={getMyBank}
        getSeries={getSeries}
        getAllDocNo={getAllDocNo}
      />
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default CashierReceipt;


export const ModalComp = (params) => {
  const {
    Modal,
    setModal,
    AllDocNo,
    getSeries,
    getTransType,
    getCurrency,
    getCustomerCode,
    getBank,
    getSalesOrderNo,
    getAllDocNo,
    response,
  } = params;
  const [DetailDocNo, setDetailDocNo] = useState([]);
  const [selectedHeader, setSelectedHeader] = useState(
    []
  );

  const [Information, setInformation] = useState("");
  const [DocNo, setDocNo] = useState("");
  const [ARBook, setARBook] = useState([]);
  const [detail, setDetail] = useState([])
  const [giroDetail, setGiroDetail] = useState([])

  const getDetailDocNo = async (params) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/cashierreceipt/${params}`
    );
    setDocNo(params);
    setSelectedHeader(response.data.h)
    // setDetail(response.data.d)
    setGiroDetail(response.data.g)
  };

  useEffect(() => {
    if (typeof DetailDocNo == "string") {
      getDetailDocNo(DetailDocNo);
    }
  }, [DetailDocNo]);

  const handleDelete = async (parmas) => {
    await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/goodsissue/${parmas}`
    );
    toast.success("Data Deleted", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
    });
    setModal(false);
    getSeries();
    getSalesOrderNo();
    setDetailDocNo([]);
    getAllDocNo();
  };

  const [giroTotalValue, setGiroTotalValue] = useState(0)
  const [totalValue, setTotalValue] = useState(0)

  useEffect(() => {
    setTotalValue(
      parseInt(giroTotalValue) + (detail.reduce((total, item) => total + parseInt(item.ValueLocal), 0))
    )
  }, [detail, giroTotalValue])

  useEffect(() => {
    setGiroTotalValue(
      giroDetail.reduce((total, item) => total + item.GiroValueLocal, "")
    )
  }, [giroDetail])

  const handleChangeDataAPIDetail = (key, field, value) => {
    setDetail((prevData) =>
      prevData.map((data, index) => {
        if (index === key) {
          let updatedData = {
            ...data,
            [field]: value,
          };
          // Calculate PaymentLocal when ExchangeRate or Payment changes
          if (field === "ExchangeRate" || field === "Value") {
            const exchangeRate = parseFloat(updatedData.ExchangeRate) || 1; // Use 1 as default if ExchangeRate is not a number
            const payment = parseFloat(updatedData.Value) || 0; // Use 0 as default if Payment is not a number
            updatedData.ValueLocal = (exchangeRate * payment).toFixed(2);
          }
          return updatedData;
        }
        return data;
      })
    );
  };

  const handleChangeDataAPI = (key, field, value) => {
    setGiroDetail((prevData) =>
      prevData.map((data, index) => {
        if (index === key) {
          let updatedData = {
            ...data,
            [field]: value,
          };
          // Calculate PaymentLocal when ExchangeRate or Payment changes
          if (field === "ExchangeRate" || field === "GiroValue") {
            const exchangeRate = parseFloat(updatedData.ExchangeRate) || 1; // Use 1 as default if ExchangeRate is not a number
            const payment = parseFloat(updatedData.GiroValue) || 0; // Use 0 as default if Payment is not a number
            updatedData.GiroValueLocal = (exchangeRate * payment).toFixed(2);
          }
          return updatedData;
        }
        return data;
      })
    );
  };

  const handleSave = async () => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/cashierreceipt/${DocNo}`,
        {
          totalDebit: totalValue,
          totalGiro: giroTotalValue,
          information: Information,
          status: "OPEN",
          changedBy: response?.User,
          cashierG: giroDetail,
          cashierD: detail,
        }
      );

      DetailDocNo?.goodsissued?.map(async (res, key) => {
        await axios.patch(
          `${process.env.REACT_APP_API_BASE_URL}/goodsissuedetail/${res.DocNo}/${res.Number}`,
          {
            batchNo: res.BatchNo,
            docNo: res.DocNo,
            information: res.Info,
            location: res.Location,
            materialCode: res.MaterialCode,
            number: res.Number,
            qty: res.Qty,
            qtyNetto: res.QtyNetto,
            qtyReturn: res.QtyReturn,
            unit: res.Unit,
          }
        );
      });
      setModal(false);
      setDetailDocNo([]);
      setInformation("")
      setARBook([])
      toast.success("Data Updated", {
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

  // update method - end

  const [printModal, setPrintModal] = useState(false);
  const [printed, setPrinted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    checkPrint();
  }, [printed]);

  const checkPrint = async () => {
    if (printed) {
      try {
        await axios.patch(
          `${process.env.REACT_APP_API_BASE_URL}/printRequestList/${selectedHeader?.DocNo}`,
          {
            printedBy: response?.User,
          }
        );
        setPrinted(false);
        toast.success("Data Printed!", {
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
    }
  };

  const handlePrint = () => {
    setShow(true);
    setTimeout(() => {
      window.print();
      setShow(false);
      setPrintModal(true);
    }, 5);
  };

  const handlePrintOption = (print) => {
    setPrinted(print);
    setPrintModal(false);
  };

  return (
    <div
      className={`bg-slate-50 fixed w-[90%] h-[90%] top-6 left-24 rounded-lg border border-black overflow-y-scroll p-5 ${Modal ? "block" : "hidden"
        }`}
    >
      {show ? (
        <div
          className={
            show
              ? `fixed w-screen h-screen bg-white z-50 top-0 left-0 text-black`
              : `hidden`
          }
        >
          <div>
            <div className="w-full pl-4 py-4 border-black border-b">
              <div>
                <div className="font-bold text-3xl">
                  CV. Gemilang Multi Kreasi
                </div>
                <div className="font-bold text-lg">
                  Jl. Berbek Industri 3 / 15 Sidoarjo
                </div>
                <div>
                  Telp. (031) 8494605
                </div>
              </div>
            </div>
            <div className="flex items-center flex-col font-bold">
              <div className="text-xl">
                Daftar Penagihan Piutang (DPP)
              </div>
              <div>
                Tipe: per Customer
              </div>
              <div className="font-normal">
                per {selectedHeader?.DocDate}
              </div>
            </div>
            <div className="ml-4 my-2">
              <table>
                <tr className="flex gap-20">
                  <td>No Dokumen: {selectedHeader?.DocNo}</td>
                  <td>Tgl Tagih: {selectedHeader?.DocDate}</td>
                  <td>Dokumen: {selectedHeader?.TotalDocument}</td>
                  <td>Total (RP): {selectedHeader.TotalValue}</td>
                </tr>
              </table>
              <div>
                Keterangan: {selectedHeader.Information}
              </div>
            </div>
            <div className="relative overflow-x-auto border-t border-black pt-6">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-center">
                      Tgl Dokumen
                    </th>
                    <th scope="col" className="px-14 py-3 text-center">
                      No Dokumen
                    </th>
                    <th scope="col" className="px-14 py-3 text-center">
                      TOP
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Jatuh Tempo
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Kurs
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Nilai Dokumen
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Pembayaran
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Sisa
                    </th>
                  </tr>
                </thead>
                {ARBook?.map((res, key) => {
                  return (
                    <tbody>
                      <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-2 text-center">
                          {res.DocDate}
                        </td>
                        <td className="px-6 py-2 text-center">
                          {res.DocNo}
                        </td>
                        <td className="px-6 py-2 text-center">{res.TOP}</td>
                        <td className="px-6 py-2 text-center">{res.DueDate}</td>
                        <td className="px-6 py-2 text-center">{res.Currency}</td>
                        <td className="px-6 py-2 text-center">{Math.floor(res.DocValueLocal)}</td>
                        <td className="px-6 py-2 text-center">{Math.floor(res.PaymentValueLocal)}</td>
                        <td className="px-6 py-2 text-center">{res.DocValueLocal - res.PaymentValueLocal}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
            <div className="flex justify-end mx-4 gap-10 border-t border-black border-dotted">
              <div className="px-6 py-2 ">
                Total Tagihan
              </div>
              <div className="px-6 py-2 text-right">
                {ARBook.reduce((total, res) => total + (parseInt(res.DocValueLocal) - res.PaymentValueLocal), 0)}
              </div>
            </div>
          </div>
          <div className="border-black border-t py-4 px-4">
            <div>
              Pembayaran harap di transfer ke:
            </div>
            <div>
              BCA no.822.089.4658
            </div>
            <div>
              an. Sugiharto Setyabudi
            </div>
          </div>
          <div className="flex pr-20 justify-end gap-[100px] ">
            <div className="p-2">
              <div>Penerima</div>
              <div className="h-[100px]"></div>
            </div>
            <div className="p-2">
              <div>Hormat Kami</div>
              <div className="h-[100px]"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {printModal ? (
            <div className="fixed w-screen h-screen bg-opacity-10 bg-black flex justify-center items-center z-50 m-auto top-0 left-0">
              <div className="bg-white p-4 rounded-lg border-black">
                <div className="text-xl mb-2 text-black">
                  Do you want to change the status to Printed?
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => handlePrintOption(true)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none mx-auto dark:focus:ring-blue-800"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePrintOption(false)}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none mx-auto dark:focus:ring-blue-800"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          <button
            onClick={() => {
              setModal(!Modal);
            }}
            className="absolute top-5 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="w-full">
            <table className="border-separate border-spacing-2">
              <tr className="w-full">
                <td className="text-right">DOC NO: </td>
                <td>
                  <select
                    onChange={async (e) => {
                      setDetailDocNo(e.target.value);
                    }}
                    value={DetailDocNo}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option>Pilih</option>
                    {AllDocNo.map((res, key) => {
                      return (
                        <option key={key} value={res.DocNo}>
                          {res.DocNo}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
            </table>
            <hr className="my-2" />
            <table className="border-separate border-spacing-2">
              <tr>
                <th className="text-right px-2">Information</th>
                <div className="my-1">
                  <input
                    onChange={(e) => setInformation(e.target.value)}
                    type="text"
                    value={Information}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={selectedHeader?.Information}
                  />
                </div>
              </tr>
              <tr>
                <th className="text-right px-2">Total Value</th>
                <div className="my-1">
                  <input
                    disabled
                    type="text"
                    value={Math.floor(totalValue)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={selectedHeader?.TotalDebet}
                  />
                </div>
              </tr>
              <tr>
                <th className="text-right px-2">Total Giro Value</th>
                <div className="my-1">
                  <input
                    disabled
                    type="text"
                    value={Math.floor(giroTotalValue)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={selectedHeader?.TotalGiro}
                  />
                </div>
              </tr>
            </table>
            <table className="text-sm text-gray-500 dark:text-gray-400">
              {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"> */}
              <div>
                <td className="flex gap-4">
                  <button
                    onClick={() => handleSave()}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
                  >
                    Update
                  </button>
                  <button
                    onClick={handlePrint}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none mx-auto dark:focus:ring-blue-800"
                  >
                    Print
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(DetailDocNo.goodsissueh.DocNo)
                    }
                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none  mx-auto dark:focus:ring-red-800"
                  >
                    Delete
                  </button>
                </td>
              </div>
              {/* </thead> */}
            </table>
            <div className="font-bold text-xl">
              Detail
            </div>
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
                      Valuelocal
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
                        <td className="px-6 py-4">
                          <select
                            onChange={(e) =>
                              handleChangeDataAPI(
                                key,
                                "TransType",
                                e.target.value
                              )
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={res.TransType}

                          >
                            {getTransType.map((res, key) => {
                              return (
                                <option key={key} value={res.Type}>
                                  {res.Type}
                                </option>
                              );
                            })}
                          </select>
                        </td>
                        <td cxlassName="px-6 py-4">{res.Currency}</td>
                        <td className="px-6 py-4">
                          <input type="text" onChange={(e) => {
                            handleChangeDataAPIDetail(key, "Value", e.target.value);
                          }}
                            className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={res.Value} />
                        </td>
                        <td className="px-6 py-4">
                          <input type="text" onChange={(e) => {
                            handleChangeDataAPIDetail(key, "ExchangeRate", e.target.value);
                          }}
                            className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={res.ExchangeRate} />
                        </td>
                        <td className="px-6 py-4">{res.ValueLocal}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="font-bold text-xl">
              Giro Detail
            </div>
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
                      GiroValue
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ExchangeRate
                    </th>
                    <th scope="col" className="px-6 py-3">
                      GiroValueLocal
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
                        <td className="px-6 py-4">
                          <select
                            onChange={(e) =>
                              handleChangeDataAPI(
                                key,
                                "CustomerCode",
                                e.target.value
                              )
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={res.CustomerCode}

                          >
                            {getCustomerCode.map((res, key) => {
                              return (
                                <option key={key} value={res.Code}>
                                  {res.Code}
                                </option>
                              );
                            })}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            onChange={(e) =>
                              handleChangeDataAPI(
                                key,
                                "Bank",
                                e.target.value
                              )
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={res.Bank}

                          >
                            {getBank.map((res, key) => {
                              return (
                                <option key={key} value={res.Code}>
                                  {res.Code}
                                </option>
                              );
                            })}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <input type="text" onChange={(e) => {
                            handleChangeDataAPI(key, "GiroNo", e.target.value);
                          }}
                            className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={res.GiroNo} />
                        </td>
                        <td className="px-6 py-4">{res.DueDate}</td>
                        <td className="px-6 py-4">
                          <select
                            onChange={(e) =>
                              handleChangeDataAPI(
                                key,
                                "Currency",
                                e.target.value
                              )
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={res.Currency}

                          >
                            {getCurrency.map((res, key) => {
                              return (
                                <option key={key} value={res.Code}>
                                  {res.Code}
                                </option>
                              );
                            })}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <input type="number" onChange={(e) => {
                            handleChangeDataAPI(key, "GiroValue", e.target.value);
                          }}
                            className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={Math.floor(res.GiroValue)} />
                        </td>
                        <td className="px-6 py-4">
                          <input type="number" onChange={(e) => {
                            handleChangeDataAPI(key, "ExchangeRate", e.target.value);
                          }}
                            className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={Math.floor(res.ExchangeRate)} />
                        </td>
                        <td className="px-6 py-4">{Math.floor(res.GiroValueLocal)}</td>
                        <td className="px-6 py-4">
                          <input type="text" onChange={(e) => {
                            handleChangeDataAPI(key, "Infomation", e.target.value);
                          }}
                            className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={res.Information} />
                        </td>
                        <td className="px-6 py-4">{res.Status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

