import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useMe } from "../../../hooks/API/useMe";
import { dateConverter } from '../../../components/dateConverter';
import { toast, ToastContainer } from 'react-toastify'

export const PurchaseReturn = () => {

  const { fetchMe, response } = useMe();
  const currentDate = new Date().toISOString().slice(0, 16)
  const [getData, setGetData] = useState([]);
  const [getMySeries, setGetSeries] = useState([]);
  const [series, setSeries] = useState("");
  const [getMyMaterial, setGetMaterial] = useState([]);
  const [getMyMaterialDetail, setGetMyMaterialDetail] = useState([])
  const [materialVal, setMaterialVal] = useState("");
  const [info, setInfo] = useState("")
  const [qty, setQty] = useState("");
  const [requiredDate, setRequiredDate] = useState("")
  const [detailData, setDetailData] = useState([])
  const [GetMyjobOrder, setGetJobOrder] = useState([])
  const [getMyDepartment, setGetDepartment] = useState([])
  const [docDate, setDocDate] = useState("")
  const [JODocNo, setJODocNo] = useState("")
  const [department, setDepartment] = useState("")
  const [information, setInformation] = useState("")
  const [modalData, setModalData] = useState([])
  const [modal, setModal] = useState(false)
  const [getPurchaseDetail, setGetPurchaseDetail] = useState([])
  const [getPurchaseDetailwew, setGetPurchaseDetailwew] = useState([])
  const [detailKey, setDetailKey] = useState(0);
  const [docNoChange, setDocNoChange] = useState(0);
  
  // Newly added state variables
  const [JODocNoUpdate, setJODocNoUpdate] = useState("");
  const [departmentUpdate, setDepartmentUpdate] = useState("");
  const [informationUpdate, setInformationUpdate] = useState("");

  const [seriesVal, setSeriesVal] = useState("");

  const [materialValUpdate, setMaterialValUpdate] = useState("");
  const [infoUpdate, setInfoUpdate] = useState("");
  const [qtyUpdate, setQtyUpdate] = useState("");
  const [requiredDateUpdate, setRequiredDateUpdate] = useState("");
  const [detailDataUpdate, setDetailDataUpdate] = useState([])
  const [materialValChange, setMaterialValChange] = useState("");
  const [infoChange, setInfoChange] = useState("");
  const [qtyChange, setQtyChange] = useState("");
  const [requiredDateChange, setRequiredDateChange] = useState("");

  const generateDocDate = () => {
    const today = new Date(docDate)
    const year = today.getFullYear().toString().substring(2)
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')
    return year + month + day
  }

  const dataFetching = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/purchasereturnh`
      );
      setGetData(data.data);
    } catch (error) { }
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

  const submitClick = async (e) => {
    e.preventDefault();
    if (!detailData) {
      return
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/purchasereturnh`, {
        generateDocDate: generateDocDate(),
        series: series,
        docDate: dateConverter(docDate),
        JODoNo: JODocNo,
        trip: "",
        department: department,
        information: information,
        status: "OPEN",
        createdBy: response.User,
        changedBy: response.User,
        PurchaseRequestd: detailData
      })
      dataFetching()
      toast.success('Data Created', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      })
    } catch (error) {
      toast.warn('Data Sudah Ada', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      })
    }
  }

  return (
    <div>
      <div className="text-2xl font-bold mb-4">Purchase Return</div>
      <form onSubmit={submitClick}></form>
      <div className="w-full">
        <div className="flex justify-start items-center">
          <table className="border-separate border-spacing-2 ">
            <tr>
              <td className="text-right">Series: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected hidden>
                    Pilih series
                  </option>
                  {getMySeries.map((res, key) => {
                      return (
                        <option value={res.Series} key={key}>
                          {res.Series}
                        </option>
                      )
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
              <td></td>
              <td className="text-right">Doc Date: </td>
              <td>
              <input onChange={(e) => { setDocDate(e.target.value) }} min={currentDate} type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
              </td>
            </tr>
            <tr>
              <td className="text-right">Goods Issue No: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected hidden>
                    Pilih goods receipt no
                  </option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </td>
              <td></td>
              <td className="text-right">Sales Order No: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected hidden>
                    Pilih document number
                  </option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">Supplier: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected hidden>
                    Pilih supplier
                  </option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td className="text-right">Supplier Tax To: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected hidden>
                    Pilih supplier tax
                  </option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">Supplier Doc No: </td>
              <td>
                <input
                  type="text"
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
              </td>
              <td></td>
              <td className="text-right">Supplier Tax Number: </td>
              <td>
                <input
                  type="text"
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">Tax No: </td>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
              <td>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
              </td>
              <td>
                <input
                  type="datetime-local"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">Currency: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="" disabled selected hidden>
                    Pilih currency
                  </option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </td>
              <td></td>
              <td className="text-right">Exchange Rate: </td>
              <td>
                <input
                  dir="rtl"
                  type="number"
                  className="bg-gray-50 border text-right border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0.00"
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <select
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="No">No</option>
                  <option value="Include">Include</option>
                  <option selected value="Exclude">
                    Exclude
                  </option>
                </select>
              </td>
              <td>
                <input
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
                required
              />
              <td>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">Disc: </td>
              <td>
                <input
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

        <div className="flex ml-16 justify-start items-center mb-2 gap-3 w-full pb-10">
          <label>Information:</label>
          <input
            type="text"
            className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
          />
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>

        <div></div>
        <div className="flex justify-between items-start">
          <table className="border-separate border-spacing-2 ">
            <tr>
              <td className="text-right">Print Counter</td>
              <td>-</td>
            </tr>
            <tr>
              <td className="text-right">Printed By</td>
              <td>-</td>
            </tr>
            <tr>
              <td className="text-right">Created By</td>
              <td>-</td>
            </tr>
            <tr>
              <td className="text-right">Changed By</td>
              <td>-</td>
            </tr>
            <tr>
              <td className="text-right">Status</td>
              <td>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
              </td>
            </tr>
          </table>
          <div>
            <table className="border-separate border-spacing-2 ">
              <tr>
                <td className="text-right">Total Gross: </td>
                <td>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="text-right">Total Disc:</td>
                <td>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="text-right">Tax: </td>
                <td>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="text-right">Tax IDR:</td>
                <td>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="text-right font-black">Total Netto: </td>
                <td>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
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
                  Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Info
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
          </table>
        </div>
      </div>
    </div>
  );
};
