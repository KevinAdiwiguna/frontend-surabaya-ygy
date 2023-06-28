import React from 'react'
import { SidebarComp } from '../components/sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { SalesOrder } from './menu/SalesOrder'
import { PurchaseReq } from './menu/PurchaseReq'

export const Home = () => {
    const params = useParams().id
    const navigate = useNavigate()

    const paramsHandler = () => {
        switch (params) {
            case 'Sales Order':
                return (
                    <SalesOrder></SalesOrder>
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
                <div className='w-64'><SidebarComp /></div>
                <div className='p-6 w-[85%]'>
                    {paramsHandler()}
                </div>
            </div>
        </div>
    )
}
