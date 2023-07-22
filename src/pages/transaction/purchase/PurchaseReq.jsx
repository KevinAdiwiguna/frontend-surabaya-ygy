import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const PurchaseReq = () => {
  const [data, setData] = useState([]);
  const [series, setSeries] = useState([]);
  const [docNumber, setDocNumber] = useState([]);
  const [docDate, setDocDate] = useState('');
  const [jobOrder, setJobOrder] = useState([]);
  const [department, setDepartment] = useState('');
  const [information, setInformation] = useState('');

  useEffect(() => {
    // Fetch data for the select inputs (Series, Doc Numbers, Job Orders) on component mount
    const fetchData = async () => {
      try {
        const seriesData = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/series`);
        setSeries(seriesData.data[0]?.id || '');

        const docNumbersData = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/docNumbers`);
        setDocNumber(docNumbersData.data[0]?.id || '');

        const jobOrdersData = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/jobOrders`);
        setJobOrder(jobOrdersData.data[0]?.id || '');
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    // Fetch existing purchase requests data on component mount
    const fetchPurchaseReqs = async () => {
      try {
        const purchaseReqsData = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/purchaseReqs`);
        setData(purchaseReqsData.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPurchaseReqs();
  }, []);

  // Function to handle saving new purchase request data
  const savePurchaseReq = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/purchaseReqs`, {
        series,
        docNumber,
        docDate,
        jobOrder,
        department,
        information,
      });

      // After successful save, fetch the updated data again
      const purchaseReqsData = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/purchaseReqs`);
      setData(purchaseReqsData.data);

      // Clear the input fields
      setSeries('');
      setDocNumber('');
      setDocDate('');
      setJobOrder('');
      setDepartment('');
      setInformation('');
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle delete purchase request
  const deletePurchaseReq = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/purchaseReqs/${id}`);

      // After successful delete, fetch the updated data again
      const purchaseReqsData = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/purchaseReqs`);
      setData(purchaseReqsData.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='text-2xl font-bold mb-4'>Purchase Request</div>

      <div className='w-[75%]'>
        <div className='flex justify-start items-center'>
          {/* Series */}
          <table className='border-separate border-spacing-2 w-1/2'>
            <tr>
              <td className='text-right'>Series: </td>
              <td>
                <select
                  value={series}
                  onChange={(e) => setSeries(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {/* Populate options from API response */}
                  {series.map((seriesOption) => (
                    <option key={seriesOption.id} value={seriesOption.id}>
                      {seriesOption.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            {/* ... (other table rows) */}
          </table>

          {/* Doc Numbers */}
          <table className='border-separate border-spacing-2 w-1/2'>
            <tr>
              <td className='text-right font-bold'>Doc No: </td>
              <td>
                <select
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {/* Populate options from API response */}
                  {docNumber.map((docNumberOption) => (
                    <option key={docNumberOption.id} value={docNumberOption.id}>
                      {docNumberOption.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            {/* ... (other table rows) */}
          </table>

          {/* Job Orders */}
          <table className='border-separate border-spacing-2 w-1/2'>
            <tr>
              <td className='text-right'>Job Order No: </td>
              <td>
                <select
                  value={jobOrder}
                  onChange={(e) => setJobOrder(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {/* Populate options from API response */}
                  {jobOrder.map((jobOrderOption) => (
                    <option key={jobOrderOption.id} value={jobOrderOption.id}>
                      {jobOrderOption.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            {/* ... (other table rows) */}
          </table>
        </div>

        <div className='w-[75%]  flex gap-3 justify-center items-center mx-auto mt-10'>
          <label>Information:</label>
          <input
            type="text"
            value={information}
            onChange={(e) => setInformation(e.target.value)}
            className="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
          />
          <button
            type="button"
            onClick={savePurchaseReq}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none mx-auto dark:focus:ring-blue-800"
          >
            Save
          </button>
        </div>
      </div>

      <div className="relative overflow-x--auto pt-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {/* Table headers */}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                {/* Table data */}
              </tr>
            ))}
          </tbody>
        </table>
        <div>
        </div>
      </div>
    </div>
  );
};
