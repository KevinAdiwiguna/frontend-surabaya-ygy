import { Sidebar } from "flowbite-react";
import {
  HiShoppingCart,
  HiMenuAlt3,
  HiMenu,
  HiSwitchHorizontal,
  HiIdentification,
  HiKey,
  HiLocationMarker,
  HiCube,
  HiDocumentText,
  HiUsers,
  HiUser
} from "react-icons/hi";
import {
  BiPackage,
  BiSolidBackpack,
  BiSolidNotepad,
  BiMoney,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";

export const SidebarComp = () => {
  const [open, setOpen] = useState();

  return (
    <div className={`${open ? "w-16" : "w-[250px]"}`}>
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        className={`h-screen fixed ${open ? "left-[-200px]" : ""}`}
      >
        <Sidebar.Items>
          <div className="flex justify-between items-center">
            <img
              src="./maspion2.png"
              alt="Maspion Logo"
              width={125}
              height={125}
            />
            <div
              className="cursor-pointer p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <HiMenu className="w-5 h-5" />
              ) : (
                <HiMenuAlt3 className="w-5 h-5" />
              )}
            </div>
          </div>
          <Sidebar.ItemGroup className={`${open ? "hidden" : "block"}`}>
            <Link to="/Dashboard">
              <Sidebar.Item>
                <p className="text-red-600 font-extrabold text-left">
                  Dashboard
                </p>
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
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Sales Order
                    </p>
                  </Link>
                  <Link to="/Good Issue">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Good Issue
                    </p>
                  </Link>
                  <Link to="/Sales Invoice">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Sales Invoice
                    </p>
                  </Link>
                </Sidebar.Collapse>

                <Sidebar.Collapse icon={HiShoppingCart} label="Purchase">
                  <Link to="/Purchase Request">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Purchase Request
                    </p>
                  </Link>
                  <Link to="/Purchase Order">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Purchase Order
                    </p>
                  </Link>
                  <Link to="/Goods Receipt">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Goods Receipt
                    </p>
                  </Link>
                  <Link to="/Purchase Invoice">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Purchase Invoice
                    </p>
                  </Link>
                </Sidebar.Collapse>

                <Sidebar.Collapse icon={BiPackage} label="Production">
                  <Link to="/Job Order">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Job Order
                    </p>
                  </Link>
                  <Link to="/Material Usage">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Material Usage
                    </p>
                  </Link>
                  <Link to="/Job Result">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Job Result
                    </p>
                  </Link>
                </Sidebar.Collapse>

                <Sidebar.Collapse icon={BiSolidBackpack} label="Inventory">
                  <Link to="/Stock Transfer Request">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Stock Transfer Request
                    </p>
                  </Link>
                  <Link to="/Stock Transfer">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Stock Transfer
                    </p>
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
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Unit
                    </p>
                  </Link>
                  <div className="pl-6 !mt-0">
                    <Sidebar.Collapse label="Material Group">
                      <Link to="/Material Group 1">
                        <p className="flex items-center p-3 pl-8 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          Material Group 1
                        </p>
                      </Link>
                      <Link to="/Material Group 2">
                        <p className="flex items-center p-3 pl-8 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          Material Group 2
                        </p>
                      </Link>
                      <Link to="/Material Group 3">
                        <p className="flex items-center p-3 pl-8 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          Material Group 3
                        </p>
                      </Link>
                    </Sidebar.Collapse>
                  </div>
                  <Link to="/Material Type">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Material Type
                    </p>
                  </Link>
                  <Link to="/Material">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 groups">
                      Material
                    </p>
                  </Link>
                  <Link to="/Unit Conversion">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Unit Conversion
                    </p>
                  </Link>
                </Sidebar.Collapse>
              </div>
              <div className="pl-6 !mt-0">
                <Sidebar.Collapse icon={HiUsers} label="Customer">
                  <Link to="/Country">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Country
                    </p>
                  </Link>
                  <Link to="/Pricelist Type">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Pricelist Type
                    </p>
                  </Link>
                  <Link to="/Customer Group">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Customer Group
                    </p>
                  </Link>
                  <div className="pl-6 !mt-0">
                    <Sidebar.Collapse label="Sales Area">
                      <Link to="/Sales Area 1">
                        <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          Sales Area 1
                        </p>
                      </Link>
                      <Link to="/Sales Area 2">
                        <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          Sales Area 2
                        </p>
                      </Link>
                      <Link to="/Sales Area 3">
                        <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          Sales Area 3
                        </p>
                      </Link>
                    </Sidebar.Collapse>
                  </div>
                  <Link to="/Customer">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Customer
                    </p>
                  </Link>
                </Sidebar.Collapse>
              </div>
              <Link to="/Salesman">
                <Sidebar.Item icon={HiUser}>Salesman</Sidebar.Item>
              </Link>
              <Link to="/Document Series">
                <Sidebar.Item icon={HiDocumentText}>
                  Document Series
                </Sidebar.Item>
              </Link>
            </Sidebar.Collapse>
            {/* End of Master */}
            {/* Account  */}
            <Link to="/Profile">
              <Sidebar.Item icon={HiIdentification} className="my-2">
                Profile
              </Sidebar.Item>
            </Link>
            {/* End of Account */}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};
