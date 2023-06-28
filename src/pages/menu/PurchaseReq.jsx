import React from 'react'


export const PurchaseReq = () => {
  return (
    <div>
      <div className='text-2xl font-bold mb-4'>Purchase Request</div>

      <div className='w-[75%] '>
        <div className='flex justify-start items-center'>
          <table className='border-separate border-spacing-2 w-1/2'>
            <tr>
              <td className='text-right'>Series: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Choose a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className='text-right'>Doc No: </td>
              <td>
                <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
              </td>
            </tr>
            <tr>
              <td className='text-right'>Doc Date: </td>
              <td>
                <input type="datetime-local" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
              </td>
            </tr>
          </table>

          <table className='border-separate border-spacing-2 w-1/2'>
            <tr>
              <td className='text-right'>Job Order No: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Choose a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className='text-right'>Departement: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Choose a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </td>
            </tr>
          </table>
        </div>

        <div className='w-[75%]  flex gap-3 justify-center items-center mx-auto mt-10'>
          <label>Information:</label>
          <input type="text" class="inline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
        </div>
      </div>


      <div class="relative overflow-x-auto pt-10">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Code
              </th>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Info
              </th>
              <th scope="col" class="px-6 py-3">
                Lint
              </th>
              <th scope="col" class="px-6 py-3">
                Qty
              </th>
              <th scope="col" class="px-6 py-3">
                RequireDate
              </th>
              <th scope="col" class="px-6 py-3">
                QtyPO
              </th>
              <th scope="col" class="px-6 py-3">
                QtyRemain
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                1
              </th>
              <td class="px-6 py-4">
                Belum tau mau isi apa
              </td>
              <td class="px-6 py-4">
                gaada
              </td>
              <td class="px-6 py-4">
                Unit 6
              </td>
              <td class="px-6 py-4">
                12/12/2023
              </td>
              <td class="px-6 py-4">
                12/12/2024
              </td>
              <td class="px-6 py-4">
                -
              </td>
              <td class="px-6 py-4">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  )
}
