import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMe } from "../../../hooks/API/useMe";
import { toast, ToastContainer } from "react-toastify";
import { dateConverter } from "../../../components/dateConverter";

export const SalesOrderHeader = () => {
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
  const [exchangeRate, setExchangeRate] = useState(0.0);
  const [info, setInfo] = useState("");
  const [info2, setInfo2] = useState("");
  const [salesDetail, setSalesDetail] = useState([]);

  const [seriesVal, setSeriesVal] = useState("");
  const [salesmanVal, setSalesmanVal] = useState("");
  const [currencyVal, setCurrencyVal] = useState("");
  const [materialVal, setMaterialVal] = useState("");
  const [customerVal, setCustomerVal] = useState("");

  const [getCustomerShipTo, setGetCustomerShipTo] = useState([]);
  const [getCustomerTaxTo, setGetCustomerTaxTo] = useState([]);

  const handleDocDateChange = (e) => {
    const selectedDocDate = e.target.value;
    setDocDate(selectedDocDate);

    setDeliveryDate("");
  };

  const getCustomerShipToFunc = async (params) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/customerpartner/${params}/SHIP TO`
      );
      setGetCustomerShipTo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCustomerTaxToFunc = async (params) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/customerpartner/${params}/TAX TO`
      );
      setGetCustomerTaxTo(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCustomerShipToFunc(customerVal);
    getCustomerTaxToFunc(customerVal);
    getCurrencyByCustomer(customerVal);
  }, [customerVal]);

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

  const calculateTotalGross = () => {
    return quantity * price;
  };

  const calculateDiscount = () => {
    let total = (quantity * price * discount) / 100;
    return total;
  };

  const calculateTax = (e) => {
    if (tax === "No") {
      return 0;
    }
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
    totalHandle();
  }, [quantity, discount, taxVal, tax, getMyMaterialDetail?.DefaultPrice]);

  const MaterialCheckPrice = async (params) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/salesorderh`
      )

    } catch (err) {

    }
  }

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
        `${process.env.REACT_APP_API_BASE_URL}/salesorderh`
      );
      setGetData(data.data);
    } catch (error) { }
  };

  useEffect(() => {
    dataFetching();
  }, []);

  const addSalesDetail = () => {
    if (!materialVal || !quantity) {
      toast.warn("Material and Quantity is required", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    setSalesDetail([
      ...salesDetail,
      {
        number: salesDetail.length + 1,
        materialCode: materialVal,
        info:
          info2 || getMyMaterialDetail?.Info
            ? info2 || getMyMaterialDetail?.Info
            : "-",
        unit: getMyMaterialDetail?.SmallestUnit,
        qty: quantity,
        price: getMyMaterialDetail?.DefaultPrice,
        gross: gross,
        discPercent1: 0.0,
        discPercent2: 0.0,
        discPercent3: 0.0,
        discValue: 0.0,
        discNominal: 0.0,
        netto: Netto,
        qtyDelivered: 0.0,
        qtyWO: 0.0,
      },
    ]);
  };

  const [disable, setDisable] = useState(false)

  const disableExchangeRate = () => {
    if (getFCurrency.Currency === "IDR") {
      setDisable(true)
      setExchangeRate(1)
    } else {
      setDisable(false)
    }
  }

  useEffect(() => {
    disableExchangeRate();
  }, [getFCurrency.Currency])

  const generateDocDate = () => {
    const today = new Date(docDate);
    const year = today.getFullYear().toString().substring(2);
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return year + month + day;
  };

  const submitClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/salesorderh`, {
        series: seriesVal,
        generateDocDate: generateDocDate(),
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
        salesOrderDetail: salesDetail,
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

  useEffect(() => {
    setCurrencyVal(getFCurrency.Currency);
  }, [getFCurrency?.Currency]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl font-bold mb-4">Sales Order</div>
      </div>

      <form onSubmit={submitClick}>
        <div className="w-full">
          <div className="flex justify-start items-center">
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
                <td className="text-right">Customer: </td>
                <td>
                  <select
                    onChange={(e) => setCustomerVal(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected hidden>
                      Pilih Customer
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
                <td className="text-right">Ship To: </td>
                <td>
                  <select
                    onchange={(e) => {
                      setShipToVal(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected hidden>
                      Pilih Partner
                    </option>
                    {getCustomerShipTo.map((res, key) => {
                      return (
                        <option value={res.PartnerCode} key={key}>
                          {res.PartnerCode}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="text-right">Tax To: </td>
                <td>
                  <select
                    onchange={(e) => {
                      setTaxToVal(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected hidden>
                      Pilih Partner
                    </option>
                    {getCustomerTaxTo.map((res, key) => {
                      return (
                        <option value={res.PartnerCode} key={key}>
                          {res.PartnerCode}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="text-right">Salesman: </td>
                <td>
                  <select
                    onChange={(e) => setSalesmanVal(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected hidden>
                      Pilih salesman
                    </option>
                    {getMySelesman.map((res, key) => {
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
                <td className="text-right">PO No: </td>
                <td>
                  <input
                    onChange={(e) => {
                      setPoNo(e.target.value);
                    }}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="PO No"
                    required
                    min="0"
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
                    min="0"
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
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="1.00"
                    required
                    disabled={disable}
                  />
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
                    min="0"
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
                    min="0"
                  />
                </td>
                <td> %</td>
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
                    onChange={(e) => setInfo2(e.target.value)}
                    type="text"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={info2 || getMyMaterialDetail?.Info}
                  />
                </td>
                <td className="text-right">Quantity:</td>
                <td>
                  <input
                    onChange={(e) => setQuantity(e.target.value)}
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
                    addSalesDetail();
                  }}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
                >
                  Add
                </button>
              </tr>
            </table>
          </div>
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
                  <th scope="col" className="px-6 py-3">
                    Control
                  </th>
                </tr>
              </thead>
              <tbody>
                {salesDetail.map((res, key) => {
                  return (
                    <tr
                      key={key}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {res.number}
                      </td>
                      <td className="px-6 py-4">{res.materialCode}</td>
                      <td className="px-6 py-4">{res.info}</td>
                      <td className="px-6 py-4">{res.unit}</td>
                      <td className="px-6 py-4">{res.qty}</td>
                      <td className="px-6 py-4">{res.price}</td>
                      <td className="px-6 py-4">{res.gross}</td>
                      <td className="px-6 py-4">{res.discPercent1}</td>
                      <td className="px-6 py-4">{res.discPercent2}</td>
                      <td className="px-6 py-4">{res.discPercent3}</td>
                      <td className="px-6 py-4">{res.discValue}</td>
                      <td className="px-6 py-4">{res.discNominal}</td>
                      <td className="px-6 py-4">{res.netto}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
            </table>
          </div>
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
        </div>
      </form>
      {/* <Modal show={props.openModal === 'form-elements'} size="7xl" popup onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
          <div className="text-2xl font-bold mb-4"  >
              DocNo: {salesDetailData.DocNo}
          </div>
          <form onSubmit={submitClick}>
          <table className="border-separate border-spacing-2 "> 
            <tr>
              <td className="text-right">Series: </td>
              <td>
                <input disabled value={salesDetailData.Series} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
              </td>
            </tr>
            <tr>
              <td className="text-right">Doc Date: </td>
              <td>
              <input
              disabled
              type="datetime-local"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={salesDetailData.DocDate + "T00:00"}
            />
              </td>
            </tr>

            <tr>
              <td className="text-right">Customer: </td>
              <td>
                <select
                  onChange={(e) => setCustomerVal(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value={salesDetailData.CustomerCode} disabled selected hidden>
                    {salesDetailData.CustomerCode}
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
              <td className="text-right">Ship To: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected value={customerVal}>
                    {customerVal}
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">Tax To: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected value={customerVal}>
                    {customerVal}
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">Salesman: </td>
              <td>
                <select
                  onChange={(e) => setSalesmanVal(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value={salesDetailData.SalesCode} disabled selected hidden>
                    {salesDetailData.SalesCode}
                  </option>
                  {getMySelesman.map((res, key) => {
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
                  min={salesDetailData.DocDate + "T00:00"}
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </td>
              <td className="text-right">PO No: </td>
              <td>
                  <input onChange={(e) => {setPoNo2(e.target.value);}} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                <input
                  onChange={(e) => {
                    setPoNo(e.target.value);
                  }}
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  placeholder={salesDetailData.TOP}
                />
              </td>
              <td>Days</td>
            </tr>
            <tr>
              <td className="text-right">Currency: </td>
              <td>
                <select disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                  placeholder={salesDetailData.ExchangeRate}
                  value="1.00"
                  // disabled
                />
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
                  placeholder={salesDetailData.Info}
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
                    {salesDetailData.TaxStatus}
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
                  placeholder={salesDetailData.TaxPercent}
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
                  placeholder={salesDetailData.DiscPercent}
                />
              </td>
              <td> %</td>
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
                  value={getMyMaterialDetail?.Info}
                />
              </td>
              <td className="text-right">Quantity:</td>
              <td>
                <input
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
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
                  onClick={() => {addSalesDetail()}}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
                >
                  Add
                </button>
            </tr>
            <tr>
              <td className="text-right">
              </td>
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
        </Modal.Body>
      </Modal > */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};
