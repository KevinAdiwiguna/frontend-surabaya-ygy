import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiShoppingBag, HiLogout } from 'react-icons/hi';
import { BiPackage, BiSolidBackpack, BiSolidNotepad } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export const SidebarComp = () => {
    const navigate = useNavigate()
    const logout = async () => {
        await axios.delete('http://localhost:3001/logout')
        navigate('/login')
    }
    return (
        <Sidebar aria-label="Sidebar with multi-level dropdown example" className='h-screen fixed'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item
                        href="#"
                        icon={HiChartPie}
                    >
                        <p className='font-bold text-xl'>
                            Dashboard
                        </p>
                    </Sidebar.Item>
                    <Sidebar.Collapse
                        icon={BiSolidNotepad}
                        label="Sales Order"
                    >
                        <Sidebar.Item href="/Good Issue">
                            Good Issue
                        </Sidebar.Item>
                        <Sidebar.Item href="/Sales Invoice">
                            Sales Invoice
                        </Sidebar.Item>
                        <Sidebar.Item href="/Refunds">
                            Refunds
                        </Sidebar.Item>
                    </Sidebar.Collapse>

                    <Sidebar.Collapse
                        icon={HiShoppingBag}
                        label="Purchase"
                    >
                        <Sidebar.Item href="/Purchase Request">
                            Purchase Request
                        </Sidebar.Item>
                        <Sidebar.Item href="/Purchase Order">
                            Purchase Order
                        </Sidebar.Item>
                        <Sidebar.Item href="/Goods Receipt">
                            Goods Receipt
                        </Sidebar.Item>
                    </Sidebar.Collapse>


                    <Sidebar.Collapse
                        icon={BiPackage}
                        label="Production"
                    >
                        <Sidebar.Item href="/Job Order">
                            Job Order
                        </Sidebar.Item>
                        <Sidebar.Item href="/Material Usage">
                            Material Usage
                        </Sidebar.Item>
                        <Sidebar.Item href="/Job Result">
                            Job Result
                        </Sidebar.Item>
                    </Sidebar.Collapse>
                    <Sidebar.Collapse
                        icon={BiSolidBackpack}
                        label="Inventory"
                    >
                        <Sidebar.Item href="/Stock Transfer Request">
                            Stock Transfer Request
                        </Sidebar.Item>
                        <Sidebar.Item href="/Stock Transfer">
                            Stock Transfer
                        </Sidebar.Item>
                    </Sidebar.Collapse>

                    <Sidebar.Item
                        onClick={logout}
                        icon={HiLogout}
                        className="cursor-pointer"
                    >
                        <p>
                            Logout
                        </p>
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}


