import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMe } from "../../../hooks/API/useMe";
import { dateConverter } from "../../../components/dateConverter";
import { toast, ToastContainer } from "react-toastify";

export const PurchaseInvoice = () => {
  const { fetchMe, response } = useMe();
  const currentDate = new Date().toISOString().slice(0, 16);
  const [getMySeries, setGetMySeries] = useState([]);
  const [docDate, setDocDate] = useState(currentDate);
  const [getMyGoodsReceipt, setGetMyGoodsReceipt] = useState([]);
  const [getMyGoodsReceiptDetail, setGetGoodsReceiptDetail] = useState([]);
  const [goodsReceiptDocNo, setGoodsReceiptDocNo] = useState("");
  const [top, setTop] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [supplierInvoiceNo, setSupplierInvoiceNo] = useState("");
  const [getMyPurchaseInvoiceDetail, setGetPurchaseInvoiceDetail] = useState([]);
  const [totalGross, setTotalGross] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState("No");
  const [taxVal, setTaxVal] = useState(0);
  const [info, setInfo] = useState("");
  const [discountOutput, setDiscountOutput] = useState(0);
  const [taxOutput, setTaxOutput] = useState(0);
  const [totalNetto, setTotalNetto] = useState(0);
  const [cutPph, setCutPph] = useState();
  const [cutPphVal, setCutPphVal] = useState(0);
  const [cutPphPercent, setCutPphPercent] = useState(0);
  const [taxNo, setTaxNo] = useState("");
  const [taxNo2, setTaxNo2] = useState("");
  const [series, setSeries] = useState("");
  const [getMyJobOrder, setGetJobOrder] = useState([]);
  const [jobOrder, setJobOrder] = useState("");
  const [costDistribution, setCostDistribution] = useState("Manual");

  const handleReset = () => {
    setSeries("");
    setDocDate("");
    setGetGoodsReceiptDetail(0);
    setJobOrder("");
    setSupplierInvoiceNo("");
    setCostDistribution("")
    setTop("");
    setTax("");
    setTaxVal(0);
    setTaxNo("");
    setTaxNo2("");
    setDiscount("");
    setInfo("");
    setCutPph("");
    setCutPphPercent(0);
    setGoodsReceiptDocNo("")
    setGetPurchaseInvoiceDetail([])
  };


  useEffect(() => {
    setCutPphVal((cutPphPercent * totalNetto) / 100);
  }, [cutPphPercent, totalNetto]);

  const getSeries = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/seriesCode/PURCHASE INVOICE`
      );
      setGetMySeries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getJobOrder = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/joborder`
      );
      setGetJobOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGoodsReceipt = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/goodsreceipth`
      );
      setGetMyGoodsReceipt(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPurchaseInvoiceDetail = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/purchaseinvoicedetail/${goodsReceiptDocNo}`
      );
      const modifiedData = response.data.map((item) => {
        const {
          Code,
          Info,
          Location,
          Unit,
          Qty,
          Price,
          Gross,
          DiscPercent,
          DiscPercent2,
          DiscPercent3,
          DiscNominal,
          DiscValue,
          Netto,
          Number,
          ...rest
        } = item;
        return {
          ...rest,
          materialCode: Code,
          info: Info,
          location: Location,
          unit: Unit,
          qty: Qty,
          mass: Qty,
          volume: Qty,
          price: Price,
          gross: Gross,
          discPercent: DiscPercent,
          discPercent2: DiscPercent2,
          discPercent3: DiscPercent3,
          discNominal: DiscNominal,
          discValue: DiscValue,
          netto: Netto,
          number: Number,
          cost: 0,
        };
      });
      setGetPurchaseInvoiceDetail(modifiedData);
    } catch (error) {
      console.log(error);
    }
  };

  const [getFCurrency, setGetFCurrency] = useState([]);

  const getCurrencyBySupplier = async (params) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/supplier/${params}`
      );
      setGetFCurrency(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrencyBySupplier(getMyGoodsReceiptDetail[0]?.SupplierCode);
  }, [getMyGoodsReceiptDetail[0]?.SupplierCode]);

  const [disabled, setDisabled] = useState(false);

  const checkExchangeRate = () => {
    if (getFCurrency?.Currency === "IDR") {
      setDisabled(true);
      setExchangeRate(1.0);
    } else {
      setDisabled(false);
    }
  };

  useEffect(() => {
    checkExchangeRate();
  }, [getFCurrency?.Currency]);

  const handleChangeDataAPI = (key, field, value) => {
    setGetPurchaseInvoiceDetail((prevData) =>
      prevData.map((data, index) => {
        if (index === key) {
          const newData = {
            ...data,
            [field]: value,
          };
          newData.gross = newData.qty * newData.price;

          // Calculate discValue
          const discValue = parseFloat(newData.discValue) || 0;
          newData.discValue = discValue;

          // Calculate discNominal
          const discPercent1 = parseFloat(newData.discPercent) || 0;
          const discPercent2 = parseFloat(newData.discPercent2) || 0;
          const discPercent3 = parseFloat(newData.discPercent3) || 0;

          if (discPercent1 || discPercent2 || discPercent3) {
            newData.netto =
              newData.gross *
              (1 - discPercent1 / 100) *
              (1 - discPercent2 / 100) *
              (1 - discPercent3 / 100);
          } else {
            newData.netto = newData.gross - discValue;
          }
          newData.discNominal = newData.gross - newData.netto;
          return newData;
        }
        return data;
      })
    );
  };

  useEffect(() => {
    getPurchaseInvoiceDetail();
    const filteredData = getMyGoodsReceipt.filter(
      (obj) => obj.DocNo === goodsReceiptDocNo
    );
    setGetGoodsReceiptDetail(filteredData);
  }, [goodsReceiptDocNo]);

  const calculateTotalGross = () => {
    let total = 0;
    for (let i = 0; i < getMyPurchaseInvoiceDetail.length; i++) {
      let obj = getMyPurchaseInvoiceDetail[i];
      let nettoAsInteger = parseInt(obj.netto);
      total += nettoAsInteger;
    }
    setTotalGross(total);
  };

  useEffect(() => {
    calculateTotalGross();
  }, [getMyPurchaseInvoiceDetail]);

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
    getGoodsReceipt();
    getJobOrder();
  }, []);

  useEffect(() => {
    fetchMe();
  }, [!response]);

  const generateDocDate = () => {
    const today = new Date(docDate);
    const year = today.getFullYear().toString().substring(2);
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return year + month + day;
  };

  const submitClick = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/purchaseinvoice`,
        {
          generateDocDate: generateDocDate(),
          series,
          docDate: docDate,
          poDocNo: getMyGoodsReceiptDetail[0]?.PODocNo,
          joDocNo: jobOrder,
          trip: "",
          transactionType: "",
          grDocNo: goodsReceiptDocNo,
          batchNo: getMyGoodsReceiptDetail[0]?.BatchNo,
          supplierCode: getMyGoodsReceiptDetail[0]?.SupplierCode,
          supplierTaxTo: getMyGoodsReceiptDetail[0]?.SupplierCode,
          supplierInvNo: supplierInvoiceNo,
          top: top,
          currency: getFCurrency?.Currency,
          exchangeRate: exchangeRate,
          totalCost: 0,
          costDistribution: costDistribution,
          taxStatus: tax,
          taxPercent: taxVal,
          taxPrefix: taxNo,
          taxNo: taxNo2,
          discPercent: discount,
          totalGross,
          totalDisc: discountOutput,
          downPayment: 0,
          taxValue: taxOutput,
          taxValueInTaxCur: taxOutput,
          totalNetto,
          cutPPh: cutPph,
          pphPercent: cutPphPercent,
          pphValue: cutPphVal,
          information: info,
          status: "OPEN",
          printCounter: 0,
          createdBy: response?.User,
          changedBy: response?.User,
          details: getMyPurchaseInvoiceDetail,
        }
      );
      toast.success("Data Created", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      handleReset();
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

  return (
    <div>
      <div className="text-2xl font-bold mb-4">Purchase Invoice</div>
      <div className="w-full">
        <div className="flex justify-start items-center">
          <table className="border-separate border-spacing-2 ">
            <tr>
              <td className="text-right">Series: </td>
              <td>
                <select
                  value={series}
                  onChange={(e) => setSeries(e.target.value)}
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
                  value={docDate}
                  onChange={(e) => setDocDate(e.target.value)}
                  min={currentDate}
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
              </td>
            </tr>


            <tr>
              <td className="text-right">Goods Receipt No: </td>
              <td>
                <select
                  value={goodsReceiptDocNo}
                  onChange={(e) => {
                    setGoodsReceiptDocNo(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" disabled selected hidden>
                    Pilih goods receipt no
                  </option>
                  {getMyGoodsReceipt.map((res, key) => {
                    return (
                      <option value={res.DocNo} key={key}>
                        {res.DocNo}
                      </option>
                    );
                  })}
                </select>
              </td>
              <td className="text-right">Batch No: </td>
              <td>
                <input
                  type="number"
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={getMyGoodsReceiptDetail[0]?.BatchNo}
                  disabled
                />
              </td>
              <td className="text-right">Purchase Order No: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected hidden>
                    {getMyGoodsReceiptDetail[0]?.PODocNo}
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">Supplier: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected hidden>
                    {getMyGoodsReceiptDetail[0]?.SupplierCode}
                  </option>
                </select>
              </td>
              <td></td>
              <td></td>
              <td className="text-right">Job Order No: </td>
              <td>
                <select
                  value={jobOrder}
                  onChange={(e) => {
                    setJobOrder(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" disabled selected hidden>
                    Pilih job order no
                  </option>
                  {getMyJobOrder.map((res, key) => {
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
              <td className="text-right">Supplier Tax To: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected hidden>
                    {getMyGoodsReceiptDetail[0]?.SupplierCode}
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">Supplier Invoice No: </td>
              <td>
                <input
                  onChange={(e) => {
                    setSupplierInvoiceNo(e.target.value);
                  }}
                  type="text"
                  value={supplierInvoiceNo}
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
              </td>
              <td> </td>
              <td className="text-right">Term of Payment: </td>
              <td>
                <input
                  onChange={(e) => setTop(e.target.value)}
                  value={top}
                  dir="rtl"
                  type="number"
                  className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  required
                />
              </td>
              <td>days</td>
            </tr>
            <tr>
              <td className="text-right">Currency: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected hidden>
                    {getFCurrency?.Currency}
                  </option>
                </select>
              </td>
              <td> </td>
              <td className="text-right">Exchange Rate: </td>
              <td>
                <input
                  onChange={(e) => {
                    setExchangeRate(e.target.value);
                  }}
                  value={exchangeRate}
                  dir="rtl"
                  type="number"
                  className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  disabled={disabled}
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">Total Cost: </td>
              <td>
                <input
                  dir="rtl"
                  type="number"
                  className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0.00"
                  disabled
                />
              </td>
              <td className="text-center text-xl">=</td>
              <td>
                <input
                  dir="rtl"
                  type="number"
                  className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0.00"
                  disabled
                />
              </td>
              <td>IDR</td>
            </tr>
            <tr>
              <td className="text-right">Cost Distribution: </td>
              <td>
                <select
                  value={costDistribution}
                  onChange={(e) => {
                    setCostDistribution(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="Manual">Manual</option>
                </select>
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
                  <option selected value="" >Pilih</option>
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
                  required
                  min="0"
                />
              </td>
              <td>% Tax</td>
              <td className="text-right">Tax No: </td>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                onChange={(e) => {
                  setTaxNo(e.target.value);
                }}
                value={taxNo}
              />
              <td>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  onChange={(e) => {
                    setTaxNo2(e.target.value);
                  }}
                  value={taxNo2}
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">Disc: </td>
              <td>
                <input
                  onChange={(e) => {
                    setDiscount(e.target.value);
                  }}
                  value={discount}
                  dir="rtl"
                  type="number"
                  className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0.00"
                  required
                />
              </td>
              <td>%</td>
            </tr>
          </table>
        </div>

        <div className="flex ml-16 justify-start items-center mb-2 gap-3 w-full">
          <label>Information:</label>
          <input
            onChange={(e) => {
              setInfo(e.target.value);
            }}
            value={info}
            type="text"
            className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
          />
          <button
            onClick={submitClick}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
        <div className="flex ml-16 justify-start items-center mb-10 gap-3 w-full">
          We cut PPh
          <div>
            <input
              onChange={(e) => {
                setCutPph(e.target.checked);
              }}
              value={cutPph}
              type={"checkbox"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue -500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
            />
          </div>
          <div>
            <input
              onChange={(e) => setCutPphPercent(e.target.value)}
              value={cutPphPercent}
              dir="rtl"
              type="number"
              className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0.00"
              required
            />
          </div>
          <div>%</div>
          <div className="ml-10">=</div>
          <div>
            <input
              value={cutPphVal}
              dir="rtl"
              type="number"
              className="bg-gray-200 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="0.00"
              disabled
            />
          </div>
          <div>IDR</div>
        </div>

        <div></div>
        <div className="flex justify-between items-end">
          <div>
            <table className="border-separate border-spacing-2 ">
              <tr>
                <td className="text-right">Total Gross: </td>
                <td>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    disabled
                    value={totalGross}
                  />
                </td>
                <td className="text-right">Total Disc:</td>
                <td>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    disabled
                    value={discountOutput}
                  />
                </td>
                <td className="text-right">Tax: </td>
                <td>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    disabled
                    value={taxOutput}
                  />
                </td>
                <td className="text-right">Tax IDR:</td>
                <td>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    disabled
                    value={taxOutput * exchangeRate}
                  />
                </td>
                <td className="text-right font-black">Total Netto: </td>
                <td>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    disabled
                    value={totalNetto}
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div className="text-xl font-bold mb-4 pt-10">Detail</div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Info
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Unit
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Mass
                </th>
                <th scope="col" className="px-6 py-3">
                  Volume
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
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {getMyPurchaseInvoiceDetail.map((res, key) => {
                return (
                  <tr
                    key={key}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {res.materialCode}
                    </th>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        placeholder={res.info}
                        onChange={(e) =>
                          handleChangeDataAPI(key, "info", e.target.value)
                        }
                        className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">{res.location}</td>
                    <td className="px-6 py-4">{res.unit}</td>
                    <td className="px-6 py-4">{res.qty}</td>
                    <td className="px-6 py-4">{res.mass}</td>
                    <td className="px-6 py-4">{res.volume}</td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        placeholder={res.price}
                        onChange={(e) =>
                          handleChangeDataAPI(key, "price", e.target.value)
                        }
                        className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">{res.gross}</td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        onChange={(e) =>
                          handleChangeDataAPI(
                            key,
                            "discPercent",
                            e.target.value
                          )
                        }
                        className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="1.00"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        onChange={(e) =>
                          handleChangeDataAPI(
                            key,
                            "discPercent2",
                            e.target.value
                          )
                        }
                        className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="1.00"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        onChange={(e) =>
                          handleChangeDataAPI(
                            key,
                            "discPercent3",
                            e.target.value
                          )
                        }
                        className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="1.00"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        onChange={(e) =>
                          handleChangeDataAPI(key, "discValue", e.target.value)
                        }
                        className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="1.00"
                      />
                    </td>
                    <td className="px-6 py-4">{res.discNominal}</td>
                    <td className="px-6 py-4">{res.netto}</td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        onChange={(e) =>
                          handleChangeDataAPI(key, "cost", e.target.value)
                        }
                        className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="1.00"
                      />
                    </td>
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
