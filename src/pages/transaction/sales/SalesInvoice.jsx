import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMe } from "../../../hooks/API/useMe";
import { dateConverter } from "../../../components/dateConverter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SalesInvoice = () => {
  const { fetchMe, response } = useMe();
  const [openModal, setOpenModal] = useState();
  const currentDate = new Date().toISOString().slice(0, 16);
  const [docDate, setDocDate] = useState(currentDate);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [getMySeries, setGetSeries] = useState([]);
  const [getMyCustomer, setGetMyCustomer] = useState([]);
  const [getMySelesman, setGetMySelesman] = useState([]);
  const [getMyGoodsIssue, setGetMyGoodsIssue] = useState([]);
  const [getMyGoodsIssueDetail, setGetMyGoodsIssueDetail] = useState([]);
  const [getMyCurrency, setGetMyCurrency] = useState([]);
  const [getMyMaterial, setGetMyMaterial] = useState([]);
  const [getMyMaterialDetail, setGetMyMaterialDetail] = useState([]);
  const [getMyMaterialDetailForUpdate, setGetMyMaterialDetailForUpdate] = useState([]);
  const [getMyMaterialDetailForChange, setGetMyMaterialDetailForChange] = useState([]);
  const [data, setData] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountOutput, setDiscountOutput] = useState();
  const [tax, setTax] = useState();
  const [taxNo, setTaxNo] = useState();
  const [taxNo2, setTaxNo2] = useState();
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
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(false);

  const [seriesVal, setSeriesVal] = useState("");
  const [salesmanVal, setSalesmanVal] = useState("");
  const [currencyVal, setCurrencyVal] = useState("");
  const [materialVal, setMaterialVal] = useState("");
  const [customerVal, setCustomerVal] = useState("");
  const [goodsIssue, setGoodsIssue] = useState("");
  const [totalNetto, setTotalNetto] = useState(0);
  const [totalGross, setTotalGross] = useState(0);
  const [totalGrossUpdate, setTotalGrossUpdate] = useState(0);
  const [salesOrderNo, setSalesOrderNo] = useState();
  const [salesInvoiceDetail, setSalesInvoiceDetail] = useState([]);

  const [nettoChange, setNettoChange] = useState("");
  const [grossChange, setGrossChange] = useState("");
  const [discountOutputChange, setDiscountOutputChange] = useState("");
  const [taxOutputChange, setTaxOutputChange] = useState("");
  const [taxToValUpdate, setTaxToValUpdate] = useState("");
  const [shipToValUpdate, setShipToValUpdate] = useState("");
  const [informationUpdate, setInformationUpdate] = useState("");
  const [exchangeRateUpdate, setExchangeRateUpdate] = useState("");
  const [topUpdate, setTopUpdate] = useState("");
  const [poNoUpdate, setPoNoUpdate] = useState("");
  const [deliveryDateUpdate, setDeliveryDateUpdate] = useState("");
  const [salesmanValUpdate, setSalesmanValUpdate] = useState("");
  const [customerValUpdate, setCustomerValUpdate] = useState("");
  const [salesDetailUpdate, setSalesDetailUpdate] = useState([]);
  const [taxUpdate, setTaxUpdate] = useState();
  const [taxValUpdate, setTaxValUpdate] = useState(0);
  const [discountUpdate, setDiscountUpdate] = useState(0);
  const [materialValUpdate, setMaterialValUpdate] = useState("");
  const [QuantityUpdate, setQuantityUpdate] = useState("");
  const [grossUpdate, setGrossUpdate] = useState(0);
  const [discountOutputUpdate, setDiscountOutputUpdate] = useState();
  const [taxOutputUpdate, setTaxOutputUpdate] = useState(0);
  const [NettoUpdate, setNettoUpdate] = useState(0);
  const [infoUpdate, setInfoUpdate] = useState("");
  const [priceUpdate, setPriceUpdate] = useState(0);
  const [getSalesOrderHeader, setGetSalesOrderHeader] = useState([]);
  const [getSalesOrderDetail, setGetSalesOrderDetail] = useState([]);
  const [changeTax, setChangeTax] = useState("");
  const [changeTaxVal, setChangeTaxVal] = useState("");
  const [changeDiscount, setChangeDiscount] = useState("");
  const [changeMaterialVal, setChangeMaterialVal] = useState("");
  const [changeInfo, setChangeInfo] = useState("");
  const [changeQuantity, setChangeQuantity] = useState("");
  const [totalNettoUpdate, setTotalNettoUpdate] = useState("");
  const [salesDetailKey, setSalesDetailKey] = useState(0);
  const [changedPrice, setChangedPrice] = useState(0);
  const [salesDetailDocNo, setSalesDetailDocNo] = useState("");

  const handleDocDateChange = (e) => {
    const selectedDocDate = e.target.value;
    setDocDate(selectedDocDate);

    setDeliveryDate("");
  };

  const getSeries = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/seriescode/SALES INVOICE`);
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
  const getGoodsIssue = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/goodsissuestatus/PRINTED`);
      setGetMyGoodsIssue(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getGoodsIssueDetail = async (params) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/goodsissuedetail/${params}`);
      setGetMyGoodsIssueDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSalesOrderHeaderByDocNo = async (params) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/salesorderh/${params}`);
      setGetSalesOrderHeader(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getSalesOrderDetailByDocNo = async (params) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/salesorderd/${params}`);
      setGetSalesOrderDetail(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const sendSalesDetailToInput = (e, key) => {
    setChangeMaterialVal(e.MaterialCode);
    setChangeInfo(e.Info);
    setChangeQuantity(e.Qty);
    setSalesDetailKey(e.Number);
    setSalesDetailDocNo(e.DocNo);
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

  const getMaterialDetailForUpdate = async (params) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/material/${params}`);
      setGetMyMaterialDetailForUpdate(response.data);
      setPriceUpdate(response?.data.DefaultPrice);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaterialDetailForChange = async (params) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/material/${params}`);
      setGetMyMaterialDetailForChange(response.data);
      setChangedPrice(response?.data.DefaultPrice);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMaterialDetail(materialVal);
  }, [materialVal]);
  useEffect(() => {
    getMaterialDetailForUpdate(materialValUpdate);
  }, [materialValUpdate]);
  useEffect(() => {
    getMaterialDetailForChange(changeMaterialVal);
  }, [changeMaterialVal]);

  const [getFCurrency, setGetFCurrency] = useState([]);

  const getCurrencyByCustomer = async (params) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/customer/${params}`);
      setGetFCurrency(response.data.Currency);
    } catch (error) {
      console.log(error);
    }
  };

  const getSalesInvoiceDetail = async (params) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/salesinvoiced/${params}`);
      setSalesInvoiceDetail(response.data);
    } catch (error) {
      console.log();
    }
  };

  useEffect(() => {
    getGoodsIssueDetail(goodsIssue);
    getSalesInvoiceDetail(goodsIssue);
  }, [goodsIssue]);

  useEffect(() => {
    setExchangeRate(getSalesOrderHeader.ExchangeRate);
    setTop(getSalesOrderHeader.TOP);
    setPoNo(getSalesOrderDetail.PONo);
  }, [getSalesOrderHeader]);

  useEffect(() => {
    getSalesOrderHeaderByDocNo(getMyGoodsIssueDetail?.goodsissueh?.SODocNo);
    getSalesOrderDetailByDocNo(getMyGoodsIssueDetail?.goodsissueh?.SODocNo);
    setCustomerVal(getMyGoodsIssueDetail?.goodsissueh?.CustomerCode);
    getCurrencyByCustomer(getMyGoodsIssueDetail?.goodsissueh?.CustomerCode);
  }, [getMyGoodsIssueDetail]);

  const calculateTotalGross = () => {
    let total = 0;
    for (let i = 0; i < salesInvoiceDetail.length; i++) {
      let obj = salesInvoiceDetail[i];
      let nettoAsInteger = parseInt(obj.Gross);
      total += nettoAsInteger;
    }
    setTotalGross(total);
  };

  useEffect(() => {
    calculateTotalGross();
  }, [salesInvoiceDetail]);

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

  const calculateNetto = () => {
    let total = quantity * price;
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

  const totalHandle = () => {
    const totalGross = calculateTotalGross();
    const totalNetto = calculateNetto();
    setGross(totalGross);
    setNetto(totalNetto);
  };

  const calculateTotalGrossUpdate = () => {
    let total = 0;
    for (let i = 0; i < salesDetailUpdate.length; i++) {
      let obj = salesDetailUpdate[i];
      let nettoAsInteger = parseInt(obj.netto);
      total += nettoAsInteger;
    }
    for (let i = 0; i < getSalesOrderDetail.length; i++) {
      let obj = getSalesOrderDetail[i];
      let nettoAsInteger = parseInt(obj.Netto);
      total += nettoAsInteger;
    }
    setTotalGrossUpdate(total);
  };

  const calculateTotalNettoUpdate = () => {
    let nettoDiscount = (totalGrossUpdate * discountUpdate) / 100;
    let totalNetto = totalGrossUpdate - nettoDiscount;
    let tax = calculateTaxUpdate(totalNetto);
    if (taxUpdate === "Exclude") {
      totalNetto = totalNetto + tax;
    }
    setDiscountOutputUpdate(nettoDiscount);
    setTaxOutputUpdate(tax);
    setTotalNettoUpdate(totalNetto);
  };

  useEffect(() => {
    calculateTotalNettoUpdate();
  }, [totalGrossUpdate, taxValUpdate, taxUpdate, discountUpdate]);

  useEffect(() => {
    calculateTotalGrossUpdate();
  }, [getSalesOrderDetail, salesDetailUpdate]);

  const calculateTaxUpdate = (e) => {
    if (taxUpdate === "No") {
      return 0;
    }
    let total = (e * taxValUpdate) / 100;
    return total;
  };

  const calculateNettoUpdate = () => {
    let total = QuantityUpdate * priceUpdate;
    return total;
  };

  const calculateGrossUpdate = () => {
    let total = QuantityUpdate * priceUpdate;
    return total;
  };

  const totalUpdateHandle = () => {
    const Netto = calculateNettoUpdate();
    const Gross = calculateGrossUpdate();
    setNettoUpdate(Netto);
    setGrossUpdate(Gross);
  };

  useEffect(() => {
    totalUpdateHandle();
  }, [QuantityUpdate, priceUpdate, getMaterialDetailForUpdate?.DefaultPrice]);

  const calculateNettoChange = () => {
    let total = changeQuantity * changedPrice;
    return total;
  };

  const calculateGrossChange = () => {
    let total = changeQuantity * changedPrice;
    return total;
  };

  const totalChangeHandle = () => {
    const Netto = calculateNettoChange();
    const gross = calculateGrossChange();
    setGrossChange(gross);
    setNettoChange(Netto);
  };

  useEffect(() => {
    totalChangeHandle();
  }, [changeQuantity, changedPrice, getMyMaterialDetailForChange?.DefaultPrice]);

  const changeSalesDetailData = async (key, doc) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/salesorderd/${doc}/${key}`, {
        materialCode: changeMaterialVal,
        info: changeInfo,
        unit: getSalesOrderDetail[key - 1].Unit,
        qty: changeQuantity,
        price: getMyMaterialDetailForChange?.DefaultPrice,
        gross: grossChange,
        discPercent: getSalesOrderDetail[key - 1].DiscPercent,
        discPercent2: getSalesOrderDetail[key - 1].DiscPercent2,
        discPercent3: getSalesOrderDetail[key - 1].DiscPercent3,
        discValue: getSalesOrderDetail[key - 1].DiscValue,
        discNominal: getSalesOrderDetail[key - 1].DiscNominal,
        netto: nettoChange,
        qtyDelivered: 0,
        qtyWO: 0,
      });

      await getSalesOrderDetailByDocNo(doc);
      let salesDetail = await getSalesOrderDetailByDocNo(doc);

      let gross = 0;
      for (let i = 0; i < salesDetail.length; i++) {
        let obj = salesDetail[i];
        let nettoAsInteger = parseInt(obj.Netto);
        gross += nettoAsInteger;
      }
      let nettoDiscount = (gross * discountUpdate) / 100;
      let totalNetto = gross - nettoDiscount;
      let tax = calculateTaxUpdate(totalNetto);
      if (taxUpdate === "Exclude") {
        totalNetto = totalNetto + tax;
      }
      console.log(gross);
      await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/salesorderh/${doc}`, {
        totalGross: gross,
        totalDisc: nettoDiscount,
        taxValue: tax,
        totalNetto: totalNetto,
      });
      toast.success("Data Changed", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSeries();
    getCustomer();
    getSelesman();
    getCurrency();
    getMaterial();
    getGoodsIssue();
  }, []);
  useEffect(() => {
    fetchMe();
  }, [!response]);

  const dataFetching = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/salesinvoice`);
      setGetData(data.data);
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
    dataFetching();
  }, []);

  const deleteData = async (params) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/salesorderh/${params}`);
      dataFetching();
      toast.success("Data Deleted", {
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

  const addSalesDetailOnUpdate = () => {
    if (!materialValUpdate || !QuantityUpdate) {
      toast.warn("Material and Quantity is required", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    setSalesDetailUpdate([
      ...salesDetailUpdate,
      {
        number: salesDetail.length + 1,
        materialCode: materialValUpdate,
        info: infoUpdate || getMyMaterialDetailForUpdate?.Info ? infoUpdate || getMyMaterialDetailForUpdate?.Info : "-",
        unit: getMyMaterialDetailForUpdate?.SmallestUnit,
        qty: QuantityUpdate,
        price: getMyMaterialDetailForUpdate?.DefaultPrice,
        gross: grossUpdate,
        discPercent1: 0.0,
        discPercent2: 0.0,
        discPercent3: 0.0,
        discValue: 0.0,
        discNominal: 0.0,
        netto: NettoUpdate,
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
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/salesinvoice`, {
        series: seriesVal,
        generateDocDate: generateDocDate(),
        docDate: docDate,
        customerCode: customerVal,
        salesCode: salesmanVal,
        sODocNo: getMyGoodsIssueDetail?.goodsissueh?.SODocNo,
        giDocNo: goodsIssue,
        poNo: poNo,
        top: top,
        currency: currencyVal,
        exchangeRate: exchangeRate,
        taxStatus: tax,
        taxPercent: taxVal,
        taxPrefix: taxNo,
        taxNo: taxNo2,
        discPercent: discount,
        totalGross: totalGross,
        totalDisc: discountOutput,
        taxValue: taxOutput,
        taxValueInTaxCurrency: taxOutput,
        totalNetto: totalNetto,
        totalCost: totalNetto,
        cutPPh: "",
        pPhPercent: "",
        PPhValue: "",
        information: info,
        status: "OPEN",
        printCounter: "",
        printedBy: "",
        createdBy: response.User,
        changedBy: response.User,
        detail: salesInvoiceDetail,
      });
      dataFetching();
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

  const closeModal = () => {
    setModal(false);
    setSalesDetailUpdate([]);
    setDeliveryDateUpdate("");
  };

  const updateData = async (params) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/salesorderh/${params}`, {
        customerCode: customerValUpdate,
        shipToCode: shipToValUpdate,
        taxToCode: taxToValUpdate,
        salesCode: salesmanValUpdate,
        deliveryDate: deliveryDateUpdate,
        poNo: poNoUpdate,
        top: topUpdate,
        discPercent: discountUpdate,
        taxStatus: taxUpdate,
        taxPercent: taxValUpdate,
        currency: currencyVal,
        exchangeRate: exchangeRate,
        totalGross: totalGrossUpdate,
        totalDisc: discountOutputUpdate,
        taxValue: taxOutputUpdate,
        totalNetto: totalNettoUpdate,
        information: infoUpdate,
        status: "OPEN",
        isPurchaseReturn: false,
        changedBy: response.User,
      });
      if (salesDetailUpdate) {
        await axios.patch(
          `${process.env.REACT_APP_API_BASE_URL}/salesorderd/${params}`,
          salesDetailUpdate.map((detail) => ({
            ...detail,
            materialCode: detail.materialCode,
            info: detail.info,
            unit: detail.unit,
            qty: detail.qty,
            price: detail.price,
            gross: detail.gross,
            discPercent: detail.discPercent1,
            discPercent2: detail.discPercent2,
            discPercent3: detail.discPercent3,
            discValue: detail.discValue,
            discNominal: detail.discNominal,
            netto: detail.netto,
            QtyDelivered: 0,
            QtyWO: 0,
          }))
        );
      }

      dataFetching();
      getSalesOrderDetailByDocNo(params);
      setSalesDetailUpdate([]);
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
    setTaxUpdate(modalData?.TaxStatus);
    setTaxValUpdate(modalData?.TaxPercent);
    setDiscountUpdate(modalData?.DiscPercent);
  }, [modalData.DiscPercent, modalData.TaxPercent, modalData.TaxStatus]);

  useEffect(() => {
    setShipToVal(customerVal);
    setTaxToVal(customerVal);
    setShipToValUpdate(customerValUpdate);
    setTaxToValUpdate(customerValUpdate);
    setCurrencyVal(getFCurrency.Currency);
  }, [customerVal, customerValUpdate, getFCurrency?.Currency]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl font-bold mb-4">Sales Invoice</div>
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
                <td className="text-right">Goods Issue No: </td>
                <td>
                  <select
                    onChange={(e) => {
                      setGoodsIssue(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected hidden>
                      Pilih Customer
                    </option>
                    {getMyGoodsIssue.map((res, key) => {
                      return (
                        <option value={res.DocNo} key={key}>
                          {res.DocNo}
                        </option>
                      );
                    })}
                  </select>
                </td>
                <td className="text-right">Sales Order No: </td>
                <td>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected hidden>
                      {getMyGoodsIssueDetail?.goodsissueh?.SODocNo}
                    </option>
                  </select>
                </td>
                <td></td>
                <td className="text-right">PO No: </td>
                <td>
                  <input
                    onChange={(e) => {
                      setPoNo(e.target.value);
                    }}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={poNo}
                    required
                    min="0"
                  />
                </td>
              </tr>
              <tr>
                <td className="text-right">Customer: </td>
                <td>
                  <select onChange={(e) => setCustomerVal(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected hidden>
                      {getSalesOrderHeader.CustomerCode}
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="text-right">Customer Tax To: </td>
                <td>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected hidden>
                      Pilih salesman
                    </option>
                    <option selected value={getSalesOrderHeader.CustomerCode}>
                      {getSalesOrderHeader.CustomerCode}
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="text-right">Salesman: </td>
                <td>
                  <select onChange={(e) => setSalesmanVal(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected hidden>
                      {getSalesOrderHeader.SalesCode}
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="text-right">Currency: </td>
                <td>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>{getFCurrency}</option>
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
                    placeholder="0.00"
                    required
                    value={exchangeRate}
                    // disabled
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
                    value={top}
                  />
                </td>
                <td>Days</td>
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
                <td>
                  <select
                    onChange={(e) => {
                      setTax(e.target.value);
                    }}
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
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="10.00"
                    required
                    min="0"
                  />
                </td>
                <td> % Tax</td>
                <td className="text-right">Tax No:</td>
                <td>
                  <input
                    onChange={(e) => {
                      setTaxNo(e.target.value);
                    }}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    min="0"
                    max="999"
                  />
                </td>
                <td>
                  <input
                    onChange={(e) => {
                      setTaxNo2(e.target.value);
                    }}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    min="0"
                  />
                </td>
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
            </table>
          </div>
          <div className="flex justify-between items-start">
            <table className="border-separate border-spacing-2 ">
              <tr>
                <td className="text-right">Total Gross : </td>
                <td>
                  <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" disabled value={totalGross} />
                </td>
                <td className="text-right">Total Disc: </td>
                <td>
                  <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" disabled value={discountOutput} />
                </td>
                <td className="text-right">Tax: </td>
                <td>
                  <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" disabled value={taxOutput} />
                </td>
                <td className="text-right font-bold">Total Netto: </td>
                <td>
                  <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" disabled value={totalNetto} />
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
                    Information
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    BatchNo
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
                {salesInvoiceDetail.map((res, key) => {
                  return (
                    <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{res.Number}</td>
                      <td className="px-6 py-4">{res.Code}</td>
                      <td className="px-6 py-4">{res.Info}</td>
                      <td className="px-6 py-4">{res.Location}</td>
                      <td className="px-6 py-4">{res.BatchNo}</td>
                      <td className="px-6 py-4">{res.Unit}</td>
                      <td className="px-6 py-4">{res.Qty}</td>
                      <td className="px-6 py-4">{res.Price}</td>
                      <td className="px-6 py-4">{res.Gross}</td>
                      <td className="px-6 py-4">{res.DiscPercent}</td>
                      <td className="px-6 py-4">{res.DiscPercent2}</td>
                      <td className="px-6 py-4">{res.DiscPercent3}</td>
                      <td className="px-6 py-4">{res.DiscValue}</td>
                      <td className="px-6 py-4">{res.DiscNominal}</td>
                      <td className="px-6 py-4">{res.Netto}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="pt-2 pl-4">
            <td className="text-right"></td>
            <td>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">
                Save
              </button>
            </td>
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
                    DocDate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CustomerCode
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ShipToCode
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TaxToCode
                  </th>
                  <th scope="col" className="px-6 py-3">
                    SalesCode
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DeliveryDate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PONo
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
                    Information
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    IsPurchaseReturn
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
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{res.DocNo}</td>
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
                      <td className="px-6 py-4">{res.IsPurchaseReturn === true ? "true" : "false"}</td>
                      <td className="px-6 py-4">{res.CreatedBy}</td>
                      <td className="px-6 py-4">{dateConverter(res.CreatedDate)}</td>
                      <td className="px-6 py-4">{res.ChangedBy}</td>
                      <td className="px-6 py-4">{dateConverter(res.ChangedDate)}</td>
                      <td>
                        <button onClick={() => deleteData(res.DocNo)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            setModalData(res);
                            setModal(true);
                            getSalesOrderDetailByDocNo(res.DocNo);
                          }}
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
      </form>

      <div className={`bg-slate-50 fixed w-[90%] h-[90%] top-6 left-24 rounded-lg border border-black overflow-y-scroll p-5 ${modal ? "block" : "hidden"}`}>
        <div className="space-y-6">
          <div className="text-2xl font-bold mb-4 ">DocNo: {modalData.DocNo}</div>
          <button
            onClick={() => {
              closeModal();
            }}
            className="absolute top-0 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <form>
            <table className="border-separate border-spacing-2">
              <tr>
                <td className="text-right">Series:</td>
                <td>
                  <input disabled value={modalData.Series} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </td>
              </tr>
              <tr>
                <td className="text-right">Doc Date: </td>
                <td>
                  <input disabled type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={modalData.DocDate + "T00:00"} />
                </td>
              </tr>

              <tr>
                <td className="text-right">Customer: </td>
                <td>
                  <select onChange={(e) => setCustomerValUpdate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={modalData.CustomerCode} disabled selected hidden>
                      {modalData.CustomerCode}
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
                    <option selected value={customerValUpdate}>
                      {customerValUpdate}
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="text-right">Tax To: </td>
                <td>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected value={customerValUpdate}>
                      {customerValUpdate}
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="text-right">Salesman: </td>
                <td>
                  <select onChange={(e) => setSalesmanValUpdate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={modalData.SalesCode} selected>
                      {modalData.SalesCode}
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="text-right">Delivery Date: </td>
                <td>
                  <input type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" min={modalData.DocDate + "T00:00"} value={deliveryDateUpdate || modalData.DeliveryDate + "T00:00"} onChange={(e) => setDeliveryDateUpdate(e.target.value)} />
                </td>
                <td className="text-right">PO No: </td>
                <td>
                  <input
                    onChange={(e) => {
                      setPoNoUpdate(e.target.value);
                    }}
                    placeholder={modalData.PONo}
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
                      setTopUpdate(e.target.value);
                    }}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={modalData.TOP}
                  />
                </td>
                <td>Days</td>
              </tr>
              <tr>
                <td className="text-right">Currency: </td>
                <td>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{/* <option>{getFCurrency.Currency}</option> */}</select>
                </td>
                <td className="text-right">Exchange Rate: </td>
                <td>
                  <input
                    onChange={(e) => {
                      setExchangeRateUpdate(e.target.value);
                    }}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={modalData.ExchangeRate}
                    // disabled
                  />
                </td>
              </tr>
              <tr>
                <td className="text-right">Information:</td>
                <td>
                  <input
                    onChange={(e) => {
                      setInformationUpdate(e.target.value);
                    }}
                    type="text"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={modalData.Info}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <select
                    onChange={(e) => {
                      setTaxUpdate(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option disabled selected hidden>
                      {taxUpdate}
                    </option>
                    <option value="No">No</option>
                    <option value="Include">Include</option>
                    <option value="Exclude">Exclude</option>
                  </select>
                </td>
                <td>
                  <input
                    onChange={(e) => {
                      setTaxValUpdate(e.target.value);
                    }}
                    type="number"
                    placeholder={modalData.TaxPercent}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={taxValUpdate}
                  />
                </td>
                <td> % Tax</td>
              </tr>
              <tr>
                <td className="text-right">Discount: </td>
                <td>
                  <input
                    onChange={(e) => {
                      setDiscountUpdate(e.target.value);
                    }}
                    type="number"
                    placeholder={modalData.DiscPercent}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={discountUpdate}
                  />
                </td>
                <td> %</td>
              </tr>
              <tr>
                <td className="text-right">Material:</td>
                <td>
                  <select onChange={(e) => setMaterialValUpdate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                  <input onChange={(e) => setInfoUpdate(e.target.value)} type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={infoUpdate || getMyMaterialDetailForUpdate?.Info} />
                </td>
                <td className="text-right">Quantity:</td>
                <td>
                  <input onChange={(e) => setQuantityUpdate(e.target.value)} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                </td>
                <td className="text-right">Price:</td>
                <td>
                  <input disabled type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={getMyMaterialDetailForUpdate?.DefaultPrice} />
                </td>
                <button
                  onClick={() => {
                    addSalesDetailOnUpdate();
                  }}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
                >
                  Add
                </button>
              </tr>
              <tr>
                <td className="text-right"></td>
                <td>
                  <button
                    onClick={() => {
                      updateData(modalData.DocNo);
                    }}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
                  >
                    Update
                  </button>
                </td>
              </tr>
            </table>
          </form>
          <div className="flex justify-between items-start">
            <table className="border-separate border-spacing-2 ">
              <tr>
                <td className="text-right">Total Gross : </td>
                <td>
                  <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" disabled value={totalGrossUpdate} />
                </td>
                <td className="text-right">Total Disc: </td>
                <td>
                  <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" disabled value={discountOutputUpdate} />
                </td>
                <td className="text-right">Tax: </td>
                <td>
                  <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" disabled value={taxOutputUpdate} />
                </td>
                <td className="text-right font-bold">Netto:</td>
                <td>
                  <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" disabled value={NettoUpdate} />
                </td>
              </tr>
              <tr>
                <td className="text-right font-bold">Total Netto: </td>
                <td>
                  <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" disabled value={totalNettoUpdate} />
                </td>
              </tr>
            </table>
          </div>
          <div className="text-xl font-bold mb-4">New Series Data</div>
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
                {salesDetailUpdate.map((res, key) => {
                  return (
                    <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{res.number}</td>
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
          <div>
            <div className="text-xl font-bold mb-4">Change Data</div>
            <table className="border-separate border-spacing-2">
              <tr>
                <td className="text-right">Material:</td>
                <td>
                  <select onChange={(e) => setChangeMaterialVal(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option disabled selected hidden>
                      {changeMaterialVal || "Pilih Material"}
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
                  <input onChange={(e) => setChangeInfo(e.target.value)} type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={changeInfo} />
                </td>
                <td className="text-right">Quantity:</td>
                <td>
                  <input onChange={(e) => setChangeQuantity(e.target.value)} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={changeQuantity} />
                </td>
                <td className="text-right">Price:</td>
                <td>
                  <input disabled type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={getMyMaterialDetailForChange?.DefaultPrice} />
                </td>
                <td className="text-right">Netto:</td>
                <td>
                  <input disabled type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={nettoChange} />
                </td>
                <button
                  onClick={() => {
                    changeSalesDetailData(salesDetailKey, salesDetailDocNo);
                  }}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
                >
                  Change
                </button>
              </tr>
            </table>
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Control
                  </th>
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
                {getSalesOrderDetail.map((res, key) => {
                  return (
                    <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            sendSalesDetailToInput(res, key);
                          }}
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
                        >
                          Select
                        </button>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{res.Number}</td>
                      <td className="px-6 py-4">{res.MaterialCode}</td>
                      <td className="px-6 py-4">{res.Info}</td>
                      <td className="px-6 py-4">{res.Unit}</td>
                      <td className="px-6 py-4">{res.Qty}</td>
                      <td className="px-6 py-4">{res.Price}</td>
                      <td className="px-6 py-4">{res.Gross}</td>
                      <td className="px-6 py-4">{res.DiscPercent}</td>
                      <td className="px-6 py-4">{res.DiscPercent2}</td>
                      <td className="px-6 py-4">{res.DiscPercent3}</td>
                      <td className="px-6 py-4">{res.DiscValue}</td>
                      <td className="px-6 py-4">{res.DiscNominal}</td>
                      <td className="px-6 py-4">{res.Netto}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};
