import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useMe } from "../../../hooks/API/useMe";

const APReceiptList = () => {
  const { fetchMe, response } = useMe();
  const currentDate = new Date().toISOString().slice(0, 16);
  const [docDate, setDocDate] = useState(currentDate);
  const [seriesVal, setSeriesVal] = useState("");
  const [getMySeries, setGetSeries] = useState([]);
  const [getMySupplier, setGetSupplier] = useState([]);
  const [supplier, setSupplier] = useState("");
  const [info, setInfo] = useState("");
  const [APBook, setAPBook] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsChanged, setSelectedItemsChanged] = useState([]);
  const [totalCheckedItems, setTotalCheckedItems] = useState(0);
  const [totalGross, setTotalGross] = useState(0);
  const [Modal, setModal] = useState(false);

  const [AllDocNo, setAllDOcNo] = useState([]);

  const getAllDocNo = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/apreceiptlist`
    );
    setAllDOcNo(response.data);
  };

  const handleDocDateChange = (e) => {
    const selectedDocDate = e.target.value;
    setDocDate(selectedDocDate);
  };

  const getSupplier = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/supplier`
      );
      setGetSupplier(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSeries = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/seriescode/AP RECEIPT LIST`
      );
      setGetSeries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/apreceiptlist`, {
        generateDocDate: generateDocDate(),
        series: seriesVal,
        docDate,
        supplierCode: supplier,
        totalDocument: totalCheckedItems,
        totalValue: totalGross,
        information: info,
        status: "OPEN",
        printCounter: 0,
        printedBy: "",
        printedDate : "",
        createdBy: response?.User,
        changedBy: response?.User,
        details: selectedItemsChanged
      });
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
  };

  const getAPBook = async () => {
    if (!supplier) {
      return toast.error(`Suppliernya tidak ada`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/apreceiptlist/${supplier}`
      );
      setAPBook(res.data);
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

  const handleCheckboxChange = (res) => {
    const { DocNo, DocValue } = res;
    console.log(res);
    const isSelected = selectedItems.some((item) => item.DocNo === DocNo);

    if (isSelected) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => !(item.DocNo === DocNo))
      );
      setTotalGross((prevTotal) => prevTotal - parseInt(DocValue));
    } else {
      setSelectedItems((prevSelectedItems) => [
        ...prevSelectedItems,
        { DocNo },
      ]);
      setTotalGross((prevTotal) => prevTotal + parseInt(DocValue));
    }
  };

  useEffect(() => {
    setTotalCheckedItems(selectedItems.length);

    const newData = selectedItems.map((item) => ({
      apDocNo: item["DocNo"],
    }));
    setSelectedItemsChanged(newData);
  }, [selectedItems]);

  useEffect(() => {
    getSeries();
    getSupplier();
    getAllDocNo()
  }, []);

  useEffect(() => {
    fetchMe();
  }, [!response]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl font-bold mb-4">AP Receipt List</div>
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
                <td className="text-right">Supplier: </td>
                <td>
                  <select
                    required
                    onChange={(e) => setSupplier(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected hidden>
                      Pilih Supplier
                    </option>
                    {getMySupplier.map((res, key) => {
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
                    getAPBook();
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
                    Supplier Code
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
                {APBook.map((res, key) => {
                  return (
                    <tr
                      key={key}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(res)}
                        />
                      </td>
                      <td className="px-6 py-4">{res.SupplierCode}</td>
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
          <div className="flex justify-between items-start">
            <table className="border-separate border-spacing-2 ">
              <tr>
                <td className="text-right">No of Document : </td>
                <td>
                  <input
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    disabled
                    value={totalCheckedItems}
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
                    value={totalGross}
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

export default APReceiptList;

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
  const [selectedARBook, setSelectedARBook] = useState([]);
  const [collector, setCollector] = useState("")
  const [totalGross, setTotalGross] = useState(0);

  const getARBook = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/getapbook`
      );
      const filteredData = res.data.filter((item) => {
        return selectedARBook.some(
          (selectedItem) => selectedItem.APDocNo === item.DocNo
        );
      });
      setARBook(filteredData);

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

  const [selectedARBookCheck, setSelectedARBookCheck] = useState([]);

  const getDetailDocNo = async (params) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/apreceiptd/${params}`
    );
    setDocNo(params);
    setSelectedHeader(response.data.header);
    setSelectedARBook(response.data.detail);
    setSelectedARBookCheck(response.data.detail);
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
    getARBook();
  }, [selectedARBook]);

  useEffect(() => {
    if(ARBook) {
      setTotalGross(ARBook.reduce((total, res) => total + parseInt(res.DocValue), 0))
    }
  }, [ARBook]);

  const handleDelete = async (parmas) => {
    await axios.delete(
      `${process.env.REACT_APP_API_BASE_URL}/apreceipt/${parmas}`
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

  const handleChangeDataAPI = (key, field, value) => {
    setDetailDocNo((prevDetailDocNo) => {
      const updatedGoodsIssued = prevDetailDocNo.goodsissued.map(
        (data, index) => {
          if (index === key) {
            return {
              ...data,
              [field]: value,
            };
          }
          return data;
        }
      );
      return {
        ...prevDetailDocNo,
        goodsissued: updatedGoodsIssued,
      };
    });

    // Update the updatedQty state
    setUpdatedQty((prevUpdatedQty) => ({
      ...prevUpdatedQty,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/apreceiptlist/${DocNo}`,
        {
          totalCustomer: uniqueCheckedCustomers.size,
          totalDocument: totalCheckedItems,
          totalValue: totalGross, 
          information: Information,
          status:"OPEN",
          printCounter: 0,
          createdBy: response?.User,
          changedBy: response?.User,
          details: selectedARBookCheck,
        }
      );
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

  // update method
  const handleCheckboxChange = (res) => {
    const { DocNo, DocValue } = res;
    const isSelected = selectedARBookCheck.some(
      (item) => item.APDocNo === DocNo
    );

    if (isSelected) {
      setSelectedARBookCheck((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item.APDocNo !== DocNo)
      );
      setTotalGross((prevTotal) => prevTotal - parseInt(DocValue));
    } else {
      const newItem = selectedARBook.find((item) => item.APDocNo === DocNo);
      if (newItem) {
        setSelectedARBookCheck(selectedARBookCheck.concat(newItem));
        setTotalGross((prevTotal) => prevTotal + parseInt(DocValue));
      }
      
    }
  };

  const [supplierDetail, setSupplierDetail] = useState([])
  const getSupplierDetail = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/supplier/${selectedHeader?.SupplierCode}`)
    setSupplierDetail(res.data)
  }

  // update method - end

  const [printModal, setPrintModal] = useState(false);
  const [printed, setPrinted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    checkPrint();
  }, [printed]);

  const checkPrint = async () => {
    if (printed) {
      try {
        await axios.patch(
          `${process.env.REACT_APP_API_BASE_URL}/apreceiptlistprint/${selectedHeader?.DocNo}`,
          {
            printedBy: response?.User,
          }
        );
        setPrinted(false);
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

  const [totalCheckedItems, setTotalCheckedItems] = useState(0)
  const [uniqueCheckedCustomers, setUniqueCheckedCustomers] = useState(
    new Set()
  );
  const [selectedItemsChanged, setSelectedItemsChanged] = useState([]);

  useEffect(() => {
    // Menghitung totalCheckedItems
    setTotalCheckedItems(selectedARBookCheck.length);

    // Menghitung uniqueCheckedCustomers
    const uniqueCustomers = new Set();
    selectedARBookCheck.forEach((item) => uniqueCustomers.add(item.CustomerCode));
    setUniqueCheckedCustomers(uniqueCustomers);
    const newData = selectedARBookCheck.map((item) => ({
      customerCode: item["CustomerCode"],
      apDocNo: item["DocNo"],
    }));
    setSelectedItemsChanged(newData);
  }, [selectedARBookCheck]);

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
            <div className="w-full pl-4 py-4 border-black border-b">
              <div>
                <div className="font-bold text-3xl">
                  CV. Gemilang Multi Kreasi
                </div>
                <div className="font-bold text-lg">
                  Jl. Berbek Industri 3 / 15 Sidoarjo
                </div>
                <div>
                  Telp. (031) 8494605
                </div>
              </div>
            </div>
            <div className="flex items-center flex-col font-bold">
              <div className="text-xl">
                Daftar Tagihan Masuk
              </div>
              <div>
                Tipe: per Customer
              </div>
              <div className="font-normal">
                per {selectedHeader?.DocDate}
              </div>
            </div>
            <div className="ml-4 my-2">
              <table>
                <tr className="flex gap-20">
                  <td>No Tanda Terima: {selectedHeader?.DocNo}</td>
                  <td>Tgl Terima: {selectedHeader?.DocDate}</td>
                  <td>Kode Supplier: {selectedHeader?.SupplierCode}</td>
                  <td>Nama Supplier: {supplierDetail?.Name}</td>
                  <td>JumlahDokumen: {selectedHeader?.TotalDocument}</td>
                  <td>Total (RP): {selectedHeader.TotalValue}</td>
                </tr>
              </table>
              <div>
                Keterangan: {selectedHeader.Information}
              </div>
            </div>
            <div className="relative overflow-x-auto border-t border-black pt-6">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-center">
                      Tgl Dokumen
                    </th>
                    <th scope="col" className="px-14 py-3 text-center">
                      No Dokumen
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Jatuh Tempo
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Kurs
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Nilai Tukar
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      D/C
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Nilai Dokumen
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Pembayaran
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Netto
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Netto (IDR)
                    </th>
                  </tr>
                </thead>
                {console.log(ARBook)}
                {ARBook?.map((res, key) => {
                  return (
                    <tbody>
                      <tr className="bg-white dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-2 text-center">
                          {res.DocDate}
                        </td>
                        <td className="px-6 py-2 text-center">
                          {res.DocNo}
                        </td>
                        <td className="px-6 py-2 text-center">{res.DueDate}</td>
                        <td className="px-6 py-2 text-center">{res.Currency}</td>
                        <td className="px-6 py-2 text-center">{res.ExchangeRate}</td>
                        <td className="px-6 py-2 text-center">{res.DC}</td>
                        <td className="px-6 py-2 text-center">{Math.floor(res.DocValue)}</td>
                        <td className="px-6 py-2 text-center">{Math.floor(res.PaymentValuel)}</td>
                        <td className="px-6 py-2 text-center">{res.DocValue - res.PaymentValue}</td>
                        <td className="px-6 py-2 text-center">{res.DocValueLocal - res.PaymentValueLocal}</td>

                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
            <div className="flex justify-end mx-4 gap-10 border-t border-black border-dotted">
                <div className="px-6 py-2 ">
                  Total Netto (IDR)
                </div>
                <div className="px-6 py-2 text-right">
                  {ARBook.reduce((total, res) => total + (parseInt(res.DocValueLocal) - res.PaymentValueLocal), 0)}
                </div>
            </div>
          </div>
          <div className="border-black border-t py-4 px-4">

          </div>
          <div className="flex pr-20 justify-end gap-[100px] ">
            <div className="p-2">
              <div>Penerima</div>
              <div className="h-[100px]"></div>
            </div>
            <div className="p-2">
              <div>Hormat Kami</div>
              <div className="h-[100px]"></div>
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
                      value={Information || selectedHeader?.Information}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={selectedHeader?.Information}
                    />
                  </div>
                </tr>
                <tr>
                  <td className="text-right px-2">No of Customer : </td>
                  <td>
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      disabled
                      value={uniqueCheckedCustomers.size}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right px-2">No of Document : </td>
                  <td>
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      disabled
                      value={totalCheckedItems}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right px-2">Total Value : </td>
                  <td>
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      disabled
                      value={totalGross}
                    />
                  </td>
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
                      onClick={async ()=>{
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
                        handleDelete(DocNo)
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
                  {ARBook.map((res, key) => {
                    return (
                      <tr
                        key={key}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <input
                            type="checkbox"
                            onChange={() => {
                              handleCheckboxChange(res);
                            }}
                            defaultChecked
                          />
                        </td>
                        <td className="px-6 py-4">{res.CustomerCode}</td>
                        <td cxlassName="px-6 py-4">{res.DocDate}</td>
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
      )}
    </div>
  );
};
