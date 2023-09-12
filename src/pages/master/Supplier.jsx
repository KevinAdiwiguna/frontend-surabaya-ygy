import React, { useEffect, useState } from "react";
import { useMe } from "../../hooks/API/useMe";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { dateConverter } from "../../components/dateConverter";

export const Supplier = () => {
  const { fetchMe, response } = useMe();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [getData, setGetData] = useState([]);
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [mobile, setMobile] = useState("");
  const [taxNumber, setTaxNumber] = useState("");
  const [top, setTOP] = useState(0);
  const [currency, setCurrency] = useState("");
  const [limit, setLimit] = useState(0);
  const [accountPayable, setAccountPayable] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [cutPph, setCutPph] = useState(false);
  const [getCountry, setGetCountry] = useState([]);
  const [getCurrency, setGetCurrency] = useState([]);

  useEffect(() => {
    fetchMe();
  }, [!response]);

  const getCountryData = async () => {
    try {
      const countryData = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/country`);
      setGetCountry(countryData.data);
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

  const getCurrencyData = async () => {
    try {
      const currencyData = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/currency`);
      setGetCurrency(currencyData.data);
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
      const data = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/supplier`);
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

  const deleteData = async (params) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/supplier/${params}`);
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

  const updateData = async (params) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/supplier/${params}`, {
        name: name,
        address: address,
        address2: address2,
        city: city,
        country: country,
        phone: phone,
        fax: fax,
        email: email,
        contact: contact,
        mobile: mobile,
        taxNumber: taxNumber,
        top: top,
        currency: currency,
        limit: limit,
        transactionType: accountPayable,
        transactionType2: downPayment,
        cuPph: cutPph,
        changedBy: response.User,
      });
      dataFetching();
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

  const submitClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/supplier`, {
        code: code,
        name: name,
        address: address,
        address2: address2,
        city: city,
        country: country,
        phone: phone,
        fax: fax,
        email: email,
        contact: contact,
        mobile: mobile,
        taxNumber: taxNumber,
        top: top,
        currency: currency,
        limit: limit,
        transactionType: accountPayable,
        transactionType2: downPayment,
        cutPph: cutPph,
        createdBy: response.User,
        changedBy: response.User,
      });
      dataFetching();
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

  useEffect(() => {
    dataFetching();
    getCountryData();
    getCurrencyData();
  }, []);

  return (
    <div>
      <div className="text-2xl font-bold mb-4">Supplier</div>
      <form onSubmit={submitClick}>
        <table className="border-separate border-spacing-2 w-1/2">
          <tr>
            <td className="text-right">Code: </td>
            <td>
              <input
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Isi kode"
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Name: </td>
            <td>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Isi nama"
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Address: </td>
            <td>
              <input
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Alamat"
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Address 2: </td>
            <td>
              <input
                onChange={(e) => {
                  setAddress2(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Alamat"
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">City: </td>
            <td>
              <input
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Kota"
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Country: </td>
            <td>
              <select
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected hidden>
                  Select Country
                </option>
                {getCountry.map((res, key) => {
                  return (
                    <option value={res.Code} key={key}>
                      {res.Code}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
          <td className="text-right">Phone: </td>
          <td>
            <input
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </td>
          <tr>
            <td className="text-right"> Fax: </td>
            <td>
              <input
                onChange={(e) => {
                  setFax(e.target.value);
                }}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Email: </td>
            <td>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Contact: </td>
            <td>
              <input
                onChange={(e) => {
                  setContact(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Mobile: </td>
            <td>
              <input
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Tax Number: </td>
            <td>
              <input
                onChange={(e) => {
                  setTaxNumber(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">TOP: </td>
            <td>
              <input
                onChange={(e) => {
                  setTOP(e.target.value);
                }}
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0"
                value={0 || top}
                required
                // disabled
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Currency: </td>
            <td>
              <select
                onChange={(e) => {
                  setCurrency(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected hidden>
                  Pilih group 1
                </option>
                {getCurrency.map((res, key) => {
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
            <td className="text-right">Limit: </td>
            <td>
              <input
                onChange={(e) => {
                  setLimit(e.target.value);
                }}
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0.00"
                value={0.0 || limit}
                required
                // disabled
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Account Payable: </td>
            <td>
              <select
                onChange={(e) => {
                  setAccountPayable(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected hidden></option>
                <option></option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-right">Down Payment: </td>
            <td>
              <select
                onChange={(e) => {
                  setDownPayment(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected hidden></option>
                <option></option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="float-right">
              <input
                onChange={(e) => {
                  setCutPph(e.target.checked);
                }}
                type={"checkbox"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue -500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
              />
            </td>
            <td className="">We cut PPh on behalf of thid Supplier</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">
                Save
              </button>
            </td>
          </tr>
        </table>
      </form>

      <div className="relative overflow-x-auto pt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Code
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Address 2
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Fax
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Contact
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile
              </th>
              <th scope="col" className="px-6 py-3">
                TaxNumber
              </th>
              <th scope="col" className="px-6 py-3">
                TOP
              </th>
              <th scope="col" className="px-6 py-3">
                Currency
              </th>
              <th scope="col" className="px-6 py-3">
                Limit
              </th>
              <th scope="col" className="px-6 py-3">
                Transaction Type
              </th>
              <th scope="col" className="px-6 py-3">
                Transaction Type 2
              </th>
              <th scope="col" className="px-6 py-3">
                Cut Pph
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
                <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {res.Code}
                  </th>
                  <td className="px-6 py-4">{res.Name}</td>
                  <td className="px-6 py-4">{res.Address}</td>
                  <td className="px-6 py-4">{res.Address2}</td>
                  <td className="px-6 py-4">{res.City}</td>
                  <td className="px-6 py-4">{res.Country}</td>
                  <td className="px-6 py-4">{res.Phone}</td>
                  <td className="px-6 py-4">{res.Fax}</td>
                  <td className="px-6 py-4">{res.Email}</td>
                  <td className="px-6 py-4">{res.Contact}</td>
                  <td className="px-6 py-4">{res.Mobile}</td>
                  <td className="px-6 py-4">{res.TaxNumber}</td>
                  <td className="px-6 py-4">{res.TOP}</td>
                  <td className="px-6 py-4">{res.Currency}</td>
                  <td className="px-6 py-4">{res.Limit}</td>
                  <td className="px-6 py-4">{res.TransactionType}</td>
                  <td className="px-6 py-4">{res.TransactionType2}</td>
                  <td className="px-6 py-4">{res.CutPPh === true ? "true" : "false"}</td>
                  <td className="px-6 py-4">{res.CreatedBy}</td>
                  <td className="px-6 py-4">{dateConverter(res.CreatedDate)}</td>
                  <td className="px-6 py-4">{res.ChangedBy}</td>
                  <td className="px-6 py-4">{dateConverter(res.ChangedDate)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        deleteData(res.Code);
                      }}
                      type="button"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        updateData(res.Code);
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
        <div></div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};
