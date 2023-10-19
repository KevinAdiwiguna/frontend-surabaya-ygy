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
        `${process.env.REACT_APP_API_BASE_URL}/seriescode/AR REQUEST LIST`
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
      console.log(error);
      toast.warn("Code Sudah Digunakan", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      });
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

export default APReceiptList;
