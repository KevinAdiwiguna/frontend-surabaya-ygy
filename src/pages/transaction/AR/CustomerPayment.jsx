import React, {useState, useEffect} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {useMe} from "../../../hooks/API/useMe";

const CustomerPayment = () => {
	const [seriesVal,setSeriesVal] = useState()
	const [getMySeries,setGetSeries] = useState([])
	const [getMyRequestList,setGetRequestList] = useState([])
	const [getMyRequestListDetail,setGetRequestListDetail] = useState([])
	const currentDate = new Date().toISOString().slice(0, 16);
  const [docDate, setDocDate] = useState(currentDate);
  const [deliveryDate, setDeliveryDate] = useState("");
	const [requestList, setRequestList] = useState([])
	const [info, setInfo] = useState("");

	const handleDocDateChange = (e) => {
    const selectedDocDate = e.target.value;
    setDocDate(selectedDocDate);

    setDeliveryDate("");
  };
	
  const getSeries = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/seriescode/CUSTOMER PAYMENT`);
      setGetSeries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRequestList = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/arrequestlistp`);
      setGetRequestList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRequestListDetail = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/customerpaymentd/${requestList}`);
			const modifiedData = response.data.map(item => {
				// Buat objek baru tanpa properti 'nama' dan tambahkan 'name' yang baru
				const { TransType, ...rest } = item;
				return { ...rest, TransactionType: TransType,  };
			});
			setGetRequestListDetail(modifiedData);
    } catch (error) {
      console.log(error);
    }
  };

	const handleChangeDataAPI = (key, field, value) => {
    setGetRequestListDetail((prevData) =>
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

	useEffect(()=>{
		console.log(getMyRequestListDetail)
	},[getMyRequestListDetail])

	useEffect(()=>{
		getSeries()
		getRequestList()
	},[])

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl font-bold mb-4">Customer Payment</div>
      </div>
      <form onSubmit="">
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
                    type="date"
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
                <td className="text-right">Request List: </td>
                <td>
                  <select
                    required
                    onChange={(e) => setRequestList(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected hidden>
                      Pilih Request List
                    </option>
                    {getMyRequestList.map((res, key) => {
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
										getRequestListDetail()
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
                    Transaction Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CustomerCode
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
                    TaxPrefix
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TaxNo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Information
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DC
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
                    PaymentLocal
                  </th>
                </tr>
              </thead>
              <tbody>
                {getMyRequestListDetail.map((res, key) => {
                  return (
                    <tr
                      key={key}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">{res.TransType}</td>
                      <td className="px-6 py-4">{res.CustomerCode}</td>
                      <td className="px-6 py-4">{res.DocNo}</td>
                      <td className="px-6 py-4">{res.TOP}</td>
                      <td className="px-6 py-4">{res.DueDate}</td>
                      <td className="px-6 py-4">{res.TaxPrefix}</td>
                      <td className="px-6 py-4">{res.TaxNo}</td>
                      <td className="px-6 py-4">{res.Information}</td>
                      <td className="px-6 py-4">{res.DC}</td>
                      <td className="px-6 py-4">{res.DocValue}</td>
                      <td className="px-6 py-4">
												<input type="number" onChange={(e) => handleChangeDataAPI(key, "Payment", e.target.value)} className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1.00" /></td>
                      <td className="px-6 py-4">{res.DocValue}</td>
                      <td className="px-6 py-4">
												<input type="number" onChange={(e) => handleChangeDataAPI(key, "ExchangeRate", e.target.value)} className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1.00" />
											</td>
                      <td className="px-6 py-4"></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-start">
            <table className="border-separate border-spacing-2 ">
              <tr>
                <td className="text-right">No of Customer : </td>
                <td>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td className="text-right">No of Document : </td>
                <td>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td className="text-right">Total Value : </td>
                <td>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    disabled
                  />
                </td>
              </tr>
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
            </table>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerPayment;
