import React from 'react'
import { SidebarComp } from '../components/sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { SalesOrderHeader } from './menu/SalesOrderHeader'
import { PurchaseReq } from './menu/PurchaseReq'

export const Home = () => {
    const params = useParams().id
    const navigate = useNavigate()

    const paramsHandler = () => {
        switch (params) {
            case 'Sales Order Header':
                return (
                    <SalesOrderHeader></SalesOrderHeader>
                )
            case 'Purchase Request':
                return (
                    <PurchaseReq />
                )
            default:
                navigate('/404');
        }
    }


    return (
        <div>
            <div className='flex'>
                <SidebarComp />
                <div className='p-6 w-full'>
                    {paramsHandler()}
                </div>
            </div>
        </div>
    )
}
