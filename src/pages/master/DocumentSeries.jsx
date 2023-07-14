import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMe } from "../../hooks/API/useMe";
import { dateConverter } from "../../components/dateConverter";

export const DocumentSeries = () => {
  const { fetchMe, response } = useMe();
  const [user, setUser] = useState("");
  const [document, setDocument] = useState("");
  const [series, setSeries] = useState("");
  const [iso, setIso] = useState("");
  const [needQualityControl, setNeedQualityControl] = useState(false);
  const [autoTaxNo, setAutoTaxNo] = useState(false);
  const [getData, setGetData] = useState([]);
  const [getUser, setGetUser] = useState([]);
  // const [getMaterialType, setGetMaterialType] = useState([]);```````

  const handleSave = () => {
    toast.success("Data Saved", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  const handleDelete = () => {
    toast.error("Data Deleted", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  const handleUpdate = () => {
    toast.success("Data Updated", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  useEffect(() => {
    fetchMe();
  }, [!response]);

  const dataFetching = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/series`
      );
      setGetData(data.data);
    } catch (error) {}
  };

  const deleteData = async (params) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/series/${params}`
      );
      handleDelete();
      dataFetching();
    } catch (error) {
      console.log(error)
    }
  };

  const updateData = async (params) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/series/${params}`,
        {
          // users: user,
          needQC: needQualityControl,
          autoTaxNo: autoTaxNo,
          iso: iso,
          changedBy: response.User,
        }
      );
      dataFetching();
      handleUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const getMyUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/users`
      );
      setGetUser(response.data);
    } catch (error) {}
  };

  // const getMyMaterialType = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/materialtype`
  //     );
  //     setGetMaterialType(response.data);
  //   } catch (error) {}
  // };

  const submitClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/series`,
        {
          document: document,
          series: series,
          users: user,
          needQC: needQualityControl,
          autoTaxNo: autoTaxNo,
          iso: iso,
          createdBy: response.User,
          changedBy: response.User,
        }
      );
      dataFetching();
      toast.success("Data Saved", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) { 
      toast.warn("Code Sudah Digunakan", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      });

    }
  };

  useEffect(() => {
    dataFetching();
    getMyUser();
    // getMyMaterialType();
  }, []);

  return (
    <div>
      <div className="text-2xl font-bold mb-4">Document Series</div>
      <div className="">
        <div className="">
          <form onSubmit={submitClick}>
            <table className="border-separate border-spacing-2 w-1/2">
              <tr>
                <td className="text-right">Document: </td>
                <td>
                  <select
                    onChange={(e) => {
                      setDocument(e.target.value);
                    }}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected hidden>
                      Pilih document
                    </option>
                    <option value="PURCHASE REQUEST">PURCHASE REQUEST</option>
                    <option value="PURCHASE ORDER">PURCHASE ORDER</option>
                    <option value="PURCHASE COST">PURCHASE COST</option>
                    <option value="GOODS RECEIPT">GOODS RECEIPT</option>
                    <option value="PURCHASE INVOICE">PURCHASE INVOICE</option>
                    <option value="PURCHASE RET ORDER">
                      PURCHASE RET ORDER
                    </option>
                    <option value="PURCHASE RETURN">PURCHASE RETURN</option>
                    <option value="WORK ORDER">WORK ORDER</option>
                    <option value="JOB ORDER">JOB ORDER</option>
                    <option value="MATERIAL USAGE">MATERIAL USAGE</option>
                    <option value="MATERIAL USAGE RET">
                      MATERIAL USAGE RET
                    </option>
                    <option value="JOB RESULT">JOB RESULT</option>
                    <option value="STOCK TRANSFER REQ">
                      STOCK TRANSFER REQ
                    </option>
                    <option value="STOCK TRANSFER">STOCK TRANSFER</option>
                    <option value="ADJUSTMENT IN">ADJUSTMENT IN</option>
                    <option value="ADJUSTMENT OUT">ADJUSTMENT OUT</option>
                    <option value="STOCK PRICE ADJUST">
                      STOCK PRICE ADJUST
                    </option>
                    <option value="SALES ORDER">SALES ORDER</option>
                    <option value="GOODS ISSUE">GOODS ISSUE</option>
                    <option value="DELIVERY RETURN">DELIVERY RETURN</option>
                    <option value="PACKING LIST">PACKING LIST</option>
                    <option value="SALES INVOICE">SALES INVOICE</option>
                    <option value="SALES RET ORDER">SALES RET ORDER</option>
                    <option value="SALES RETURN">SALES RETURN</option>
                    <option value="AR DEBET NOTE">AR DEBET NOTE</option>
                    <option value="AR CREDIT NOTE">AR CREDIT NOTE</option>
                    <option value="AP DEBET NOTE">AP DEBET NOTE</option>
                    <option value="AP CREDIT NOTE">AP CREDIT NOTE</option>
                    <option value="AR REQUEST LIST">AR REQUEST LIST</option>
                    <option value="CUSTOMER PAYMENT">CUSTOMER PAYMENT</option>
                    <option value="CASHIER RECEIPT">CASHIER RECEIPT</option>
                    <option value="AR SETTLEMENT">AR SETTLEMENT</option>
                    <option value="AR CLEARING GIRO">AR CLEARING GIRO</option>
                    <option value="AR REJECT GIRO">AR REJECT GIRO</option>
                    <option value="AP RECEIPT LIST">AP RECEIPT LIST</option>
                    <option value="DEBT PAYMENT">DEBT PAYMENT</option>
                    <option value="CASHIER PAYMENT">CASHIER PAYMENT</option>
                    <option value="AP SETTLEMENT">AP SETTLEMENT</option>
                    <option value="AP CLEARING GIRO">AP CLEARING GIRO</option>
                    <option value="AP REJECT GIRO">AP REJECT GIRO</option>
                    <option value="GENERAL JOURNAL">GENERAL JOURNAL</option>
                    <option value="SCHEDULE JOURNAL">SCHEDULE JOURNAL</option>
                    <option value="AUC SETTLEMENT">AUC SETTLEMENT</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="text-right">Series: </td>
                <td>
                  <input
                    onChange={(e) => {
                      setSeries(e.target.value);
                    }}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Series"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="text-right">User: </td>
                <td>
                  <select onChange={(e) => {setUser(e.target.value)}} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option disabled selected hidden>
                      Pilih user
                    </option>
                    {getUser.map((res, key) => {
                      return (
                        <option value={res.User} key={key}>
                          {res.User}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
              {/* <tr>
              <td className="text-right">Material Type: </td>
              <td>
                <select
                  onChange={(e)=>{setMaterialType(e.target.value)}}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option disabled selected hidden>
                    Pilih material
                  </option>
                  {getMyMaterialType.map((res,key)=>{
                    return (
                      <option value={res.Code} key={key}>{res.Code}</option>
                    )
                  })}
                </select>
              </td>
            </tr> */}
              <tr>
                <td className="float-right">
                  <input
                    onChange={(e) => {
                      setNeedQualityControl(e.target.checked);
                    }}
                    type="checkbox"
                    name=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                  />
                </td>
                <td className="">Need Quality Control</td>
              </tr>
              <tr>
                <td className="float-right">
                  <input
                    onChange={(e) => {
                      setAutoTaxNo(e.target.checked);
                    }}
                    type="checkbox"
                    name=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                  />
                </td>
                <td className="">Auto Tax No</td>
              </tr>
              <tr>
                <td className="text-right">ISO: </td>
                <td>
                  <input
                    onChange={(e) => {
                      setIso(e.target.value);
                    }}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="ISO"
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td className="">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>

      <div className="relative overflow-x-auto pt-10">
        <table className="text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Document
              </th>
              <th scope="col" className="px-6 py-3">
                Series
              </th>
              <th scope="col" className="px-6 py-3">
                Users
              </th>
              <th scope="col" className="px-6 py-3">
                NeedQC
              </th>
              <th scope="col" className="px-6 py-3">
                AutoTaxNo
              </th>
              <th scope="col" className="px-6 py-3">
                ISO
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
                  <td className="px-6 py-4">{res.Document}</td>
                  <td className="px-6 py-4">{res.Series}</td>
                  <td className="px-6 py-4">{res.Users}</td>
                  <td className="px-6 py-4">
                    {res.NeedQC === true ? "true" : "false"}
                  </td>
                  <td className="px-6 py-4">
                    {res.AutoTaxNo === true ? "true" : "false"}
                  </td>
                  <td className="px-6 py-4">{res.Iso}</td>
                  <td className="px-6 py-4">{res.CreatedBy}</td>
                  <td className="px-6 py-4">
                    {dateConverter(res.CreatedDate)}
                  </td>
                  <td className="px-6 py-4">{res.ChangedBy}</td>
                  <td className="px-6 py-4">
                    {dateConverter(res.ChangedDate)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => {
                        deleteData(res.Series);
                      }}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateData(res.Series);
                      }}
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
        <div></div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};



