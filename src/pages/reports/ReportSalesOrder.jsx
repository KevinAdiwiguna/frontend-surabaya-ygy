import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMe } from "../../hooks/API/useMe";
import { toast, ToastContainer } from "react-toastify";
import { dateConverter } from "../../components/dateConverter";

export const ReportSalesOrder = () => {
  const { fetchMe, response } = useMe();
  const [getData, setGetData] = useState([]);
  const [getFCurrencyForUpdate, setGetFCurrencyForUpdate] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [getMyMaterialDetailForUpdate, setGetMyMaterialDetailForUpdate] =
    useState([]);
  const [getMyMaterialDetailForChange, setGetMyMaterialDetailForChange] =
    useState([]);
  const [getMySeries, setGetSeries] = useState([]);
  const [getMyCustomer, setGetMyCustomer] = useState([]);
  const [getMySelesman, setGetMySelesman] = useState([]);
  const [getMyCurrency, setGetMyCurrency] = useState([]);
  const [getMyMaterial, setGetMyMaterial] = useState([]);

  const [totalGrossUpdate, setTotalGrossUpdate] = useState(0);
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
  const [QuantityUpdate, setQuantityUpdate] = useState(0);
  const [grossUpdate, setGrossUpdate] = useState(0);
  const [discountOutputUpdate, setDiscountOutputUpdate] = useState();
  const [taxOutputUpdate, setTaxOutputUpdate] = useState(0);
  const [NettoUpdate, setNettoUpdate] = useState(0);
  const [infoUpdate, setInfoUpdate] = useState("");
  const [priceUpdate, setPriceUpdate] = useState(0);
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
  const [priceByMaterial, setPriceByMaterial] = useState([]);
  const [priceByMaterialChange, setPriceByMaterialChange] = useState([]);

  const getPriceByMaterial = async (params) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/pricematerial/${params}`
      );
      setPriceByMaterial(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedPrice, setSelectedPrice] = useState(0);

  const calculatePrice = () => {
    const selectedMaterials = priceByMaterial.filter(
      (item) => item.MaterialCode === materialValUpdate
    );

    const qty = parseFloat(QuantityUpdate);
    let foundMaterial = null;

    for (const material of selectedMaterials) {
      const minQty = parseFloat(material.MinQty);
      const maxQty = parseFloat(material.MaxQty);

      if (qty >= minQty && qty <= maxQty) {
        foundMaterial = material;
        break;
      }
    }

    let selectedPrice = foundMaterial?.Price;

    if (!foundMaterial) {
      selectedPrice = priceUpdate;
    }

    const totalPrice = selectedPrice * qty;
    setGrossUpdate(totalPrice);
    setNettoUpdate(totalPrice);
    setSelectedPrice(selectedPrice);
  };

  useEffect(() => {
    calculatePrice();
  }, [priceByMaterial, QuantityUpdate]);

  useEffect(() => {
    getPriceByMaterial(materialValUpdate);
  }, [materialValUpdate]);

  // ---------- //
  const getPriceByMaterialChange = async (params) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/pricematerial/${params}`
      );
      setPriceByMaterialChange(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedPriceChange, setSelectedPriceChange] = useState(null);

  const calculatePriceChange = () => {
    const selectedMaterials = priceByMaterialChange.filter(
      (item) => item.MaterialCode === changeMaterialVal
    );

    const qty = parseFloat(changeQuantity);
    let foundMaterial = null;

    for (const material of selectedMaterials) {
      const minQty = parseFloat(material.MinQty);
      const maxQty = parseFloat(material.MaxQty);

      if (qty >= minQty && qty <= maxQty) {
        foundMaterial = material;
        break;
      }
    }

    let selectedPrice = foundMaterial?.Price;

    if (!foundMaterial) {
      selectedPrice = changedPrice;
    }

    const totalPrice = selectedPrice * qty;

    console.log(totalPrice);
    console.log(selectedPrice);
    setGrossChange(totalPrice);
    setNettoChange(totalPrice);
    setSelectedPriceChange(selectedPrice);
  };

  useEffect(() => {
    calculatePriceChange();
  }, [priceByMaterialChange, changeQuantity]);

  useEffect(() => {
    getPriceByMaterialChange(changeMaterialVal);
  }, [changeMaterialVal]);

  const getSeries = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/seriescode/SALES ORDER`
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

  const getCurrencyByCustomerForUpdate = async (params) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/customer/${params}`
      );
      setGetFCurrencyForUpdate(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSalesOrderDetailByDocNo = async (params) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/salesorderd/${params}`
      );
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

  const getMaterialDetailForUpdate = async (params) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/material/${params}`
      );
      setGetMyMaterialDetailForUpdate(response.data);
      setPriceUpdate(response?.data.DefaultPrice);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaterialDetailForChange = async (params) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/material/${params}`
      );
      setGetMyMaterialDetailForChange(response.data);
      setChangedPrice(response?.data.DefaultPrice);
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    getMaterialDetailForUpdate(materialValUpdate);
  }, [materialValUpdate]);
  useEffect(() => {
    getMaterialDetailForChange(changeMaterialVal);
  }, [changeMaterialVal]);

  useEffect(() => {
    getCurrencyByCustomerForUpdate(customerValUpdate);
  }, [customerValUpdate]);

  const changeSalesDetailData = async (key, doc) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/salesorderd/${doc}/${key}`,
        {
          materialCode: changeMaterialVal,
          info: changeInfo,
          unit: getSalesOrderDetail[key - 1].Unit,
          qty: changeQuantity,
          price:
            selectedPriceChange || getMyMaterialDetailForChange?.DefaultPrice,
          gross: grossChange,
          discPercent: getSalesOrderDetail[key - 1].DiscPercent,
          discPercent2: getSalesOrderDetail[key - 1].DiscPercent2,
          discPercent3: getSalesOrderDetail[key - 1].DiscPercent3,
          discValue: getSalesOrderDetail[key - 1].DiscValue,
          discNominal: getSalesOrderDetail[key - 1].DiscNominal,
          netto: nettoChange,
          qtyDelivered: 0,
          qtyWO: 0,
        }
      );

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
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/salesorderh/${doc}`,
        {
          totalGross: gross,
          totalDisc: nettoDiscount,
          taxValue: tax,
          totalNetto: totalNetto,
        }
      );
      toast.success("Data Changed", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (params) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/salesorderh/${params}`
      );
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

  const dataFetching = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/salesorderh`
      );
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
        number: salesDetailUpdate.length + 1,
        materialCode: materialValUpdate,
        info:
          infoUpdate || getMyMaterialDetailForUpdate?.Info
            ? infoUpdate || getMyMaterialDetailForUpdate?.Info
            : "-",
        unit: getMyMaterialDetailForUpdate?.SmallestUnit,
        qty: QuantityUpdate,
        price: selectedPrice || getMyMaterialDetailForUpdate?.DefaultPrice,
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

  const closeModal = () => {
    setModal(false);
    setSalesDetailUpdate([]);
    setDeliveryDateUpdate("");
  };

  const updateData = async (params) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/salesorderh/${params}`,
        {
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
          currency: getFCurrencyForUpdate.Currency,
          exchangeRate: exchangeRateUpdate,
          totalGross: totalGrossUpdate,
          totalDisc: discountOutputUpdate,
          taxValue: taxOutputUpdate,
          totalNetto: totalNettoUpdate,
          information: infoUpdate,
          status: "OPEN",
          isPurchaseReturn: false,
          changedBy: response.User,
        }
      );
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
    setShipToValUpdate(customerValUpdate);
    setTaxToValUpdate(customerValUpdate);
  }, [customerValUpdate]);

  useEffect(() => {
    dataFetching();
    getSeries();
    getCustomer();
    getSelesman();
    getCurrency();
    getMaterial();
  }, []);

  useEffect(() => {
    fetchMe();
  }, [!response]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl font-bold mb-4">Report Sales Order</div>
      </div>
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
      <div
        className={`bg-slate-50 fixed w-[90%] h-[90%] top-6 left-24 rounded-lg border border-black overflow-y-scroll p-5 ${
          modal ? "block" : "hidden"
        }`}
      >
        <div className="space-y-6">
          <div className="text-2xl font-bold mb-4 ">
            DocNo: {modalData.DocNo}
          </div>
          <button
            onClick={() => {
              closeModal();
            }}
            className="absolute top-0 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
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
          <form>
            <table className="border-separate border-spacing-2">
              <tr>
                <td className="text-right">Series:</td>
                <td>
                  <input
                    disabled
                    value={modalData.Series}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </td>
              </tr>
              <tr>
                <td className="text-right">Doc Date: </td>
                <td>
                  <input
                    disabled
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={modalData.DocDate}
                  />
                </td>
              </tr>

              <tr>
                <td className="text-right">Customer: </td>
                <td>
                  <select
                    onChange={(e) => setCustomerValUpdate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option
                      value={modalData.CustomerCode}
                      disabled
                      selected
                      hidden
                    >
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
                  <select
                    onChange={(e) => setSalesmanValUpdate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value={modalData.SalesCode} selected>
                      {modalData.SalesCode}
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="text-right">Delivery Date: </td>
                <td>
                  <input
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    min={modalData.DocDate}
                    value={
                      deliveryDateUpdate || modalData.DeliveryDate
                    }
                    onChange={(e) => setDeliveryDateUpdate(e.target.value)}
                  />
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
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>{getFCurrencyForUpdate.Currency}</option>
                  </select>
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
                  <select
                    onChange={(e) => setMaterialValUpdate(e.target.value)}
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
                    onChange={(e) => setInfoUpdate(e.target.value)}
                    type="text"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={infoUpdate || getMyMaterialDetailForUpdate?.Info}
                  />
                </td>
                <td className="text-right">Quantity:</td>
                <td>
                  <input
                    onChange={(e) => setQuantityUpdate(e.target.value)}
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
                    value={
                      selectedPrice ||
                      getMyMaterialDetailForUpdate?.DefaultPrice
                    }
                  />
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
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0.00"
                    disabled
                    value={totalGrossUpdate}
                  />
                </td>
                <td className="text-right">Total Disc: </td>
                <td>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0.00"
                    disabled
                    value={discountOutputUpdate}
                  />
                </td>
                <td className="text-right">Tax: </td>
                <td>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0.00"
                    disabled
                    value={taxOutputUpdate}
                  />
                </td>
                <td className="text-right font-bold">Netto:</td>
                <td>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0.00"
                    disabled
                    value={NettoUpdate}
                  />
                </td>
              </tr>
              <tr>
                <td className="text-right font-bold">Total Netto: </td>
                <td>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0.00"
                    disabled
                    value={totalNettoUpdate}
                  />
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
          <div>
            <div className="text-xl font-bold mb-4">Change Data</div>
            <table className="border-separate border-spacing-2">
              <tr>
                <td className="text-right">Material:</td>
                <td>
                  <select
                    onChange={(e) => setChangeMaterialVal(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
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
                  <input
                    onChange={(e) => setChangeInfo(e.target.value)}
                    type="text"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={changeInfo}
                  />
                </td>
                <td className="text-right">Quantity:</td>
                <td>
                  <input
                    onChange={(e) => setChangeQuantity(e.target.value)}
                    type="number"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={changeQuantity}
                  />
                </td>
                <td className="text-right">Price:</td>
                <td>
                  <input
                    disabled
                    type="text"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={
                      selectedPriceChange ||
                      getMyMaterialDetailForChange?.DefaultPrice
                    }
                  />
                </td>
                <td className="text-right">Netto:</td>
                <td>
                  <input
                    disabled
                    type="text"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={nettoChange}
                  />
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
                    <tr
                      key={key}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
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
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {res.Number}
                      </td>
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
