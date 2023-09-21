import React, {useState, useEffect} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {useMe} from "../../../hooks/API/useMe";

const ARRequestList = () => {
  const {fetchMe, response} = useMe();
  const currentDate = new Date().toISOString().slice(0, 16);
  const [docDate, setDocDate] = useState(currentDate);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [getMySeries, setGetSeries] = useState([]);
  const [getMySelesman, setGetMySelesman] = useState([]);
  const [getMyCurrency, setGetMyCurrency] = useState([]);
  const [getMyMaterial, setGetMyMaterial] = useState([]);
  const [getMyMaterialDetail, setGetMyMaterialDetail] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountOutput, setDiscountOutput] = useState();
  const [tax, setTax] = useState();
  const [taxVal, setTaxVal] = useState(0);
  const [taxOutput, setTaxOutput] = useState(0);
  const [gross, setGross] = useState(0);
  const [Netto, setNetto] = useState(0);
  const [poNo, setPoNo] = useState("");
  const [top, setTop] = useState("");
  const [shipToVal, setShipToVal] = useState("");
  const [taxToVal, setTaxToVal] = useState("");
  const [exchangeRate, setExchangeRate] = useState(0.0);
  const [info, setInfo] = useState("");
  const [info2, setInfo2] = useState("");
  const [salesDetail, setSalesDetail] = useState([]);
  const [ARBook,setARBook] = useState([])

  const [seriesVal, setSeriesVal] = useState("");
  const [salesmanVal, setSalesmanVal] = useState("");
  const [currencyVal, setCurrencyVal] = useState("");
  const [materialVal, setMaterialVal] = useState("");
  const [customerVal, setCustomerVal] = useState("");
  const [totalNetto, setTotalNetto] = useState(0);
  const [totalGross, setTotalGross] = useState(0);
  const [customerShipTo, setCustomerShipTo] = useState([]);
  const [customerTaxTo, setCustomerTaxTo] = useState([]);
  const [priceByMaterial, setPriceByMaterial] = useState([]);
  const [collector, setCollector] = useState([])
  const [getMyCollector, setGetMyCollector] = useState([])

  const handleDocDateChange = (e) => {
    const selectedDocDate = e.target.value;
    setDocDate(selectedDocDate);

    setDeliveryDate("");
  };

  
  const getPriceByMaterial = async (params) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/pricematerial/${params}`);
      setPriceByMaterial(response.data);
    } catch (error) {
      console.log(error);
    }
  };

 const [selectedPrice, setSelectedPrice] = useState(null);

 const calculatePrice = () => {
  const selectedMaterials = priceByMaterial.filter(item => item.MaterialCode === materialVal);

  const qty = parseFloat(quantity);
  let foundMaterial = null;

  for (const material of selectedMaterials) {
    const minQty = parseFloat(material.MinQty);
    const maxQty = parseFloat(material.MaxQty);

    if (qty >= minQty && qty <= maxQty) {
      foundMaterial = material;
      break
    }
  }

  let selectedPrice = foundMaterial?.Price;
  
  if (!foundMaterial) {
    selectedPrice = getMyMaterialDetail.DefaultPrice
  }
  
  const totalPrice = selectedPrice * qty;

  setGross(totalPrice)
  setNetto(totalPrice)
  setSelectedPrice(selectedPrice);
};



  useEffect(() => {
    console.log(selectedPrice)
  }, [selectedPrice]);
  useEffect(() => {
    calculatePrice()
  }, [priceByMaterial,quantity]);

  useEffect(() => {
    getPriceByMaterial(materialVal);
  }, [materialVal]);

  const getCustomerTaxTo = async (params) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/customerpartner/${params}/TAX TO`);
      setCustomerTaxTo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCustomerShipTo = async (params) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/customerpartner/${params}/SHIP TO`);
      setCustomerShipTo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTaxToVal(customerTaxTo);
    setShipToVal(customerShipTo);
  }, [customerTaxTo, customerShipTo]);

  const getSeries = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/seriescode/AR REQUEST LIST`);
      setGetSeries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCollector = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/collector`);
      setGetMyCollector(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSelesman = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/salesman`);
      setGetMySelesman(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrency = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/currency`);
      setGetMyCurrency(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaterial = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/material`);
      setGetMyMaterial(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaterialDetail = async (params) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/material/${params}`);
      setGetMyMaterialDetail(response.data);
      setPrice(response?.data.DefaultPrice);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMaterialDetail(materialVal);
  }, [materialVal]);

  const [getFCurrency, setGetFCurrency] = useState([]);

  const getCurrencyByCustomer = async (params) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/customer/${params}`);
      setGetFCurrency(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrencyByCustomer(customerVal);
  }, [customerVal]);

  const calculateTotalGross = () => {
    return quantity * (selectedPrice || getMyMaterialDetail?.DefaultPrice);
  };

  const calculateDiscount = () => {
    let total = (totalGross * discount) / 100;
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
    let discount = calculateDiscount();
    let total = totalGross - calculateDiscount();
    let taks = calculateTax(total);
    if (tax === "Exclude") {
      total = total + taks;
    }
    setDiscountOutput(discount);
    setTaxOutput(taks);
    setTotalNetto(total);
  };

  useEffect(() => {
    calculateTotalNetto();
  }, [totalGross, taxVal, tax, discount]);

  useEffect(() => {
    getSeries();
    getCollector();
    getSelesman();
    getCurrency();
    getMaterial();
  }, []);

  useEffect(() => {
    fetchMe();
  }, [!response]);

  const addSalesDetail = () => {
    if (!materialVal || !quantity) {
      toast.warn("Material and Quantity is required", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    setTotalGross(totalGross + gross);

    setSalesDetail([
      ...salesDetail,
      {
        number: salesDetail.length + 1,
        materialCode: materialVal,
        info: info2 || getMyMaterialDetail?.Info ? info2 || getMyMaterialDetail?.Info : "-",
        unit: getMyMaterialDetail?.SmallestUnit,
        qty: quantity,
        price: selectedPrice || getMyMaterialDetail?.DefaultPrice,
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
        currency: getFCurrency.Currency,
        exchangeRate: exchangeRate,
        totalGross: totalGross,
        totalDisc: discountOutput,
        taxValue: taxOutput,
        totalNetto: totalNetto,
        information: info,
        status: "OPEN",
        isPurchaseReturn: false,
        createdBy: response.User,
        changedBy: response.User,
        salesOrderDetail: salesDetail,
      });
      toast.success("Data Saved", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      setSalesDetail([]);
    } catch (error) {
      console.log(error);
      toast.warn("Code Sudah Digunakan", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
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

  const getARBook = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/arbook`)
      setARBook(res.data)
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

  useEffect(() => {
    checkExchangeRate();
  }, [getFCurrency.Currency]);

  useEffect(() => {
    setShipToVal(customerVal);
    setTaxToVal(customerVal);
    getCustomerShipTo(customerVal);
    getCustomerTaxTo(customerVal);
  }, [customerVal]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl font-bold mb-4">AR Request List</div>
      </div>

      <form onSubmit={submitClick}>
        <div className="w-full">
          <div className="flex justify-start items-center">
            <table className="border-separate border-spacing-2 ">
              <tr>
                <td className="text-right">Series: </td>
                <td>
                  <select onChange={(e) => setSeriesVal(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                  <input type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min={currentDate} value={docDate} onChange={handleDocDateChange} />
                </td>
              </tr>

              <tr>
                <td className="text-right">Collector: </td>
                <td>
                  <select required onChange={(e) => setCollector(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected hidden>
                      Pilih Collector
                    </option>
                    {getMyCollector.map((res, key) => {
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
                  />
                </td>
              </tr>
              <tr>
                
                <button
                  onClick={() => {
                    getARBook();
                  }}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
                >
                  Fill
                </button>
              </tr>
            </table>
          </div>
          <div className="text-xl font-bold mb-4">Detail</div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Use
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CustomerCode
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DocDate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DocNo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TOP
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DueDate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Information
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DC
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Currency
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DocValue
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Netto
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ExchangeRate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NettoLocal
                  </th>
                </tr>
              </thead>
              <tbody>
                {ARBook.map((res, key) => {
                  return (
                    <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <input type="checkbox" />
                      </td>
                      <td className="px-6 py-4">{res.CustomerCode}</td>
                      <td className="px-6 py-4">{res.Name}</td>
                      <td className="px-6 py-4">{res.DocDate}</td>
                      <td className="px-6 py-4">{res.DocNo}</td>
                      <td className="px-6 py-4">{res.TOP}</td>
                      <td className="px-6 py-4">{res.DueDate}</td>
                      <td className="px-6 py-4">{res.Information}</td>
                      <td className="px-6 py-4">{res.DC}</td>
                      <td className="px-6 py-4">{res.Currency}</td>
                      <td className="px-6 py-4">{res.DocValue}</td>
                      <td className="px-6 py-4">{res.Payment}</td>
                      <td className="px-6 py-4">{res.Netto}</td>
                      <td className="px-6 py-4">{res.ExchangeRate}</td>
                      <td className="px-6 py-4">{res.NettoLocal}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-start">
            <table className="border-separate border-spacing-2 ">
              <tr>
                <td className="text-right">Total Value : </td>
                <td>
                  <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" disabled value={totalGross} />
                </td>
              </tr>
              <tr>
                <td className="text-right"></td>
                <td>
                  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">
                    Save
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ARRequestList;