import React, { useEffect, useState } from "react";
import { useMe } from "../../../hooks/API/useMe";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { dateConverter } from "../../../components/dateConverter";

export const Customer = () => {
  const { fetchMe, response } = useMe();

  const [code, setCode] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [fax, setFax] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [mobile, setMobile] = useState();
  const [taxNumber, setTaxNumber] = useState();
  const [customerGroup, setCustomerGroup] = useState();
  const [priceListType, setPriceListType] = useState();
  const [sales1, setSales1] = useState([]);
  const [sales2, setSales2] = useState([]);
  const [sales3, setSales3] = useState([]);
  const [sales1val, setSales1val] = useState([]);
  const [sales2val, setSales2val] = useState([]);
  const [sales3val, setSales3val] = useState([]);
  const [top, setTop] = useState();
  const [currency, setCurrency] = useState();
  const [limit, setLimit] = useState();
  const [transactionType, setTransactionType] = useState();
  const [transactionType2, setTransactionType2] = useState();
  const [cutPph, setCutPph] = useState(false);
  const [isBlackList, setIsBlackList] = useState();
  const [isDeleted, setIsDeleted] = useState();
  const [information, setInformation] = useState();
  const [getData, setGetData] = useState([]);
  const [getCountry, setGetCountry] = useState([]);
  const [getCurrency, setGetCurrency] = useState([]);
  const [getPricelist, setGetPricelist] = useState([]);
  const [getCustomerGroup, setGetCustomerGroup] = useState([]);


  useEffect(() => {
    fetchMe();
  }, [!response]);

  const dataFetching = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/customer`
      );
      setGetData(data.data);
    } catch (error) { }
  };

  const fetchSales1 = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/salesarea1`
      );
      setSales1(response.data);
    } catch (error) { }
  };

  const fetchSales2 = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/salesArea2Code/${sales1val}`
      );
      setSales2(response.data);
    } catch (error) { }
  };

  const fetchSales3 = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/SalesArea3Code/${sales2val}`
      );
      setSales3(response.data);
    } catch (error) { }
  };

  useEffect(() => {
    fetchSales1();
    fetchSales2();
    fetchSales3();
  }, [sales1val, sales2val, sales3val]);

  const deleteData = async (params) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/customer/${params}`
      );
      dataFetching();
      toast.success("Data Deleted", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
    });

    } catch (error) { }
  };

  const updateData = async (params) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/customer/${params}`,
        {
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
          customerGroup: customerGroup,
          priceListType: priceListType,
          salesArea1: sales1val,
          salesArea2: sales2val,
          salesArea3: sales3val,
          top: top,
          currency: currency,
          limit: limit,
          transactionType: transactionType,
          transactionType2: transactionType2,
          cutPph: cutPph,
          isBlackList: isBlackList,
          isDeleted: isDeleted,
          information: information,
          changedBy: response.User,
        }
      );
      dataFetching();
      toast.success("Data Updated", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submitClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/customer`, {
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
        customerGroup: customerGroup,
        priceListType: priceListType,
        salesArea1: sales1val,
        salesArea2: sales2val,
        salesArea3: sales3val,
        top: top,
        currency: currency,
        limit: limit,
        transactionType: transactionType,
        transactionType2: transactionType2,
        cutPph: cutPph,
        isBlackList: isBlackList,
        isDeleted: isDeleted,
        information: information,
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
      toast.warn("Code Sudah Digunakan", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      });

    }
  };

  const getMyCountry = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/country`
      );
      setGetCountry(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getMyCurrency = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/currency`
      );
      setGetCurrency(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyPricelistType = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/pricelist`
      );
      setGetPricelist(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyCustomerGroup = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/customergroup`
      );
      setGetCustomerGroup(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    dataFetching();
    getMyCurrency();
    getMyCountry();
    getMyCustomerGroup();
    getMyPricelistType();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl font-bold mb-4">Customer</div>
      </div>

      <form onSubmit={submitClick}>
        <div className="flex">
          <table className="border-separate border-spacing-2 w-1/2">
            <tr>
              <td className="text-right">Code: </td>
              <td>
                <input
                  onChange={(e) => { setCode(e.target.value) }}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[25%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Isi code"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">Name: </td>
              <td>
                <input
                  onChange={(e) => { setName(e.target.value) }}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Isi nama"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">Address: </td>
              <td>
                <input
                  onChange={(e) => { setAddress(e.target.value) }}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Isi alamat"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="text-right"></td>
              <td>
                <input
                  onChange={(e) => { setAddress2(e.target.value) }}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">City: </td>
              <td>
                <input
                  onChange={(e) => { setCity(e.target.value) }}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Isi kota"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">Country:</td>
              <td>
                <select onChange={(e) => { setCountry(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option disabled selected hidden>Pilih negara</option>
                  {getCountry.map((res, key) => {
                    return (
                      <option key={key} value={res.Code}>{res.Code}</option>
                    )
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">Phone: </td>
              <td>
                <input
                  onChange={(e) => { setPhone(e.target.value) }}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Isi nomor telpon"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">Fax: </td>
              <td>
                <input
                  onChange={(e) => { setFax(e.target.value) }}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Isi fax"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">Email: </td>
              <td>
                <input
                  onChange={(e) => { setEmail(e.target.value) }}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Isi email"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">Contact: </td>
              <td>
                <input
                  onChange={(e) => { setContact(e.target.value) }}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Isi kontak"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">Mobile: </td>
              <td>
                <input
                  onChange={(e) => { setMobile(e.target.value) }}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Isi nomor hp"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">Information: </td>
              <td>
                <input
                  onChange={(e) => { setInformation(e.target.value) }}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="isi informasi"
                  required
                />
              </td>
            </tr>
          </table>
          <table className="border-separate border-spacing-2 w-1/2">
            <tr>
              <td className="text-right">Tax Number: </td>
              <td>
                <input
                  onChange={(e) => { setTaxNumber(e.target.value) }}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Isi berapa pajak"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">Sales Area 1:</td>
              <td>
                <select onChange={(e) => { setSales1val(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option disabled selected hidden>Pilih Sales Area 1</option>
                  {sales1.map((res, key) => {
                    return (
                      <option key={key} value={res.Code}>
                        {res.Code}
                      </option>
                    )
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">Sales Area 2:</td>
              <td>
                <select key={sales2} onChange={(e) => { setSales2val(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option disabled selected hidden>Pilih Sales Area 2</option>
                  {sales2.map((res, key) => {
                    return (
                      <option key={key} value={res.Code}>
                        {res.Code}
                      </option>
                    )
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">Sales Area 3:</td>
              <td>
                <select key={sales3} onChange={(e) => { setSales3val(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option disabled selected hidden>Pilih Sales Area 3</option>
                  {sales3.map((res, key) => {
                    return (
                        <option key={key} value={res.Code}>{res.Code}</option> 
                    )
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">Customer Group:</td>
              <td>
                <select onChange={(e) => { setCustomerGroup(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option disabled selected hidden>Pilih Customer Group</option>
                  {getCustomerGroup.map((res, key) => {
                    return (
                      <option value={res.Code} key={key}>{res.Code}</option>
                    )
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">PriceList Type:</td>
              <td>
                <select onChange={(e) => { setPriceListType(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected hidden>Pilih Pricelist Type</option>
                  {getPricelist.map((res, key) => {
                    return (
                      <option value={res.Code} key={key}>{res.Code}</option>
                    )
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">Term of Payment: </td>
              <td className="flex items-center gap-2">
                <input
                  onChange={(e) => { setTop(e.target.value) }}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  required
                />
                Days
              </td>
            </tr>
            <tr>
              <td className="text-right">Currency: </td>
              <td>
                <select onChange={(e) => { setCurrency(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option disabled selected hidden>Pilih Currency</option>
                  {getCurrency.map((res, key) => {
                    return (
                      <option value={res.Code} key={key}>{res.Code}</option>
                    )
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">Limit: </td>
              <td>
                <input
                  onChange={(e) => { setLimit(e.target.value) }}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Isi batas"
                  required
                />
              </td>
              <div className="flex items-center gap-2">
                <td className="float-right">
                  <input
                    onChange={(e) => { setCutPph(e.target.checked) }}
                    type="checkbox"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                  />
                </td>
                <td className="">We cut PPh on behalf of this customer</td>
              </div>
            </tr>
            <tr>
              <td className="text-right">Account Receivable: </td>
              <td>
                <select onChange={(e) => { setTransactionType(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {/* // {transactionType.map((res, key) => {
                  //   return (
                  //     <option key={key} value={res.Code}>{res.Code}</option>
                  //   )
                  // })} */}
                </select>
              </td>
            </tr>
            <tr>
              <td className="text-right">Down Payment: </td>
              <td>
                <select onChange={(e) => { setTransactionType2(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  {/* // {transactionType2.map((res, key) => {
                  //   return (
                  //     <option key={key} value={res.Code}>{res.Code}</option>
                  //   )
                  // })} */}
                </select>
              </td>
            </tr>
            <tr>
            <td className="float-right">
                  <input
                    onChange={(e) => { setIsBlackList(e.target.checked) }}
                    type="checkbox"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                  />
                </td>
                <td className="">Is Blacklisted</td>
            </tr>
            <tr>
            <td className="float-right">
                  <input
                    onChange={(e) => { setIsDeleted(e.target.checked) }}
                    type="checkbox"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                  />
                </td>
                <td className="">Is Deleted</td>
            </tr>
          </table>  
        </div>

        <div className="ml-40">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
      </form >

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
            Customer Group
          </th>
          <th scope="col" className="px-6 py-3">
            Pricelist Type
          </th>
          <th scope="col" className="px-6 py-3">
            Sales Area 1
          </th>
          <th scope="col" className="px-6 py-3">
            Sales Area 2
          </th>
          <th scope="col" className="px-6 py-3">
            Sales Area 3
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
            cutPph
          </th>
          <th scope="col" className="px-6 py-3">
            IsBlackListed
          </th>
          <th scope="col" className="px-6 py-3">
            IsDeleted
          </th>
          <th scope="col" className="px-6 py-3">
            Information
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
        </tr>
      </thead>
      <tbody>
        {getData.map((res, key) => {
          return (
            <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
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
              <td className="px-6 py-4">{res.CustomerGroup}</td>
              <td className="px-6 py-4">{res.PriceListType}</td>
              <td className="px-6 py-4">{res.SalesArea1}</td>
              <td className="px-6 py-4">{res.SalesArea2}</td>
              <td className="px-6 py-4">{res.SalesArea3}</td>
              <td className="px-6 py-4">{res.Top}</td>
              <td className="px-6 py-4">{res.Currency}</td>
              <td className="px-6 py-4">{res.Limit}</td>
              <td className="px-6 py-4">{res.TransactionType}</td>
              <td className="px-6 py-4">{res.TransactionType2}</td>
              <td className="px-6 py-4">{res.CutPph === true ? "true" : "false"}</td>
              <td className="px-6 py-4">{res.IsBlackList === true ? "true" : "false"}</td>
              <td className="px-6 py-4">{res.IsDeleted === true ? "true" : "false"}</td>
              <td className="px-6 py-4">{res.Information}</td>
              <td className="px-6 py-4">{res.CreatedBy}</td>
              <td className="px-6 py-4">{dateConverter(res.CreatedDate)}</td>
              <td className="px-6 py-4">{res.ChangedBy}</td>
              <td className="px-6 py-4">{dateConverter(res.ChangedDate)}</td>

              <td className="px-6 py-4">
                <button
                  onClick={() => deleteData(res.Code)}
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete
                </button>
                <button
                  onClick={() => updateData(res.Code)}
                  type="button"
                  className="focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
                >
                  Update
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
    <div></div>
  </div>
  <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div >
  );
};