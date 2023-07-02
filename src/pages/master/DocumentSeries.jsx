import React from 'react'

export const DocumentSeries = () => {
  return (
    <div>
      <div className='text-2xl font-bold mb-4'>Document Series</div>
      <div className=''>
        <div className='flex justify-start items-center'>
          <table className='border-separate border-spacing-2 w-1/2'>
            <tr>
              <td className='text-right'>Document: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Choose a Document</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className='text-right'>Series: </td>
              <td>
                <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
              </td>
            </tr>
            <tr>
              <td className='text-right'>User: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>User</option>
                  <option value="US">Tenvy</option>
                  <option value="CA">Kevin</option>
                  <option value="FR">Riskiwu</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className='text-right'>Material Type: </td>
              <td>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Material</option>
                  <option value="US">Tenvy</option>
                  <option value="CA">Kevin</option>
                  <option value="FR">Riskiwu</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className='float-right'>
                <input type="checkbox" name="" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
              </td>
              <td className=''>
                Need Quality Control
              </td>
            </tr>
            <tr>
              <td className='float-right'>
                <input type="checkbox" name="" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
              </td>
              <td className=''>
                Auto Tax No
              </td>
            </tr>
            <tr>
              <td className='text-right'>ISO: </td>
              <td>
                <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
              </td>
            </tr>
            <tr>
              <td></td>
              <td className=''>
              <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">Save</button>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div class="relative overflow-x-auto pt-10">
        <table class=" text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Document
              </th>
              <th scope="col" class="px-6 py-3">
                Series
              </th>
              <th scope="col" class="px-6 py-3">
                Users
              </th>
              <th scope="col" class="px-6 py-3">
                NeedQC
              </th>
              <th scope="col" class="px-6 py-3">
                AutoTaxNo
              </th>
              <th scope="col" class="px-6 py-3">
                ISO
              </th>
              <th scope="col" class="px-6 py-3">
                Created By
              </th>
              <th scope="col" class="px-6 py-3">
                Created Date
              </th>
              <th scope="col" class="px-6 py-3">
                Changed By
              </th>
              <th scope="col" class="px-6 py-3">
                Changed Date
              </th>
              <th scope="col" class="px-6 py-3">
                Control
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              {/* <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                
              </th> */}
              <td class="px-6 py-4">
                Sales Order
              </td>
              <td class="px-6 py-4">
                DOG
              </td>
              <td class="px-6 py-4">
                tenvy
              </td>
              <td class="px-6 py-4">
                False
              </td>
              <td class="px-6 py-4">
                False
              </td>
              <td class="px-6 py-4">
                
              </td>
              <td class="px-6 py-4">
                Tenvy
              </td>
              <td class="px-6 py-4">
                6/30/2023
              </td>
              <td class="px-6 py-4">
                Tenvy
              </td>
              <td class="px-6 py-4">
                6/30/2023
              </td>
              <td class="px-6 py-4">
                <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div>
        </div>
      </div>

    </div>
  )
}
