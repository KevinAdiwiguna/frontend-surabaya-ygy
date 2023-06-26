import React from 'react'
import { Template1, templte2, templte23, templte4 } from '../components/templte'
import { SidebarComp } from '../components/sidebar'
import { useNavigate, useParams } from 'react-router-dom'

export const Home = () => {
    const params = useParams().id
    const navigate = useNavigate()

    const paramsHandler = () => {
        switch (params) {
            case 'Good Issue':
                return (
                    <Template1 />
                )

            default:
                navigate('/404');
        }
    }


    return (
        <>
            <div>

                <div className='flex'>
                    <div className='w-64'><SidebarComp /></div>
                    {paramsHandler()}
                </div>
            </div>
        </>
    )
}
