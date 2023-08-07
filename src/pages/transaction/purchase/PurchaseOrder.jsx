import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMe } from "../../../hooks/API/useMe";
import { toast, ToastContainer } from "react-toastify";
import { dateConverter } from "../../../components/dateConverter";

export const PurchaseOrder = () => {
  const { fetchMe, response } = useMe();
  const currentDate = new Date().toISOString().slice(0, 16);
  const [docDate, setDocDate] = useState(currentDate);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [getMySeries, setGetSeries] = useState([]);
  const [getMyCustomer, setGetMyCustomer] = useState([]);
  const [getMySelesman, setGetMySelesman] = useState([]);
  const [getMyCurrency, setGetMyCurrency] = useState([]);
  const [getMyMaterial, setGetMyMaterial] = useState([]);
  const [getMyMaterialDetail, setGetMyMaterialDetail] = useState([]);
  const [data, setData] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [discountOutput, setDiscountOutput] = useState();
  const [tax, setTax] = useState();
  const [taxVal, setTaxVal] = useState(0);
  const [taxOutput, setTaxOutput] = useState(0);
  const [gross, setGross] = useState(0);
  const [totalGross, setTotalGross] = useState(0);
  const [Netto, setNetto] = useState(0);
  const [totalNetto, setTotalNetto] = useState(0);
  const [getData, setGetData] = useState([]);
  const [poNo, setPoNo] = useState("");
  const [top, setTop] = useState("");
  const [shipToVal, setShipToVal] = useState("");
  const [taxToVal, setTaxToVal] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [info, setInfo] = useState("");
  const [information, setInformation] = useState("");
  const [detailDisc, setDetailDisc] = useState(0);
  const [detailDisc2, setDetailDisc2] = useState(0);
  const [detailDisc3, setDetailDisc3] = useState(0);
  const [discNominal, setDiscNominal] = useState(0);
  const [discValue, setDiscValue] = useState(0);
  const [orderDetail, setOrderDetail] = useState([]);
  const [modalData, setModalData] = useState([])
  const [modal, setModal] = useState(false)
  const [GetMyjobOrder, setGetJobOrder] = useState([])
  const [JODocNo, setJODocNo] = useState("")
  const [detailDataUpdate, setDetailDataUpdate] = useState([]);
  const [supplierValUpdate, setSupplierValUpdate] = useState("");
  const [materialValUpdate, setMaterialValUpdate] = useState("");
  const [ExchangeRateUpdate, setExchangeRateUpdate] = useState("");
  const [deliveryDateUpdate, setDeliveryDateUpdate] = useState("");
  const [JODocNoUpdate, setJODocNoUpdate] = useState("");
  const [topUpdate, setTopUpdate] = useState("");
  const [taxUpdate, setTaxUpdate] = useState("");
  const [taxValUpdate, setTaxValUpdate] = useState("");
  const [discountUpdate, setDiscountUpdate] = useState("");
  const [sendToUpdate, setSendToUpdate] = useState("");
  const [informationUpdate, setInformationUpdate] = useState("");
  const [totalGrossUpdate, setTotalGrossUpdate] = useState("");
  const [discountOutputUpdate, setDiscountOutputUpdate] = useState(0);
  const [taxOutputUpdate, setTaxOutputUpdate] = useState(0);
  const [totalNettoUpdate, setTotalNettoUpdate] = useState(0);
  const [infoUpdate, setInfoUpdate] = useState("");
  const [quantityUpdate, setQuantityUpdate] = useState("");
  const [priceUpdate, setPriceUpdate] = useState("");
  const [detailDiscUpdate, setDetailDiscUpdate] = useState("");
  const [detailDisc2Update, setDetailDisc2Update] = useState("");
  const [detailDisc3Update, setDetailDisc3Update] = useState("");
  const [discValueUpdate, setDiscValueUpdate] = useState("");
  const [grossUpdate, setGrossUpdate] = useState("");
  const [NettoUpdate, setNettoUpdate] = useState("");
  const [discNominalUpdate, setDiscNominalUpdate] = useState(0);
  const [materialValChange, setMaterialValChange] = useState("");
  const [infoChange, setInfoChange] = useState("");
  const [quantityChange, setQuantityChange] = useState(0);
  const [priceChange, setPriceChange] = useState(0);
  const [detailDiscChange, setDetailDiscChange] = useState(0);
  const [detailDisc2Change, setDetailDisc2Change] = useState(0);
  const [detailDisc3Change, setDetailDisc3Change] = useState(0);
  const [grossChange, setGrossChange] = useState("");
  const [NettoChange, setNettoChange] = useState("");
  const [discNominalChange, setDiscNominalChange] = useState("");
  const [purchaseDetailKey, setPurchaseDetailKey] = useState("");
  const [purchaseDetailDocNo, setPurchaseDetailDocNo] = useState("");
  const [discValueChange, setDiscValueChange] = useState("");
  

  const [getPurchaseDetail, setGetPurchaseDetail] = useState([]);
  const [seriesVal, setSeriesVal] = useState("");
  const [customerVal, setCustomerVal] = useState("");
  const [salesmanVal, setSalesmanVal] = useState("");
  const [currencyVal, setCurrencyVal] = useState("");
  const [materialVal, setMaterialVal] = useState("");
  const [supplierVal, setSupplierVal] = useState("");
  const [sendTo, setSendTo] = useState("");
  const [getMySupplier, setGetMySupplier] = useState([]);

  const handleDocDateChange = (e) => {
    const selectedDocDate = e.target.value;
    setDocDate(selectedDocDate);

    setDeliveryDate("");
  };

  const getSeries = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/seriescode/PURCHASE ORDER`
      );
      setGetSeries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomer = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/customer`
      );
      setGetMyCustomer(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSupplier = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/supplier`
      );
      setGetMySupplier(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSelesman = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/salesman`
      );
      setGetMySelesman(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrency = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/currency`
      );
      setGetMyCurrency(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaterial = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/material`
      );
      setGetMyMaterial(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaterialDetail = async (params) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/material/${params}`
      );
      setGetMyMaterialDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [getFCurrency, setGetFCurrency] = useState([]);

  const getCurrencyByCustomer = async (params) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/supplier/${params}`
      );
      setGetFCurrency(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrencyByCustomer(supplierVal);
  }, [supplierVal]);

  useEffect(() => {
    getCurrencyByCustomer(supplierValUpdate);
  }, [supplierValUpdate]);

  const calculateGross = () => {
    const gross = quantity * price
    setGross(gross)
  }

  useEffect(() => {
    calculateGross()
  }, [price, quantity])

  useEffect(() => {
		setTaxUpdate(modalData?.TaxStatus)
		setTaxValUpdate(modalData?.TaxPercent)
		setDiscountUpdate(modalData?.DiscPercent)
	}, [modalData.DiscPercent, modalData.TaxPercent, modalData.TaxStatus])

  const calculateNetto = () => {
    if (detailDisc || detailDisc2 || detailDisc3) {
      const disc = (quantity * price) - ((quantity * price) * detailDisc / 100)
      const disc2 = disc - (disc * detailDisc2 / 100)
      const disc3 = disc2 - (disc2 * detailDisc3 / 100)
      setNetto(disc3)
      setDiscNominal(((quantity * price) * detailDisc / 100) + (disc * detailDisc2 / 100) + (disc2 * detailDisc3 / 100))
    } else {
      const disc = (quantity * price) - discValue
      setDiscNominal(discValue)
      setNetto(disc)
    }
  }

  useEffect(() => {
    calculateNetto()
  }, [price, quantity, detailDisc, detailDisc2, detailDisc3, discValue])

  const calculateTotalGrossUpdate = () => {
		let total = 0
		for (let i = 0; i < detailDataUpdate.length; i++) {
			let obj = detailDataUpdate[i]
			let nettoAsInteger = parseFloat(obj.netto)
			total += nettoAsInteger
		}
		for (let i = 0; i < getPurchaseDetail.length; i++) {
			let obj = getPurchaseDetail[i]
			let nettoAsInteger = parseFloat(obj.Netto)
			total += nettoAsInteger
		}
		setTotalGrossUpdate(total)
	}

	const calculateTotalNettoUpdate = () => {
		let nettoDiscount = (totalGrossUpdate * discountUpdate) / 100
		let totalNetto = totalGrossUpdate - nettoDiscount
		let tax = calculateTaxUpdate(totalNetto)
		if (taxUpdate === 'Exclude') {
			totalNetto = totalNetto + tax
		}
		setDiscountOutputUpdate(nettoDiscount)
		setTaxOutputUpdate(tax)
		setTotalNettoUpdate(totalNetto)
	}

	useEffect(() => {
		calculateTotalNettoUpdate()
	}, [totalGrossUpdate, taxValUpdate, taxUpdate, discountUpdate])

	useEffect(() => {
		calculateTotalGrossUpdate()
	}, [getPurchaseDetail, detailDataUpdate])

  const calculateTaxUpdate = (e) => {
		if (taxUpdate === 'No') {
			return 0
		}
		let total = (e * taxValUpdate) / 100
		return total
	}

	const calculateNettoUpdate = () => {
    if (detailDiscUpdate || detailDisc2Update || detailDisc3Update) {
      const disc = (quantityUpdate * priceUpdate) - ((quantityUpdate * priceUpdate) * detailDiscUpdate / 100)
      const disc2 = disc - (disc * detailDisc2Update / 100)
      const disc3 = disc2 - (disc2 * detailDisc3Update / 100)
      setNettoUpdate(disc3)
      setDiscNominalUpdate(((quantityUpdate * priceUpdate) * detailDiscUpdate / 100) + (disc * detailDisc2Update / 100) + (disc2 * detailDisc3Update / 100))
    } else {
      const disc = (quantityUpdate * priceUpdate) - discValueUpdate
      setDiscNominalUpdate(discValueUpdate)
      setNettoUpdate(disc)
    }
	}

  useEffect(() => {
    calculateNettoUpdate()
  }, [priceUpdate, quantityUpdate, detailDiscUpdate, detailDisc2Update, detailDisc3Update, discValueUpdate])

	const calculateGrossUpdate = () => {
		let total = quantityUpdate * priceUpdate
		setGrossUpdate(total)
	}

	useEffect(() => {
		calculateGrossUpdate()
	}, [quantityUpdate, priceUpdate])

  const calculateNettoChange = () => {
    if (detailDiscChange || detailDisc2Change || detailDisc3Change) {
      const disc = (quantityChange * priceChange) - ((quantityChange * priceChange) * detailDiscChange / 100)
      const disc2 = disc - (disc * detailDisc2Change / 100)
      const disc3 = disc2 - (disc2 * detailDisc3Change / 100)
      setNettoChange(disc3)
      setDiscNominalChange(((quantityChange * priceChange) * detailDiscChange / 100) + (disc * detailDisc2Change / 100) + (disc2 * detailDisc3Change / 100))
    } else {
      const disc = (quantityChange * priceChange) - discValueChange
      setDiscNominalChange(discValueChange)
      setNettoChange(disc)
    }
	}

  useEffect(() => {
    calculateNettoChange()
  }, [priceChange, quantityChange, detailDiscChange, detailDisc2Change, detailDisc3Change, discValueChange])

	const calculateGrossChange = () => {
		let total = quantityChange * priceChange
		setGrossChange(total)
	}

  useEffect(() => {
		calculateGrossChange()
	}, [quantityChange, priceChange])

  const sendDetailToInput = (e) => {
		setMaterialValChange(e.MaterialCode)
		setInfoChange(e.Info)
		setQuantityChange(e.Qty)
    setPriceChange(e.Price)
    setDetailDiscChange(e.DiscPercent)
    setDetailDisc2Change(e.DiscPercent2)
    setDetailDisc3Change(e.DiscPercent3)
    setDiscValueChange(e.DiscValue)
		setPurchaseDetailKey(e.Number)
		setPurchaseDetailDocNo(e.DocNo)
	}

  const changePurchaseDetailData = async (doc, key) => {
		try {
			await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/purchaseorderd/${doc}/${key}`, {
				materialCode: materialValChange,
				info: infoChange,
				unit: getPurchaseDetail[key - 1].Unit,
				qty: quantityChange,
				price: priceChange,
				gross: grossChange,
				discPercent: detailDiscChange,
				discPercent2: detailDisc2Change,
				discPercent3: detailDisc3Change,
				discValue: discValueChange,
				discNominal: discNominalChange,
				netto: NettoChange,
				qtyReceived: 0,
			})
			await getPurchaseDetailByDocNo(doc)
      let purchaseDetail = await getPurchaseDetailByDocNo(doc)
      let gross = 0
      for (let i = 0; i < purchaseDetail.length; i++) {
        let obj = purchaseDetail[i]
        let nettoAsInteger = parseFloat(obj.Netto)
        gross += nettoAsInteger
      }
      let nettoDiscount = (gross * discountUpdate) / 100
      let totalNetto = totalGrossUpdate - nettoDiscount
      let tax = calculateTaxUpdate(totalNetto)
      if (taxUpdate === 'Exclude') {
        totalNetto = totalNetto + tax
      }
      await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/purchaseorderh/${doc}`, {
        totalGross: gross,
        totalDisc: nettoDiscount,
        taxValue: tax,
        totalNetto: totalNetto,
			})
      dataFetching()
			toast.success('Data Changed', {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: true,
			})
		} catch (error) {
			console.log(error)
		}
	}

  useEffect(() => {
    getMaterialDetail(materialVal);
  }, [materialVal]);
  useEffect(() => {
    getMaterialDetail(materialValUpdate);
  }, [materialValUpdate]);

  useEffect(() => {
    getSeries();
    getCustomer();
    getSelesman();
    getCurrency();
    getMaterial();
    getSupplier();
  }, []);

  useEffect(() => {
    fetchMe();
  }, [!response]);

  const dataFetching = async () => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/purchaseorderh`
      );
      setGetData(data.data);
    } catch (error) { }
  };

  const calculateDiscount = () => {
    let total = (totalGross * discount) / 100
    return total
  }

  const calculateTax = (e) => {
    if (tax === 'No') {
      return 0
    }
    let total = (e * taxVal) / 100
    return total
  }

  const calculateTotalNetto = () => {
    let discount = calculateDiscount()
    let total = totalGross - calculateDiscount()
    let taks = calculateTax(total)
    if (tax === 'Exclude') {
      total = total + taks
    }
    setDiscountOutput(discount)
    setTaxOutput(taks)
    setTotalNetto(total)
  }

  useEffect(() => {
    calculateTotalNetto()
  }, [totalGross, taxVal, tax, discount])

  const addOrderDetail = () => {
    if (!materialVal || !quantity) {
      toast.warn('Material and Quantity is required', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      })
      return
    }

    const materialExists = orderDetail.some(item => item.materialCode === materialVal);

    if (materialExists) {
      toast.warn('Material sudah dipakai', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      })
      return
    }

    setTotalGross(totalGross + Netto)

    setOrderDetail([
      ...orderDetail,
      {
        number: orderDetail.length + 1,
        materialCode: materialVal,
        info: info || getMyMaterialDetail?.Info ? info || getMyMaterialDetail?.Info : '-',
        unit: getMyMaterialDetail?.SmallestUnit,
        qty: quantity,
        price: price,
        gross: gross,
        discPercent: detailDisc,
        discPercent2: detailDisc2,
        discPercent3: detailDisc3,
        discValue: detailDisc || detailDisc2 || detailDisc3 ? 0 : discValue,
        discNominal: discNominal,
        netto: Netto,
        qtyReceived: 0
      },
    ])
  }

  const addOrderDetailUpdate = () => {
    if (!materialValUpdate || !quantityUpdate) {
      toast.warn('Material and Quantity is required', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      })
      return
    }

    const materialExists = detailDataUpdate.some(item => item.materialCode === materialValUpdate);

    if (materialExists) {
      toast.warn('Material sudah dipakai', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      })
      return
    }

    setTotalGrossUpdate(totalGrossUpdate + NettoUpdate)

    setDetailDataUpdate([
      ...detailDataUpdate,
      {
        number: detailDataUpdate.length + 1,
        materialCode: materialValUpdate,
        info: infoUpdate || getMyMaterialDetail?.Info ? infoUpdate || getMyMaterialDetail?.Info : '-',
        unit: getMyMaterialDetail?.SmallestUnit,
        qty: quantityUpdate,
        price: priceUpdate,
        gross: grossUpdate,
        discPercent: detailDiscUpdate,
        discPercent2: detailDisc2Update,
        discPercent3: detailDisc3Update,
        discValue: detailDiscUpdate || detailDisc2Update || detailDisc3Update ? 0 : discValueUpdate,
        discNominal: discNominalUpdate,
        netto: NettoUpdate,
        qtyReceived: 0
      },
    ])
  }


  useEffect(() => {
    dataFetching();
  }, []);

  const deleteData = async (params) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/purchaseorderh/${params}`
      );
      dataFetching();
      toast.success("Data Deleted", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) { }
  };

  const generateDocDate = () => {
    const today = new Date(docDate)
    const year = today.getFullYear().toString().substring(2)
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')
    return year + month + day
  }

  const closeModal = () => {
    setModal(false)
    // setDetailDataUpdate([])
    // setInformationUpdate("")
  }

  const submitClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/purchaseorderh`, {
        series: seriesVal,
        generateDocDate: generateDocDate(),
        transactionType: "",
        docDate: docDate,
        supplierCode: supplierVal,
        deliveryDate: deliveryDate,
        TOP: top,
        discPercent: discount,
        taxStatus: tax,
        taxPercent: taxVal,
        currency: currencyVal,
        exchangeRate: exchangeRate,
        JODocNo: JODocNo,
        trip: "",
        SIDocNo: "",
        totalGross: totalGross,
        totalDisc: discountOutput,
        taxValue: taxOutput,
        totalNetto: totalNetto,
        sendTo: sendTo,
        information: information,
        status: "OPEN",
        isApproved: 0,
        approvedBy: "",
        approvedDate: "",
        printCounter: 0,
        printedBy: "",
        printedDate: "",
        isSalesReturn: false,
        createdBy: response.User,
        changedBy: response.User,
        PurchaseOrderd: orderDetail
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

  const getPurchaseDetailByDocNo = async (params) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/purchaseorderd/${params}`)
      setGetPurchaseDetail(response.data)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const updateData = async (params) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/purchaseorderh/${params}`,
        {
          transactionType: "",
          supplierCode: supplierValUpdate,
          deliveryDate: deliveryDateUpdate,
          TOP: topUpdate,
          discPercent: discountUpdate,
          taxStatus: taxUpdate,
          taxPercent: taxValUpdate,
          currency: currencyVal,
          exchangeRate: ExchangeRateUpdate,
          JODocNo: JODocNoUpdate,
          trip: "",
          SIDocNo: "",
          totalGross: totalGrossUpdate,
          totalDisc: discountOutputUpdate,
          taxValue: taxOutputUpdate,
          totalNetto: totalNettoUpdate,
          sendTo: sendToUpdate,
          information: informationUpdate,
          status: "OPEN",
          isApproved: 0,
          approvedBy: "",
          approvedDate: "",
          printCounter: 0,
          printedBy: "",
          printedDate: "",
          isSalesReturn: false,
          changedBy: response.User,
        }
      );
			if (detailDataUpdate) {
				await axios.post(
					`${process.env.REACT_APP_API_BASE_URL}/purchaseorderd/${params}`,
					detailDataUpdate.map((detail) => ({
						...detail,
						materialCode: detail.materialCode,
						info: detail.info,
						unit: detail.unit,
						qty: detail.qty,
						price: detail.price,
						gross: detail.gross,
						discPercent: detail.discPercent,
						discPercent2: detail.discPercent2,
						discPercent3: detail.discPercent3,
						discValue: detail.discValue,
						discNominal: detail.discNominal,
						netto: detail.netto,
						QtyDelivered: 0,
						QtyWO: 0,
					}))
				)
			}
      dataFetching();
      getPurchaseDetailByDocNo(params)
      detailDataUpdate([])
      toast.success("Data Updated", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (getFCurrency.Currency === 'IDR') {
      setExchangeRate(1.00);
      setExchangeRateUpdate(1.00);
    }
  }, [getFCurrency.Currency]);

  useEffect(() => {
    setShipToVal(customerVal);
    setTaxToVal(customerVal);
    setCurrencyVal(getFCurrency.Currency);
  }, [customerVal, customerVal, getFCurrency?.Currency]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-2xl font-bold mb-4">Purchase Order</div>
      </div>

      <div className="w-full">
        <div className="flex justify-start items-center">
          <form onSubmit={submitClick}>
            <table className="border-separate border-spacing-2 ">
              <tr>
                <td className="text-right">Series: </td>
                <td>
                  <select
                    onChange={(e) => setSeriesVal(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected hidden>
                      Pilih series
                    </option>
                    {getMySeries.map((res, key) => {
                      return (
                        <option value={res.Series} key={key}>
                          {res.Series}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="text-right">Doc Date: </td>
                <td>
                  <input
                    type="datetime-local"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                    min={currentDate}
                    value={docDate}
                    onChange={handleDocDateChange}
                  />
                </td>
              </tr>

              <tr>
                <td className="text-right">Supplier: </td>
                <td>
                  <select
                    onChange={(e) => setSupplierVal(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected hidden>
                      Pilih supplier
                    </option>
                    {getMySupplier.map((res, key) => {
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
                <td className="text-right">Delivery Date: </td>
                <td>
                  <input
                    type="datetime-local"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                    min={docDate}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td className="text-right">Job Order No: </td>
                <td>
                  <select
                    onChange={(e) => { setJODocNo(e.target.value) }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected hidden>
                      Pilih supplier
                    </option>
                    {GetMyjobOrder.map((res, key) => {
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
                <td className="text-right">Term Of Payment: </td>
                <td>
                  <input
                    onChange={(e) => {
                      setTop(e.target.value);
                    }}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0"
                    required
                  />
                </td>
                <td>Days</td>
              </tr>
              <tr>
                <td className="text-right">Currency: </td>
                <td>
                  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>{getFCurrency.Currency}</option>
                  </select>
                </td>
                <td className="text-right">Exchange Rate: </td>
                <td>
                  <input
                    onChange={(e) => {
                      setExchangeRate(e.target.value);
                    }}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="1.00"
                    value={exchangeRate}

                    required
                  // disabled
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <select
                    onChange={(e) => {
                      setTax(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option disabled selected hidden>
                      Pilih
                    </option>
                    <option value="No">No</option>
                    <option value="Include">Include</option>
                    <option value="Exclude">Exclude</option>
                  </select>
                </td>
                <td>
                  <input
                    onChange={(e) => {
                      setTaxVal(e.target.value);
                    }}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="10.00"
                    required
                  />
                </td>
                <td> % Tax</td>
              </tr>
              <tr>
                <td className="text-right">Discount: </td>
                <td>
                  <input
                    onChange={(e) => {
                      setDiscount(e.target.value);
                    }}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0.00"
                  />
                </td>
                <td> %</td>
              </tr>

              <tr>
                <td className="text-right">Send To: </td>
                <td>
                  <select
                    onChange={(e) => setSendTo(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected hidden>
                      Pilih
                    </option>
                    <option value="JL. Berbek Industri 3 no 15">
                      JL. Berbek Industri 3 no 15
                    </option>
                    <option value="-">
                      -
                    </option>
                    <option value="-">
                      -
                    </option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="text-right">Information:</td>
                <td>
                  <input
                    onChange={(e) => {
                      setInformation(e.target.value);
                    }}
                    type="text"
                    className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
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
        </div>

        <div className="flex justify-between items-start">
          <table className="border-separate border-spacing-2 ">
            <tr>
              <td className="text-right">Total Gross : </td>
              <td>
                <input
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0.00"
                  disabled
                  value={totalGross}
                />
              </td>
              <td className="text-right">Total Disc: </td>
              <td>
                <input
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0.00"
                  disabled
                  value={discountOutput}
                />
              </td>
              <td className="text-right">Tax: </td>
              <td>
                <input
                  type="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0.00"
                  disabled
                  value={taxOutput}
                />
              </td>
              <td className="text-right font-bold">Total Netto: </td>
              <td>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0.00"
                  disabled
                  value={totalNetto}
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold text-xl">Detail :</td>
            </tr>
            <tr>
              <td className="text-right">Material:</td>
              <td>
                <select
                  onChange={(e) => setMaterialVal(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option disabled selected hidden>
                    Pilih Material
                  </option>
                  {getMyMaterial.map((res, key) => {
                    return (
                      <option key={key} value={res.Code}>
                        {res.Code}
                      </option>
                    );
                  })}
                </select>
              </td>
              <td className="text-right">Info:</td>
              <td>
                <input
                  onChange={(e) => { setInfo(e.target.value) }}
                  type="text"
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  value={info || getMyMaterialDetail?.Info}
                />
              </td>
              <td className="text-right">Quantity:</td>
              <td>
                <input
                  onChange={(e) => { setQuantity(e.target.value) }}
                  type="number"
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                  min="0"
                />
              </td>
              <td className="text-right">Price:</td>
              <td>
                <input
                  onChange={(e) => { setPrice(e.target.value) }}
                  type="text"
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                />
              </td>
              <button
                onClick={() => {
                  addOrderDetail()
                }}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
              >
                Add
              </button>
            </tr>
            <tr>
              <td className="text-right">Disc Percent:</td>
              <td>
                <input
                  onChange={(e) => { setDetailDisc(e.target.value) }}
                  type="number"
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  min="0"
                />
              </td>
              <td className="text-right">Disc Percent 2:</td>
              <td>
                <input
                  onChange={(e) => { setDetailDisc2(e.target.value) }}
                  type="number"
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  min="0"
                />
              </td>
              <td className="text-right">Disc Percent 3:</td>
              <td>
                <input
                  onChange={(e) => { setDetailDisc3(e.target.value) }}
                  type="number"
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  min="0"
                />
              </td>
              <td className="text-right">Disc Value:</td>
              <td>
                <input
                  type="text"
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => { setDiscValue(e.target.value) }}
                />
              </td>
            </tr>
            <tr>
              <td className="text-right">Gross:</td>
              <td>
                <input
                  type="text"
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  disabled
                  value={gross}
                />
              </td>
              <td className="text-right">Netto:</td>
              <td>
                <input
                  type="text"
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  disabled
                  value={Netto}
                />
              </td>
              <td className="text-right">Disc Nominal:</td>
              <td>
                <input
                  type="number"
                  className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={discNominal}
                  disabled
                  min="0"
                />
              </td>
            </tr>
          </table>
        </div>
        <div className="text-xl font-bold mb-4 pt-10">Detail</div>
        <div className="relative overflow-x-auto">
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
                  Info
                </th>
                <th scope="col" className="px-6 py-3">
                  Unit
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Gross
                </th>
                <th scope="col" className="px-6 py-3">
                  DiscPercent
                </th>
                <th scope="col" className="px-6 py-3">
                  DiscPercent2
                </th>
                <th scope="col" className="px-6 py-3">
                  DiscPercent3
                </th>
                <th scope="col" className="px-6 py-3">
                  DiscValue
                </th>
                <th scope="col" className="px-6 py-3">
                  DiscNominal
                </th>
                <th scope="col" className="px-6 py-3">
                  Netto
                </th>
              </tr>
            </thead>
            <tbody>
              {orderDetail.map((res, key) => {
                return (
                  <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{res.number}</td>
                    <td className="px-6 py-4">{res.materialCode}</td>
                    <td className="px-6 py-4">{res.info}</td>
                    <td className="px-6 py-4">{res.unit}</td>
                    <td className="px-6 py-4">{res.qty}</td>
                    <td className="px-6 py-4">{res.price}</td>
                    <td className="px-6 py-4">{res.gross}</td>
                    <td className="px-6 py-4">{res.discPercent}</td>
                    <td className="px-6 py-4">{res.discPercent2}</td>
                    <td className="px-6 py-4">{res.discPercent3}</td>
                    <td className="px-6 py-4">{res.discValue}</td>
                    <td className="px-6 py-4">{res.discNominal}</td>
                    <td className="px-6 py-4">{res.netto}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="text-xl font-bold mb-4 pt-10">Header Data Table</div>
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
                  TransactionType
                </th>
                <th scope="col" className="px-6 py-3">
                  DocDate
                </th>
                <th scope="col" className="px-6 py-3">
                  SupplierCode
                </th>
                <th scope="col" className="px-6 py-3">
                  DeliveryDate
                </th>
                <th scope="col" className="px-6 py-3">
                  TOP
                </th>
                <th scope="col" className="px-6 py-3">
                  DiscPercent
                </th>
                <th scope="col" className="px-6 py-3">
                  TaxStatus
                </th>
                <th scope="col" className="px-6 py-3">
                  TaxPercent
                </th>
                <th scope="col" className="px-6 py-3">
                  Currency
                </th>
                <th scope="col" className="px-6 py-3">
                  ExchangeRate
                </th>
                <th scope="col" className="px-6 py-3">
                  JODocNo
                </th>
                <th scope="col" className="px-6 py-3">
                  Trip
                </th>
                <th scope="col" className="px-6 py-3">
                  SIDocNo
                </th>
                <th scope="col" className="px-6 py-3">
                  TotalGross
                </th>
                <th scope="col" className="px-6 py-3">
                  TotalDisc
                </th>
                <th scope="col" className="px-6 py-3">
                  TaxValue
                </th>
                <th scope="col" className="px-6 py-3">
                  TotalNetto
                </th>
                <th scope="col" className="px-6 py-3">
                  SendTo
                </th>
                <th scope="col" className="px-6 py-3">
                  Information
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  IsApproved
                </th>
                <th scope="col" className="px-6 py-3">
                  ApprovedBy
                </th>
                <th scope="col" className="px-6 py-3">
                  ApprovedDate
                </th>
                <th scope="col" className="px-6 py-3">
                  PrintCounter
                </th>
                <th scope="col" className="px-6 py-3">
                  PrintedBy
                </th>
                <th scope="col" className="px-6 py-3">
                  PrintedDate
                </th>
                <th scope="col" className="px-6 py-3">
                  IsSalesReturn
                </th>
                <th scope="col" className="px-6 py-3">
                  CreatedBy
                </th>
                <th scope="col" className="px-6 py-3">
                  CreatedDate
                </th>
                <th scope="col" className="px-6 py-3">
                  ChangedBy
                </th>
                <th scope="col" className="px-6 py-3">
                  ChangedDate
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
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {res.DocNo}
                    </td>
                    <td className="px-6 py-4">{res.Series}</td>
                    <td className="px-6 py-4">{res.TrasactionType}</td>
                    <td className="px-6 py-4">{res.DocDate}</td>
                    <td className="px-6 py-4">{res.SupplierCode}</td>
                    <td className="px-6 py-4">{res.DeliveryDate}</td>
                    <td className="px-6 py-4">{res.TOP}</td>
                    <td className="px-6 py-4">{res.DiscPercent}</td>
                    <td className="px-6 py-4">{res.TaxStatus}</td>
                    <td className="px-6 py-4">{res.TaxPercent}</td>
                    <td className="px-6 py-4">{res.Currency}</td>
                    <td className="px-6 py-4">{res.ExchangeRate}</td>
                    <td className="px-6 py-4">{res.JODocNo}</td>
                    <td className="px-6 py-4">{res.Trip}</td>
                    <td className="px-6 py-4">{res.SIDocNo}</td>
                    <td className="px-6 py-4">{res.TotalGross}</td>
                    <td className="px-6 py-4">{res.TotalDisc}</td>
                    <td className="px-6 py-4">{res.TaxValue}</td>
                    <td className="px-6 py-4">{res.TotalNetto}</td>
                    <td className="px-6 py-4">{res.SendTo}</td>
                    <td className="px-6 py-4">{res.Information}</td>
                    <td className="px-6 py-4">{res.Status}</td>
                    <td className="px-6 py-4">{res.IsApproved}</td>
                    <td className="px-6 py-4">{res.ApprovedBy}</td>
                    <td className="px-6 py-4">{res.ApprovedDate}</td>
                    <td className="px-6 py-4">{res.PrintCounter}</td>
                    <td className="px-6 py-4">{res.PrintedBy}</td>
                    <td className="px-6 py-4">{res.PrintedDate}</td>
                    <td className="px-6 py-4">
                      {res.IsSalesReturn === true ? "true" : "false"}
                    </td>
                    <td className="px-6 py-4">{res.CreatedBy}</td>
                    <td className="px-6 py-4">
                      {dateConverter(res.CreatedDate)}
                    </td>
                    <td className="px-6 py-4">{res.ChangedBy}</td>
                    <td className="px-6 py-4">
                      {dateConverter(res.ChangedDate)}
                    </td>
                    <td>
                      <button
                        onClick={() => deleteData(res.DocNo)}
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          setModalData(res)
                          setModal(true)
                          getPurchaseDetailByDocNo(res.DocNo)
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
            <div className="flex justify-start items-center">
                <table className="border-separate border-spacing-2 ">
                  <tr>
                    <td className="text-right">Series: </td>
                    <td>
                      <select
                        onChange={(e) => setSeriesVal(e.target.value)}
                        disabled
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="" disabled selected hidden>
                          {modalData.Series}
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Doc Date: </td>
                    <td>
                      <input
                        type="datetime-local"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        disabled
                        min={currentDate}
                        value={modalData.DocDate + "T00:00"}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="text-right">Supplier: </td>
                    <td>
                      <select
                        onChange={(e) => setSupplierValUpdate(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="" disabled selected hidden>
                          {modalData.SupplierCode}
                        </option>
                        {getMySupplier.map((res, key) => {
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
                    <td className="text-right">Delivery Date: </td>
                    <td>
                      <input
                        type="datetime-local"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder=""
                        min={docDate}
                        value={deliveryDateUpdate || modalData.DeliveryDate + 'T00:00'}
                        onChange={(e) => setDeliveryDateUpdate(e.target.value)}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="text-right">Job Order No: </td>
                    <td>
                      <select
                        onChange={(e) => { setJODocNoUpdate(e.target.value) }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="" disabled selected hidden>
                          {modalData.JODocNo}
                        </option>
                        {GetMyjobOrder.map((res, key) => {
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
                    <td className="text-right">Term Of Payment: </td>
                    <td>
                      <input
                        onChange={(e) => {
                          setTopUpdate(e.target.value);
                        }}
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={modalData.TOP}
                      />
                    </td>
                    <td>Days</td>
                  </tr>
                  <tr>
                    <td className="text-right">Currency: </td>
                    <td>
                      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option>{getFCurrency.Currency ? getFCurrency.Currency : modalData.Currency}</option>
                      </select>
                    </td>
                    <td className="text-right">Exchange Rate: </td>
                    <td>
                      <input
                        onChange={(e) => {
                          setExchangeRateUpdate(e.target.value);
                        }}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={modalData.ExchangeRate}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <select
                        onChange={(e) => {
                          setTaxUpdate(e.target.value);
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option disabled selected hidden>
                          {taxUpdate}
                        </option>
                        <option value="No">No</option>
                        <option value="Include">Include</option>
                        <option value="Exclude">Exclude</option>
                      </select>
                    </td>
                    <td>
                      <input
                        onChange={(e) => {
                          setTaxValUpdate(e.target.value);
                        }}
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="10.00"
                        value={taxValUpdate}
                      />
                    </td>
                    <td> % Tax</td>
                  </tr>
                  <tr>
                    <td className="text-right">Discount: </td>
                    <td>
                      <input
                        onChange={(e) => {
                          setDiscountUpdate(e.target.value);
                        }}
                        type="number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="0.00"
                        value={discountUpdate}
                      />
                    </td>
                    <td> %</td>
                  </tr>

                  <tr>
                    <td className="text-right">Send To: </td>
                    <td>
                      <select
                        onChange={(e) => setSendToUpdate(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="" disabled selected hidden>
                          {modalData.SendTo}
                        </option>
                        <option value="JL. Berbek Industri 3 no 15">
                          JL. Berbek Industri 3 no 15
                        </option>
                        <option value="-">
                          -
                        </option>
                        <option value="-">
                          -
                        </option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-right">Information:</td>
                    <td>
                      <input
                        onChange={(e) => {
                          setInformationUpdate(e.target.value);
                        }}
                        type="text"
                        className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={modalData.Information}

                      />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <button
                        type="button"
                        onClick={()=>{updateData(modalData.DocNo)}}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
                      >
                        Change
                      </button>
                    </td>
                  </tr>
                </table>
            </div>

            <div className="flex justify-between items-start">
              <table className="border-separate border-spacing-2 ">
                <tr>
                  <td className="text-right">Total Gross : </td>
                  <td>
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0.00"
                      disabled
                      value={totalGrossUpdate}
                    />
                  </td>
                  <td className="text-right">Total Disc: </td>
                  <td>
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0.00"
                      disabled
                      value={discountOutputUpdate}
                    />
                  </td>
                  <td className="text-right">Tax: </td>
                  <td>
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0.00"
                      disabled
                      value={taxOutputUpdate}
                    />
                  </td>
                  <td className="text-right font-bold">Total Netto: </td>
                  <td>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="0.00"
                      disabled
                      value={totalNettoUpdate}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="font-bold text-xl">Add Detail :</td>
                </tr>
                <tr>
                  <td className="text-right">Material:</td>
                  <td>
                    <select
                      onChange={(e) => setMaterialValUpdate(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option disabled selected hidden>
                        Pilih Material
                      </option>
                      {getMyMaterial.map((res, key) => {
                        return (
                          <option key={key} value={res.Code}>
                            {res.Code}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td className="text-right">Info:</td>
                  <td>
                    <input
                      onChange={(e) => { setInfoUpdate(e.target.value) }}
                      type="text"
                      className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      value={infoUpdate || getMyMaterialDetail?.Info}
                    />
                  </td>
                  <td className="text-right">Quantity:</td>
                  <td>
                    <input
                      onChange={(e) => { setQuantityUpdate(e.target.value) }}
                      type="number"
                      className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      min="0"
                    />
                  </td>
                  <td className="text-right">Price:</td>
                  <td>
                    <input
                      onChange={(e) => { setPriceUpdate(e.target.value) }}
                      type="number"
                      className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                    />
                  </td>
                  <button
                    onClick={() => {
                      addOrderDetailUpdate()
                    }}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800"
                  >
                    Add
                  </button>
                </tr>
                <tr>
                  <td className="text-right">Disc Percent:</td>
                  <td>
                    <input
                      onChange={(e) => { setDetailDiscUpdate(e.target.value) }}
                      type="number"
                      className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      min="0"
                    />
                  </td>
                  <td className="text-right">Disc Percent 2:</td>
                  <td>
                    <input
                      onChange={(e) => { setDetailDisc2Update(e.target.value) }}
                      type="number"
                      className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      min="0"
                    />
                  </td>
                  <td className="text-right">Disc Percent 3:</td>
                  <td>
                    <input
                      onChange={(e) => { setDetailDisc3Update(e.target.value) }}
                      type="number"
                      className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      min="0"
                    />
                  </td>
                  <td className="text-right">Disc Value:</td>
                  <td>
                    <input
                      type="text"
                      className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => { setDiscValueUpdate(e.target.value) }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right">Gross:</td>
                  <td>
                    <input
                      type="text"
                      className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      disabled
                      value={grossUpdate}
                    />
                  </td>
                  <td className="text-right">Netto:</td>
                  <td>
                    <input
                      type="text"
                      className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      disabled
                      value={NettoUpdate}
                    />
                  </td>
                  <td className="text-right">Disc Nominal:</td>
                  <td>
                    <input
                      type="number"
                      className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={discNominalUpdate}
                      disabled
                      min="0"
                    />
                  </td>
                </tr>
              </table>
            </div>

            <div className="relative overflow-x-auto">
              <div className="font-bold tet-xl">Detail Data:</div>
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
                      Info
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Unit
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Gross
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DiscPercent
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DiscPercent2
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DiscPercent3
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DiscValue
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DiscNominal
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Netto
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {detailDataUpdate.map((res, key) => {
                    return (
                      <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{res.number}</td>
                        <td className="px-6 py-4">{res.materialCode}</td>
                        <td className="px-6 py-4">{res.info}</td>
                        <td className="px-6 py-4">{res.unit}</td>
                        <td className="px-6 py-4">{res.qty}</td>
                        <td className="px-6 py-4">{res.price}</td>
                        <td className="px-6 py-4">{res.gross}</td>
                        <td className="px-6 py-4">{res.discPercent}</td>
                        <td className="px-6 py-4">{res.discPercent2}</td>
                        <td className="px-6 py-4">{res.discPercent3}</td>
                        <td className="px-6 py-4">{res.discValue}</td>
                        <td className="px-6 py-4">{res.discNominal}</td>
                        <td className="px-6 py-4">{res.netto}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
                    <input value={quantityChange} onChange={(e) => { setQuantityChange(e.target.value) }} type="number" className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required min="0" />
                  </td>
                  <td className="text-right">Price:</td>
                  <td>
                    <input value={priceChange} onChange={(e) => { setPriceChange(e.target.value) }} min="0" type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                  </td>
                  <button
                    onClick={()=>{changePurchaseDetailData(purchaseDetailDocNo,purchaseDetailKey)}}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">
                    Change
                  </button>
                </tr>
                <tr>
                  <td className="text-right">Disc Percent:</td>
                  <td>
                    <input
                      onChange={(e) => { setDetailDiscChange(e.target.value) }}
                      type="number"
                      className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      min="0"
                      value={detailDiscChange}
                    />
                  </td>
                  <td className="text-right">Disc Percent 2:</td>
                  <td>
                    <input
                      onChange={(e) => { setDetailDisc2Change(e.target.value) }}
                      type="number"
                      className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      min="0"
                      value={detailDisc2Change}
                    />
                  </td>
                  <td className="text-right">Disc Percent 3:</td>
                  <td>
                    <input
                      onChange={(e) => { setDetailDisc3Change(e.target.value) }}
                      type="number"
                      className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      min="0"
                      value={detailDisc3Change}
                    />
                  </td>
                  <td className="text-right">Disc Value:</td>
                  <td>
                    <input
                      type="text"
                      className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => { setDiscValueChange(e.target.value) }}
                      value={discValueChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="text-right">Gross:</td>
                  <td>
                    <input
                      type="text"
                      className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      disabled
                      value={grossChange}
                    />
                  </td>
                  <td className="text-right">Netto:</td>
                  <td>
                    <input
                      type="text"
                      className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      disabled
                      value={NettoChange}
                    />
                  </td>
                  <td className="text-right">Disc Nominal:</td>
                  <td>
                    <input
                      type="number"
                      className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={discNominalChange}
                      disabled
                      min="0"
                    />
                  </td>
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
                      Number
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
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Gross
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DiscPercent
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DiscPercent2
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DiscPercent3
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DiscValue
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DiscNominal
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Netto
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
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{res.Number}</td>
                        <td className="px-6 py-4">{res.MaterialCode}</td>
                        <td className="px-6 py-4">{res.Info}</td>
                        <td className="px-6 py-4">{res.Unit}</td>
                        <td className="px-6 py-4">{res.Qty}</td>
                        <td className="px-6 py-4">{res.Price}</td>
                        <td className="px-6 py-4">{res.Gross}</td>
                        <td className="px-6 py-4">{res.DiscPercent}</td>
                        <td className="px-6 py-4">{res.DiscPercent2}</td>
                        <td className="px-6 py-4">{res.DiscPercent3}</td>
                        <td className="px-6 py-4">{res.DiscValue}</td>
                        <td className="px-6 py-4">{res.DiscNominal}</td>
                        <td className="px-6 py-4">{res.Netto}</td>
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
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
};


