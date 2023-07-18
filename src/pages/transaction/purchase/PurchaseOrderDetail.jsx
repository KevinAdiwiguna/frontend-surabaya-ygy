import { Sidebar } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export const PurchaseOrderDetail = () => {
  return (
    <div>
      <div className='flex justify-between'>
      <div className='text-2xl font-bold mb-4'>Sales Order</div>
      <div className='fixed z-[1] right-10'>
        <Sidebar>

        <Sidebar.ItemGroup >
        <Sidebar.Collapse label='Detail'>
          <Link to="/Sales Order">
          <Sidebar.Item>
            Header
          </Sidebar.Item>
          </Link>
        </Sidebar.Collapse>
        </Sidebar.ItemGroup>
        </Sidebar>

      </div>
      </div>

      <div className='w-full'>
        <div className='flex justify-start items-center'>
        <div className="relative overflow-x--auto pt-10">
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
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                DSN
                            </th>
                            <td className="px-6 py-4">
                                Disini
                            </td>
                            <td className="px-6 py-4">
                                tenvy
                            </td>
                            <td className="px-6 py-4">
                                6/26/2023
                            </td>
                            <td className="px-6 py-4">
                                tenvy
                            </td>
                            <td className="px-6 py-4">
                                6/26/2023
                            </td>
                            <td className="px-6 py-4">
                                <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                                <button type="button" className="focus:outline-none text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">Update</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                </div>
            </div>
        </div>
      </div>

    </div>
  )
}
