import React from 'react'

export const Material = () => {
    return (
        <div>
            <div className='text-2xl font-bold mb-4'>Material</div>
            <table className='border-separate border-spacing-2 w-1/2'>
                <tr>
                    <td className='text-right'>Code: </td>
                    <td>
                        <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[25%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Code" required />
                    </td>
                </tr>
                <tr>
                    <td className='text-right'>Name: </td>
                    <td>
                        <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
                    </td>
                </tr>
                <tr>
                    <td className='text-right'>Name in PO: </td>
                    <td>
                        <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
                    </td>
                </tr>
                <tr>
                    <td className='text-right'>Smallest Unit:</td>
                    <td>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="US">ELT</option>
                            <option value="CA">COM</option>
                            <option value="FR">USA</option>
                            <option value="DE">GRS</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td className='text-right'>Sold Unit:</td>
                    <td>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="US">ELT</option>
                            <option value="CA">COM</option>
                            <option value="FR">USA</option>
                            <option value="DE">GRS</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td className='text-right'>SKU Unit:</td>
                    <td>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="US">ELT</option>
                            <option value="CA">COM</option>
                            <option value="FR">USA</option>
                            <option value="DE">GRS</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td className='text-right'>Group 1:</td>
                    <td>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="US">ELT</option>
                            <option value="CA">COM</option>
                            <option value="FR">USA</option>
                            <option value="DE">GRS</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td className='text-right'>Group 2:</td>
                    <td>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="US">ELT</option>
                            <option value="CA">COM</option>
                            <option value="FR">USA</option>
                            <option value="DE">GRS</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td className='text-right'>Group 3:</td>
                    <td>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="US">ELT</option>
                            <option value="CA">COM</option>
                            <option value="FR">USA</option>
                            <option value="DE">GRS</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td className='text-right'>Material Type:</td>
                    <td>
                        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="US">ELT</option>
                            <option value="CA">COM</option>
                            <option value="FR">USA</option>
                            <option value="DE">GRS</option>
                        </select>
                    </td>
                </tr>
            </table>

            <div className='ml-40 flex gap-5'>
                <div class="flex gap-4">
                    <input type="checkbox" name="" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                    Batch
                </div>
                <div class="flex gap-4">
                    <input type="checkbox" name="" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                    Service
                </div>
                <div class="flex gap-4">
                    <input type="checkbox" name="" id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                    Asset
                </div>
            </div>

            <table className='border-separate border-spacing-2 w-1/2'>
                <tr>
                    <td className='text-right'>Mass: </td>
                    <td className='flex items-center gap-2'>
                        <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
                        KG
                    </td>
                </tr>
                <tr>
                    <td className='text-right'>Volume: </td>
                    <td className='flex items-center gap-2'>
                        <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
                        CDM
                    </td>
                </tr>
                <tr>
                    <td className='text-right'>HS: </td>
                    <td>
                        <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
                    </td>
                </tr>
                <tr>
                    <td className='text-right'>Barcode: </td>
                    <td>
                        <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />
                    </td>
                </tr>
            </table>

            <div className='ml-40'>
                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  mx-auto dark:focus:ring-blue-800">Save</button>
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
                                IsWaste
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
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                ALM
                            </th>
                            <td class="px-6 py-4">
                                Alumminium
                            </td>
                            <td class="px-6 py-4">
                                False
                            </td>
                            <td class="px-6 py-4">
                                tenvy
                            </td>
                            <td class="px-6 py-4">
                                6/26/2023
                            </td>
                            <td class="px-6 py-4">
                                tenvy
                            </td>
                            <td class="px-6 py-4">
                                6/26/2023
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
