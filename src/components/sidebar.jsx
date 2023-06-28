import { Sidebar } from "flowbite-react";
import { HiShoppingBag, HiUser } from "react-icons/hi";
import {
  BiPackage,
  BiSolidBackpack,
  BiSolidNotepad,
  BiMoney,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/API/useAuth";
import { useEffect } from "react";

export const SidebarComp = () => {
  const { auth, authUser } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    authUser()
  }, [])
  console.log(auth)

  const logout = async () => {
    await axios.delete("http://localhost:3001/logout");
    navigate("/login");
  };

  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      className=" h-screen fixed"
    >
      <Sidebar.Items className="">
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/">
            <p className="font-bold text-xl">Dashboard</p>
          </Sidebar.Item>
          <Sidebar.Collapse icon={BiMoney} label="Transaction">
            <div className="pl-4">
              <Sidebar.Collapse icon={BiSolidNotepad} label="Sales">
                <Sidebar.Item href="/Sales Order">Sales Order</Sidebar.Item>
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
  );
};
