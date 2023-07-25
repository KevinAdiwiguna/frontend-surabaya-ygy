import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMe } from "../../../hooks/API/useMe";
import { toast } from "react-toastify";
import { dateConverter } from "../../../components/dateConverter";

export const PurchaseOrder = () => {
  const { fetchMe, response } = useMe();
  const currentDate = new Date().toISOString().slice(0, 16);
  const [docDate, setDocDate] = useState(currentDate);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [getMySeries, setGetSeries] = useState([]);
  const [getMyCustomer, setGetMyCustomer] = useState([]);
  const [getMySelesman, setGetMySelesman] = useState([]);
  const [getMyCurrency, setGetMyCurrency] = useState([]);
  const [getMyMaterial, setGetMyMaterial] = useState([]);
  const [getMyMaterialDetail, setGetMyMaterialDetail] = useState([]);
  const [data, setData] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountOutput, setDiscountOutput] = useState();
  const [tax, setTax] = useState();
  const [taxVal, setTaxVal] = useState(0);
  const [taxOutput, setTaxOutput] = useState(0);
  const [gross, setGross] = useState(0);
  const [Netto, setNetto] = useState(0);
  const [getData, setGetData] = useState([]);
  const [poNo, setPoNo] = useState("");
  const [top, setTop] = useState("");
  const [shipToVal, setShipToVal] = useState("");
  const [taxToVal, setTaxToVal] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [info, setInfo] = useState("");

  const [seriesVal, setSeriesVal] = useState("");
  const [customerVal, setCustomerVal] = useState("");
  const [salesmanVal, setSalesmanVal] = useState("");
  const [currencyVal, setCurrencyVal] = useState("");
  const [materialVal, setMaterialVal] = useState("");

  const handleDocDateChange = (e) => {
    const selectedDocDate = e.target.value;
    setDocDate(selectedDocDate);

    setDeliveryDate("");
  };

  const getSeries = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/series`
      );
      setGetSeries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomer = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/customer`
      );
      setGetMyCustomer(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSelesman = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/salesman`
      );
      setGetMySelesman(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrency = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/currency`
      );
      setGetMyCurrency(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaterial = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/material`
      );
      setGetMyMaterial(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaterialDetail = async (params) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/material/${params}`
      );
      setGetMyMaterialDetail(response.data);
      setPrice(response.data?.DefaultPrice);
    } catch (error) {
      console.log(error);
    }
  };

  const [getFCurrency, setGetFCurrency] = useState([]);

  const getCurrencyByCustomer = async (params) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/customer/${params}`
      );
      setGetFCurrency(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrencyByCustomer(customerVal);
  }, [customerVal]);

  const calculateTotalGross = () => {
    return quantity * price;
  };

  const calculateDiscount = () => {
    let total = (quantity * price * discount) / 100;
    return total;
  };

  const calculateTax = (e) => {
    let total = (e * taxVal) / 100;
    return total;
  };

  const calculateTotalNetto = () => {
    let total = quantity * price - calculateDiscount();
    if (tax === "Exclude") {
      total = total + (total * taxVal) / 100;
    }
    return total;
  };

  const totalHandle = () => {
    const totalGross = calculateTotalGross();
    const totalNetto = calculateTotalNetto();
    const discount = calculateDiscount();
    const tax = calculateTax(totalNetto);
    setTaxOutput(tax);
    setDiscountOutput(discount);
    setGross(totalGross);
    setNetto(totalNetto);
  };

  useEffect(() => {
    getMaterialDetail(materialVal);
  }, [materialVal]);

  useEffect(() => {
    getSeries();
    getCustomer();
    getSelesman();
    getCurrency();
    getMaterial();
  }, []);

  useEffect(() => {
    fetchMe();
  }, [!response]);

  const dataFetching = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/purchaseorderh`
      );
      setGetData(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    dataFetching();
  }, []);

  const deleteData = async (params) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/purchaseorderh/${params}`
      );
      dataFetching();
      toast.success("Data Deleted", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {}
  };

  const [crrntDate, setCrrntDate] = useState("");
  const [currentQueueNumber, setCurrentQueueNumber] = useState(1);
  const [currentDocumentSeries, setCurrentDocumentSeries] = useState(`${seriesVal}`);

  useEffect(() => {
    setCurrentQueueNumber(1);
  }, [currentDocumentSeries]);

  // let test
  // const generateDocNo = async () => {
  //   const today = new Date(docDate);
  //   const year = today.getFullYear().toString().substring(2);
  //   const month = (today.getMonth() + 1).toString().padStart(2, "0");
  //   const day = today.getDate().toString().padStart(2, "0");
  //   const formattedDate = year + month + day;

  //   console.log(seriesVal !== test);
  //   if (seriesVal !== test || formattedDate !== crrntDate) {
  //     setCurrentQueueNumber(1);
  //     test = seriesVal
  //   }
  //   if(seriesVal == test || formattedDate == crrntDate) {
  //     setCurrentQueueNumber(currentQueueNumber + 1);
  //   }
  //   console.log(currentQueueNumber)
  //   const queueNumber = `${seriesVal}-${formattedDate}-${currentQueueNumber
  //     .toString()
  //     .padStart(4, "0")}`;
  //   return queueNumber;
  // };

  const generateDocNo = (documentSeries) => {
    const today = new Date(docDate);
    const year = today.getFullYear().toString().substring(2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    const formattedDate = year + month + day;

    if (formattedDate === currentDate || documentSeries === currentDocumentSeries) {
      setCurrentQueueNumber(prevQueueNumber => prevQueueNumber + 1);
    } else {
      setCrrntDate(formattedDate);
      setCurrentDocumentSeries(documentSeries);
      setCurrentQueueNumber(1);
    }

    console.log(currentDocumentSeries);

    const queueNumber = `${currentDocumentSeries}-${formattedDate}-${currentQueueNumber.toString().padStart(4, '0')}`;
    return queueNumber;
  }


  const submitClick = async (e) => {
    e.preventDefault();
    try {
      // const generatedDocNo = ;
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/purchaseorderh`, {
        docNo: await generateDocNo(seriesVal),
        series: seriesVal,
        docDate: docDate,
        customerCode: customerVal,
        shipToCode: shipToVal,
        taxToCode: taxToVal,
        salesCode: salesmanVal,
        deliveryDate: deliveryDate,
        poNo: poNo,
        top: top,
        discPercent: discount,
        taxStatus: tax,
        taxPercent: taxVal,
        currency: currencyVal,
        exchangeRate: exchangeRate,
        totalGross: gross,
        totalDisc: discountOutput,
        taxValue: taxOutput,
        totalNetto: Netto,
        information: info,
        status: "OPEN",
        isPurchaseReturn: false,
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

  const updateData = async (params) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/purchaseorderh/${params}`,
        {
          docDate: docDate,
          customerCode: customerVal,
          shipToCode: shipToVal,
          taxToCode: taxToVal,
          salesCode: salesmanVal,
          deliveryDate: deliveryDate,
          poNo: poNo,
          top: top,
          discPercent: discount,
          taxStatus: tax,
          taxPercent: taxVal,
          currency: currencyVal,
          exchangeRate: exchangeRate,
          totalGross: gross,
          totalDisc: discountOutput,
          taxValue: taxOutput,
          totalNetto: Netto,
          information: info,
          status: "OPEN",
          isPurchaseReturn: false,
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
      console.log(error);
    }
  };

  useEffect(() => {
    setShipToVal(customerVal);
    setTaxToVal(customerVal);
    setCurrencyVal(getFCurrency.Currency);
  }, [customerVal, customerVal, getFCurrency?.Currency]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl font-bold mb-4">Purchase Order</div>
      </div>

      <div className="w-full">
        <div className="flex justify-start items-center">
          <form onSubmit={submitClick}>
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
                <td className="text-right font-bold">Doc No: </td>
                <td>
                  <select
                    onChange={(e) => setSeriesVal(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected hidden>
                      Pilih nomor dokumen
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
                    type="datetime-local"
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
                <td className="text-right">Supplier: </td>
                <td>
                  <select
                    onChange={(e) => setCustomerVal(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected hidden>
                      Pilih supplier
                    </option>
                    {getMyCustomer.map((res, key) => {
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
                <td className="text-right">Delivery Date: </td>
                <td>
                  <input
                    type="datetime-local"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                    min={docDate}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-right">Term Of Payment: </td>
                <td>
                  <input
                    onChange={(e) => {
                      setTop(e.target.value);
                    }}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0"
                    required
                  />
                </td>
                <td>Days</td>
              </tr>
              <tr>
                <td className="text-right">Currency: </td>
                <td>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>{getFCurrency.Currency}</option>
                  </select>
                </td>
                <td className="text-right">Exchange Rate: </td>
                <td>
                  <input
                    onChange={(e) => {
                      setExchangeRate(e.target.value);
                    }}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="1.00"
                    value="1.00"
                    required
                    // disabled
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <select
                    onChange={(e) => {
                      setTax(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option disabled selected hidden>
                      Pilih
                    </option>
                    <option value="No">No</option>
                    <option value="Include">Include</option>
                    <option value="Exclude">Exclude</option>
                  </select>
                </td>
                <td>
                  <input
                    onChange={(e) => {
                      setTaxVal(e.target.value);
                    }}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="10.00"
                    required
                  />
                </td>
                <td> % Tax</td>
              </tr>
              <tr>
                <td className="text-right">Discount: </td>
                <td>
                  <input
                    onChange={(e) => {
                      setDiscount(e.target.value);
                    }}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0.00"
                    required
                  />
                </td>
                <td> %</td>
              </tr>

              <tr>
                <td className="text-right">Send To: </td>
                <td>
                  <select
                    onChange={(e) => setCustomerVal(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="JL. Berbek Industri 3 no 15">
                    JL. Berbek Industri 3 no 15
                    </option>
                    {getMyCustomer.map((res, key) => {
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
                <td className="text-right">Information:</td>
                <td>
                  <input
                    onChange={(e) => {
                      setInfo(e.target.value);
                    }}
                    type="text"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        </div>

        <div className="flex justify-between items-start">
          <table className="border-separate border-spacing-2 ">
            <tr>
              <td className="text-right">Total Gross : </td>
              <td>
                <input
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0.00"
                  disabled
                  value={gross}
                />
              </td>
              <td className="text-right">Total Disc: </td>
              <td>
                <input
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0.00"
                  disabled
                  value={discountOutput}
                />
              </td>
              <td className="text-right">Tax: </td>
              <td>
                <input
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0.00"
                  disabled
                  value={taxOutput}
                />
              </td>
              <td className="text-right font-bold">Total Netto: </td>
              <td>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0.00"
                  disabled
                  value={Netto}
                />
              </td>
            </tr>
            <tr>
                <td className="text-right">Material:</td>
                <td>
                  <select
                    onChange={(e) => setMaterialVal(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option disabled selected hidden>
                      Pilih Material
                    </option>
                    {getMyMaterial.map((res, key) => {
                      return (
                        <option key={key} value={res.Code}>
                          {res.Code}
                        </option>
                      );
                    })}
                  </select>
                </td>
                <td className="text-right">Info:</td>
                <td>
                  <input
                    type="text"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value=''
                  />
                </td>
                <td className="text-right">Quantity:</td>
                <td>
                  <input
                    type="number"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                    min="0"
                  />
                </td>
                <td className="text-right">Price:</td>
                <td>
                  <input
                    disabled
                    type="text"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={getMyMaterialDetail?.DefaultPrice}
                  />
                </td>
                <button
                  onClick={() => {
                  }}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
                >
                  Add
                </button>
              </tr>
              <tr>
                <td className="text-right">Disc Percent:</td>
                <td>
                <input
                    type="number"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                    min="0"
                  />
                </td>
                <td className="text-right">Disc Percent 2:</td>
                <td>
                  <input
                    type="text"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value=''
                  />
                </td>
                <td className="text-right">Disc Percent 3:</td>
                <td>
                  <input
                    type="number"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                    min="0"
                  />
                </td>
                <td className="text-right">Disc Value:</td>
                <td>
                  <input
                    disabled
                    type="text"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={getMyMaterialDetail?.DefaultPrice}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-right">Gross:</td>
                <td>
                <input
                    type="text"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value=''
                  />
                </td>
                <td className="text-right">Netto:</td>
                <td>
                  <input
                    type="text"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value=''
                  />
                </td>
                <td className="text-right">Disc Nominal:</td>
                <td>
                  <input
                    type="number"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                    min="0"
                  />
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
                  Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Info
                </th>
                <th scope="col" className="px-6 py-3">
                  Unit
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Gross
                </th>
                <th scope="col" className="px-6 py-3">
                  DiscPercent
                </th>
                <th scope="col" className="px-6 py-3">
                  DiscPercent2
                </th>
                <th scope="col" className="px-6 py-3">
                  DiscPercent3
                </th>
                <th scope="col" className="px-6 py-3">
                  DiscValue
                </th>
                <th scope="col" className="px-6 py-3">
                  DiscNominal
                </th>
                <th scope="col" className="px-6 py-3">
                  Netto
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="text-xl font-bold mb-4 pt-10">Header Data Table</div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  DocNo
                </th>
                <th scope="col" className="px-6 py-3">
                  Series
                </th>
                <th scope="col" className="px-6 py-3">
                  TransactionType
                </th>
                <th scope="col" className="px-6 py-3">
                  DocDate
                </th>
                <th scope="col" className="px-6 py-3">
                  SupplierCode
                </th>
                <th scope="col" className="px-6 py-3">
                  DeliveryDate
                </th>
                <th scope="col" className="px-6 py-3">
                  TOP
                </th>
                <th scope="col" className="px-6 py-3">
                  DiscPercent
                </th>
                <th scope="col" className="px-6 py-3">
                  TaxStatus
                </th>
                <th scope="col" className="px-6 py-3">
                  TOP
                </th>
                <th scope="col" className="px-6 py-3">
                  DiscPercent
                </th>
                <th scope="col" className="px-6 py-3">
                  TaxStatus
                </th>
                <th scope="col" className="px-6 py-3">
                  TaxPercent
                </th>
                <th scope="col" className="px-6 py-3">
                  Currency
                </th>
                <th scope="col" className="px-6 py-3">
                  ExchangeRate
                </th>
                <th scope="col" className="px-6 py-3">
                  JODocNo
                </th>
                <th scope="col" className="px-6 py-3">
                  Trip
                </th>
                <th scope="col" className="px-6 py-3">
                 SIDocNo
                </th>
                <th scope="col" className="px-6 py-3">
                 TotalGross
                </th>
                <th scope="col" className="px-6 py-3">
                  TotalDisc
                </th>
                <th scope="col" className="px-6 py-3">
                  TaxValue
                </th>
                <th scope="col" className="px-6 py-3">
                 TotalNetto
                </th>
                <th scope="col" className="px-6 py-3">
                  SendTo
                </th>
                <th scope="col" className="px-6 py-3">
                  Information
                </th>
                <th scope="col" className="px-6 py-3">
                 Status
                </th>
                <th scope="col" className="px-6 py-3">
                 IsApproved
                </th>
                <th scope="col" className="px-6 py-3">
                  ApprovedBy
                </th>
                <th scope="col" className="px-6 py-3">
                  ApprovedDate
                </th>
                <th scope="col" className="px-6 py-3">
                  PrintCounter
                </th>
                <th scope="col" className="px-6 py-3">
                  PrintedBy
                </th>
                <th scope="col" className="px-6 py-3">
                  PrintedDate
                </th>
                <th scope="col" className="px-6 py-3">
                  IsSalesReturn
                </th>
                <th scope="col" className="px-6 py-3">
                 CreatedBy
                </th>
                <th scope="col" className="px-6 py-3">
                  CreatedDate
                </th>
                <th scope="col" className="px-6 py-3">
                  ChangedBy
                </th>
                <th scope="col" className="px-6 py-3">
                  ChangedDate
                </th>
              </tr>
            </thead>
            <tbody>
              {getData.map((res, key) => {
                return (
                  <tr
                    key={key}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {res.DocNo}
                    </td>
                    <td className="px-6 py-4">{res.Series}</td>
                    <td className="px-6 py-4">{res.DocDate}</td>
                    <td className="px-6 py-4">{res.CustomerCode}</td>
                    <td className="px-6 py-4">{res.ShipToCode}</td>
                    <td className="px-6 py-4">{res.TaxToCode}</td>
                    <td className="px-6 py-4">{res.SalesCode}</td>
                    <td className="px-6 py-4">{res.DeliveryDate}</td>
                    <td className="px-6 py-4">{res.PONo}</td>
                    <td className="px-6 py-4">{res.TOP}</td>
                    <td className="px-6 py-4">{res.DiscPercent}</td>
                    <td className="px-6 py-4">{res.TaxStatus}</td>
                    <td className="px-6 py-4">{res.TaxPercent}</td>
                    <td className="px-6 py-4">{res.Currency}</td>
                    <td className="px-6 py-4">{res.ExchangeRate}</td>
                    <td className="px-6 py-4">{res.TotalGross}</td>
                    <td className="px-6 py-4">{res.TotalDisc}</td>
                    <td className="px-6 py-4">{res.TaxValue}</td>
                    <td className="px-6 py-4">{res.TotalNetto}</td>
                    <td className="px-6 py-4">{res.Information}</td>
                    <td className="px-6 py-4">{res.Status}</td>
                    <td className="px-6 py-4">
                      {res.IsPurchaseReturn === true ? "true" : "false"}
                    </td>
                    <td className="px-6 py-4">{res.CreatedBy}</td>
                    <td className="px-6 py-4">
                      {dateConverter(res.CreatedDate)}
                    </td>
                    <td className="px-6 py-4">{res.ChangedBy}</td>
                    <td className="px-6 py-4">
                      {dateConverter(res.ChangedDate)}
                    </td>
                    <td>
                      <button
                        onClick={() => deleteData(res.DocNo)}
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => updateData(res.DocNo)}
                        type="button"
                        className="focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};