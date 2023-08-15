import {useState, useEffect} from "react"
import axios from "axios"
import {toast, ToastContainer} from "react-toastify"
import {useMe} from "../../../hooks/API/useMe"

export const ModalComp = (params) => {
	const {Modal, setModal, Location, AllDocNo, getSeries, getSalesOrderNo, getAllDocNo, response} = params
	const [DetailDocNo, setDetailDocNo] = useState([])
	const [ModifiedSalesOrderNoDetail, setModifiedSalesOrderNoDetail] = useState([])

	const [QtyRemain, setQtyRemain] = useState([])
	const [updatedQty, setUpdatedQty] = useState({})
	const [PoNo, setPoNo] = useState("")
	const [VehicleNo, setVehicleNo] = useState("")
	const [Information, setInformation] = useState("")
	const [TotalQty, setTotalQty] = useState();
	

	const getDetailDocNo = async (params) => {
		const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/goodsissuedetail/${params}`)
		setDetailDocNo(response.data)
		setModifiedSalesOrderNoDetail(response.data)
	}
	const getQtyRemain = async (params) => {
		const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/goodsissue/${params}`)
		setQtyRemain(response.data)
	}
	const GetTotalQty = async (params) => {
		const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/goodsissueqty/${params}`)
		setTotalQty(response.data)
	}
	const handleDelete = async (parmas) => {
		await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/goodsissue/${parmas}`)
		toast.success("Data Deleted", {
			position: "top-center",
			autoClose: 3000,
			hideProgressBar: true,
		})
		setModal(false)
		getSeries()
		getSalesOrderNo()
		setDetailDocNo([])
		getAllDocNo()
	}


	useEffect(() => {
		getQtyRemain(DetailDocNo?.goodsissueh?.SODocNo)
		GetTotalQty(DetailDocNo?.goodsissueh?.SODocNo)
	}, [DetailDocNo?.goodsissueh])

	const handleChangeDataAPI = (key, field, value) => {
		setDetailDocNo((prevDetailDocNo) => {
			const updatedGoodsIssued = prevDetailDocNo.goodsissued.map((data, index) => {
				if (index === key) {
					return {
						...data,
						[field]: value,
					}
				}
				return data
			})
			return {
				...prevDetailDocNo,
				goodsissued: updatedGoodsIssued,
			}
		})

		// Update the updatedQty state
		setUpdatedQty((prevUpdatedQty) => ({
			...prevUpdatedQty,
			[key]: value,
		}))
	}

	const handleSave = async () => {
		try {
			await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/goodsissueheader/${DetailDocNo?.goodsissueh?.DocNo}`, {
				poNo: !PoNo ? DetailDocNo?.goodsissueh?.PONo : PoNo,
				vehicleNo: !VehicleNo ? DetailDocNo?.goodsissueh?.VehicleNo : VehicleNo,
				information: !Information ? DetailDocNo?.goodsissued.Information : Information,
				changedBy: response.User,
			})

			DetailDocNo?.goodsissued?.map(async (res, key) => {
				await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/goodsissuedetail/${res.DocNo}/${res.Number}`, {
					batchNo: res.BatchNo,
					docNo: res.DocNo,
					information: res.Info,
					location: res.Location,
					materialCode: res.MaterialCode,
					number: res.Number,
					qty: res.Qty,
					qtyNetto: res.QtyNetto,
					qtyReturn: res.QtyReturn,
					unit: res.Unit,
				})
			})
			setModal(false)
			getSeries()
			getSalesOrderNo()
			setDetailDocNo([])
			getAllDocNo()
			getQtyRemain()
			toast.success("Data Updated", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: true,
			})
		} catch (error) {
			toast.error("No Data updated", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: true,
			})
		}
	}
	return (
		<div className={`bg-slate-50 fixed w-[90%] h-[90%] top-6 left-24 rounded-lg border border-black overflow-y-scroll p-5 ${Modal ? "block" : "hidden"}`}>
			<div className="space-y-6">
				<button
					onClick={() => {
						setModal(!Modal)
					}}
					className="absolute top-5 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
				<div className="w-full">
					<table className="border-separate border-spacing-2">
						<tr className="w-full">
							<td className="text-right">DOC NO: </td>
							<td>
								<select
									onChange={(e) => {
										getDetailDocNo(e.target.value)
									}}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-[200px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								>
									<option selected>Pilih</option>
									{AllDocNo.map((res, key) => {
										return (
											<option key={key} value={res.DocNo}>
												{res.DocNo}
											</option>
										)
									})}
								</select>
							</td>
						</tr>
					</table>
					<hr />
					<table className="text-sm w-full text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th className="w-14 px-4">PO NO</th>
								<div className="my-1">
									<input onChange={(e) => setPoNo(e.target.value)} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={DetailDocNo?.goodsissueh?.PONo} defaultValue={DetailDocNo?.goodsissueh?.PONo} />
								</div>
							</tr>
							<tr>
								<th className="w-14 px-4">Vehicle No</th>
								<div className="my-1">
									<input onChange={(e) => setVehicleNo(e.target.value)} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={DetailDocNo?.goodsissueh?.VehicleNo} defaultValue={DetailDocNo?.goodsissueh?.VehicleNo} />
								</div>
							</tr>
							<tr>
								<th className="w-14 px-4">Information No</th>
								<div className="my-1">
									<input onChange={(e) => setInformation(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={DetailDocNo?.goodsissueh?.Information} defaultValue={DetailDocNo?.goodsissueh?.Information} />
								</div>
							</tr>
							<div>
								<td className="flex gap-4">
									<button onClick={() => handleSave()} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">
										Save
									</button>
									<button type="button" onClick={() => handleDelete(DetailDocNo.goodsissueh.DocNo)} className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none  mx-auto dark:focus:ring-red-800">
										Delete
									</button>
								</td>
							</div>
						</thead>
					</table>

					<div className="relative overflow-x-auto pt-10">
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="px-6 py-3">
										Control
									</th>
									<th scope="col" className="px-6 py-3">
										Number
									</th>
									<th scope="col" className="px-6 py-3">
										Code
									</th>
									<th scope="col" className="px-6 py-3">
										Name
									</th>
									<th scope="col" className="px-6 py-3">
										Information
									</th>
									<th scope="col" className="px-14 py-3">
										Location
									</th>
									<th scope="col" className="px-14 py-3">
										BatchNo
									</th>
									<th scope="col" className="px-6 py-3">
										Unit
									</th>
									<th scope="col" className="px-6 py-3">
										QtySOTotal
									</th>
									<th scope="col" className="px-6 py-3">
										QtySORemain
									</th>
									<th scope="col" className="px-6 py-3">
										Qty
									</th>
								</tr>
							</thead>
							{ModifiedSalesOrderNoDetail?.goodsissued?.map((res, key) => {
								return (
									<tbody>
										<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
											<td className="px-6 py-4">
												<td className="px-6 py-4">
													<button type="button" className="focus:outline-none text-white bg-red-900 hover:bg-red-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
														Delete
													</button>
												</td>
											</td>
											<td className="px-6 py-4">{res.Number}</td>
											<td className="px-6 py-4">{res.MaterialCode}</td>
											<td className="px-6 py-4"></td>
											<td className="px-6 py-4">
												<input onChange={(e) => handleChangeDataAPI(key, "Info", e.target.value)} type="text" className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={res.Info} placeholder={res.Info} />
											</td>
											<td className="px-6 py-4">
												<select onChange={(e) => handleChangeDataAPI(key, "Location", e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required>
													<option value="" disabled hidden>
														Pilih Location
													</option>
													{Location.map((res, key) => {
														return (
															<option key={key} value={res.Code}>
																{res.Code}
															</option>
														)
													})}
												</select>
											</td>
											<td className="px-6 py-4">
												<select onChange={(e) => handleChangeDataAPI(key, "BatchNo", e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required>
													<option value="">Pilih Doc No</option>
													<option value="">Pilih Doc No</option>
													<option value="">Pilih Doc No</option>
													<option value="">Pilih Doc No</option>
												</select>
											</td>
											<td className="px-6 py-4"></td>
											<td className="px-6 py-4">{TotalQty[key]?.Qty}</td>
											<td className="px-6 py-4">{QtyRemain[key] ? parseFloat(QtyRemain[key][key + 1]) : null}</td>
											<td className="px-6 py-4">
												<input onChange={(e) => handleChangeDataAPI(key, "Qty", e.target.value)} type="number" className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={res.Qty} defaultValue={res.Qty} />
											</td>
										</tr>
									</tbody>
								)
							})}
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export const GoodIssue = () => {
	const {fetchMe, response} = useMe()
	// state
	const currentDate = new Date().toISOString().slice(0, 10)

	const [Series, setSeries] = useState([])
	const [SalesOrderNo, setSalesOrderNo] = useState([])
	const [SalesOrderNoDetail, setSalesOrderNoDetail] = useState([])
	const [DataFilter, setDataFilter] = useState([])
	const [Location, setLocation] = useState([])
	const [QtyRemain, setQtyRemain] = useState([])
	const [ModifiedSalesOrderNoDetail, setModifiedSalesOrderNoDetail] = useState([])

	const [SeriesVal, setSeriesVal] = useState("")
	const [DocDate, setDocDate] = useState(currentDate)
	const [SODocNo, setSODocNo] = useState("")

	const [PONo, setPONo] = useState()
	const [vehicleNo, setvehicleNo] = useState()
	const [Information, setInformation] = useState("")

	const [Modal, setModal] = useState(false)

	// handle
	const [AllDocNo, setAllDOcNo] = useState([])

	const getAllDocNo = async () => {
		const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/goodsissueall`)
		setAllDOcNo(response.data.response)
	}

	const generateDocDate = () => {
		const today = new Date(DocDate)
		const year = today.getFullYear().toString().substring(2)
		const month = (today.getMonth() + 1).toString().padStart(2, "0")
		const day = today.getDate().toString().padStart(2, "0")
		return year + month + day
	}

	const handleSave = async (e) => {
		e.preventDefault()
		try {
			await axios.post(`${process.env.REACT_APP_API_BASE_URL}/goodsissue`, {
				generateDocDate: generateDocDate(),
				series: SeriesVal,
				soDocNo: SODocNo,
				customerCode: DataFilter?.CustomerCode,
				shiptoCode: DataFilter?.ShipToCode,
				poNo: PONo,
				vehicleNo: vehicleNo,
				parkingListNo: "PL001",
				information: Information,
				status: "OPEN",
				printCounter: 0,
				printedBy: "",
				printedDate: null,
				changedBy: response.User,
				createdBy: response.User,
				DocDate: currentDate,
				goodissued: SalesOrderNoDetail.map((item) => {
					try {
						return {
							location: item.Location,
							number: item.Number,
							materialCode: item.MaterialCode,
							info: item.Info,
							batchNo: !item.BatchNo ? "" : item.BatchNo,
							unit: item.Unit,
							qty: item.Qty,
							qtyReturn: !item.QtyReturn ? 0 : item.QtyReturn,
							qtyNetto: item.Qty,
						}
					} catch (error) {
						console.error("Error in .map:", error)
						return null
					} finally {
						setSalesOrderNoDetail([])
						setModifiedSalesOrderNoDetail([])
						getSeries()
						getSalesOrderNo()
						getLocation()
						fetchMe()
					}
				}),
			})

			toast.success("Data Saved", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: true,
			})
			getAllDocNo()
		} catch (error) {
			toast.error("Error", {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: true,
			})
		}
	}

	// function
	const getSeries = async () => {
		try {
			const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/seriescode/GOODS ISSUE`)
			setSeries(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	const getQtyRemain = async () => {
		try {
			if (!DataFilter) return null
			const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/goodsissue/${DataFilter?.DocNo}`)
			setQtyRemain(response.data)
		} catch (error) {}
	}

	const getSalesOrderNo = async () => {
		const salesOrderh = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/salesorderh`)
		setSalesOrderNo(salesOrderh.data)
	}

	useEffect(() => {
		const fetchData = async () => {
			if (!DataFilter) return setModifiedSalesOrderNoDetail([])
			try {
				const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/salesorderd/${DataFilter.DocNo}`)
				setSalesOrderNoDetail(response.data)

				setModifiedSalesOrderNoDetail([...response.data])
			} catch (error) {
				console.log(error)
			}
		}
		fetchData()
		getQtyRemain()
	}, [DataFilter?.DocNo])

	const getLocation = async () => {
		const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/location`)
		setLocation(response.data)
	}

	const handleChangeDataAPI = (key, field, value) => {
		setSalesOrderNoDetail((prevData) =>
			prevData.map((data, index) => {
				if (index === key) {
					return {
						...data,
						[field]: value,
					}
				}
				return data
			}),
		)
	}

	// fetching
	useEffect(() => {
		getSeries()
		getSalesOrderNo()
		getLocation()
		fetchMe()
	}, [])

	useEffect(() => {
		setDocDate(currentDate)
		getAllDocNo()
	}, [])

	useEffect(() => {
		getQtyRemain()
	}, [DataFilter?.DocNo])

	// const handleItemChange = (key, field, value) => {
	// 	setModifiedSalesOrderNoDetail((prevData) => {
	// 		const newData = [...prevData]
	// 		newData[key] = {
	// 			...newData[key],
	// 			[field]: value,
	// 		}
	// 		return newData
	// 	})
	// }

	return (
		<div>
			<div className="text-2xl font-bold mb-4">Goods Issue</div>
			<form onSubmit={handleSave}>
				<table className="border-separate border-spacing-2 w-full">
					<tbody>
						<div className="flex w-[100%] justify-around">
							<div>
								<tr>
									<td className="text-right">Series :</td>
									<td>
										<select onChange={(e) => setSeriesVal(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required>
											<option value="" disabled selected hidden>
												Pilih Series
											</option>
											{Series.map((res, key) => {
												return (
													<option key={key} value={res.Series}>
														{res.Series}
													</option>
												)
											})}
										</select>
									</td>
								</tr>

								<tr>
									<td className="text-right">Doc Date :</td>
									<td>
										<input type="date" min={currentDate} value={DocDate} onChange={(e) => setDocDate(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required />
									</td>
								</tr>

								<tr>
									<td className="text-right">Sales Order No :</td>
									<td>
										<select
											onChange={(e) => {
												setSODocNo(e.target.value)
												setDataFilter(
													SalesOrderNo.find((data) => {
														if (!data) return null
														return data?.DocNo === e.target.value
													}),
												)
											}}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Isi kode"
											required
										>
											<option selected>Pilih Sales Order No</option>
											{SalesOrderNo.map((res, key) => {
												return (
													<option key={key} value={res.DocNo}>
														{res.DocNo}
													</option>
												)
											})}
										</select>
									</td>
								</tr>

								<tr>
									<td className="text-right">Customer :</td>
									<td>
										<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[75%] p-2.5 dark:bg-gray-750 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required>
											<option value={DataFilter?.CustomerCode}>{DataFilter?.CustomerCode}</option>
										</select>
									</td>
								</tr>
							</div>
							<div>
								<tr>
									<td className="text-right">Ship To :</td>
									<td>
										<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[75%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required>
											<option value={DataFilter?.ShipToCode}>{DataFilter?.ShipToCode}</option>
										</select>
									</td>
								</tr>

								<tr>
									<td className="text-right">PO No :</td>
									<td>
										<input onChange={(e) => setPONo(e.target.value)} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[55%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required />
									</td>
								</tr>

								<tr>
									<td className="text-right">Vehicle No :</td>
									<td>
										<input onChange={(e) => setvehicleNo(e.target.value)} type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[55%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required />
									</td>
								</tr>
							</div>
						</div>
					</tbody>
					<table>
						{/* <tr>
							<td className="text-right pr-3">Packing List No : </td>
							<td>
								<input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required />
							</td>
						</tr> */}
						<tr>
							<td className="text-right pr-3">Information : </td>
							<td>
								<input onChange={(e) => setInformation(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[700px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required />
							</td>
						</tr>
					</table>
					<tr>
						<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none mx-auto dark:focus:ring-blue-800">
							Save
						</button>
						<button type="button" onClick={() => setModal(!Modal)} className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none mx-auto dark:focus:ring-yellow-800">
							Update
						</button>
					</tr>
				</table>
			</form>

			<div className="relative overflow-x-auto pt-10">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								Control
							</th>
							<th scope="col" className="px-6 py-3">
								Number
							</th>
							<th scope="col" className="px-6 py-3">
								Code
							</th>
							<th scope="col" className="px-6 py-3">
								Name
							</th>
							<th scope="col" className="px-6 py-3">
								Information
							</th>
							<th scope="col" className="px-14 py-3">
								Location
							</th>
							<th scope="col" className="px-14 py-3">
								BatchNo
							</th>
							<th scope="col" className="px-6 py-3">
								Unit
							</th>
							<th scope="col" className="px-6 py-3">
								QtySOTotal
							</th>
							<th scope="col" className="px-6 py-3">
								QtySORemain
							</th>
							<th scope="col" className="px-6 py-3">
								Qty
							</th>
						</tr>
					</thead>

					<tbody>
						{ModifiedSalesOrderNoDetail.map((res, key) => {
							return (
								<tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<td className="px-6 py-4">
										<td className="px-6 py-4">
											<button type="button" className="focus:outline-none text-white bg-red-900 hover:bg-red-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
												Delete
											</button>
										</td>
									</td>
									<td className="px-6 py-4">{res.Number}</td>
									<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{res.MaterialCode}</td>
									<td className="px-6 py-4"></td>
									<td className="px-6 py-4">
										<input type="text" onChange={(e) => handleChangeDataAPI(key, "Info", e.target.value)} className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={res.Info} />
									</td>
									<td className="px-6 py-4">
										<select onChange={(e) => handleChangeDataAPI(key, "Location", e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required>
											<option value="">Pilih Location</option>
											{Location.map((loc, locKey) => {
												return (
													<option key={locKey} value={loc.Code}>
														{loc.Code}
													</option>
												)
											})}
										</select>
									</td>
									<td className="px-6 py-4">
										<select value={""} onChange={(e) => handleChangeDataAPI(key, "BatchNo", e.target.value == undefined ? "" : e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required>
											<option value="">Pilih Doc No</option>
											<option value="">Pilih Doc No</option>
											<option value="">Pilih Doc No</option>
											<option value="">Pilih Doc No</option>
										</select>
									</td>
									<td className="px-6 py-4">{res.Unit}</td>
									<td className="px-6 py-4">{res.Qty}</td>
									<td className="px-6 py-4">{QtyRemain[key] ? QtyRemain[key][key + 1] : null}</td>
									<td className="px-6 py-4">
										<input type="number" onChange={(e) => handleChangeDataAPI(key, "Qty", e.target.value)} className="bg-gray-50 border w-[100px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1.00" />
									</td>
								</tr>
							)
						})}
						<ModalComp response={response} Modal={Modal} setModal={setModal} Location={Location} AllDocNo={AllDocNo} getSeries={getSeries} getSalesOrderNo={getSalesOrderNo} getAllDocNo={getAllDocNo} />
					</tbody>
				</table>
			</div>

			<ToastContainer position="top-center" autoClose={3000} hideProgressBar />
		</div>
	)
}
