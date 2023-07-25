import { useState, useEffect } from 'react'
import axios from 'axios'
export const GoodIssue = () => {
	// state
	const [Series, setSeries] = useState([])
	const [SalesOrderNo, setSalesOrderNo] = useState([])
	const [SalesOrderNoDetail, setSalesOrderNoDetail] = useState([])
	const [DataFilter, setDataFilter] = useState([])
	const [Location, setLocation] = useState([])
	const [AddData, setAddData] = useState([{}])
	const [ThisData, setThisData] = useState([])

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newData = [...AddData];
    newData[index][name] = value;
    setAddData(newData);
  };

  const handleDropdownChange = (e, index) => {
    const { name, value } = e.target;
    const newData = [...AddData];
    newData[index][name] = value;
    setAddData(newData);
  };

	// function
	const getSeries = async () => {
		const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/seriescode/GOODS ISSUE`)
		setSeries(response.data)
	}

	const getSalesOrderNo = async () => {
		const salesOrderh = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/salesorderh`)
		setSalesOrderNo(salesOrderh.data)
	}

	const getSalesOrderNoDetail = async () => {
		const salesOrderd = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/salesorderd/${DataFilter.DocNo}`)
		setSalesOrderNoDetail(salesOrderd.data)
	}

	const getLocation = async () => {
		const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/location`)
		setLocation(response.data)
	}

	// fetching
	useEffect(() => {
		getSeries()
		getSalesOrderNo()
		getLocation()
	}, [])

	useEffect(() => {
		getSalesOrderNoDetail()
	}, [DataFilter.DocNo])

	useEffect(() => {
		setAddData(SalesOrderNoDetail)
	}, [SalesOrderNoDetail])

	const handleAddData = (e) => {
		e.preventDefault()
		if (ThisData) {
			setAddData([...AddData, ThisData])
		}
	}

	return (
		<div>
			<div className="text-2xl font-bold mb-4">Goods Issue</div>
			<form>
				<table className="border-separate border-spacing-2 w-full">
					<tbody>
						<div className="flex w-[100%] justify-around">
							<div>
								<tr>
									<td className="text-right">Series :</td>
									<td>
										<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required>
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
										<input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required />
									</td>
								</tr>

								<tr>
									<td className="text-right">Sales Order No :</td>
									<td>
										<select
											onChange={(e) => {
												setDataFilter(SalesOrderNo.find((data) => data.DocNo === e.target.value))
											}}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="Isi kode"
											required>
											<option value="" disabled selected hidden>
												Pilih Doc No
											</option>
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
											<option value={DataFilter.CcustomerCode}>{DataFilter.CustomerCode}</option>
										</select>
									</td>
								</tr>
							</div>
							<div>
								<tr>
									<td className="text-right">Ship To :</td>
									<td>
										<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[75%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required>
											<option value={DataFilter.ShipToCode}>{DataFilter.ShipToCode}</option>
										</select>
									</td>
								</tr>

								<tr>
									<td className="text-right">PO No :</td>
									<td>
										<input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[55%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required />
									</td>
								</tr>

								<tr>
									<td className="text-right">Vehicle No :</td>
									<td>
										<input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[55%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required />
									</td>
								</tr>
							</div>
						</div>
					</tbody>
					<table>
						<tr>
							<td className="text-right pr-3">Packing List No : </td>
							<td>
								<input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required />
							</td>
						</tr>
						<tr>
							<td className="text-right pr-3">Information : </td>
							<td>
								<input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[700px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required />
							</td>
						</tr>
					</table>
					<tr>
						<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none mx-auto dark:focus:ring-blue-800">
							Save
						</button>
					</tr>
				</table>
			</form>

			<form onSubmit={handleAddData}>
				<div className="text-xl font-bold mb-4">Add New detail</div>
				<div>
					<select
						onChange={(e) => {
							setThisData(SalesOrderNoDetail.find((data) => data.MaterialCode === e.target.value))
						}}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Isi kode"
						required>
						<option value="">Pilih Detail</option>
						{SalesOrderNoDetail.map((res, key) => {
							return (
								<option value={res.MaterialCode} key={key}>
									{res.MaterialCode}
								</option>
							)
						})}
					</select>
					<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none mx-auto dark:focus:ring-blue-800">
						Add
					</button>
				</div>
			</form>

			<div className="relative overflow-x-auto pt-10">
				<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
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
						{AddData.map((res, key) => {
							return (
								<tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<td className="px-6 py-4">{res.Number}</td>
									<td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{res.MaterialCode}</td>
									<td className="px-6 py-4"></td>
									<td className="px-6 py-4">{res.Info}</td>
									<td className="px-6 py-4">
										<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required>
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
										<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Isi kode" required>
											<option value="">Pilih Doc No</option>
											<option value="">Pilih Doc No</option>
											<option value="">Pilih Doc No</option>
											<option value="">Pilih Doc No</option>
										</select>
									</td>
									<td className="px-6 py-4">{res.Unit}</td>
									<td className="px-6 py-4">1.00</td>
									<td className="px-6 py-4">1.00</td>
									<td className="px-6 py-4">
										<input type="number" value={0} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1.00" />
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
