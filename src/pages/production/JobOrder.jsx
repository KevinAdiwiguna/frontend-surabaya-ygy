import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useMe } from "../../hooks/API/useMe";
import { dateConverter } from '../../components/dateConverter';
import { toast, ToastContainer } from 'react-toastify'

export const JobOrder = () => {
  const { fetchMe, response } = useMe();
  const currentDate = new Date().toISOString().slice(0, 16)
  const [modal, setModal] = useState(false)

  // fetch state
  const [getSeries, setGetSeries] = useState([])
  const [getSalesOrderNo, setGetSalesOrderNo] = useState([])
  const [getJobOrder, setGetJobOrder] = useState([])
  const [getLocation, setGetLocation] = useState([])
  const [getDepartement, setGetDepartement] = useState([])
  const [getFormula, setGetFormula] = useState([])


  // submit state
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
  const [setLevel, setSetLevel] = useState()

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
  const getSelectedJobOrderFetch = async (params) => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/joborder/${params}`)
    setSetLevel(res.data.Level)
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
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/bomh`)
    setGetFormula(res?.data)
  }
  const getMaterialCode = async (params) => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/bomh/${params}`)
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
    e.preventDefault()

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
        level: setLevel + 1 || 0,
        priority: parseInt(priority),
        location: selectedLocation,
        department: selectedDepartement,
        excludeCostDistribution: excludeFromCostDistribution,
        formula: selectedFormula,
        materialCode: selectedMaterialCode,
        unit: selectedUnit,
        qtyTarget: parseFloat(qtyTarget),
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
      resetFunction()
      fetchFunction()
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



  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
      />
      <div className='text-2xl font-bold mb-4'>Job Order</div>
      <form onSubmit={hanleSave}>
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
                    <option value="" selected >Pilih nomor sales order</option>
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    min={currentDate}
                    required
                  />
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                  />
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
                  <select onChange={async (e) => {
                    await getSelectedJobOrderFetch(e.target.value)
                    setSelectedJobOrder(e.target.value)
                  }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" selected >Pilih parent job order</option>
                    {getJobOrder.map((res, key) => {
                      return (
                        <option value={res.DocNo} key={key}>{res.DocNo}</option>
                      )
                    })}
                  </select>
                </td>
                <td className='text-right'>Work Order No: </td>
                <td>
                  <input type="number" disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" />
                </td>
              </tr>
              <tr>
                <td className='text-right'>Priority: </td>
                <td>
                  <select onChange={e => setPriority(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected hidden>Pilih priority</option>
                    <option value="1">1. HIGH</option>
                    <option value="2">2. MEDIUM</option>
                    <option value="3">3. LOW</option>
                  </select>
                </td>
                <td className='text-right'> Level: </td>
                <td>
                  <input type="number" disabled value={setLevel + 1 || 0} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
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
                    <option value="" selected >Pilih department</option>
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
                  <input type="checkbox" onChange={(e) => setExcludeFromCostDistribution(!excludeFromCostDistribution)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" />
                </td>
                <td className=''>
                  Exclude from cost distribution
                </td>
              </tr>
              <tr>
                <td className='text-right'>Formula: </td>
                <td>
                  <select onChange={async (e) => {
                    await getMaterialCode(e.target.value);
                    await setSelectedFormula(e.target.value);
                  }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected >Pilih formula</option>
                    {getFormula?.map((res, key) => {
                      return (
                        <option key={key} value={`${res?.Formula}`}>{res?.Formula}</option>
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
                  <input type="checkbox" onChange={() => setCheckQtyOutput(!checkQtyOutput)} name="" id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
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
            <input type="text" onChange={(e) => setInformation(e.target.value)} className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
          >
            Save
          </button>
          <button
            type='button'
            onClick={() => setModal(true)}
            className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none mx-auto dark:focus:ring-yellow-800"

          >
            Update
          </button>

        </div>

      </form>

      <JobOrderModal modal={modal} setModal={setModal} />

    </div>
  )
}



export const JobOrderModal = ({ modal, setModal }) => {
  const { fetchMe, response } = useMe();
  const currentDate = new Date().toISOString().slice(0, 16)

  const [getDocNoJobOrder, setGetDocNoJobOrder] = useState([])
  const [getSalesOrderNo, setGetSalesOrderNo] = useState([])
  const [getLocation, setGetLocation] = useState([])
  const [getWoth, setGetWoth] = useState([])
  const [getWothDetail, setGetWothDetail] = useState([])
  const [getDepartment, setGetDepartment] = useState([])

  const [selectedDocNoAllData, setSelectedDocNoAllData] = useState()

  // fetch state
  const getFetchDoNoJobOrder = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/joborder`)
    setGetDocNoJobOrder(res?.data)
  }
  const getAllDataJobOrder = async (params) => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/joborder/${params}`)
    setSelectedDocNoAllData(res?.data)
  }
  const getSalesOrderNoFetch = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/salesorderh`)
    setGetSalesOrderNo(res?.data)
  }
  const getLocationFetch = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/location`)
    setGetLocation(res?.data)
  }
  const getWorkOrderTemplateFetch = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/bomh`)
    setGetWoth(res?.data)
  }
  const getWorkOrderTemplateDetail = async (params) => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/bomh/${params}`)
    setGetWothDetail(res?.data)
  }
  const getDepartementFetch = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/department`)
    setGetDepartment(res?.data)
  }

  const [getLevelFetch, setGetLevelFetch] = useState({})
  const getLevelFromJobOrder = async (params) => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/joborder/${params}`)
    setGetLevelFetch(res.data)
  }

  const [updateRequiredDate, setUpdateRequiredDate] = useState('')
  const [updatePlannedFinishDate, setUpdatePlannedFinishDate] = useState(selectedDocNoAllData?.PlannedFinishDate)
  const [selectedSalesORder, setSelectedSalesORder] = useState(selectedDocNoAllData?.SODocNo)
  const [selectedJobOrderNo, setSelectedJobOrderNo] = useState(selectedDocNoAllData?.ParentJODocNo)
  const [selectedLocation, setSelectedLocation] = useState(selectedDocNoAllData?.Location)
  const [selectedDepartement, setSelectedDepartement] = useState(selectedDocNoAllData?.Department)
  const [selectedInformation, setSelectedInformation] = useState(selectedDocNoAllData?.Information)
  const [updatePriority, setUpdatePriority] = useState('')
  const [excludeCostDistribution, setExcludeCostDistribution] = useState(selectedDocNoAllData?.ExcludeCostDistribution)
  const [qtyTarget, setQtyTarget] = useState()

  const resetData = () => {
    setGetDocNoJobOrder([])
    setGetSalesOrderNo([])
    setGetLocation([])
    setGetWoth([])
    setGetWothDetail([])
    setGetDepartment([])
    setSelectedDocNoAllData([])
  }

  useEffect(() => {
    setExcludeCostDistribution(selectedDocNoAllData?.ExcludeCostDistribution || false);
  }, [selectedDocNoAllData]);

  useEffect(() => {
    getFetchDoNoJobOrder()
    fetchMe()
  }, [modal])


  const handleDelete = async (parms) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/joborder/${parms}`)
      toast.success("Data deleted", {
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


  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/joborder/${selectedDocNoAllData.DocNo}`, {
        plannedFinishDate: !updatePlannedFinishDate ? selectedDocNoAllData.PlannedFinishDate : updatePlannedFinishDate,
        requiredDate: !updateRequiredDate ? selectedDocNoAllData.RequiredDate : updateRequiredDate,
        SODocNo: !selectedSalesORder ? selectedDocNoAllData.SODocNo : selectedSalesORder,
        parentJODocNo: !selectedJobOrderNo ? selectedDocNoAllData.ParentJODocNo : selectedJobOrderNo,
        priority: !updatePriority ? selectedDocNoAllData?.Priority : updatePriority,
        location: !selectedLocation ? selectedDocNoAllData?.Location : selectedLocation,
        department: !selectedDepartement ? selectedDocNoAllData?.Department : selectedDepartement,
        formula: !getWothDetail?.Formula ? selectedDocNoAllData?.Formula : getWothDetail?.Formula,
        materialCode: !getWothDetail?.MaterialCode ? selectedDocNoAllData?.MaterialCode : getWothDetail?.MaterialCode,
        unit: !getWothDetail?.Unit ? selectedDocNoAllData?.Unit : getWothDetail?.Unit,
        qtyTarget: !qtyTarget ? selectedDocNoAllData?.QtyTarget : qtyTarget,
        information: !selectedInformation ? selectedDocNoAllData?.Information : selectedInformation,
        changedBy: response?.User
      })
      toast.success("Data Created", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
      setModal(false)
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





  return (
    <div className={`bg-slate-50 fixed w-[90%] h-[90%] top-6 left-24 rounded-lg border border-black overflow-y-scroll p-5 ${modal ? 'block' : 'hidden'}`}>
      <div className="space-y-6">
        <div className="text-2xl font-bold mb-4 ">DocNo: {selectedDocNoAllData?.DocNo}</div>
        <button
          onClick={() => {
            setModal(false)
            resetData()
          }}
          className="absolute top-0 right-4 text-gray-600 hover:text-gray-800 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <form onSubmit={handleUpdate}>
          <div className='w-full'>
            <div className='flex justify-start items-center'>
              <table className='border-separate border-spacing-2 '>
                <tr>
                  <td className='text-right'>Series: </td>
                  <td>
                    <select disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value={selectedDocNoAllData?.Series | ''} disabled selected hidden>{selectedDocNoAllData?.Series || 'pilih DocNo'}</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className='text-right'>DocNo: </td>
                  <td>
                    <select onChange={async (e) => {
                      await getAllDataJobOrder(e?.target?.value)
                      await getSalesOrderNoFetch()
                      await getLocationFetch()
                      await getWorkOrderTemplateFetch()
                      await getDepartementFetch()
                    }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value="" selected >Pilih DocNo</option>
                      {getDocNoJobOrder.map((res, key) => {
                        return (
                          <option value={res.DocNo} key={key}>{res.DocNo}</option>
                        )
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className='text-right'>Sales Order No: </td>
                  <td>
                    <select onChange={(e) => setSelectedSalesORder(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value={selectedDocNoAllData?.SODocNo} selected >{selectedDocNoAllData?.SODocNo}</option>
                      {getSalesOrderNo?.map((res, key) => {
                        return (
                          <option value={res?.DocNo} key={key}>{res?.DocNo}</option>
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
                      disabled
                      value={selectedDocNoAllData?.PlannedFinishDate}
                    />
                  </td>
                  <td className='text-right'>Planned Finish Date: </td>
                  <td>
                    <input type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      min={currentDate}
                      defaultValue={selectedDocNoAllData?.PlannedFinishDate}
                      onChange={e => setUpdatePlannedFinishDate(e.target.value)}
                      required
                    />
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
                      onChange={(e) => setUpdateRequiredDate(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      defaultValue={selectedDocNoAllData?.RequiredDate}
                      required
                    />
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
                    <select onChange={async (e) => {
                      await getLevelFromJobOrder(e.target.value)
                      setSelectedJobOrderNo(e.target.value)
                    }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value={selectedDocNoAllData?.ParentJODocNo} selected >{!selectedDocNoAllData?.ParentJODocNo ? 'pilih data' : selectedDocNoAllData?.ParentJODocNo + ' current'}</option>
                      {getDocNoJobOrder
                        .filter(item => selectedDocNoAllData !== item.DocNo)
                        .map((res, key) => (
                          <option value={res.DocNo} key={key}>{res.DocNo}</option>
                        ))}
                    </select>
                  </td>
                  <td className='text-right'>Work Order No: </td>
                  <td>
                    <input type="number" disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" />
                  </td>
                </tr>
                <tr>
                  <td className='text-right'>Priority: </td>
                  <td>
                    <select onChange={e => setUpdatePriority(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value={selectedDocNoAllData?.Priority} selected >{`${selectedDocNoAllData?.Priority} current`}</option>
                      <option value={1}>1. HIGH</option>
                      <option value={2}>2. MEDIUM</option>
                      <option value={3}>3. LOW</option>
                    </select>
                  </td>
                  <td className='text-right'> Level: </td>
                  <td>
                    <input type="number" disabled value={!getLevelFetch?.Level ? selectedDocNoAllData?.Level : getLevelFetch?.Level} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
                  </td>
                </tr>
                <tr>
                  <td className='text-right'>Location: </td>
                  <td>
                    <select onChange={e => setSelectedLocation(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value={selectedDocNoAllData?.Location} selected >{`${selectedDocNoAllData?.Location} current`}</option>
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
                    <select onChange={e => setSelectedDepartement(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value={selectedDocNoAllData?.Department} selected >{`${selectedDocNoAllData?.Department} current`}</option>
                      {getDepartment.map((res, key) => {
                        return (
                          <option key={key} value={res.Code}>{res.Code}</option>
                        )
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className='float-right'>
                    <input type="checkbox" onChange={() => setExcludeCostDistribution(!excludeCostDistribution)} defaultChecked={selectedDocNoAllData?.ExcludeCostDistribution} name="" id="" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" />
                  </td>
                  <td className=''>
                    Exclude from cost distribution
                  </td>
                </tr>
                <tr>
                  <td className='text-right'>Formula: </td>
                  <td>
                    <select onChange={async (e) => {
                      await getWorkOrderTemplateDetail(e.target.value);
                    }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value={selectedDocNoAllData?.Formula} selected >{`${selectedDocNoAllData?.Formula} current`}</option>
                      {getWoth?.map((res, key) => {
                        return (
                          <option key={key} value={res?.Formula}>{res?.Formula}</option>
                        )
                      })}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className='text-right'>Material Code: </td>
                  <td>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value={getWothDetail?.MaterialCode || selectedDocNoAllData?.MaterialCode} disabled selected >{getWothDetail?.MaterialCode || selectedDocNoAllData?.MaterialCode}</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className='text-right'>Unit: </td>
                  <td>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option value={getWothDetail?.Unit || selectedDocNoAllData?.Unit} disabled selected >{getWothDetail?.Unit || selectedDocNoAllData?.Unit}</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className='text-right'>Qty Target: </td>
                  <td>
                    <input type="text" onChange={e => setQtyTarget(e.target.value)} defaultValue={selectedDocNoAllData?.QtyTarget} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
                  </td>
                  <td className='text-right'>Qty Output: </td>
                  <td>
                    <input type="text" disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
                  </td>
                  <td className='float-right'>
                    <input type="checkbox" defaultChecked={selectedDocNoAllData?.CheckQtyOutput} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                  </td>
                  <td className=''>
                    Check Qty Output &lt;= Qty Target
                  </td>
                </tr>
                <tr>
                  <td className='text-right'>Total Cost: </td>
                  <td>
                    <input type="text" defaultValue={selectedDocNoAllData?.TotalCost} disabled className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" required />
                  </td>
                </tr>
              </table>
            </div>

            <div className='w-[75%] flex gap-3 justify-center items-center mx-auto my-10'>
              <label>Information:</label>
              <input type="text" onChange={e => setSelectedInformation(e.target.value)} defaultValue={selectedDocNoAllData?.Information} className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
            >
              Save
            </button>
            <button
              onClick={async () => {
                await handleDelete(selectedDocNoAllData?.DocNo)
              }
              }
              type='button'
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none  mx-auto dark:focus:ring-red-800"
            >
              Delete
            </button>
          </div>

        </form>
      </div>
    </div >
  )
}

