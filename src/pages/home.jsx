import React from 'react'
import { SidebarComp } from '../components/sidebar'
import { useNavigate, useParams } from 'react-router-dom'
// transaction
import { SalesOrderHeader } from './transaction/sales/SalesOrderHeader'
import { PurchaseReq } from './transaction/purchase/PurchaseReq'
// master
import { DocumentSeries } from './master/DocumentSeries'
import { JobOrder } from './production/JobOrder'

export const Home = () => {
    const params = useParams().id
    const navigate = useNavigate()

    const paramsHandler = () => {
        switch (params) {
            case 'Sales Order Header':
                return (
                    <SalesOrderHeader />
                )
            case 'Purchase Request':
                return (
                    <PurchaseReq />
                )
            case 'Document Series':
                return (
                    <DocumentSeries />
                )
            case 'Job Order':
                return (
                    <JobOrder />
                )
            default:
                navigate('/404');
        }
    }


    return (
        <div>
            <div className='flex'>
                <SidebarComp />
                <div className='p-6 w-[75%]'>
                    {paramsHandler()}
                </div>
            </div>
        </div>
    )
}
