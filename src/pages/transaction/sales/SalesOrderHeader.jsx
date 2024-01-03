import React, {useState, useEffect} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {useMe} from "../../../hooks/API/useMe";
import {dateConverter} from "../../../components/dateConverter";

export const SalesOrderHeader = () => {
  const {fetchMe, response} = useMe();
  const currentDate = new Date().toISOString().slice(0, 16);
  const [docDate, setDocDate] = useState(currentDate);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [getMySeries, setGetSeries] = useState([]);
  const [getMyCustomer, setGetMyCustomer] = useState([]);
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
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/seriescode/SALES ORDER`);
      setGetSeries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomer = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/customer`);
      setGetMyCustomer(response.data);
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
    getCustomer();
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
    if(!salesDetail){
      return toast.error("Fill the Sales Detail!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/salesorderh`, {
        series: seriesVal,
        generateDocDate: generateDocDate(),
        docDate: docDate,
        customerCode: customerVal,
        shipToCode: shipToVal[0].PartnerCode,
        taxToCode: taxToVal[0].PartnerCode,
        salesCode: salesmanVal,
        deliveryDate: deliveryDate,
        poNo: poNo,
        top: top,
        discPercent: discount,
        taxStatus: !tax ? "No" : tax,
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
      
      resetForm()
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

  const resetForm = () => {
    setSeriesVal('')
    setCustomerVal('')
    setCustomerShipTo([])
    setCustomerTaxTo([])
    setSalesmanVal('')
    setDeliveryDate('')
    setPoNo('')
    setTop('')
    setGetFCurrency([])
    setExchangeRate('')
    setInfo('')
    setTax('')
    setTaxVal('')
    setDiscount('')
    setMaterialVal('')
    setInfo('')
    setQuantity('')
    setSelectedPrice('')
    setSalesDetail([]);
  }

  const handleChangeDataAPI = async (key, field, value) => {
    setSalesDetail((prevData) =>
      prevData.map((data, index) => {
        if (index === key) {
          let updatedData = {
            ...data,
            [field]: value,
          };
          if (field === "qty") {
            updatedData.gross = (value * updatedData.price).toFixed(2);
            updatedData.netto = (value * updatedData.price).toFixed(2);
          }
          return updatedData;
        }
        return data;
      })
    );
  };
  
  useEffect(() => {
    const sum = salesDetail.reduce((accumulator, currentData) => {
      return accumulator + parseFloat(currentData.gross);
    }, 0);
    setTotalGross(sum.toFixed(2));
  }, [salesDetail]);


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
    setShipToVal(customerVal);
    setTaxToVal(customerVal);
    getCustomerShipTo(customerVal);
    getCustomerTaxTo(customerVal);
  }, [customerVal]);

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
                  <select value={seriesVal} onChange={(e) => setSeriesVal(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                  <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min={currentDate} value={docDate} onChange={handleDocDateChange} />
                </td>
              </tr>

              <tr>
                <td className="text-right">Customer: </td>
                <td>
                  <select required value={customerVal} onChange={(e) => setCustomerVal(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {customerShipTo.map((res, key) => {
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
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {customerTaxTo.map((res, key) => {
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
                  <select required value={salesmanVal} onChange={(e) => setSalesmanVal(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                  <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min={docDate} value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
                </td>
                <td className="text-right">PO No: </td>
                <td>
                  <input
                    onChange={(e) => {
                      setPoNo(e.target.value);
                    }}
                    value={poNo}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="PO No"
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
                    value={top}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0"
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
                    value={exchangeRate}
                    disabled={disabled}
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
                    value={info}
                    type="text"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <select
                    onChange={(e) => {
                      setTax(e.target.value);
                    }}
                    value={tax}
                    required
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
                    value={taxVal}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="10.00"
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
                    value={discount}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0.00"
                    min="0"
                  />
                </td>
                <td> %</td>
              </tr>
              <tr>
                <td className="text-right">Material:</td>
                <td>
                  <select onChange={(e) => setMaterialVal(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                  <input onChange={(e) => setInfo2(e.target.value)} type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={info2 || getMyMaterialDetail?.Info} />
                </td>
                <td className="text-right">Quantity:</td>
                <td>
                  <input value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min="0" />
                </td>
                <td className="text-right">Price:</td>
                <td>
                  <input disabled type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={Math.floor(selectedPrice || getMyMaterialDetail?.DefaultPrice)} />
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
          <div className="text-xl font-bold mb-4">Detail</div>
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
              <tbody>
                {salesDetail.map((res, key) => {
                  return (
                    <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{res.number}</td>
                      <td className="px-6 py-4">{res.materialCode}</td>
                      <td className="px-6 py-4">
												<input type="text" onChange={(e) => {
                          handleChangeDataAPI(key, "info", e.target.value);
                          }} 
                          className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={res.info}/>
                      </td>
                      <td className="px-6 py-4">{res.unit}</td>
                      <td className="px-6 py-4">
												<input type="text" onChange={(e) => {
                          handleChangeDataAPI(key, "qty", e.target.value);
                          }} 
                          className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={res.qty}/>
                      </td>
                      <td className="px-6 py-4">{Math.floor(res.price)}</td>
                      <td className="px-6 py-4">{Math.floor(res.gross)}</td>
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
                  <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" disabled value={Math.floor(totalGross)} />
                </td>
                <td className="text-right">Total Disc: </td>
                <td>
                  <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" disabled value={discountOutput} />
                </td>
                <td className="text-right">Tax: </td>
                <td>
                  <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" disabled value={taxOutput} />
                </td>
                <td className="text-right font-bold">Netto: </td>
                <td>
                  <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" disabled value={Netto} />
                </td>
              </tr>
              <tr>
                <td className="text-right font-bold">Total Netto: </td>
                <td>
                  <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" disabled value={totalNetto} />
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
