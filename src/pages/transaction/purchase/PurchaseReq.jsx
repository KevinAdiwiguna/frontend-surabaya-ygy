import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useMe } from "../../../hooks/API/useMe";
import { dateConverter } from '../../../components/dateConverter';
import { toast, ToastContainer } from 'react-toastify'

export const PurchaseReq = () => {
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

  const [materialValUpdate, setMaterialValUpdate] = useState("");
  const [infoUpdate, setInfoUpdate] = useState("");
  const [qtyUpdate, setQtyUpdate] = useState("");
  const [requiredDateUpdate, setRequiredDateUpdate] = useState("");
  const [detailDataUpdate, setDetailDataUpdate] = useState([])
  const [materialValChange, setMaterialValChange] = useState("");
  const [infoChange, setInfoChange] = useState("");
  const [qtyChange, setQtyChange] = useState("");
  const [requiredDateChange, setRequiredDateChange] = useState("");



  const getMaterial = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/material`
    );
    setGetMaterial(data.data);
  }

  // const getDepartment = async () => {
  //   const data = await axios.get(
  //     `${process.env.REACT_APP_API_BASE_URL}/department`
  //   );
  //   setGetDepartment(data.data);
  // }

  // const getJobOrder = async () => {
  //   const response = await axios.get(
  //     `${process.env.REACT_APP_API_BASE_URL}/joborder`
  //   );
  //   setGetJobOrder(response.data);
  // }

  const getMaterialDetail = async (params) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/material/${params}`)
      setGetMyMaterialDetail(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMaterialDetail(materialVal)
  }, [materialVal])

  useEffect(() => {
    getMaterialDetail(materialValUpdate)
  }, [materialValUpdate])

  const dataFetching = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/purchaserequesth`
      );
      setGetData(data.data);
    } catch (error) { }
  };

  const getSeries = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/seriescode/PURCHASE REQUEST`)
      setGetSeries(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const closeModal = () => {
    setModal(false)
    setDetailDataUpdate([])
    setInformationUpdate("")
    // setDeliveryDateUpdate('')
  }

  const addPurchaseReqDetail = (e) => {
    e.preventDefault();
    setDetailData([
      ...detailData,
      {
        materialCode: materialVal,
        info: info || getMyMaterialDetail?.Info ? info || getMyMaterialDetail?.Info : "-",
        qty: qty,
        unit: getMyMaterialDetail?.SmallestUnit,
        requiredDate: dateConverter(requiredDate),
        qtyPO: 0,
      }
    ])
  }

  const addUpdatePurchaseReqDetail = (e) => {
    e.preventDefault();
    setDetailDataUpdate([
      ...detailDataUpdate,
      {
        materialCode: materialValUpdate,
        info: infoUpdate || getMyMaterialDetail?.Info ? infoUpdate || getMyMaterialDetail?.Info : "-",
        qty: qtyUpdate,
        unit: getMyMaterialDetail?.SmallestUnit,
        requiredDate: dateConverter(requiredDateUpdate),
        qtyPO: 0,
      }
    ])
  }

  const deleteDetailData = (e) => {
    setDetailData((prevDataArr) =>
      prevDataArr.filter((obj, key) => key !== e)
    );
  }

  const deleteDetailDataUpdate = (e) => {
    setDetailDataUpdate((prevDataArr) =>
      prevDataArr.filter((obj, key) => key !== e)
    );
  }

  const generateDocDate = () => {
    const today = new Date(docDate)
    const year = today.getFullYear().toString().substring(2)
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')
    return year + month + day
  }

  const changePurchaseDetailData = async (e, key) => {
    try{
      axios.patch(`${process.env.REACT_APP_API_BASE_URL}/purchaserequestd/${e}/${key}`, {
				MaterialCode: materialValChange,
				Info: infoChange,
				Unit: getPurchaseDetail[key].Unit,
				Qty: qtyChange,
				RequiredDate: dateConverter(requiredDateChange),
				qtyWO: 0,
			})
      getPurchaseDetailByDocNo(e)
    } catch(error){

    }
  }

  const submitClick = async (e) => {
    e.preventDefault();
    if (!detailData) {
      return
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/purchaserequesth`, {
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

  const getPurchaseDetailByDocNo = async (params) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/purchaserequestd/${params}`)
      setGetPurchaseDetail(response.data)
      setGetPurchaseDetailwew(Array.isArray(response.data) ? response.data : [])
    } catch (error) { 
      console.log(error)
    }
  }

  const sendDetailToInput = (res, key) => {
    console.log(res.DocNo);
    setDocNoChange(res.DocNo)
    setMaterialValChange(res.MaterialCode)
    setInfoChange(res.Info)
    setQtyChange(res.Qty)
    setDetailKey(key)
    setRequiredDateChange(res.RequiredDate)
  }

  const deleteData = async (params) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/purchaserequesth/${params}`)
      dataFetching()
      toast.success('Data Deleted', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      })
    } catch (error) { }
  }

  const updateData = async (params) => {
		try {
			await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/purchaserequesth/${params}`, {
				JODoNo: JODocNoUpdate,
				trip: "",
				department: departmentUpdate,
				information: informationUpdate,
				status: 'OPEN',
				isPurchaseReturn: false,
				changedBy: response.User,
			})
			if (detailDataUpdate) {
				await axios.patch(
					`${process.env.REACT_APP_API_BASE_URL}/purchaserequestd/${params}`,
					detailDataUpdate.map((detail) => ({
						...detail,
						materialCode: detail.MaterialCode,
						info: detail.Info,
						unit: detail.Unit,
						qty: detail.Qty,
						tequiredDate: detail.RequiredDate,
						qtyPO: 0,
					}))
				)
			}

			dataFetching()
			getPurchaseDetailByDocNo(params)
      setDetailDataUpdate([])
			toast.success('Data Updated', {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
			})
		} catch (error) {
			console.log(error)
		}
	}

  useEffect(() => {
    dataFetching();
    getSeries();
    getMaterial();
    // getJobOrder();
  }, []);

  useEffect(() => {
    fetchMe();
  }, [!response]);


  return (
    <div>
      <div className='text-2xl font-bold mb-4'>Purchase Request</div>
      <form onSubmit={submitClick}>
        <div className='w-[75%]'>
          <div className='flex justify-start items-center'>
            <table className='border-separate border-spacing-2 w-1/2'>
              <tr>
                <td className='text-right'>Series: </td>
                <td>
                  <select onChange={(e) => { setSeries(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected hidden>Pilih series</option>
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
                <td className='text-right'>Doc Date: </td>
                <td>
                  <input onChange={(e) => { setDocDate(e.target.value) }} min={currentDate} type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </td>
              </tr>
            </table>
            <table className='border-separate border-spacing-2 w-1/2'>
              <tr>
                <td className='text-right'>Job Order No: </td>
                <td>
                  <select onChange={(e) => { setJODocNo(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected hidden>Pilih job order number</option>
                    {GetMyjobOrder.map((res, key) => {
                      return (
                        <option key={key} value={res.Code}>{res.Code}</option>
                      )
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td className='text-right'>Department: </td>
                <td>
                  <select onChange={(e) => { setDepartment(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected hidden>Pilih department</option>
                    {getMyDepartment.map((res, key) => {
                      return (
                        <option key={key} value={res.Code}>{res.Code}</option>
                      )
                    })}
                  </select>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className='w-[75%] flex gap-3 items-center'>
          <label>Information:</label>
          <input onChange={(e) => { setInformation(e.target.value) }} type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
        </div>
        <div className='pl-[100px] my-2'>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">Save</button>
        </div>
      </form>
      <div>
        <form onSubmit={addPurchaseReqDetail}>
          <table className='border-separate border-spacing-2'>
            <tr>
              <td className="text-right">Material:</td>
              <td>
                <select onChange={(e) => setMaterialVal(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option disabled selected hidden>
                    Pilih Material
                  </option>
                  {getMyMaterial.map((res, key) => {
                    return (
                      <option key={key} value={res.Code}>
                        {res.Code}
                      </option>
                    )
                  })}
                </select>
              </td>
              <td className="text-right">Info:</td>
              <td>
                <input onChange={(e) => { setInfo(e.target.value) }} type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={info || getMyMaterialDetail?.Info} />
              </td>
              <td className="text-right">Quantity:</td>
              <td>
                <input onChange={(e) => { setQty(e.target.value) }} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min="0" />
              </td>
              <td className="text-right">Required Date:</td>
              <td>
                <input min={currentDate} onChange={(e) => { setRequiredDate(e.target.value) }} type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
              </td>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">
                Add
              </button>
            </tr>
          </table>
        </form>
      </div>


      <div className="relative overflow-x-auto pt-10">
        <div className='text-xl font-bold'>Detail:</div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Code
              </th>
              <th scope="col" className="px-6 py-3">
                Info
              </th>
              <th scope="col" className="px-6 py-3">
                Unit
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Required Date
              </th>
              <th scope="col" className="px-6 py-3">
                QtyPO
              </th>
              <th scope="col" className="px-6 py-3">
                Control
              </th>
            </tr>
          </thead>
          <tbody>
            {detailData.map((res, key) => {
              return (
                <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {res.materialCode}
                  </th>
                  <td className="px-6 py-4">
                    {res.info}
                  </td>
                  <td className="px-6 py-4">
                    {res.unit}
                  </td>
                  <td className="px-6 py-4">
                    {res.qty}
                  </td>
                  <td className="px-6 py-4">
                    {res.requiredDate}
                  </td>
                  <td className="px-6 py-4">
                    {res.qtyPO}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => { deleteDetailData(key) }} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div>
        </div>
      </div>

      <div className='text-xl pt-4 font-bold'>Header :</div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                DocNo
              </th>
              <th scope="col" className="px-6 py-3">
                Series
              </th>
              <th scope="col" className="px-6 py-3">
                DocDate
              </th>
              <th scope="col" className="px-6 py-3">
                JODocNo
              </th>
              <th scope="col" className="px-6 py-3">
                Trip
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Information
              </th>
              <th scope="col" className="px-6 py-3">
                Status
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
                    {res.DocNo}
                  </th>
                  <td className="px-6 py-4">
                    {res.Series}
                  </td>
                  <td className="px-6 py-4">
                    {res.DocDate}
                  </td>
                  <td className="px-6 py-4">
                    {res.JODocNo}
                  </td>
                  <td className="px-6 py-4">
                    {res.Trip}
                  </td>
                  <td className="px-6 py-4">
                    {res.Department}
                  </td>
                  <td className="px-6 py-4">
                    {res.Information}
                  </td>
                  <td className="px-6 py-4">
                    {res.Status}
                  </td>
                  <td className="px-6 py-4">
                    {res.CreatedBy}
                  </td>
                  <td className="px-6 py-4">
                    {dateConverter(res.CreatedDate)}
                  </td>
                  <td className="px-6 py-4">
                    {res.ChangedBy}
                  </td>
                  <td className="px-6 py-4">
                    {dateConverter(res.ChangedDate)}
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => { deleteData(res.DocNo) }} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">delete</button>
                    <button
                      onClick={() => {
                        setModalData(res)
                        setModal(true)
                        getPurchaseDetailByDocNo(res.DocNo)   
                      }}
                      type="button"
                      className="focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
                      Update
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div>
        </div>
      </div>
      <div className={`bg-slate-50 fixed w-[90%] h-[90%] top-6 left-24 rounded-lg border border-black overflow-y-scroll p-5 ${modal ? 'block' : 'hidden'}`}>
        <div className="space-y-6">
          <div className="text-2xl font-bold mb-4 ">DocNo: {modalData.DocNo}</div>
          <button
            onClick={() => {
              closeModal()
            }}
            className="absolute top-0 right-4 text-gray-600 hover:text-gray-800 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <form onSubmit={updateData}>
            <div className='w-[75%]'>
              <div className='flex justify-start items-center'>
                <table className='border-separate border-spacing-2 w-1/2'>
                  <tr>
                    <td className='text-right'>Series: </td>
                    <td>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected hidden>{modalData.Series}</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right'>Doc Date: </td>
                    <td>
                      <input value={modalData.DocDate + "T00:00"} min={currentDate} type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                    </td>
                  </tr>
                </table>
                <table className='border-separate border-spacing-2 w-1/2'>
                  <tr>
                    <td className='text-right'>Job Order No: </td>
                    <td>
                      <select onChange={(e) => { setJODocNoUpdate(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected hidden>{modalData.JODoNo}</option>
                        {GetMyjobOrder.map((res, key) => {
                          return (
                            <option key={key} value={res.Code}>{res.Code}</option>
                          )
                        })}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right'>Department: </td>
                    <td>
                      <select onChange={(e) => { setDepartmentUpdate(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected hidden>{modalData.Department}</option>
                        {getMyDepartment.map((res, key) => {
                          return (
                            <option key={key} value={res.Code}>{res.Code}</option>
                          )
                        })}
                      </select>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className='w-[75%] flex gap-3 items-center'>
              <label>Information:</label>
              <input placeholder={modalData.Information} onChange={(e) => { setInformationUpdate(e.target.value) }} type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className='pl-[100px] my-2'>
              <button onClick={()=>{updateData(modalData.DocNo)}} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">Update</button>
            </div>
          </form>
          <div>
            <form onSubmit={addUpdatePurchaseReqDetail}>
              <table className='border-separate border-spacing-2'>
                <tr>
                  <td className="text-right">Material:</td>
                  <td>
                    <select onChange={(e) => setMaterialValUpdate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option disabled selected hidden>
                        Pilih Material
                      </option>
                      {getMyMaterial.map((res, key) => {
                        return (
                          <option key={key} value={res.Code}>
                            {res.Code}
                          </option>
                        )
                      })}
                    </select>
                  </td>
                  <td className="text-right">Info:</td>
                  <td>
                    <input onChange={(e) => { setInfoUpdate(e.target.value) }} type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={infoUpdate || getMyMaterialDetail?.Info} />
                  </td>
                  <td className="text-right">Quantity:</td>
                  <td>
                    <input onChange={(e) => { setQtyUpdate(e.target.value) }} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min="0" />
                  </td>
                  <td className="text-right">Required Date:</td>
                  <td>
                    <input min={currentDate} onChange={(e) => { setRequiredDateUpdate(e.target.value) }} type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                  </td>
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">
                    Add
                  </button>
                </tr>
              </table>
            </form>
          </div>
          <div className="relative overflow-x-auto">
            <div className='text-xl font-bold'>New Detail Data:</div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Code
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Info
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Unit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Required Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    QtyPO
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Control
                  </th>
                </tr>
              </thead>
              <tbody>
                {detailDataUpdate.map((res, key) => {
                  return (
                    <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {res.materialCode}
                      </th>
                      <td className="px-6 py-4">
                        {res.info}
                      </td>
                      <td className="px-6 py-4">
                        {res.unit}
                      </td>
                      <td className="px-6 py-4">
                        {res.qty}
                      </td>
                      <td className="px-6 py-4">
                        {res.requiredDate}
                      </td>
                      <td className="px-6 py-4">
                        {res.qtyPO}
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => {deleteDetailDataUpdate(key)}} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">delete</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div>
            </div>
          </div>
          <div>
              <table className='border-separate border-spacing-2'>
                <tr>
                  <td className="text-right">Material:</td>
                  <td>
                    <select onChange={(e) => setMaterialValChange(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option disabled selected hidden>
                        {materialValChange || "Pilih Material"}
                      </option>
                      {getMyMaterial.map((res, key) => {
                        return (
                          <option key={key} value={res.Code}>
                            {res.Code}
                          </option>
                        )
                      })}
                    </select>
                  </td>
                  <td className="text-right">Info:</td>
                  <td>
                    <input onChange={(e) => { setInfoChange(e.target.value) }} type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={infoChange} />
                  </td>
                  <td className="text-right">Quantity:</td>
                  <td>
                    <input value={qtyChange} onChange={(e) => { setQtyChange(e.target.value) }} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min="0" />
                  </td>
                  <td className="text-right">Required Date:</td>
                  <td>
                    <input min={currentDate} onChange={(e) => { setRequiredDateChange(e.target.value) }} type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                  </td>
                  <button
                    onClick={()=>{changePurchaseDetailData(docNoChange,detailKey)}}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">
                    Change
                  </button>
                </tr>
              </table>
          </div>
          <div className="relative overflow-x-auto">
            <div className='text-xl font-bold'>Detail:</div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Control
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Code
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Info
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Unit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Required Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    QtyPO
                  </th>
                </tr>
              </thead>
              <tbody>
								{getPurchaseDetail.map((res, key) => {
									return (
										<tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
											<td className="px-6 py-4">
												<button
													onClick={() => {
														sendDetailToInput(res, key)
													}}
													type="button"
													className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">
													Select
												</button>
											</td>
											<td className="px-6 py-4">{res.MaterialCode} - {key}</td>
											<td className="px-6 py-4">{res.Info}</td>
											<td className="px-6 py-4">{res.Unit}</td>
											<td className="px-6 py-4">{res.Qty}</td>
											<td className="px-6 py-4">{res.RequiredDate}</td>
											<td className="px-6 py-4">{res.QtyPO}</td>
										</tr>
									)
								})}
              </tbody>
            </table>
            <div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  )
}

