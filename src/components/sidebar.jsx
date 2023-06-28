import { Sidebar } from "flowbite-react";
import { HiShoppingBag, HiUser, HiMenuAlt3, HiMenu} from "react-icons/hi";
import {
  BiPackage,
  BiSolidBackpack,
  BiSolidNotepad,
  BiMoney,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/API/useAuth";
import { useEffect, useState } from "react";

export const SidebarComp = () => {
  const { auth, authUser } = useAuth()
  const navigate = useNavigate();
  const [ open, setOpen ] = useState()

  useEffect(() => {
    authUser()
  }, [])
  console.log(auth)

  const logout = async () => {
    await axios.delete("http://localhost:3001/logout");
    navigate("/login");
  };
  
  return (
    <div className={`${open ? "w-20" : "w-80"}`}>
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      className={`h-screen fixed ${open ? "left-[-200px]" : ""}`}
    >
      <Sidebar.Items>
          <div className="flex justify-between items-center">
            <div className="font-bold text-xl">Logo</div>
            <div className="cursor-pointer p-2 hover:bg-gray-100 rounded-md" onClick={() => setOpen(!open)}>
              {open ? <HiMenu className="w-5 h-5"/> : <HiMenuAlt3 className="w-5 h-5"/>}
            </div>
          </div>
        <Sidebar.ItemGroup className={`${open ? "hidden" : "block"}`}>
          <Sidebar.Item href="/">
            <p>Dashboard</p>
          </Sidebar.Item>
          <Sidebar.Collapse icon={BiMoney} label="Transaction">
            <div className="pl-4">
              <Sidebar.Collapse icon={BiSolidNotepad} label="Sales">
                <div className="pl-6">
                <Sidebar.Collapse label="Sales Order">
                  <Sidebar.Item href="/Sales Order Header">Header</Sidebar.Item>
                  <Sidebar.Item href="/Sales Order Detail">Detail</Sidebar.Item>
                </Sidebar.Collapse>
                </div>
                <Sidebar.Item href="/Good Issue">Good Issue</Sidebar.Item>
                <Sidebar.Item href="/Sales Invoice">Sales Invoice</Sidebar.Item>
              </Sidebar.Collapse>

              <Sidebar.Collapse icon={HiShoppingBag} label="Purchase">
                <Sidebar.Item href="/Purchase Request">
                  Purchase Request
                </Sidebar.Item>
                <Sidebar.Item href="/Purchase Order">
                  Purchase Order
                </Sidebar.Item>
                <Sidebar.Item href="/Goods Receipt">Goods Receipt</Sidebar.Item>
                <Sidebar.Item href="/Purchase Invoic">Purchase Invoice</Sidebar.Item>
              </Sidebar.Collapse>

              <Sidebar.Collapse icon={BiPackage} label="Production">
                <Sidebar.Item href="/Job Order">Job Order</Sidebar.Item>
                <Sidebar.Item href="/Material Usage">
                  Material Usage
                </Sidebar.Item>
                <Sidebar.Item href="/Job Result">Job Result</Sidebar.Item>
              </Sidebar.Collapse>

              <Sidebar.Collapse icon={BiSolidBackpack} label="Inventory">
                <Sidebar.Item href="/Stock Transfer Request">
                  Stock Transfer Request
                </Sidebar.Item>
                <Sidebar.Item href="/Stock Transfer">
                  Stock Transfer
                </Sidebar.Item>
              </Sidebar.Collapse>
            </div>
          </Sidebar.Collapse>
          <Sidebar.Collapse
            icon={HiUser}
            label={`${auth?.username} (${auth?.role})`}
          >
            <Sidebar.Item
              href="/Change Password">
              Change Password
            </Sidebar.Item>
            <Sidebar.Item
              onClick={logout}
              className="cursor-pointer"
            >
              <p>
                Logout
              </p>
            </Sidebar.Item>
          </Sidebar.Collapse>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </div>
  );
};
