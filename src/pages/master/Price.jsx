import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMe } from "../../hooks/API/useMe";
import { dateConverter } from "../../components/dateConverter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Price = () => {
  const { fetchMe, response } = useMe();
  const currentDate = new Date().toISOString().slice(0, 16);
  const [getData, setGetData] = useState([]);
  const [getPricelist, setGetPriceList] = useState([]);
  const [priceListType, setPriceListType] = useState("");
  const [materialCode, setMaterialCode] = useState("");
  const [currency, setCurrency] = useState("");
  const [unit, setUnit] = useState("");
  const [getUnit, setGetUnit] = useState([]);
  const [getUnitUpdate, setGetUnitUpdate] = useState([]);
  const [getCurrency, setGetCurrency] = useState([]);
  const [getMaterial, setGetMaterial] = useState([]);
  const [minQty, setMinQty] = useState(0);
  const [maxQty, setMaxQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [percentDisc, setPercentDisc] = useState(0);
  const [valueDisc, setValueDisc] = useState(0);
  const [begDate, setBegDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxQtyUpdate, setMaxQtyUpdate] = useState(0);
  const [priceUpdate, setPriceUpdate] = useState(0);
  const [percentDiscUpdate, setPercentDiscUpdate] = useState(0);
  const [valueDiscUpdate, setValueDiscUpdate] = useState(0);
  const [endDateUpdate, setEndDateUpdate] = useState("");

  const [modalData, setModalData] = useState([])
  const [modal, setModal] = useState(false)

  const closeModal = () => {
    setModal(false)
  }

  const handleBegDateChange = (e) => {
    const selectedBegDate = e.target.value;
    setBegDate(selectedBegDate);

    setEndDate("");
  };

  useEffect(()=>{
    setEndDateUpdate(modalData.Endda)
    setMaxQtyUpdate(modalData.MaxQty)
    setPriceUpdate(modalData.Price)
    setPercentDiscUpdate(modalData.PercentDisc)
    setValueDiscUpdate(modalData.ValueDisc)
  },[modalData])

  useEffect(() => {
    fetchMe();
  }, [!response]);

  const getMyUnitByMaterial = async (params) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/unitconversion/${params}`
    )
    setGetUnit(response.data)
    setUnit(response.data.Unit)
  }

  useEffect(() => {
    getMyUnitByMaterial(materialCode)
  }, [materialCode])

  const getMyCurrency = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/currency`
    )
    setGetCurrency(response.data)
  }

  const getMyMaterial = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/material`
    )
    setGetMaterial(response.data)
  }

  const getPriceListType = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/pricelist`
    )
    setGetPriceList(response.data)
  }

  const dataFetching = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/price`
      );
      setGetData(data.data);
    } catch (error) { }
  };

  const deleteData = async (a, b, c, d, e, f) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/price/${a}/${b}/${c}/${d}/${e}/${f}/`
      );
      dataFetching();
      toast.success("Data Deleted", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) { }
  };

  const submitClick = async (e) => {
    e.preventDefault();
    if (valueDisc && percentDisc) {
      return toast.warn("Fill Either Percent Disc & Value Disc", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
    if (minQty >= maxQty) {
      return toast.warn("min Qty tidak boleh lebih dari max Qty", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/price`, {
        begDa: dateConverter(begDate),
        endDa: dateConverter(endDate),
        priceListType: priceListType,
        materialCode: materialCode,
        currency: currency,
        unit: unit,
        minQty: minQty,
        maxQty: maxQty,
        price: price,
        percentDisc: percentDisc,
        valueDisc: valueDisc,
        createdBy: response.User,
        changedBy: response.User
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

  const updateData = async (a, b, c, d, e, f) => {
    if (valueDiscUpdate > 0 && percentDiscUpdate > 0) {
      toast.warn("Fill Either Percent Disc & Value Disc", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      });
      return
    }
    if (modalData.MinQty >= maxQtyUpdate) {
      toast.warn("min Qty tidak boleh lebih dari max Qty", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
      });
      return
    }
    try {
      await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/price/${a}/${b}/${c}/${d}/${e}/${f}/`, {
        endDa: dateConverter(endDateUpdate),
        maxQty: maxQtyUpdate,
        price: priceUpdate,
        percentDisc: percentDiscUpdate,
        valueDisc: valueDiscUpdate,
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

  useEffect(() => {
    dataFetching();
    getPriceListType()
    getMyMaterial()
    getMyCurrency()
  }, []);

  return (
    <div>
      <div className="text-2xl font-bold mb-4">Price</div>
      <form onSubmit={submitClick}>
        <table className="border-separate border-spacing-2 w-1/2">
          <tr>
            <td className="text-right">Begin Date: </td>
            <td>
              <input
                onChange={(e) => { handleBegDateChange(e) }}
                type="datetime-local"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                min={currentDate}
                value={begDate}
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">End Date: </td>
            <td>
              <input
                onChange={(e) => { setEndDate(e.target.value) }}
                type="datetime-local"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                min={begDate}
                value={endDate}
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Pricelist Type: </td>
            <td>
              <select onChange={(e) => { setPriceListType(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected hidden>
                  Pilih Tipe
                </option>
                {getPricelist.map((res, key) => {
                  return (
                    <option value={res.Code} key={key}>
                      {res.Code}
                    </option>
                  )
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-right">Material Code: </td>
            <td>
              <select onChange={(e) => { setMaterialCode(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected hidden>
                  Pilih Code
                </option>
                {getMaterial.map((res, key) => {
                  return (
                    <option value={res.Code} key={key}>{res.Code}</option>
                  )
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-right">Currency: </td>
            <td>
              <select onChange={(e) => { setCurrency(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option disabled selected hidden>
                  Pilih
                </option>
                {getCurrency.map((res, key) => {
                  return (
                    <option value={res.Code} key={key}>{res.Code}</option>
                  )
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-right">Unit: </td>
            <td>
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>
                  {getUnit.Unit}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-right">Min Qty: </td>
            <td>
              <input
                onChange={(e) => { setMinQty(e.target.value) }}
                type="number"
                min={0}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0.00"
                required
              // disabled
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Max Qty: </td>
            <td>
              <input
                onChange={(e) => { setMaxQty(e.target.value) }}
                type="number"
                min={0}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0.00"
                required
              // disabled
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Price: </td>
            <td>
              <input
                onChange={(e) => { setPrice(e.target.value) }}
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0.00"
                required
              // disabled
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Percent Disc: </td>
            <td>
              <input
                onChange={(e) => { setPercentDisc(e.target.value) }}
                type="number"
                min={0}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0.00"
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Value Disc: </td>
            <td>
              <input
                onChange={(e) => { setValueDisc(e.target.value) }}
                type="number"
                min={0}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0.00"
              />
            </td>
          </tr>
          <tr>
            <td></td>
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
      </form>

      <div className="relative overflow-x-auto pt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Beg Date
              </th>
              <th scope="col" className="px-6 py-3">
                End Date
              </th>
              <th scope="col" className="px-6 py-3">
                Pricelist Type
              </th>
              <th scope="col" className="px-6 py-3">
                Material Code
              </th>
              <th scope="col" className="px-6 py-3">
                Currency
              </th>
              <th scope="col" className="px-6 py-3">
                Unit
              </th>
              <th scope="col" className="px-6 py-3">
                MinQty
              </th>
              <th scope="col" className="px-6 py-3">
                MaxQty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Percent Disc
              </th>
              <th scope="col" className="px-6 py-3">
                Value Disc
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
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {res.Begda}
                  </th>
                  <td className="px-6 py-4">{res.Endda}</td>
                  <td className="px-6 py-4">{res.PriceListType}</td>
                  <td className="px-6 py-4">{res.MaterialCode}</td>
                  <td className="px-6 py-4">{res.Currency}</td>
                  <td className="px-6 py-4">{res.Unit}</td>
                  <td className="px-6 py-4">{res.MinQty}</td>
                  <td className="px-6 py-4">{res.MaxQty}</td>
                  <td className="px-6 py-4">{res.Price}</td>
                  <td className="px-6 py-4">{res.PercentDisc}</td>
                  <td className="px-6 py-4">{res.ValueDisc}</td>
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
                      onClick={() => deleteData(res.Begda, res.PriceListType, res.MaterialCode, res.Currency, res.Unit, res.MinQty)}
                      type="button"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setModal(true)
                        setModalData(res)
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
        <div className={`flex justify-center top-0 left-0 fixed items-center w-screen h-screen z-[5] ${modal ? 'block' : 'hidden'}`}>
          <div className={`bg-slate-50 w-[90%] h-[90vh] fixed rounded-lg border border-black overflow-y-scroll p-5`}>
            <div className="space-y-6">
              <div className="text-2xl font-bold mb-4 ">Code: {modalData.Code}</div>
              <button
                onClick={() => {
                  closeModal()
                }}
                className="absolute top-0 right-4 text-gray-600 hover:text-gray-800 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="w-[75%] flex">
                <table className="border-separate border-spacing-2 w-1/2">
                  <tr>
                    <td className="text-right">Begin Date: </td>
                    <td>
                      <input
                        type="datetime-local"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        min={currentDate}
                        value={modalData.Begda + "T00:00"}
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">End Date: </td>
                    <td>
                      <input
                        onChange={(e) => { setEndDateUpdate(e.target.value) }}
                        type="datetime-local"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        min={modalData.begDa}
                        value={endDateUpdate + "T00:00" || modalData.Endda + "T00:00"}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Pricelist Type: </td>
                    <td>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option disabled selected hidden>
                          {modalData.PriceListType}
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Material Code: </td>
                    <td>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option disabled selected hidden>
                          {modalData.MaterialCode}
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Currency: </td>
                    <td>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option disabled selected hidden>
                          {modalData.Currency}
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Unit: </td>
                    <td>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option disabled hidden selected>
                          {modalData.Unit}
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Min Qty: </td>
                    <td>
                      <input
                        type="number"
                        min={0}
                        value={modalData.MinQty}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="0.00"
                        required
                        disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Max Qty: </td>
                    <td>
                      <input
                        onChange={(e) => { setMaxQtyUpdate(e.target.value) }}
                        type="number"
                        min={0}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={maxQtyUpdate || modalData.MaxQty}
                        required
                      // disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Price: </td>
                    <td>
                      <input
                        onChange={(e) => { setPriceUpdate(e.target.value) }}
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={modalData.Price}
                        required
                      // disabled
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Percent Disc: </td>
                    <td>
                      <input
                        onChange={(e) => { setPercentDiscUpdate(e.target.value) }}
                        type="number"
                        min={0}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={modalData.PercentDisc}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Value Disc: </td>
                    <td>
                      <input
                        onChange={(e) => { setValueDiscUpdate(e.target.value) }}
                        type="number"
                        min={0}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={modalData.ValueDisc}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <button onClick={() => { updateData(modalData.Begda,modalData.PriceListType,modalData.MaterialCode,modalData.Currency,modalData.Unit,modalData.MinQty) }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">Update</button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};
