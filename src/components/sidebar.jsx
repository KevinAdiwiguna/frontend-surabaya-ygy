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
  HiUser,
  HiCurrencyDollar,
} from "react-icons/hi";
import {
  BiArchiveOut,
  BiArchiveIn,
  BiPackage,
  BiSolidNotepad,
  BiMoney,
  BiBook
} from "react-icons/bi";
import { TbPackages } from "react-icons/tb";
import { GrAccessibility } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SidebarCollapse } from "flowbite-react/lib/esm/components/Sidebar/SidebarCollapse";

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
                {/* <Link to="/dashboard">
                  <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    Quality Control
                  </p>
                </Link> */}
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
                  {/* <Link to="/Delivery Return">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Delivery Return
                    </p>
                  </Link>
                  <Link to="/Packing List">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Packing List
                    </p>
                  </Link> */}
                  <Link to="/Sales Invoice">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Sales Invoice
                    </p>
                  </Link>
                  {/* <Link to="/Sales Return">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Sales Return
                    </p>
                  </Link> */}
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
                  {/* <Link to="/Purchase Cost">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Purchase Cost
                    </p>
                  </Link> */}
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
                  {/* <Link to="/Purchase Return">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Purchase Return
                    </p>
                  </Link> */}
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

                {/* <Sidebar.Collapse
                  icon={HiSwitchHorizontal}
                  label="Internal Transaction"
                  className="text-sm"
                >
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
                  <Link to="/QC Transfer">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      QC Transfer
                    </p>
                  </Link>
                  <Link to="/Adjustment In">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Adjustment In
                    </p>
                  </Link>
                  <Link to="/Adjustment Out">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Adjustment Out
                    </p>
                  </Link>
                  <Link to="/Stock Price Adjustment">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Stock Price Adjustment
                    </p>
                  </Link>
                </Sidebar.Collapse> */}

                <Sidebar.Collapse
                  icon={GrAccessibility}
                  label="Account Receivable"
                  className="text-sm"
                >
                  <Link to="/AR Request List">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      AR Request List
                    </p>
                  </Link>
                  <Link to="/Customer Payment">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Customer Payment
                    </p>
                  </Link>
                  <Link to="/AR Settlement">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      AR Settlement
                    </p>
                  </Link>
                </Sidebar.Collapse>

                <Sidebar.Collapse
                  icon={BiMoney}
                  label="Account Payable"
                  className="text-sm"
                >
                  {/* <Link to="/AR Supplier Debt Note">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      AP Supplier Debet Note
                    </p>
                  </Link>
                  <Link to="/AP Supplier Credit">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      AP Supplier Credit
                    </p>
                  </Link> */}
                  <Link to="/AP Receipt List">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      AP Receipt List
                    </p>
                  </Link>
                  <Link to="/Debt Payment">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Debt Payment
                    </p>
                  </Link>
                  <Link to="/AP Settlement">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      AP Settlement
                    </p>
                  </Link>
                  {/* <Link to="/AP Clearing Giro">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      AP Clearing Giro
                    </p>
                  </Link>
                  <Link to="/AP Reject Giro">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      AP Reject Giro
                    </p>
                  </Link> */}
                </Sidebar.Collapse>

                <Sidebar.Collapse
                  icon={BiArchiveIn}
                  label="Bukti Kas Masuk"
                  className="text-sm"
                >
                  <Link to="/Cashier Receipt">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Cashier Receipt
                    </p>
                  </Link>
                  {/* <Link to="/Cashier Cash Bank In">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Cashier Cash Bank In
                    </p>
                  </Link> */}
                </Sidebar.Collapse>

                <Sidebar.Collapse
                  icon={BiArchiveOut}
                  label="Bukti Kas Keluar"
                  className="text-sm"
                >
                  <Link to="/Cashier Payment">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Cashier Payment
                    </p>
                  </Link>
                  {/* <Link to="/Cashier Cash Bank Out">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Cashier Cash Bank Out
                    </p>
                  </Link> */}
                </Sidebar.Collapse>

                {/* <Sidebar.Collapse icon={TbPackages} label="Asset">
                  <Link to="/Asset">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Asset
                    </p>
                  </Link>
                  <Link to="/AUC Settlement">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      AUC Settlement
                    </p>
                  </Link>
                </Sidebar.Collapse> */}

                {/* <Sidebar.Collapse icon={BiBook} label="General Ledger">
                  <Link to="/General Journal Posting">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      General Journal Posting
                    </p>
                  </Link>
                  <Link to="/Scheduled Journal">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Scheduled Journal
                    </p>
                  </Link>
                  <Link to="/Special Journal Posting">
                    <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      Special Journal Posting
                    </p>
                  </Link>
                </Sidebar.Collapse> */}
              </div>
            </Sidebar.Collapse>

            {/* End of Transaction  */}
            {/* Reports */}
            {/* <Sidebar.Collapse label="Reports">
              <div className="pl-6 !mt-0">
              <Sidebar.Collapse label="Sales">
                <Link to="/Report Sales Order"><Sidebar.Item>Sales Order</Sidebar.Item></Link>
              </Sidebar.Collapse>
              </div>
              <Link to="/"></Link>
            </Sidebar.Collapse> */}
            {/* End of Reports */}
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
              <Link to="/Price">
                <Sidebar.Item icon={HiCurrencyDollar}>Price</Sidebar.Item>
              </Link>
              <Link to="/Supplier">
                <Sidebar.Item icon={BiPackage}>Supplier</Sidebar.Item>
              </Link>
              <Link to="/Salesman">
                <Sidebar.Item icon={HiUser}>Salesman</Sidebar.Item>
              </Link>
              <Link to="/Document Series">
                <Sidebar.Item icon={HiDocumentText}>
                  Document Series
                </Sidebar.Item>
              </Link>
              <Link to="/Department">
                <Sidebar.Item icon={HiUsers}>Department</Sidebar.Item>
              </Link>
              <Link to="/Approval">
                <Sidebar.Item icon={HiIdentification}>Approval</Sidebar.Item>
              </Link>
              <Link to="/GenerateTaxNo">
                <Sidebar.Item icon={HiIdentification}>GenerateTaxNo</Sidebar.Item>
              </Link>
              <Link to="/Periode">
                <Sidebar.Item icon={HiUsers}>Periode</Sidebar.Item>
              </Link>
              <div className="pl-6 !mt-0">
                    <Sidebar.Collapse label="Account Receiveable/Payable">
                      <Link to="/Transaction Type">
                        <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        Transaction Type
                        </p>
                      </Link>
                      <Link to="/Collector">
                        <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        Collector
                        </p>
                      </Link>
                      <Link to="/Bank">
                        <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        Bank
                        </p>
                      </Link>
                      <Link to="/ExchangeRate">
                        <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        ExchangeRate
                        </p>
                      </Link>
                    </Sidebar.Collapse>
                    <Sidebar.Collapse label="General Ledger">
                      <Link to="/Account">
                        <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        Account
                        </p>
                      </Link>
                      <Link to="/Budget">
                        <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        Budget
                        </p>
                      </Link>
                      <Link to="/Cashflow">
                        <p className="flex items-center p-3 pl-10 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        Cashflow
                        </p>
                      </Link>
                    </Sidebar.Collapse>
                  </div>
            
              
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
