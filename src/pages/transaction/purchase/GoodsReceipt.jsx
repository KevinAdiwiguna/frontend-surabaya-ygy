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
  const [modal, setModal] = useState(false);

  const [getMySeries, setGetSeries] = useState([]);
  const [getMySeriesVal, setGetSeriesVal] = useState("");
  const [getDocDate, setGetDocDate] = useState("");
  const [getPurchaseDocNo, setGetPurchaseDocNo] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);

  const dataFetching = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/purchaseorderh`);
      setGetData(data.data);
    } catch (error) {}
  };

  const closeModal = () => {
    setModal(false);
    setDetailDataUpdate([]);
    setInformationUpdate("");
    // setDeliveryDateUpdate('')
  };



  console.log(dataFilter);

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

  useEffect(() => {
    getSeries();
    getPurchaseOrderNo();
  }, []);

  const onCreate = async () => {
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/purchaseorderh`, {
      series: getMySeriesVal,
      docDate: getDocDate,
      supplierCode: dataFilter.SupplierCode,
    });
  };

  return (
    <div>
      <div className="text-2xl font-bold mb-4">Goods Receipt</div>
      <div className="w-[75%]">
        <div className="flex justify-start items-center">
          <table className="border-separate border-spacing-2 w-1/2">
            <tr>
              <td className="text-right">Series: </td>
              <td>
                <select onChange={(e) => setGetSeriesVal(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                <input onChange={(e) => setGetDocDate(e.target.value)} min={currentDate} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
              </td>
            </tr>
            <tr>
              <td className="text-right">Purchase Order No: </td>
              <td>
                <select
                  onChange={(e) => {
                    setDataFilter(
                      getPurchaseDocNo.find((data) => {
                        if (!data) return null;
                        return data?.DocNo === e.target.value;
                      })
                    );
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
                    {dataFilter.SupplierCode}
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

        <div className="w-full  flex gap-3 justify-center items-center mx-auto mt-10">
          <label>Information:</label>
          <input type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">
            Save
          </button>
        </div>
      </div>

      <div className="text-xl font-bold mb-4 pt-10">Detail</div>
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
                SupplierCode
              </th>
              <th scope="col" className="px-6 py-3">
                PODocNo
              </th>
              <th scope="col" className="px-6 py-3">
                BatchNo
              </th>
              <th scope="col" className="px-6 py-3">
                SupplierDlvDocNo
              </th>
              <th scope="col" className="px-6 py-3">
                VehicleNo
              </th>
              <th scope="col" className="px-6 py-3">
                Information
              </th>
              <th scope="col" className="px-6 py-3">
                Status
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
              <th scope="col" className="px-6 py-3">
                Control
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                1
              </th>
              <td className="px-6 py-4">Belum tau mau isi apa</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">KG</td>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">6/26/2023</td>
              <td className="px-6 py-4">0</td>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">
                <p>Siapa hayo</p>
              </td>
              <td className="px-6 py-4">
                <p>Siapa hayo</p>
              </td>
              <td className="px-6 py-4">
                <p>Siapa hayo</p>
              </td>
              <td className="px-6 py-4">
                <p>Siapa hayo</p>
              </td>
              <td className="px-6 py-4">
                <p>Siapa hayo</p>
              </td>
              <td className="px-6 py-4">
                <p>Siapa hayo</p>
              </td>
              <td className="px-6 py-4">
                <p>Siapa hayo</p>
              </td>
              <td className="px-6 py-4">
                <p>Siapa hayo</p>
              </td>
              <td className="px-6 py-4">
                <p>Siapa hayo</p>
              </td>
              <td className="px-6 py-4">
                <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                  Delete
                </button>
                <button
                  onClick={() => {
                    setModal(true);
                  }}
                  type="button"
                  className="focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                >
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div></div>
      </div>
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
    </div>
  );
};
