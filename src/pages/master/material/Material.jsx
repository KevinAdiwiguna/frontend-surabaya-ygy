import axios from "axios";
import React, { useState, useEffect } from "react";
import { useMe } from "../../../hooks/API/useMe";
import { toast, ToastContainer } from "react-toastify";
import { dateConverter } from "../../../components/dateConverter";

export const Material = () => {
  const { fetchMe, response } = useMe();
  const [selectedOption, setSelectedOption] = useState("batch");
  const [selectedOptionUpdate, setSelectedOptionUpdate] = useState("");
  const [code, setCode] = useState("");
  const [codeUpdate, setCodeUpdate] = useState("");
  const [name, setName] = useState("");
  const [nameUpdate, setNameUpdate] = useState("");
  const [nameInPO, setnameInPO] = useState("");
  const [nameInPOUpdate, setnameInPOUpdate] = useState("");
  const [smallestUnit, setsmallestUnit] = useState("");
  const [smallestUnitUpdate, setsmallestUnitUpdate] = useState("");
  const [soldUnit, setsoldUnit] = useState("");
  const [soldUnitUpdate, setsoldUnitUpdate] = useState("");
  const [skuUnit, setskuUnit] = useState("");
  const [skuUnitUpdate, setskuUnitUpdate] = useState("");
  const [group1, setgroup1] = useState([]);
  const [group2, setgroup2] = useState([]);
  const [group3, setgroup3] = useState([]);
  const [group1val, setgroup1val] = useState("");
  const [group1valUpdate, setgroup1valUpdate] = useState("");
  const [group2val, setgroup2val] = useState("");
  const [group2valUpdate, setgroup2valUpdate] = useState("");
  const [group3val, setgroup3val] = useState("");
  const [group3valUpdate, setgroup3valUpdate] = useState("");
  const [type, settype] = useState("");
  const [typeUpdate, settypeUpdate] = useState("");
  const [isBatch, setisBatch] = useState(true);
  const [isBatchUpdate, setisBatchUpdate] = useState(false);
  const [isService, setisService] = useState(false);
  const [isServiceUpdate, setisServiceUpdate] = useState(false);
  const [isAsset, setisAsset] = useState(false);
  const [isAssetUpdate, setisAssetUpdate] = useState(false);
  const [mass, setmass] = useState();
  const [massUpdate, setmassUpdate] = useState();
  const [volume, setvolume] = useState();
  const [volumeUpdate, setvolumeUpdate] = useState();
  const [hs, seths] = useState("");
  const [hsUpdate, sethsUpdate] = useState("");
  const [barcode, setbarcode] = useState("");
  const [barcodeUpdate, setbarcodeUpdate] = useState("");
  const [minStock, setminStock] = useState();
  const [minStockUpdate, setminStockUpdate] = useState();
  const [maxStock, setmaxStock] = useState();
  const [maxStockUpdate, setmaxStockUpdate] = useState();
  const [currency, setcurrency] = useState("");
  const [currencyUpdate, setcurrencyUpdate] = useState("");
  const [currencyValue, setcurrencyValue] = useState([]);
  const [defaultPrice, setdefaultPrice] = useState("");
  const [defaultPriceUpdate, setdefaultPriceUpdate] = useState("");
  const [transactionType1, settransactionType1] = useState("");
  const [transactionType1Update, settransactionType1Update] = useState("");
  const [transactionType2, settransactionType2] = useState("");
  const [transactionType2Update, settransactionType2Update] = useState("");
  const [transactionType3, settransactionType3] = useState("");
  const [transactionType3Update, settransactionType3Update] = useState("");
  const [transactionType4, settransactionType4] = useState("");
  const [transactionType4Update, settransactionType4Update] = useState("");
  const [info, setinfo] = useState("");
  const [infoUpdate, setinfoUpdate] = useState("");
  const [getUnit, setGetUnit] = useState([]);
  const [getData, setGetData] = useState([]);
  const [materialType, setMaterialType] = useState([]);
  const [materialTypeUpdate, setMaterialTypeUpdate] = useState([]);

  const [modalData, setModalData] = useState([])
  const [modal, setModal] = useState(false)

  const closeModal = () => {
    setModal(false)
    setCodeUpdate("")
    setNameUpdate("")
    setnameInPOUpdate("")
    setsmallestUnitUpdate("")
    setsoldUnitUpdate("")
    setskuUnitUpdate("")
    setgroup1valUpdate("")
    setgroup2valUpdate("")
    setgroup3valUpdate("")
    settypeUpdate("")
    setisBatchUpdate(true)
    setisServiceUpdate(false)
    setisAssetUpdate(false)
    setmassUpdate()
    setvolumeUpdate()
    sethsUpdate("")
    setbarcodeUpdate("")
    setminStockUpdate()
    setmaxStockUpdate()
    setcurrencyUpdate()
    setdefaultPriceUpdate("")
    settransactionType1Update("")
    settransactionType2Update("")
    settransactionType3Update("")
    settransactionType4Update("")
    setinfoUpdate("")
    setMaterialTypeUpdate([])
  }

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setisBatch(e.target.value === "batch")
    setisService(e.target.value === "service")
    setisAsset(e.target.value === "asset")
  };

  const handleOptionChangeUpdate = (e) => {
    setSelectedOptionUpdate(e.target.value);
    setisBatchUpdate(e.target.value === "batch")
    setisServiceUpdate(e.target.value === "service")
    setisAssetUpdate(e.target.value === "asset")
  };

  useEffect(() => {
    fetchMe();
  }, [!response]);

  const dataFetching = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/material`
      );
      setGetData(data.data);
    } catch (error) { }
  };

  const fetchGroup1 = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/materialgroup1`
      );
      setgroup1(response.data);
    } catch (error) { }
  };

  const fetchGroup2 = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/materialgroup2Code/${group1val}`
      );
      setgroup2(response.data);
    } catch (error) { }
  };

  const fetchGroup3 = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/materialgroup3Code/${group2val}`
      );
      setgroup3(response.data);
    } catch (error) { }
  };

  useEffect(() => {
    fetchGroup1();
    fetchGroup2();
    fetchGroup3();
  }, [group1val, group2val, group3val]);

  const deleteData = async (params) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/material/${params}`
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
        `${process.env.REACT_APP_API_BASE_URL}/material/${params}`,
        {
          name: nameUpdate,
          nameInPO: nameInPOUpdate,
          smallestUnit: smallestUnitUpdate,
          soldUnit: soldUnitUpdate,
          skuUnit: skuUnitUpdate,
          group1: group1valUpdate,
          group2: group2valUpdate,
          group3: group3valUpdate,
          gype: typeUpdate,
          isBatch: isBatchUpdate,
          isService: isServiceUpdate,
          isAsset: isAssetUpdate,
          mass: massUpdate,
          volume: volumeUpdate,
          hs: hsUpdate,
          barcode: barcodeUpdate,
          minStock: minStockUpdate,
          maxStock: maxStockUpdate,
          currency: currencyUpdate,
          defaultPrice: defaultPriceUpdate,
          transactionType1: transactionType1Update,
          transactionType2: transactionType2Update,
          transactionType3: transactionType3Update,
          transactionType4: transactionType4Update,
          info: infoUpdate,
          changedBy: response.User
        }
      );
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/unitconversion`, {
        materialCode: codeUpdate,
        unit: soldUnitUpdate,
        content: 1,
        createdBy: response.User,
        changedBy: response.User,
      });
      dataFetching();
      toast.success("Data Updated", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });

    } catch (error) {
      console.log(error)
    }
  }

  const handleSelectedOptionUpdate = (batch,service,asset) => {
    switch (true) {
      case batch:
        setSelectedOptionUpdate("batch");
        break;
      case service:
        setSelectedOptionUpdate("service");
        break;
      case asset:
        setSelectedOptionUpdate("asset");
        break;
      default:
        break;
    }
  }

  const submitClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/material`, {
        code: code,
        name: name,
        nameInPO: nameInPO,
        smallestUnit: smallestUnit,
        soldUnit: soldUnit,
        skuUnit: skuUnit,
        group1: group1val,
        group2: group2val,
        group3: group3val,
        type: type,
        isBatch: isBatch,
        isService: isService,
        isAsset: isAsset,
        mass: mass,
        volume: volume,
        hs: hs,
        barcode: barcode,
        minStock: minStock,
        maxStock: maxStock,
        currency: currency,
        defaultPrice: defaultPrice,
        transactionType1: transactionType1,
        transactionType2: transactionType2,
        transactionType3: transactionType3,
        transactionType4: transactionType4,
        info: info,
        createdBy: response.User,
        changedBy: response.User,
      });
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/unitconversion`, {
        materialCode: code,
        unit: soldUnit,
        content: 1,
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

  const getMyUnit = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/unit`
      );
      setGetUnit(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyCurrency = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/currency`
      );
      setcurrencyValue(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyMaterialType = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/materialtype`
      );
      setMaterialType(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataFetching();
    getMyUnit();
    getMyCurrency();
    getMyMaterialType();
  }, []);

  return (
    <div>
      <div className="text-2xl font-bold mb-4">Material</div>
      <form onSubmit={submitClick}>
        <table className="border-separate border-spacing-2 w-1/2">
          <tr>
            <td className="text-right">Code: </td>
            <td>
              <input
                onChange={(e) => {
                  setCode(e.target.value);
                }}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[25%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Isi nama"
                required
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Name in PO: </td>
            <td>
              <input
                onChange={(e) => {
                  setnameInPO(e.target.value);
                }}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Isi nama di PO"
              />
            </td>
          </tr>
          <tr>
            <td className="text-right">Smallest Unit:</td>
            <td>
              <select
                onChange={(e) => {
                  setsmallestUnit(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected hidden>
                  Pilih Unit
                </option>
                {getUnit.map((res, key) => {
                  return (
                    <option key={key} value={res.Code}>
                      {res.Code}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-right">Sold Unit:</td>
            <td>
              <select
                onChange={(e) => {
                  setsoldUnit(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected hidden>
                  Pilih Unit
                </option>
                {getUnit.map((res, key) => {
                  return (
                    <option key={key} value={res.Code}>
                      {res.Code}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-right">SKU Unit:</td>
            <td>
              <select
                onChange={(e) => {
                  setskuUnit(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected hidden>
                  Pilih Unit
                </option>
                {getUnit.map((res, key) => {
                  return (
                    <option key={key} value={res.Code}>
                      {res.Code}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-right">Group 1:</td>
            <td>
              <select
                onChange={(e) => {
                  setgroup1val(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected hidden>
                  Pilih Group
                </option>
                {group1.map((res, key) => {
                  return (
                    <option key={key} value={res.Code}>
                      {res.Code}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-right">Group 2:</td>
            <td>
              <select
                onChange={(e) => {
                  setgroup2val(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected hidden>
                  Pilih Group
                </option>
                {group2.map((res, key) => {
                  return (
                    <option key={key} value={res.Code}>
                      {res.Code}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-right">Group 3:</td>
            <td>
              <select
                onChange={(e) => {
                  setgroup3val(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected hidden>
                  Pilih Group
                </option>
                {group3.map((res, key) => {
                  return (
                    <option key={key} value={res.Code}>
                      {res.Code}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td className="text-right">Material Type:</td>
            <td>
              <select
                onChange={(e) => settype(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected hidden>
                  Pilih Material Type
                </option>
                {materialType.map((res, key) => {
                  return (
                    <option key={key} value={res.Code}>
                      {res.Code}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
        </table>

        <div className="ml-20 flex gap-5">
          <div className="flex gap-4">
            <input
              value="batch"
              checked={selectedOption === "batch"}
              onChange={(e) => {
                handleOptionChange(e);
              }}
              type="radio"
              name="pilihan"
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
            Batch
          </div>
          <div className="flex gap-4">
            <input
              value="service"
              checked={selectedOption === "service"}
              onChange={(e) => {
                handleOptionChange(e);
              }}
              type="radio"
              name="pilihan"
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
            Service
          </div>
          <div className="flex gap-4">
            <input
              value="asset"
              checked={selectedOption === "asset"}
              onChange={(e) => {
                handleOptionChange(e);
              }}
              type="radio"
              name="pilihan"
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
            Asset
          </div>
        </div>
        <div className="flex">
          <table className="border-separate border-spacing-2 w-1/2">
            <tr>
              <td className="text-right">Mass: </td>
              <td className="flex items-center gap-2">
                <input
                  onChange={(e) => {
                    setmass(e.target.value);
                  }}
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  required
                />
                KG
              </td>
            </tr>
            <tr>
              <td className="text-right">Volume: </td>
              <td className="flex items-center gap-2">
                <input
                  onChange={(e) => {
                    setvolume(e.target.value);
                  }}
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  required
                />
                CDM
              </td>
            </tr>
            <tr>
              <td className="text-right">HS: </td>
              <td>
                <input
                  onChange={(e) => {
                    seths(e.target.value);
                  }}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Isi HS"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">Barcode: </td>
              <td>
                <input
                  onChange={(e) => {
                    setbarcode(e.target.value);
                  }}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Isi barcode"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">Min Stock: </td>
              <td className="flex gap-2 classNameitems-center">
                <input
                  onChange={(e) => {
                    setminStock(e.target.value);
                  }}
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0"
                  required
                />
                Smallest Unit
              </td>
            </tr>
            {selectedOption === "batch" && (
              <>
                <tr>
                  <td className="text-right">Persediaan:</td>
                  <td>
                    <select onChange={(e) => { settransactionType1(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option disabled selected>
                        Pilih Transaction Type
                      </option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">HPP:</td>
                  <td>
                    <select onChange={(e) => { settransactionType2(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option disabled selected>
                        Pilih Transaction Type
                      </option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">Penjualan:</td>
                  <td>
                    <select onChange={(e) => { settransactionType3(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option disabled selected>
                        Pilih Transaction Type
                      </option>
                      <option value="US">ELT</option>
                      <option value="CA">COM</option>
                      <option value="FR">USA</option>
                      <option value="DE">GRS</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">Retur Jual:</td>
                  <td>
                    <select onChange={(e) => { settransactionType4(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option disabled selected>
                        Pilih Transaction Type
                      </option>
                    </select>
                  </td>
                </tr>
              </>
            )}

            {selectedOption === "service" && (
              <>
                <tr>
                  <td className="text-right">Biaya:</td>
                  <td>
                    <select onChange={(e) => { settransactionType1(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option disabled selected>
                        Pilih Transaction Type
                      </option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">Pendapatan:</td>
                  <td>
                    <select onChange={(e) => { settransactionType2(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option disabled selected>
                        Pilih Transaction Type
                      </option>
                      <option value="US">ELT</option>
                      <option value="CA">COM</option>
                      <option value="FR">USA</option>
                      <option value="DE">GRS</option>
                    </select>
                  </td>
                </tr>
              </>
            )}

            {selectedOption === "asset" && (
              <>
                <tr>
                  <td className="text-right">Asset:</td>
                  <td>
                    <select onChange={(e) => { settransactionType1(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option disabled selected>
                        Pilih Transaction Type
                      </option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">Depresiasi:</td>
                  <td>
                    <select onChange={(e) => { settransactionType2(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option disabled selected>
                        Pilih Transaction Type
                      </option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">Ak.Depresiasi:</td>
                  <td>
                    <select onChange={(e) => { settransactionType3(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option disabled selected>
                        Pilih Transaction Type
                      </option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">Pendapatan:</td>
                  <td>
                    <select onChange={(e) => { settransactionType4(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option disabled selected>
                        Pilih Transaction Type
                      </option>
                    </select>
                  </td>
                </tr>
              </>
            )}
          </table>
          <table className="border-separate w-1/2 h-10">
            <tr>
              <td className="text-right">Info: </td>
              <td>
                <input
                  onChange={(e) => setinfo(e.target.value)}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Isi info"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">Price/Sold Unit: </td>
              <td>
                <div className="flex items-center gap-2">
                  <select
                    onChange={(e) => setcurrency(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option disabled selected>
                      Pilih Currency
                    </option>
                    {currencyValue.map((res, key) => {
                      return (
                        <option key={key} value={res.Code}>
                          {res.Code}
                        </option>
                      );
                    })}
                  </select>
                  <input
                    onChange={(e) => setdefaultPrice(e.target.value)}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0"
                    required
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="text-right">Max Stock: </td>
              <td>
                <div className="flex gap-2 items-center">
                  <input
                    onChange={(e) => setmaxStock(e.target.value)}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0"
                    required
                  />
                  Smallest Unit
                </div>
              </td>
            </tr>
            <tr></tr>
          </table>
        </div>

        <div className="ml-[120px]">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
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
                NameInPO
              </th>
              <th scope="col" className="px-6 py-3">
                Smallest Unit
              </th>
              <th scope="col" className="px-6 py-3">
                Sold Unit
              </th>
              <th scope="col" className="px-6 py-3">
                SKUUnit
              </th>
              <th scope="col" className="px-6 py-3">
                Group 1
              </th>
              <th scope="col" className="px-6 py-3">
                Group 2
              </th>
              <th scope="col" className="px-6 py-3">
                Group 3
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                IsBatch
              </th>
              <th scope="col" className="px-6 py-3">
                IsService
              </th>
              <th scope="col" className="px-6 py-3">
                IsAsset
              </th>
              <th scope="col" className="px-6 py-3">
                Mass
              </th>
              <th scope="col" className="px-6 py-3">
                Volume
              </th>
              <th scope="col" className="px-6 py-3">
                HS
              </th>
              <th scope="col" className="px-6 py-3">
                Barcode
              </th>
              <th scope="col" className="px-6 py-3">
                MinStock
              </th>
              <th scope="col" className="px-6 py-3">
                MaxStock
              </th>
              <th scope="col" className="px-6 py-3">
                Currency
              </th>
              <th scope="col" className="px-6 py-3">
                DefaultPrice
              </th>
              <th scope="col" className="px-6 py-3">
                Transaction Type 1
              </th>
              <th scope="col" className="px-6 py-3">
                Transaction Type 2
              </th>
              <th scope="col" className="px-6 py-3">
                Transaction Type 3
              </th>
              <th scope="col" className="px-6 py-3">
                Transaction Type 4
              </th>
              <th scope="col" className="px-6 py-3">
                Info
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
                    {res.Code}
                  </th>
                  <td className="px-6 py-4">{res.Name}</td>
                  <td className="px-6 py-4">{res.NameInPO}</td>
                  <td className="px-6 py-4">{res.SmallestUnit}</td>
                  <td className="px-6 py-4">{res.SoldUnit}</td>
                  <td className="px-6 py-4">{res.SKUUnit}</td>
                  <td className="px-6 py-4">{res.Group1}</td>
                  <td className="px-6 py-4">{res.Group2}</td>
                  <td className="px-6 py-4">{res.Group3}</td>
                  <td className="px-6 py-4">{res.Type}</td>
                  <td className="px-6 py-4">
                    {res.IsBatch === true ? "True" : "False"}
                  </td>
                  <td className="px-6 py-4">
                    {res.IsService === true ? "True" : "False"}
                  </td>
                  <td className="px-6 py-4">
                    {res.IsAsset === true ? "True" : "False"}
                  </td>
                  <td className="px-6 py-4">{res.Mass}</td>
                  <td className="px-6 py-4">{res.Volume}</td>
                  <td className="px-6 py-4">{res.HS}</td>
                  <td className="px-6 py-4">{res.Barcode}</td>
                  <td className="px-6 py-4">{res.MinStock}</td>
                  <td className="px-6 py-4">{res.MaxStock}</td>
                  <td className="px-6 py-4">{res.Currency}</td>
                  <td className="px-6 py-4">{res.DefaultPrice}</td>
                  <td className="px-6 py-4">{res.TransactionType1}</td>
                  <td className="px-6 py-4">{res.TransactionType2}</td>
                  <td className="px-6 py-4">{res.TransactionType3}</td>
                  <td className="px-6 py-4">{res.TransactionType4}</td>
                  <td className="px-6 py-4">{res.Info}</td>
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
                      onClick={() => deleteData(res.Code)}
                      type="button"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setModalData(res)
                        setModal(true)
                        setCodeUpdate(res.Code)
                        handleSelectedOptionUpdate(res.IsBatch,res.IsService,res.IsAsset)
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
      <div className={`flex justify-center top-0 left-0 fixed items-center w-screen h-screen z-[5] ${modal ? 'block' : 'hidden'}`}>
        <div className={`bg-slate-50 h-[90vh] fixed rounded-lg border border-black overflow-y-scroll p-5`}>
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
            <div className="w-[75%]">
              <table className='border-separate border-spacing-2'>
                <tr>
                  <td className="text-right">Name: </td>
                  <td>
                    <input
                      onChange={(e) => {
                        setNameUpdate(e.target.value);
                      }}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={modalData.Name}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right">Name in PO: </td>
                  <td>
                    <input
                      onChange={(e) => {
                        setnameInPOUpdate(e.target.value);
                      }}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={modalData.NameInPO}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right">Smallest Unit:</td>
                  <td>
                    <select
                      onChange={(e) => {
                        setsmallestUnitUpdate(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option disabled selected hidden>
                        {modalData.SmallestUnit}
                      </option>
                      {getUnit.map((res, key) => {
                        return (
                          <option key={key} value={res.Code}>
                            {res.Code}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">Sold Unit:</td>
                  <td>
                    <select
                      onChange={(e) => {
                        setsoldUnitUpdate(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option disabled selected hidden>
                        {modalData.SoldUnit}
                      </option>
                      {getUnit.map((res, key) => {
                        return (
                          <option key={key} value={res.Code}>
                            {res.Code}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">SKU Unit:</td>
                  <td>
                    <select
                      onChange={(e) => {
                        setskuUnitUpdate(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option disabled selected hidden>
                        {modalData.SKUUnit}
                      </option>
                      {getUnit.map((res, key) => {
                        return (
                          <option key={key} value={res.Code}>
                            {res.Code}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">Group 1:</td>
                  <td>
                    <select
                      onChange={(e) => {
                        setgroup1valUpdate(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option disabled selected hidden>
                        {modalData.Group1}
                      </option>
                      {group1.map((res, key) => {
                        return (
                          <option key={key} value={res.Code}>
                            {res.Code}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">Group 2:</td>
                  <td>
                    <select
                      onChange={(e) => {
                        setgroup2valUpdate(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option disabled selected hidden>
                        {modalData.Group2}
                      </option>
                      {group2.map((res, key) => {
                        return (
                          <option key={key} value={res.Code}>
                            {res.Code}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">Group 3:</td>
                  <td>
                    <select
                      onChange={(e) => {
                        setgroup3valUpdate(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option disabled selected hidden>
                        {modalData.Group1}
                      </option>
                      {group3.map((res, key) => {
                        return (
                          <option key={key} value={res.Code}>
                            {res.Code}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">Material Type:</td>
                  <td>
                    <select
                      onChange={(e) => settypeUpdate(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option disabled selected hidden>
                      {modalData.Type}
                      </option>
                      {materialType.map((res, key) => {
                        return (
                          <option key={key} value={res.Code}>
                            {res.Code}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                </tr>
              </table>
              <div className="ml-20 flex gap-5">
                <div className="flex gap-4">
                  <input
                    value="batch"
                    checked={selectedOptionUpdate === "batch"}
                    onChange={(e) => {
                      handleOptionChangeUpdate(e);
                    }}
                    type="radio"
                    name="pilihan"
                    id=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                  Batch
                </div>
                <div className="flex gap-4">
                  <input
                    value="service"
                    checked={selectedOptionUpdate === "service"}
                    onChange={(e) => {
                      handleOptionChangeUpdate(e);
                    }}
                    type="radio"
                    name="pilihan"
                    id=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                  Service
                </div>
                <div className="flex gap-4">
                  <input
                    value="asset"
                    checked={selectedOptionUpdate === "asset"}
                    onChange={(e) => {
                      handleOptionChangeUpdate(e);
                    }}
                    type="radio"
                    name="pilihan"
                    id=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
                  Asset
                </div>
              </div>
              <div className="flex">
                <table className="border-separate border-spacing-2 w-1/2">
                  <tr>
                    <td className="text-right">Mass: </td>
                    <td className="flex items-center gap-2">
                      <input
                        onChange={(e) => {
                          setmassUpdate(e.target.value);
                        }}
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="0"
                        required
                      />
                      KG
                    </td>
                  </tr>
                  <tr>Update
                    <td className="text-right">Volume: </td>
                    <td className="flex items-center gap-2">
                      <input
                        onChange={(e) => {
                          setvolumeUpdate(e.target.value);
                        }}
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="0"
                        required
                      />
                      CDM
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">HS: </td>
                    <td>
                      <input
                        onChange={(e) => {
                          sethsUpdate(e.target.value);
                        }}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Isi HS"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Barcode: </td>
                    <td>
                      <input
                        onChange={(e) => {
                          setbarcodeUpdate(e.target.value);
                        }}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Isi barcode"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Min Stock: </td>
                    <td className="flex gap-2 classNameitems-center">
                      <input
                        onChange={(e) => {
                          setminStockUpdate(e.target.value);
                        }}
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="0"
                        required
                      />
                      Smallest Unit
                    </td>
                  </tr>
                  {selectedOptionUpdate === "batch" && (
                    <>
                      <tr>
                        <td className="text-right">Persediaan:</td>
                        <td>
                          <select onChange={(e) => { settransactionType1Update(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option disabled selected>
                              Pilih Transaction Type
                            </option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-right">HPP:</td>
                        <td>
                          <select onChange={(e) => { settransactionType2Update(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option disabled selected>
                              Pilih Transaction Type
                            </option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-right">Penjualan:</td>
                        <td>
                          <select onChange={(e) => { settransactionType3Update(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option disabled selected>
                              Pilih Transaction Type
                            </option>
                            <option value="US">ELT</option>
                            <option value="CA">COM</option>
                            <option value="FR">USA</option>
                            <option value="DE">GRS</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-right">Retur Jual:</td>
                        <td>
                          <select onChange={(e) => { settransactionType4Update(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option disabled selected>
                              Pilih Transaction Type
                            </option>
                          </select>
                        </td>
                      </tr>
                    </>
                  )}

                  {selectedOptionUpdate === "service" && (
                    <>
                      <tr>
                        <td className="text-right">Biaya:</td>
                        <td>
                          <select onChange={(e) => { settransactionType1Update(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option disabled selected>
                              Pilih Transaction Type
                            </option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-right">Pendapatan:</td>
                        <td>
                          <select onChange={(e) => { settransactionType2Update(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option disabled selected>
                              Pilih Transaction Type
                            </option>
                            <option value="US">ELT</option>
                            <option value="CA">COM</option>
                            <option value="FR">USA</option>
                            <option value="DE">GRS</option>
                          </select>
                        </td>
                      </tr>
                    </>
                  )}

                  {selectedOptionUpdate === "asset" && (
                    <>
                      <tr>
                        <td className="text-right">Asset:</td>
                        <td>
                          <select onChange={(e) => { settransactionType1Update(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option disabled selected>
                              Pilih Transaction Type
                            </option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-right">Depresiasi:</td>
                        <td>
                          <select onChange={(e) => { settransactionType2Update(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option disabled selected>
                              Pilih Transaction Type
                            </option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-right">Ak.Depresiasi:</td>
                        <td>
                          <select onChange={(e) => { settransactionType3Update(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option disabled selected>
                              Pilih Transaction Type
                            </option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-right">Pendapatan:</td>
                        <td>
                          <select onChange={(e) => { settransactionType4Update(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option disabled selected>
                              Pilih Transaction Type
                            </option>
                          </select>
                        </td>
                      </tr>
                    </>
                  )}
                </table>
                <table className="border-separate w-1/2 h-10">
                  <tr>
                    <td className="text-right">Info: </td>
                    <td>
                      <input
                        onChange={(e) => setinfoUpdate(e.target.value)}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Isi info"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Price/Sold Unit: </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <select
                          onChange={(e) => setcurrencyUpdate(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[50%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option disabled selected>
                            Pilih Currency
                          </option>
                          {currencyValue.map((res, key) => {
                            return (
                              <option key={key} value={res.Code}>
                                {res.Code}
                              </option>
                            );
                          })}
                        </select>
                        <input
                          onChange={(e) => setdefaultPriceUpdate(e.target.value)}
                          type="number"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="0"
                          required
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Max Stock: </td>
                    <td>
                      <div className="flex gap-2 items-center">
                        <input
                          onChange={(e) => setmaxStockUpdate(e.target.value)}
                          type="number"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[70%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="0"
                          required
                        />
                        Smallest Unit
                      </div>
                    </td>
                  </tr>
                  <tr></tr>
                </table>
              </div>
              <button onClick={() => { updateData(modalData.Code) }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">Update</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  )
}
