import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMe } from "../../../hooks/API/useMe";
import { dateConverter } from "../../../components/dateConverter";
import { toast, ToastContainer } from "react-toastify";

export const GoodsReceipt = () => {
  const { fetchMe, response } = useMe();
  const currentDate = new Date().toISOString().slice(0, 16);
  const [getData, setGetData] = useState([]);

  const [informationUpdate, setInformationUpdate] = useState("");
  const [detailDataUpdate, setDetailDataUpdate] = useState([]);
  const [modalData, setModalData] = useState([]);
  const [Modal, setModal] = useState(false);

  const [getMySeries, setGetSeries] = useState([]);
  const [getMySeriesVal, setGetSeriesVal] = useState("");
  const [getDocDate, setGetDocDate] = useState();
  const [getPurchaseDocNo, setGetPurchaseDocNo] = useState([]);
  const [purchaseOrderNo, setPurchaseOrderNo] = useState()
  const [purchaseOrderDetail, setPurchaseOrderDetail] = useState([])
  const [purchaseOrderHeader, setPurchaseOrderHeader] = useState([])
  const [Location, setGetLocation] = useState([])
  const [supplyDeliveryNo, setSupplyDeliveryNo] = useState("")
  const [vehicleNo, setVehicleNo] = useState("")
  const [information, setInformation] = useState("")


  const handleReset = () => {
    setGetSeriesVal("")
    setGetDocDate("00/00/0000")
    setPurchaseOrderNo("")
    setSupplyDeliveryNo("")
    setPurchaseOrderHeader('')
    setPurchaseOrderDetail([])
    setVehicleNo("")
    setInformation("")
    purchaseOrderDetail([])
  }


  const closeModal = () => {
    setModal(false);
    setDetailDataUpdate([]);
    setInformationUpdate("");
    // setDeliveryDateUpdate('')
  };

  const getLocation = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/location`);
    setGetLocation(response.data)
  }

  const getSeries = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/seriesCode/GOODS RECEIPT`);
      setGetSeries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPurchaseOrderNo = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/purchaseorderh/PRINTED`);
      setGetPurchaseDocNo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [AllDocNo, setAllDOcNo] = useState([]);

  const getAllDocNo = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/goodsreceipth`
    );
    setAllDOcNo(response.data);
  };

  const handleChangeDataAPI = (key, field, value) => {
    setPurchaseOrderDetail((prevData) =>
      prevData.map((data, index) => {
        if (index === key) {
          return {
            ...data,
            [field]: value,
          };
        }
        return data;
      })
    );
  };

  const getPurchaseOrder = async (params) => {
    try {
      const detail = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/goodsreceiptdetail/${params}`)
      const header = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/purchaseorderh/${params}`)
      // const modifiedData = detail.data.map(item => {
      // 	const { Qty, Number, MaterialCode, Info, Unit, ...rest } = item;
      // 	return { ...rest, QtyPOTotal: Qty, qty: 0,info: Info, unit: Unit, number: Number, materialCode: MaterialCode};
      // });

      setPurchaseOrderDetail(detail.data)
      setPurchaseOrderHeader(header.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPurchaseOrder(purchaseOrderNo)
  }, [purchaseOrderNo])

  useEffect(() => {
    getSeries();
    getPurchaseOrderNo();
    getLocation()
    getAllDocNo()
  }, []);

  useEffect(() => {
    console.log(purchaseOrderDetail)
  }, [purchaseOrderDetail])

  const generateDocDate = () => {
    const today = new Date(getDocDate);
    const year = today.getFullYear().toString().substring(2);
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return year + month + day;
  };


  const submitClick = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/goodsreceipth`, {
        generateDocDate: generateDocDate(),
        series: getMySeriesVal,
        docDate: getDocDate,
        supplierCode: purchaseOrderHeader.SupplierCode,
        PODocNo: purchaseOrderNo,
        supplierDlvDocNo: supplyDeliveryNo,
        vehicleNo: vehicleNo,
        information: information,
        printCounter: 0,
        printedBy: "",
        status: "OPEN",
        createdBy: response?.User,
        changedBy: response?.User,
        GoodReceiptd: purchaseOrderDetail
      })
      toast.success("Data Created", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      handleReset()
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
    fetchMe()
  }, [!response])

  return (
    <div>
      <div className="text-2xl font-bold mb-4">Goods Receipt</div>
      <div className="w-[75%]">
        <div className="flex justify-start items-center">
          <table className="border-separate border-spacing-2 w-1/2">
            <tr>
              <td className="text-right">Series: </td>
              <td>
                <select value={getMySeriesVal} onChange={(e) => setGetSeriesVal(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                <input value={getDocDate} onChange={(e) => setGetDocDate(e.target.value)} min={currentDate} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
              </td>
            </tr>
            <tr>
              <td className="text-right">Purchase Order No: </td>
              <td>
                <select
                  value={purchaseOrderNo}
                  onChange={(e) => {
                    setPurchaseOrderNo(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" disabled selected hidden>
                    Pilih nomor purchase order
                  </option>
                  {getPurchaseDocNo.map((res, key) => {
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

          <table className="border-separate border-spacing-2 w-1/2">
            <tr>
              <td className="text-right">Supplier: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected hidden>
                    {purchaseOrderHeader.SupplierCode}
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">Supply Delivery No: </td>
              <td>
                <input value={supplyDeliveryNo} onChange={(e) => { setSupplyDeliveryNo(e.target.value) }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </td>
            </tr>
            <tr>
              <td className="text-right">Vehicle No: </td>
              <td>
                <input value={vehicleNo} onChange={(e) => { setVehicleNo(e.target.value) }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </td>
            </tr>
            <tr>
              <td className="text-right">Batch No: </td>
              <td>
                <input disabled type="text" className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </td>
            </tr>
          </table>
        </div>

        <div className="w-full  flex gap-3 justify-center items-center mx-auto mt-10">
          <label>Information:</label>
          <input value={information} onChange={(e) => setInformation(e.target.value)} type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
          <button onClick={submitClick} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">
            Save
          </button>
          <button
            type="button"
            onClick={() => setModal(!Modal)}
            className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none mx-auto dark:focus:ring-yellow-800"
          >
            Update
          </button>
        </div>
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
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Unit
              </th>
              <th scope="col" className="px-6 py-3">
                QtyPOTotal
              </th>
              <th scope="col" className="px-6 py-3">
                QtyPORemain
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrderDetail.map((res, key) => {
              return (
                <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {res.Number}
                  </th>
                  <td className="px-6 py-4">{res.MaterialCode}</td>
                  <td className="px-6 py-4"><input type="text" onChange={(e) => handleChangeDataAPI(key, "Info", e.target.value)} className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /></td>
                  <td className="px-6 py-4">
                    <select onChange={(e) => handleChangeDataAPI(key, "Location", e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required>
                      <option value="">Pilih Location</option>
                      {Location.map((loc, locKey) => {
                        return (
                          <option key={locKey} value={loc.Code}>
                            {loc.Code}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td className="px-6 py-4">{res.Unit}</td>
                  <td className="px-6 py-4">{res.QtyPOTotal}</td>
                  <td className="px-6 py-4">{res.QtyRemain}</td>
                  <td className="px-6 py-4">
                    <input type="number" onChange={(e) => handleChangeDataAPI(key, "Qty", e.target.value)} className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1.00" />

                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div></div>
      </div>
      <div className={`bg-slate-50 fixed w-[90%] h-[90%] top-6 left-24 rounded-lg border border-black overflow-y-scroll p-5 ${Modal ? "block" : "hidden"}`}>
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
          <form onSubmit="">
            <div className="w-[75%]">
              <div className="flex justify-start items-center">
                <table className="border-separate border-spacing-2 w-1/2">
                  <tr>
                    <td className="text-right">Series: </td>
                    <td>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected hidden>
                          {modalData.Series}
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right font-black">Doc Date: </td>
                    <td>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected hidden>
                          {modalData.Series}
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Doc Date: </td>
                    <td>
                      <input value={modalData.DocDate + "T00:00"} min={currentDate} type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Series: </td>
                    <td>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected hidden>
                          {modalData.Series}
                        </option>
                      </select>
                    </td>
                  </tr>
                </table>
                <table className="border-separate border-spacing-2">
                  <tr>
                    <td className="text-right">Supplier: </td>
                    <td>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected hidden>
                          Pilih supplier
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Supply Delivery No: </td>
                    <td>
                      <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Vehicle No: </td>
                    <td>
                      <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Batch No: </td>
                    <td>
                      <input type="number" className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="w-[75%] flex gap-3 items-center">
              <label>Information:</label>
              <input
                placeholder={modalData.Information}
                onChange={(e) => {
                  setInformationUpdate(e.target.value);
                }}
                type="text"
                className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                value={informationUpdate}
              />
            </div>
            <div className="pl-[100px] my-2">
              <button onClick="" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">
                Update
              </button>
            </div>
          </form>
          <div className="relative overflow-x-auto">
            <div className="text-xl font-bold">New Detail Data:</div>
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
                    Unit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Required Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    QtyPO
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Control
                  </th>
                </tr>
              </thead>
              <tbody>
                {detailDataUpdate.map((res, key) => {
                  return (
                    <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {res.materialCode}
                      </th>
                      <td className="px-6 py-4">{res.info}</td>
                      <td className="px-6 py-4">{res.unit}</td>
                      <td className="px-6 py-4">{res.qty}</td>
                      <td className="px-6 py-4">{res.requiredDate}</td>
                      <td className="px-6 py-4">{res.qtyPO}</td>
                      <td className="px-6 py-4">
                        <button onClick="" type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                          delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div></div>
          </div>
          <div>
            <table className="border-separate border-spacing-2">
              <tr>
                <td className="text-right">Info:</td>
                <td>
                  <input type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value="" />
                </td>
                <td className="text-right">Quantity:</td>
                <td>
                  <input value="" type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min="0" />
                </td>
                <td className="text-right">Required Date:</td>
                <td>
                  <input min={currentDate} type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </td>
                <button onClick="" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">
                  Change
                </button>
              </tr>
            </table>
          </div>
          <div className="relative overflow-x-auto">
            <div className="text-xl font-bold">Detail:</div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Control
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
                    Required Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    QtyPO
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    <button onClick="" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">
                      Select
                    </button>
                  </td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                </tr>
              </tbody>
            </table>
            <div></div>
          </div>
        </div>
      </div>
      <ModalComp
        Modal={Modal}
        setModal={setModal}
        Location={Location}
        AllDocNo={AllDocNo}
        getSeries={getSeries}
        getAllDocNo={getAllDocNo}
        response={response}
      />
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};


export const ModalComp = (params) => {
  const {
    Modal,
    setModal,
    Location,
    AllDocNo,
    getSeries,
    getSalesOrderNo,
    getAllDocNo,
    response,
  } = params;
  const [DetailDocNo, setDetailDocNo] = useState([]);

  const [QtyRemain, setQtyRemain] = useState([]);
  const [updatedQty, setUpdatedQty] = useState({});
  const [PoNo, setPoNo] = useState("");
  const [VehicleNo, setVehicleNo] = useState("");
  const [Information, setInformation] = useState("");
  const [TotalQty, setTotalQty] = useState();
  const [DocNo, setDocNo] = useState("");
  const [header, setHeader] = useState([]);

  const getDetailDocNo = async (params) => {

    if (params !== "Pilih") {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/goodsreceiptdetailUpdate/${params}`
      );
      setDocNo(params);
      if (response && response.data && response.data.length > 0) {
        const customerPromises = response.data.map((item) => {
          return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/material/${item.MaterialCode}`
          );
        });

        const customerResponses = await Promise.all(customerPromises);

        const updatedResponse = response.data.map((item, index) => {
          const customer = customerResponses[index].data;
          return {
            ...item,
            Name: customer.Name,
          };
        });
        setDetailDocNo(updatedResponse)
      }

      const filteredHeader = await AllDocNo.filter((item) => item.DocNo === params)
      setHeader(filteredHeader)
      return
    }
    setDetailDocNo([])
    setHeader([])
  };

  const handleDelete = async (parmas) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/goodsreceipth/${parmas}`
      );
      toast.success("Data Deleted", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      setModal(false);
      getSeries();
      setDetailDocNo([]);
      getAllDocNo();
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

  const handleChangeDataAPI = (key, field, value) => {
    setDetailDocNo((prevDetailDocNo) =>
      prevDetailDocNo.map(
        (data, index) => {
          if (index === key) {
            return {
              ...data,
              [field]: value,
            };
          }
          return data;
        }
      ));

    // Update the updatedQty state
    setUpdatedQty((prevUpdatedQty) => ({
      ...prevUpdatedQty,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/goodsreceipth/${DocNo}`,
        {
          supplierDlvDocNo: PoNo,
          vehicleNo: VehicleNo,
          information: Information,
          changedBy: response?.User,
          details: DetailDocNo,
        }
      );
      setModal(false);
      setPoNo("")
      setVehicleNo("")
      setInformation("")
      setDetailDocNo([]);
      setDocNo("")
      getAllDocNo();
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

  const [supplierDetail, setSupplierDetail] = useState([])
  const getSupplierDetail = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/supplier/${header[0]?.SupplierCode}`)
    setSupplierDetail(res.data)
  }

  const [printModal, setPrintModal] = useState(false);
  const [printed, setPrinted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    checkPrint();
  }, [printed]);

  const checkPrint = async () => {
    if (printed) {
      try {
        await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/goodsreceiptprint/${DocNo}`, {
          printedBy: response?.User
        })
        setPrinted(false);
        setModal(false);
        setPoNo("")
        setVehicleNo("")
        setInformation("")
        setDetailDocNo([]);
        setDocNo("")
        getAllDocNo();
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

  // const [customer, setCustomer] = useState("");

  // const getCustomerByDocNo = async (params) => {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/customer/${params}`
  //     );
  //     setCustomer(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getCustomerByDocNo(DetailDocNo?.goodsissueh?.CustomerCode);
  //   console.log(DetailDocNo)
  // }, [DetailDocNo]);

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
            <div className="w-full flex justify-between pl-4 py-4 border-black border-b">
              <div>
                <div className="font-bold text-3xl">
                  CV. Gemilang Multi Kreasi
                </div>
                <div className="font-bold text-lg">
                  Jl. Berbek Industri 3 / 15 Sidoarjo
                </div>
              </div>
              <div className="mr-4">
                <div className="font-bold text-xl">
                  BUKTI PENERIMAAN BARANG
                </div>
                <div>
                  <div>
                    DITERIMA DARI:
                  </div>
                  <div className="text-sm">
                    {supplierDetail?.Name}
                  </div>
                  <div className="text-sm">
                    {supplierDetail?.Address}
                  </div>
                  <div className="text-sm">
                    {supplierDetail?.City}
                  </div>
                  <div>
                    UP : {supplierDetail?.Contact}
                  </div>
                  <div>
                    Telp/Fax : {supplierDetail?.Phone} / {supplierDetail?.Fax}
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-4 my-2">
              <table>
                <tr className="flex gap-20">
                  <td>No Bukti: {header[0]?.DocNo}</td>
                  <td>Tanggal: {header[0]?.DocDate}</td>
                  <td>No Batch: {header[0]?.BatchNo}</td>
                  <td>No PO: {header[0]?.PODocNo}</td>
                </tr>
              </table>
              <table>
                <tr className="flex gap-20">
                  <td>SJ Supllier : {header[0]?.SupplierDlvDocNo}</td>
                  <td>Nopol : {header[0]?.VehicleNo}</td>
                  <td>Cetakan ke: {header[0]?.PrintCounter}</td>
                  <td>{response?.Name}</td>
                </tr>
              </table>
              <div>
                Keterangan: {header[0]?.Information}
              </div>
            </div>
            <div className="relative overflow-x-auto border-t border-black pt-6">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase">
                  <tr>
                    <th scope="col" className="px-14 py-3 text-center">
                      Kode Barang
                    </th>
                    <th scope="col" className="px-14 py-3 text-center">
                      Nama Barang
                    </th>
                    <th scope="col" className="px-14 py-3 text-center">
                      Lokasi
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      satuan
                    </th>
                  </tr>
                </thead>
                {DetailDocNo?.map((res, key) => {
                  return (
                    <tbody>
                      <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-2 text-center">
                          {res.MaterialCode}
                        </td>
                        <td className="px-6 py-2 text-center">{res.Name}</td>
                        <td className="px-6 py-2 text-center">{res.Location}</td>
                        <td className="px-6 py-2 text-center">{res.Qty}</td>
                        <td className="px-6 py-2 text-center">{Math.floor(res.Unit)}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
          <div className="border-black border-t py-4 px-4 flex justify-between">
            <div className="flex pl-20 gap-[100px] ">
              <div className="p-2">
                <div>Dibuat Oleh</div>
                <div className="h-[100px]"></div>
              </div>
              <div className="p-2">
                <div>Mengetahui</div>
                <div className="h-[100px]"></div>
              </div>
              <div className="p-2">
                <div>Menyetujui</div>
                <div className="h-[100px]"></div>
              </div>
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
                    onChange={(e) => {
                      getDetailDocNo(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected >Pilih</option>
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
            <hr />
            <table className="text-sm w-full text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="w-14 px-4">Supply Delivery No</th>
                  <div className="my-1">
                    <input
                      onChange={(e) => setPoNo(e.target.value)}
                      type="text"
                      value={PoNo}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={header[0]?.SupplierDlvDocNo}

                    />
                  </div>
                </tr>
                <tr>
                  <th className="w-14 px-4">Vehicle No</th>
                  <div className="my-1">
                    <input
                      onChange={(e) => setVehicleNo(e.target.value)}
                      type="text"
                      value={VehicleNo}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={header[0]?.VehicleNo}

                    />
                  </div>
                </tr>
                <tr>
                  <th className="w-14 px-4">Information</th>
                  <div className="my-1">
                    <input
                      onChange={(e) => setInformation(e.target.value)}
                      type="text"
                      value={Information}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={header[0]?.Information}

                    />
                  </div>
                </tr>
                <div>
                  <td className="flex gap-4">
                    <button
                      onClick={() => handleSave()}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
                    >
                      Save
                    </button>
                    <button
                      onClick={async () => {
                        await getSupplierDetail()
                        handlePrint()
                      }}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none mx-auto dark:focus:ring-blue-800"
                    >
                      Print
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(header[0]?.DocNo)
                      }
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none  mx-auto dark:focus:ring-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </div>
              </thead>
            </table>

            <div className="relative overflow-x-auto pt-10">
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
                      Information
                    </th>
                    <th scope="col" className="px-14 py-3">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Unit
                    </th>
                    <th scope="col" className="px-6 py-3">
                      QtySOTotal
                    </th>
                    <th scope="col" className="px-6 py-3">
                      QtySORemain
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                  </tr>
                </thead>
                {DetailDocNo.map((res, key) => {
                  return (
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">
                          <td className="px-6 py-4">
                            <button
                              type="button"
                              className="focus:outline-none text-white bg-red-900 hover:bg-red-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </td>
                        <td className="px-6 py-4">{res.Number}</td>
                        <td className="px-6 py-4">{res.MaterialCode}</td>
                        <td className="px-6 py-4">
                          <input
                            onChange={(e) =>
                              handleChangeDataAPI(key, "Info", e.target.value)
                            }
                            type="text"
                            className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            defaultValue={res.Info}
                            placeholder={res.Info}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <select
                            onChange={(e) =>
                              handleChangeDataAPI(
                                key,
                                "Location",
                                e.target.value
                              )
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Isi kode"
                            required
                          >
                            <option value="" disabled hidden>
                              Pilih Location
                            </option>
                            {Location.map((res, key) => {
                              return (
                                <option key={key} value={res.Code}>
                                  {res.Code}
                                </option>
                              );
                            })}
                          </select>
                        </td>
                        <td className="px-6 py-4">{res.Unit}</td>
                        <td className="px-6 py-4">{res.QtyTotal}</td>
                        <td className="px-6 py-4">
                          {res.QtyRemain}
                        </td>
                        <td className="px-6 py-4">
                          <input
                            onChange={(e) =>
                              handleChangeDataAPI(key, "Qty", e.target.value)
                            }
                            type="number"
                            className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={res.Qty}
                            defaultValue={res.Qty}
                          />
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};