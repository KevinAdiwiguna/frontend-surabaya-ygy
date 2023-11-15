import React, {useState, useEffect} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import {useMe} from "../../../hooks/API/useMe";

const CustomerPayment = () => {
  const {fetchMe, response} = useMe();
	const [seriesVal,setSeriesVal] = useState()
	const [getMySeries,setGetSeries] = useState([])
	const [getMyRequestList,setGetRequestList] = useState([])
	const [getMyRequestListDetail,setGetRequestListDetail] = useState([])
	const currentDate = new Date().toISOString().slice(0, 16);
  const [docDate, setDocDate] = useState(currentDate);
  const [deliveryDate, setDeliveryDate] = useState("");
	const [requestList, setRequestList] = useState([])
	const [info, setInfo] = useState("");
  const [Modal, setModal] = useState(false);

	const handleDocDateChange = (e) => {
    const selectedDocDate = e.target.value;
    setDocDate(selectedDocDate);

    setDeliveryDate("");
  };

  const [AllDocNo, setAllDOcNo] = useState([]);

  const getAllDocNo = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/allcustomerpaymenth`
    );
    setAllDOcNo(response.data);
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
			console.log(response.data)
      const modifiedData = response.data.map(item => {
				const { TransType, ...rest } = item;
				return { ...rest, TransactionType: TransType, PaymentLocal: 0 };
			});
			setGetRequestListDetail(modifiedData);
    } catch (error) {
      console.log(error);
    }
  };

  
  const [totalPaymentLocal, setTotalPaymentLocal] = useState(0);
  const [paidCount, setPaidCount] = useState([]);
  const [paidByCustomerCount, setPaidByCustomerCount] = useState(new Set());

  // Fungsi ini akan dipanggil setiap kali ada perubahan pada getMyRequestListDetail
  useEffect(() => {
    // Hitung jumlah total PaymentLocal
    const newTotalPaymentLocal = getMyRequestListDetail.reduce(
      (total, data) => total + parseFloat(data.PaymentLocal || 0),
      0
    );
    // Update state untuk total PaymentLocal dan jumlah data yang telah dibayar
    setTotalPaymentLocal(newTotalPaymentLocal);
  }, [getMyRequestListDetail]);

  const handleChangeDataAPI = (key, field, value) => {
    setGetRequestListDetail((prevData) =>
      prevData.map((data, index) => {
        if (index === key) {
          let updatedData = {
            ...data,
            [field]: value,
          };
          // Calculate PaymentLocal when ExchangeRate or Payment changes
          if (field === "ExchangeRate" || field === "Payment") {
            const exchangeRate = parseFloat(updatedData.ExchangeRate) || 1; // Use 1 as default if ExchangeRate is not a number
            const payment = parseFloat(updatedData.Payment) || 0; // Use 0 as default if Payment is not a number
            updatedData.PaymentLocal = (exchangeRate * payment).toFixed(2);
          }
          return updatedData;
        }
        return data;
      })
    );
  };

  const [getMyRequestListDetailChanged, setGetMyRequestListDetailChanged] = useState()

	useEffect(()=>{
    const isSelected = getMyRequestListDetail.some((item) => item.PaymentLocal > 0);
    if (isSelected) {
      const filterData = getMyRequestListDetail
        .filter((res) => res.PaymentLocal > 0) // Filter hanya item dengan PaymentLocal > 0
        .map((res) => ({ CustomerCode: res.CustomerCode, PaymentLocal: res.PaymentLocal }));
      setPaidCount(filterData);
    } else {
      setPaidCount([])
    }
    const newData = getMyRequestListDetail.map(item => ({
      "transactionType": item["TransactionType"],
      "arDocNo": item["DocNo"],
      "dc": item["DC"],
      "currency": item["Currency"],
      "payment": item["Payment"],
      "exchangeRate": item["ExchangeRate"],
      "paymentLocal": item["PaymentLocal"],
      "taxPrefix": item["TaxPrefix"],
      "taxNo": item["TaxNo"],
      "information": item["Information"],
      "customerCode": item["CustomerCode"]
    }));
    setGetMyRequestListDetailChanged(newData)
	},[getMyRequestListDetail])

  useEffect(()=>{
    console.log(getMyRequestListDetailChanged)
  },[getMyRequestListDetailChanged])

	useEffect(()=>{ 
    const uniqueCustomers = new Set();
    paidCount.forEach((item) => uniqueCustomers.add(item.CustomerCode));
    setPaidByCustomerCount(uniqueCustomers);
	},[paidCount])

	useEffect(()=>{
		getSeries()
		getRequestList()
    getAllDocNo()
	},[])

  const generateDocDate = () => {
    const today = new Date(docDate);
    const year = today.getFullYear().toString().substring(2);
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return year + month + day;
  };

  const submitClick = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/customerpayment`,{
      generateDocDate: generateDocDate(),
      series: seriesVal,
      docDate: docDate,
      arRequestListNo: requestList,
      totalCustomer: paidByCustomerCount.size,
      totalDocument: paidCount.length,
      totalPayment: totalPaymentLocal,
      information: info,
      status: 'OPEN',
      createdBy: response.User,
      changedBy: response.User,
      details: getMyRequestListDetailChanged
      })
      toast.success("Data Saved", {
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

  useEffect(() => {
    fetchMe();
  }, [!response]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl font-bold mb-4">Customer Payment</div>
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
												<input type="number" onChange={(e) => {
                          handleChangeDataAPI(key, "Payment", e.target.value);
                          }} 
                          className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1.00" />
                      </td>
                      <td className="px-6 py-4">{res.DocValue}</td>
                      <td className="px-6 py-4">
												<input type="number" onChange={(e) => handleChangeDataAPI(key, "ExchangeRate", e.target.value)} className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1.00" />
											</td>
                      <td className="px-6 py-4">{res.PaymentLocal}</td>
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
                    value={paidByCustomerCount.size}
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
                    value={paidCount.length}
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
                    value={totalPaymentLocal}
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
                  <button
                    type="button"
                    onClick={() => setModal(!Modal)}
                    className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none mx-auto dark:focus:ring-yellow-800"
                  >
                    Update
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </form>
      <ModalComp
        response={response}
        Modal={Modal}
        setModal={setModal}
        AllDocNo={AllDocNo}
        getSeries={getSeries}
        getAllDocNo={getAllDocNo}
      />
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default CustomerPayment;


export const ModalComp = (params) => {
  const {
    Modal,
    setModal,
    AllDocNo,
    getSeries,
    getSalesOrderNo,
    getAllDocNo,
    response,
  } = params;
  const [DetailDocNo, setDetailDocNo] = useState([]);
  const [selectedHeader, setSelectedHeader] = useState(
    []
  );

  const [QtyRemain, setQtyRemain] = useState([]);
  const [updatedQty, setUpdatedQty] = useState({});
  const [PoNo, setPoNo] = useState("");
  const [VehicleNo, setVehicleNo] = useState("");
  const [Information, setInformation] = useState("");
  const [TotalQty, setTotalQty] = useState();
  const [DocNo, setDocNo] = useState("");
  const [ARBook, setARBook] = useState([]);
  const [collector, setCollector] = useState("")
  const [totalGross, setTotalGross] = useState(0);
  const [detail, setDetail] = useState([]);

  const getDetailDocNo = async (params) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/customerpaymentd/${params}`
    );
    setDocNo(params);
    setDetail(response.data);
  };

  useEffect(() => {
    if (typeof DetailDocNo == "string") {
      getDetailDocNo(DetailDocNo);
    }
  }, [DetailDocNo]);

  useEffect(() => {
    setCollector(selectedHeader?.CollectorCode)
    setInformation(selectedHeader?.Information)
  }, [selectedHeader])

  useEffect(() => {
    if(ARBook) {
      setTotalGross(ARBook.reduce((total, res) => total + parseInt(res.DocValue), 0))
    }
  }, [ARBook]);

  const getQtyRemain = async (params) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/goodsissue/${params}`
    );
    setQtyRemain(response.data);
  };

  const GetTotalQty = async (params) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/goodsissueqty/${params}`
    );
    setTotalQty(response.data);
  };

  const handleDelete = async (parmas) => {
    await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/goodsissue/${parmas}`
    );
    toast.success("Data Deleted", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
    });
    setModal(false);
    getSeries();
    getSalesOrderNo();
    setDetailDocNo([]);
    getAllDocNo();
  };

  useEffect(() => {
    getQtyRemain(DetailDocNo?.goodsissueh?.SODocNo);
    GetTotalQty(DetailDocNo?.goodsissueh?.SODocNo);
  }, [DetailDocNo?.goodsissueh]);

  const handleSave = async () => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/arrequestlist/${DocNo}`,
        {
          collectorCode: collector,
          customerGroup: "",
          salesArea1: 0,
          salesArea2: 0,
          salesArea3: 0,
          currency: 0,
          // totalCustomer: uniqueCheckedCustomers.size,
          // totalDocument: totalCheckedItems,
          totalValue: totalGross, 
          information: Information,
          status:"OPEN",
          printCounter: 0,
          createdBy: response?.User,
          changedBy: response?.User,
          // details: selectedARBookCheck,
        }
      );

      DetailDocNo?.goodsissued?.map(async (res, key) => {
        await axios.patch(
          `${process.env.REACT_APP_API_BASE_URL}/goodsissuedetail/${res.DocNo}/${res.Number}`,
          {
            batchNo: res.BatchNo,
            docNo: res.DocNo,
            information: res.Info,
            location: res.Location,
            materialCode: res.MaterialCode,
            number: res.Number,
            qty: res.Qty,
            qtyNetto: res.QtyNetto,
            qtyReturn: res.QtyReturn,
            unit: res.Unit,
          }
        );
      });
      setModal(false);
      setDetailDocNo([]);
      setCollector("")
      setInformation("")
      setARBook([])
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

  return (
    <div
      className={`bg-slate-50 fixed w-[90%] h-[90%] top-6 left-24 rounded-lg border border-black overflow-y-scroll p-5 ${Modal ? "block" : "hidden"
        }`}
    >
        <div className="space-y-6">
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
                    onChange={async (e) => {
                      setDetailDocNo(e.target.value);
                    }}
                    value={DetailDocNo}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option>Pilih</option>
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
            <hr className="my-2" />
            <table className="border-separate border-spacing-2">
                <tr>
                  <th className="text-right px-2">Information</th>
                  <div className="my-1">
                    <input
                      onChange={(e) => setInformation(e.target.value)}
                      type="text"
                      value={Information}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={selectedHeader?.Information}
                    />
                  </div>
                </tr>
            </table>
            <table className="text-sm text-gray-500 dark:text-gray-400">
              {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"> */}
                <div>
                  <td className="flex gap-4">
                    <button
                      onClick={() => handleSave()}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(DetailDocNo.goodsissueh.DocNo)
                      }
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none  mx-auto dark:focus:ring-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </div>
              {/* </thead> */}
            </table>
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
                  {detail.map((res, key) => {
                    return (
                      <tr
                        key={key}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4">{res.TransactionType}</td>
                        <td className="px-6 py-4">{res.CustomerCode}</td>
                        <td className="px-6 py-4">{res.DocDate}</td>
                        <td className="px-6 py-4">{res.DocNo}</td>
                        <td className="px-6 py-4">{res.TOP}</td>
                        <td className="px-6 py-4">{res.DueDate}</td>
                        <td className="px-6 py-4">{res.Information}</td>
                        <td className="px-6 py-4">{res.DC}</td>
                        <td className="px-6 py-4">{res.Currency}</td>
                        <td className="px-6 py-4">{res.DocValue}</td>
                        <td className="px-6 py-4">{res.PaymentValue}</td>
                        <td className="px-6 py-4">{res.DocValue}</td>
                        <td className="px-6 py-4">{res.ExchangeRateDiff}</td>
                        <td className="px-6 py-4">{res.DocValue}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
  );
};
