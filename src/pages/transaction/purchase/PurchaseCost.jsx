import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMe } from "../../../hooks/API/useMe";
import { dateConverter } from "../../../components/dateConverter";
import { toast, ToastContainer } from "react-toastify";

export const PurchaseCost = () => {
  const { fetchMe, response } = useMe();
  const [getMySupplier, setGetMySupplier] = useState([]);
  const [getMyTransacationType, setGetMyTransactionType] = useState([]);
  const [getMySeries, setGetMySeries] = useState([]);
  const [getMyCost, setGetMyCost] = useState(0);
  const [getMyPCDetail, setGetMyPCDetail] = useState([]);
  const [getMyDescription, setGetMyDescription] = useState("");
  const currentDate = new Date().toISOString().slice(0, 16);
  const [docDate, setDocDate] = useState(currentDate);
  const [supplierTaxToVal, setSupplierTaxToVal] = useState("")
  const [supplierInvoiceNo, setSupplierInvoiceNo] = useState('')
  const [top, setTop] = useState('')
  const [series, setSeries] = useState('')
  const [exchangeRate, setExchangeRate] = useState(1)
  const [taxNo, setTaxNo] = useState("")
  const [taxNo2, setTaxNo2] = useState("")
  const [tax, setTax] = useState("No")
  const [transactionType,setTransactionType] = useState('')
  const [taxPercent,setTaxPercent] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [totalNetto, setTotalNetto] = useState(0)
  const [taxValue, setTaxValue] = useState(0)
  const [taxValueIDR, setTaxValueIDR] = useState(0)

  const [information, setInformation] = useState("");
  const [detailDataUpdate, setDetailDataUpdate] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [modal, setModal] = useState(false);

  const getSupplier = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/supplier`);
      setGetMySupplier(data.data);
    } catch (error) {}
  };

  const closeModal = () => {
    setModal(false);
    setDetailDataUpdate([]);
  };

  const generateDocDate = () => {
    const today = new Date(docDate);
    const year = today.getFullYear().toString().substring(2);
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return year + month + day;
  };

  const addPCDetail = () => {
    if (!getMyCost) {
      toast.warn("Cost is required", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    setTotalCost(Number(totalCost) + Number(getMyCost))

    setGetMyPCDetail([
      ...getMyPCDetail,
      {
        description: getMyDescription,
        cost: getMyCost,
      },
    ]);

    console.log(totalCost)
  };

  const calculateTax = (e) => {
    if (tax === "No") {
      return 0;
    }
    let total = (e * taxPercent) / 100;
    return total;
  };

  const calculateTotalNetto = () => {
    let total = totalCost
    let taks = calculateTax(total);
    if (tax === "Exclude") {
      total = total + taks;
    }
    setTaxValue(taks)
    setTotalNetto(total);
  };

  useEffect(() => {
    calculateTotalNetto();
  }, [taxPercent, tax, totalCost]);

  useEffect(()=>{
    setTaxValueIDR(taxValue * exchangeRate)
  },[taxValue])

  const submitClick = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/purchasecosth`, {
        generateDocDate: generateDocDate(),
        series,
        docDate,
        transactionType: transactionType,
        supplierCode: supplierVal,
        supplierTaxTo: supplierTaxToVal,
        supplierInvNo: supplierInvoiceNo,
        TOP: top,
        taxStatus: tax,
        taxPercent: taxPercent,
        taxPrefix: taxNo,
        taxNo: taxNo2,
        currency: getFCurrency.Currency,
        exchangeRate: exchangeRate,
        totalCost: totalCost,
        taxValue: taxValue,
        taxValueInTaxCur: taxValueIDR,
        totalNetto: totalNetto,
        information: information,
        invoiceDocNo: "",
        status: "OPEN",
        createdBy: response?.User,
        changedBy: response?.User,
        PurchaseCostd: getMyPCDetail
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
  }

  useEffect(()=>{
    fetchMe()
  },[!response])

  const [getFCurrency, setGetFCurrency] = useState([]);

  const [supplierVal, setSupplierVal] = useState("");

  const getCurrencyBySupplier = async (params) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/supplier/${params}`);
      setGetFCurrency(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSeries = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/seriesCode/PURCHASE COST`);
      setGetMySeries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactionType = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/transactiontype/PURCHASE COST`);
      setGetMyTransactionType(data.data);
    } catch (error) {}
  };

  const [disabled, setDisabled] = useState(false);

  const checkExchangeRate = () => {
    if (getFCurrency.Currency === "IDR") {
      setDisabled(true);
      setExchangeRate(1.0);
    } else {
      setDisabled(false);
    }
  };

  useEffect(() => {
    checkExchangeRate();
  }, [getFCurrency.Currency]);


  useEffect(() => {
    getSupplier();
    getTransactionType();
    getSeries();
  }, []);

  useEffect(() => {
    getCurrencyBySupplier(supplierVal);
  }, [supplierVal]);

  return (
    <div>
      <div className="text-2xl font-bold mb-4">Purchase Cost</div>
      <div className="w-full">
        <div className="flex justify-start items-center">
          <table className="border-separate border-spacing-2 ">
            <tr>
              <td className="text-right">Series: </td>
              <td>
                <select onChange={(e)=> setSeries(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected hidden>
                    Pilih series
                  </option>
                  {getMySeries.map((res, key) => {
                    return (
                      <option key={key} value={res.Series}>
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
                <input onChange={(e) => setDocDate(e.target.value)} min={currentDate} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required value={docDate} />
              </td>
            </tr>
            <tr>
              <td className="text-right">Transaction Type: </td>
              <td>
                <select onChange={(e)=> {setTransactionType(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected hidden>
                    Pilih tipe transaksi
                  </option>
                  {getMyTransacationType.map((res, key) => {
                    return (
                      <option key={key} value={res.Type}>
                        {res.Type}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">Supplier: </td>
              <td>
                <select onChange={(e) => setSupplierVal(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected hidden>
                    Pilih supplier
                  </option>
                  {getMySupplier.map((res, key) => {
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
              <td className="text-right">Supplier Tax To: </td>
              <td>
                <select onChange={(e) => setSupplierTaxToVal(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected hidden>
                    Pilih supplier tax
                  </option>
                  {getMySupplier.map((res, key) => {
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
              <td className="text-right">Supplier Invoice No: </td>
              <td>
                <input onChange={(e)=> setSupplierInvoiceNo(e.target.value)} type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
              </td>
              <td> </td>
              <td className="text-right">Term of Payment: </td>
              <td>
                <input onChange={(e)=> setTop(e.target.value)} dir="rtl" type="number" className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
              </td>
              <td>days</td>
            </tr>
            <tr>
              <td className="text-right">Currency: </td>
              <td>
                <select disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option>{getFCurrency.Currency}</option>
                </select>
              </td>
              <td> </td>
              <td className="text-right">Exchange Rate: </td>
              <td>
                <input onChange={(e) => {setExchangeRate(e.target.value);}} disabled={disabled} dir="rtl" type="number" className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1.00" required />
              </td>
            </tr>
            <tr>
              <td>
                <select onChange={(e)=> {setTax(e.target.value)}} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected value="No">
                    No
                  </option>
                  <option value="Include">Include</option>
                  <option value="Exclude">Exclude</option>
                </select>
              </td>
              <td>
                <input onChange={(e)=> {setTaxPercent(e.target.value)}} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10.00" required min="0" />
              </td>
              <td>% Tax</td>
              <td className="text-right">Tax No: </td>
              <input onChange={(e)=> {setTaxNo(e.target.value)}} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
              <td>
                <input onChange={(e)=> {setTaxNo2(e.target.value)}} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
              </td>
            </tr>
          </table>
        </div>

        <div className="flex gap-3 justify-center items-center mx-auto my-10">
          <label>Information:</label>
          <input onChange={(e)=> {setInformation(e.target.value)}} type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>

        <div className="flex justify-between items-start">
          <table className="border-separate border-spacing-2 ">
            <tr>
              <td className="text-right">Description:</td>
              <td>
                <input onChange={(e) => setGetMyDescription(e.target.value)} type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
              </td>
              <td className="text-right pl-20">Cost:</td>
              <td>
                <input onChange={(e) => {setGetMyCost(e.target.value)}} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required min="0" />
              </td>
              <td>
                <button
                  onClick={() => {
                    addPCDetail();
                  }}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800 ml-20"
                >
                  Add
                </button>
              </td>
              <td>
                <button onClick={() => {submitClick()}} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">
                  Save
                </button>
              </td>
            </tr>
            <tr>
            <td className="text-right pl-20">Total Cost:</td>
              <td>
                <input value={totalCost} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
              </td>
            <td className="text-right pl-20">Tax Value:</td>
              <td>
                <input value={taxValue} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
              </td>
            <td className="text-right pl-20">Tax Value {getFCurrency.Currency}:</td>
              <td>
                <input value={taxValueIDR} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
              </td>
            <td className="text-right pl-20">Total Netto:</td>
              <td>
                <input value={totalNetto} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
              </td>
            </tr>
          </table>
        </div>

        <div className="text-xl font-bold mb-4 pt-10">Detail</div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {getMyPCDetail.map((res, key) => {
                return (
                  <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{res.description}</td>
                    <td className="px-6 py-4">{res.cost}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};
