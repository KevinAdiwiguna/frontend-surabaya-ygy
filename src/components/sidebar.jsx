import { Sidebar } from "flowbite-react";
import { HiShoppingCart, HiMenuAlt3, HiMenu, HiSwitchHorizontal, HiIdentification, HiKey, HiLocationMarker, HiCube, HiDocumentText} from "react-icons/hi";
import {
  BiPackage,
  BiSolidBackpack,
  BiSolidNotepad,
  BiMoney,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";

export const SidebarComp = () => {
  const [open, setOpen] = useState()

  return (
    <div className={`${open ? "w-16" : "w-[250px]"}`}>
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        className={`h-screen fixed ${open ? "left-[-200px]" : ""}`}
      >
        <Sidebar.Items>
          <div className="flex justify-between items-center">
            <img src="./maspion2.png" alt="Maspion Logo" width={125} height={125}/>
            <div className="cursor-pointer p-2 hover:bg-gray-100 rounded-md" onClick={() => setOpen(!open)}>
              {open ? <HiMenu className="w-5 h-5" /> : <HiMenuAlt3 className="w-5 h-5" />}
            </div>
          </div>
          <Sidebar.ItemGroup className={`${open ? "hidden" : "block"}`}>
            <Link to="/Dashboard">
            <Sidebar.Item>
              <p className="text-red-600 font-extrabold text-left">Dashboard</p>
            </Sidebar.Item>
            </Link>
            {/* Transaction */}
            <Sidebar.Collapse icon={HiSwitchHorizontal} label="Transaction">
              <div className="pl-4">
                <Sidebar.Collapse icon={BiSolidNotepad} label="Sales">
                  {/* <div className="pl-6">
                    <Sidebar.Collapse label="Sales Order">
                      <Link to="/Sales Order Header">
                        <Sidebar.Item>Header</Sidebar.Item>
                      </Link>
                      <Link to="/Sales Order Detail">
                        <Sidebar.Item>Detail</Sidebar.Item>
                      </Link>
                    </Sidebar.Collapse>
                  </div> */}
                  <Link to="/Sales Order">
                    <Sidebar.Item>Sales Order</Sidebar.Item>
                  </Link>
                  <Link to="/Good Issue">
                    <Sidebar.Item>Good Issue</Sidebar.Item>
                  </Link>
                  <Link to="/Sales Invoice">
                    <Sidebar.Item>Sales Invoice</Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>

                <Sidebar.Collapse icon={HiShoppingCart} label="Purchase">
                  <Link to="/Purchase Request">
                    <Sidebar.Item>Purchase Request</Sidebar.Item>
                  </Link>
                  <Link to="/Purchase Order">
                    <Sidebar.Item>Purchase Order</Sidebar.Item>
                  </Link>
                  <Link to="/Goods Receipt">
                    <Sidebar.Item>Goods Receipt</Sidebar.Item>
                  </Link>
                  <Link to="/Purchase Invoice">
                    <Sidebar.Item>Purchase Invoice</Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>

                <Sidebar.Collapse icon={BiPackage} label="Production">
                  <Link to="/Job Order">
                    <Sidebar.Item>Job Order</Sidebar.Item>
                  </Link>
                  <Link to="/Material Usage">
                    <Sidebar.Item>Material Usage</Sidebar.Item>
                  </Link>
                  <Link to="/Job Result">
                    <Sidebar.Item>Job Result</Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>

                <Sidebar.Collapse icon={BiSolidBackpack} label="Inventory">
                  <Link to="/Stock Transfer Request">
                    <Sidebar.Item>Stock Transfer Request</Sidebar.Item>
                  </Link>
                  <Link to="/Stock Transfer">
                    <Sidebar.Item>Stock Transfer</Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>
              </div>
            </Sidebar.Collapse>
            {/* End of Transaction  */}
            {/* Master */}
            <Sidebar.Collapse icon={HiKey} label="Master">
              <Link to="/Currency">
                <Sidebar.Item icon={BiMoney}>Currency</Sidebar.Item>
              </Link>
              <Link to="/Location">
                <Sidebar.Item icon={HiLocationMarker}>Location</Sidebar.Item>
              </Link>
              <div className="pl-6 !mt-0">
                <Sidebar.Collapse icon={HiCube} label="Material" className="">
                  <Link to="/Unit">
                    <Sidebar.Item>Unit</Sidebar.Item>
                  </Link>
                  <div className="pl-6 !mt-0">
                    <Sidebar.Collapse label="Material Group">
                      <Link to="/Material Group 1">
                        <Sidebar.Item>Material Group 1</Sidebar.Item>
                      </Link>
                      <Link to="/Material Group 2">
                        <Sidebar.Item>Material Group 2</Sidebar.Item>
                      </Link>
                      <Link to="/Material Group 3">
                        <Sidebar.Item>Material Group 3</Sidebar.Item>
                      </Link>
                    </Sidebar.Collapse>
                  </div>
                  <Link to="/Material Type">
                    <Sidebar.Item>Material Type</Sidebar.Item>
                  </Link>
                  <Link to="/Material">
                    <Sidebar.Item>Material</Sidebar.Item>
                  </Link>
                  <Link to="/Unit Conversion">
                    <Sidebar.Item>Unit Conversion</Sidebar.Item>
                  </Link>
                </Sidebar.Collapse>
              </div>
              <Link to="/Document Series">
                <Sidebar.Item icon={HiDocumentText}>Document Series</Sidebar.Item>
              </Link>
            </Sidebar.Collapse>
            {/* End of Master */}
            {/* Account  */}
            <Link to="/Profile">
              <Sidebar.Item icon={HiIdentification} className="my-2">Profile</Sidebar.Item>
            </Link>
            {/* End of Account */}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};
