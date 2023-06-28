import React from 'react'
import { SidebarComp } from '../components/sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { PurchaseReq } from './menu/PurchaseReq'

export const Home = ({ me }) => {
    const params = useParams().id
    const navigate = useNavigate()

    const paramsHandler = () => {
        switch (params) {
            case 'Good Issue':
                return (
                    <></>
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
                <div className='w-64'><SidebarComp me={me} /></div>
                <div className='p-6'>
                    {paramsHandler()}
                </div>
            </div>
        </div>
    )
}
