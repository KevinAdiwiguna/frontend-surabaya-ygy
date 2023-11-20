import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useMe } from "../../hooks/API/useMe";
import { dateConverter } from '../../components/dateConverter';
import { toast, ToastContainer } from 'react-toastify'

export const JobOrder = () => {
  const { fetchMe, response } = useMe();
  const currentDate = new Date().toISOString().slice(0, 16)


  const [getSeries, setGetSeries] = useState([])
  const [getSalesOrderNo, setGetSalesOrderNo] = useState([])
  const [getJobOrder, setGetJobOrder] = useState([])
  const [getLocation, setGetLocation] = useState([])
  const [getDepartement, setGetDepartement] = useState([])
  const [getFormula, setGetFormula] = useState([])



  const [selectedSeries, setSelectedSeries] = useState('')
  const [selectedSalesOrderNo, setSelectedSalesOrderNo] = useState('')
  const [selectedJobOrder, setSelectedJobOrder] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedDepartement, setSelectedDepartement] = useState('')
  const [selectedFormula, setSelectedFormula] = useState('')
  const [selectedMaterialCode, setSelectedMaterialCode] = useState('')
  const [selectedUnit, setSelectedUnit] = useState('')
  const [excludeFromCostDistribution, setExcludeFromCostDistribution] = useState(false)
  const [plannedStartDate, setPlannedStartDate] = useState('')
  const [requiredDate, setRequiredDate] = useState('')
  const [plannedFinishDate, setPlannedFinishDate] = useState('')
  const [qtyTarget, setQtyTarget] = useState('')
  const [checkQtyOutput, setCheckQtyOutput] = useState(false)
  const [information, setInformation] = useState('')
  const [priority, setPriority] = useState('')

  const getSeriesFetch = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/seriesCode/JOB ORDER`)
    setGetSeries(res?.data)
  }

  const getSalesOrderNoFetch = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/salesorderh`)
    setGetSalesOrderNo(res?.data)
  }

  const getJobOrderFetch = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/joborder`)
    setGetJobOrder(res?.data)
  }

  const getLocationFetch = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/location`)
    setGetLocation(res?.data)
  }

  const getDepartementFetch = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/department`)
    setGetDepartement(res?.data)
  }

  const getFormulaFetch = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/woth`)
    setGetFormula(res?.data)
  }

  const getMaterialCode = async (params) => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/woth/${params}`)
    setSelectedMaterialCode(res?.data?.MaterialCode)
    setSelectedUnit(res?.data?.Unit)
  }



  const fetchFunction = () => {
    fetchMe()
    getFormulaFetch()
    getDepartementFetch()
    getLocationFetch()
    getSeriesFetch()
    getSalesOrderNoFetch()
    getJobOrderFetch()
  }

  const resetFunction = () => {
    setGetSeries([])
    setGetSalesOrderNo([])
    setGetJobOrder([])
    setGetLocation([])
    setGetDepartement([])
    setGetFormula([])
    setSelectedSeries('')
    setSelectedSalesOrderNo('')
    setSelectedJobOrder('')
    setSelectedLocation('')
    setSelectedDepartement('')
    setSelectedFormula('')
    setSelectedMaterialCode('')
    setSelectedUnit('')
    setExcludeFromCostDistribution(false)
    setPlannedStartDate('')
    setRequiredDate('')
    setPlannedFinishDate('')
    setQtyTarget('')
    setCheckQtyOutput(false)
    setInformation('')
  }


  useEffect(() => {
    fetchFunction()
  }, [])


  const generateDocDate = () => {
    const today = new Date(plannedStartDate);
    const year = today.getFullYear().toString().substring(2);
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return year + month + day;
  };

  const hanleSave = async (e) => {
    e.preventDefault();

    console.log(selectedLocation)
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/joborder`, {
        generateDocDate: generateDocDate(),
        series: selectedSeries,
        docDate: plannedStartDate,
        plannedStartDate: plannedStartDate,
        plannedFinishDate: plannedFinishDate,
        actualStartDate: '1998-12-31',
        actualStartTime: '00:00',
        actualFinishDate: "9998-12-31",
        actualFinishTime: "00:00",
        requiredDate: requiredDate,
        SODocNo: selectedSalesOrderNo,
        IODocNo: "",
        WODocNo: "",
        parentJODocNo: selectedJobOrder,
        level: !selectedJobOrder ? 0 : 1,
        priority: priority,
        location: selectedLocation,
        department: selectedDepartement,
        excludeCostDistribution: excludeFromCostDistribution,
        formula: selectedFormula,
        materialCode: selectedMaterialCode,
        unit: selectedUnit,
        qtyTarget: qtyTarget,
        qtyOutput: 0,
        checkQtyOutput: checkQtyOutput,
        totalCost: 0,
        status: "OPEN",
        information: information,
        createdBy: response?.User,
        changedBy: response?.User
      })
      toast.success("Data Created", {
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

  // const [informationUpdate, setInformationUpdate] = useState("");
  // const [detailDataUpdate, setDetailDataUpdate] = useState([])
  // const [modalData, setModalData] = useState([])
  // const [modal, setModal] = useState(false)
  // const [getMySeries, setGetSeries] = useState([])
  // const [getMySalesOrder, setGetSalesOrder] = useState([])
  // const [docDate,setDocDate] = useState(currentDate)
  // const [getMyJobOrder, setGetJobOrder] = useState([])
  // const [plannedFinishDate, setPlannedFinishDate] = useState("")
  // const [actualStartDate, setActualStartDate] = useState("")
  // const [actualFinishDate, setActualFinishDate] = useState("")
  // const [requiredDate, setRequiredDate] = useState("")
  // const [getMyLocation, setGetLocation] = useState("")

  //   const handleDocDateChange = (e) => {
  //   const selectedDocDate = e.target.value;
  //   setDocDate(selectedDocDate);
  // };
  // const closeModal = () => {
  //   setModal(false)
  //   setDetailDataUpdate([])
  //   setInformationUpdate("")
  //   // setDeliveryDateUpdate('')
  // }

  // const getSalesOrder = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/salesorderh`
  //     );
  //     setGetSalesOrder(response.data)
  //   } catch (error) {

  //   }
  // }

  // const getLocation = async () => {
  //   const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/location`)
  //   setGetLocation(res.data)
  // }

  // const getJobOrder = async () => {
  //   try {
  //     const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/joborder`)
  //     setGetJobOrder(response.data)
  //   } catch (error) {

  //   }
  // }

  // const getSeries = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/seriescode/JOB ORDER`
  //     );
  //     setGetSeries(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(()=>{
  //   getSeries()
  //   getSalesOrder()
  //   getJobOrder()
  //   getLocation()
  // },[])

  return (
    <div>
      <div className='text-2xl font-bold mb-4'>Job Order</div>
      <form action="post" onSubmit={hanleSave}>
        <div className='w-full'>
          <div className='flex justify-start items-center'>
            <table className='border-separate border-spacing-2 '>
              <tr>
                <td className='text-right'>Series: </td>
                <td>
                  <select onChange={(e) => setSelectedSeries(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected hidden>Pilih series</option>
                    {getSeries.map((res, key) => {
                      return (
                        <option value={res.Series} key={key}>{res.Series}</option>
                      )
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td className='text-right'>Sales Order No: </td>
                <td>
                  <select onChange={(e) => setSelectedSalesOrderNo(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected hidden>Pilih nomor sales order</option>
                    {getSalesOrderNo.map((res, key) => {
                      return (
                        <option value={res.DocNo} key={key}>{res.DocNo}</option>
                      )
                    })}
                  </select>
                </td>
              </tr>
              <tr>

                <td className='text-right'>Planned Start Date: </td>
                <td>
                  <input
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                    min={currentDate}
                    onChange={(e) => setPlannedStartDate(e.target.value)}
                  />
                </td>
                <td className='text-right'>Planned Finish Date: </td>
                <td>
                  <input type="date"
                    onChange={(e) => setPlannedFinishDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </td>
              </tr>
              <tr>
                <td className='text-right'>Actual Start Date: </td>
                <td>
                  <input
                    type="datetime-local"
                    defaultValue="1998-12-31T00:00"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    disabled
                  />
                </td>
                <td className='text-right'>Actual Finish Date: </td>
                <td>
                  <input type="datetime-local"
                    defaultValue="1998-12-31T00:00"
                    disabled
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                </td>
              </tr>
              <tr>
                <td className='text-right'>Required Date: </td>
                <td>
                  <input type="date"
                    onChange={(e) => setRequiredDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </td>
                <td className='text-right'>Internal Order No: </td>
                <td>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected hidden>Pilih nomor order</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className='text-right'>Parent Job Order: </td>
                <td>
                  <select onChange={(e) => setSelectedJobOrder(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected hidden>Pilih parent job order</option>
                    {getJobOrder.map((res, key) => {
                      return (
                        <option value={res.DocNo} key={key}>{res.DocNo}</option>
                      )
                    })}
                  </select>
                </td>
                <td className='text-right'>Work Order No: </td>
                <td>
                  <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
                </td>
              </tr>
              <tr>
                <td className='text-right'>Priority: </td>
                <td>
                  <select onChange={e => setPriority(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected hidden>Pilih priority</option>
                    <option value="HIGH">1. HIGH</option>
                    <option value="MEDIUM">2. MEDIUM</option>
                    <option value="LOW">3. LOW</option>
                  </select>
                </td>
                <td className='text-right'> Level: </td>
                <td>
                  <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
                </td>
              </tr>
              <tr>
                <td className='text-right'>Location: </td>
                <td>
                  <select onChange={e => setSelectedLocation(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected hidden>Pilih lokasi</option>
                    {getLocation.map((res, key) => {
                      return (
                        <option value={res.Code} key={key}>{res.Code}</option>
                      )
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td className='text-right'>Department: </td>
                <td>
                  <select onChange={(e) => setSelectedDepartement(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected hidden>Pilih department</option>
                    {getDepartement.map((res, key) => {
                      return (
                        <option key={key} value={res.Code}>{res.Code}</option>
                      )
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td className='float-right'>
                  <input type="checkbox" onChange={(e) => setExcludeFromCostDistribution(!excludeFromCostDistribution)} name="" id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
                </td>
                <td className=''>
                  Exclude from cost distribution
                </td>
              </tr>
              <tr>
                <td className='text-right'>Formula: </td>
                <td>
                  <select onChange={async (e) => {
                    await getMaterialCode(e.target.value.split(',')[0]);
                    setSelectedFormula(e.target.value.split(',')[1]);
                  }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected hidden>Pilih formula</option>
                    {getFormula.map((res, key) => {
                      return (
                        <option key={key} value={`${res.Code},${res.Formula}`}>{res.Formula}</option>
                      )
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td className='text-right'>Material Code: </td>
                <td>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={selectedMaterialCode || 'pilih material code'} disabled selected hidden>{selectedMaterialCode || 'pilih material code'}</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className='text-right'>Unit: </td>
                <td>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={selectedUnit || 'pilih material code'} disabled selected hidden>{selectedUnit || 'pilih material code'}</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className='text-right'>Qty Target: </td>
                <td>
                  <input type="text" onChange={(e) => setQtyTarget(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
                </td>
                <td className='text-right'>Qty Output: </td>
                <td>
                  <input type="text" disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
                </td>
                <td className='float-right'>
                  <input type="checkbox" onChange={() => setCheckQtyOutput(!checkQtyOutput)} name="" id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </td>
                <td className=''>
                  Check Qty Output &lt;= Qty Target
                </td>
              </tr>
              <tr>
                <td className='text-right'>Total Cost: </td>
                <td>
                  <input type="text" disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" required />
                </td>
              </tr>
            </table>
          </div>

          <div className='w-[75%] flex gap-3 justify-center items-center mx-auto my-10'>
            <label>Information:</label>
            <input type="text" onChange={(e) => setInformation(e.target.value)} className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => hanleSave()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>

      </form>

      {/* <div className={`bg-slate-50 fixed w-[90%] h-[90%] top-6 left-24 rounded-lg border border-black overflow-y-scroll p-5 ${modal ? 'block' : 'hidden'}`}>
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
          <form onSubmit="">
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
                      <input value={modalData.DocDate + "T00:00"} min={currentDate} type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                    </td>
                  </tr>
                </table>
                <table className='border-separate border-spacing-2 w-1/2'>
                  <tr>
                    <td className='text-right'>Series: </td>
                    <td>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected hidden>Pilih series</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right font-bold'>Doc No: </td>
                    <td>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected hidden>Pilih document number</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right'>Doc Date: </td>
                    <td>
                      <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                    </td>
                  </tr>
                  <tr>
                    <td className='text-right'>Purchase Order No: </td>
                    <td>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected hidden>Pilih nomor purchase order</option>
                      </select>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className='w-[75%] flex gap-3 items-center'>
              <label>Information:</label>
              <input placeholder={modalData.Information} onChange={(e) => { setInformationUpdate(e.target.value) }} type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={informationUpdate} />
            </div>
            <div className='pl-[100px] my-2'>
              <button onClick="" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">Update</button>
            </div>
          </form>
          <div>
            <form onSubmit="">
              <table className='border-separate border-spacing-2'>
                <tr>
                  <td className='text-right'>Supplier: </td>
                  <td>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="" disabled selected hidden>Pilih supplier</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="text-right">Supply Delivery No: </td>
                  <td>
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right">Vehicle No: </td>
                  <td>
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right">Batch No: </td>
                  <td>
                    <input
                      type="number"
                      className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0"
                      required
                    />
                  </td>
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
                        <button onClick="" type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">delete</button>
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
                <td className="text-right">Info:</td>
                <td>
                  <input type="text" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value="" />
                </td>
                <td className="text-right">Quantity:</td>
                <td>
                  <input value="" type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min="0" />
                </td>
                <td className="text-right">Required Date:</td>
                <td>
                  <input min={currentDate} type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                </td>
                <button
                  onClick=""
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
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    <button
                      onClick=""
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">
                      Select
                    </button>
                  </td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                </tr>
              </tbody>
            </table>
            <div>
            </div>
          </div>
        </div>
      </div> */}

    </div >
  )
}
