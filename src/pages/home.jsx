import React from "react";
import { SidebarComp } from "../components/sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { Profile } from "./Profile";
// transaction
import { SalesOrderHeader } from "./transaction/sales/SalesOrderHeader";
import { SalesOrderDetail } from "./transaction/sales/SalesOrderDetail";
import { PurchaseReq } from "./transaction/purchase/PurchaseReq";
import { PurchaseOrder } from "./transaction/purchase/PurchaseOrder";
import { GoodsReceipt } from "./transaction/purchase/GoodsReceipt"
import { PurchaseCost } from "./transaction/purchase/PurchaseCost"
import { PurchaseInvoice } from "./transaction/purchase/PurchaseInvoice"
import { PurchaseReturn } from "./transaction/purchase/PurchaseReturn"
// master
import { DocumentSeries } from "./master/DocumentSeries";
import { JobOrder } from "./production/JobOrder";
import { Currency } from "./master/Currency";
import { Location } from "./master/Location";
import { Unit } from "./master/material/Unit";
import { Price } from "./master/Price";
import { MaterialGroup1 } from "./master/material/materialGroup/MaterialGroup1";
import { MaterialGroup2 } from "./master/material/materialGroup/MaterialGroup2";
import { MaterialGroup3 } from "./master/material/materialGroup/MaterialGroup3";
import { MaterialType } from "./master/material/MaterialType";
import { Material } from "./master/material/Material";
import { UnitConversion } from "./master/material/UnitConversion";
import { Dashboard } from "./dashboard";
import { Country } from "./master/customer/Country";
import { PricelistType } from "./master/customer/PricelistType";
import { CustomerGroup } from "./master/customer/CustomerGroup";
import { SalesArea1 } from "./master/customer/SalesArea/SalesArea1";
import { SalesArea2 } from "./master/customer/SalesArea/SalesArea2";
import { SalesArea3 } from "./master/customer/SalesArea/SalesArea3";
import { Customer } from "./master/customer/Customer";
import { Salesman } from "./master/Salesman";
import { Supplier } from "./master/Supplier";
import { Departement } from "./master/Departement";
import { Approval } from "./master/Approval";
import {GoodIssue} from './transaction/sales/GoodIssue.jsx'

export const Home = () => {
  const params = useParams().id;
  const navigate = useNavigate();

  const paramsHandler = () => {
    switch (params) {
      // Customer Master
      case "Salesman":
        return <Salesman />;
      case "Customer":
        return <Customer />;
      case "Customer Group":
        return <CustomerGroup />;
      case "Supplier":
        return <Supplier />;
      case "Country":
        return <Country />;
      case "Pricelist Type":
        return <PricelistType />;
      case "Sales Area 1":
        return <SalesArea1 />;
      case "Sales Area 2":
        return <SalesArea2 />;
      case "Sales Area 3":
        return <SalesArea3 />;
      // End Of Customer Master
      // Material Master
      case "Unit Conversion":
        return <UnitConversion />;
      case "Material":
        return <Material />;
      case "Material Type":
        return <MaterialType />;
      case "Material Group 1":
        return <MaterialGroup1 />;
      case "Material Group 2":
        return <MaterialGroup2 />;
      case "Material Group 3":
        return <MaterialGroup3 />;
      case "Good Issue":
        return <GoodIssue />;
      case "Unit":
        return <Unit />;
      // end of Material Master
      case "Dashboard":
        return <Dashboard />;
      case "Location":
        return <Location />;
      case "Purchase Invoice":
        return <PurchaseInvoice />;
      case "Sales Order":
        return <SalesOrderHeader />;
      case "Sales Order Detail":
        return <SalesOrderDetail />;
      case "Currency":
        return <Currency />;
      case "Purchase Request":
        return <PurchaseReq />;
      case "Document Series":
        return <DocumentSeries />;
      case "Job Order":
        return <JobOrder />;
      case "Profile":
        return <Profile />;
      case "Purchase Order":
        return <PurchaseOrder />;
      case "Goods Receipt":
        return <GoodsReceipt />;
      case "Price":
        return <Price />;
      case "Purchase Cost":
        return <PurchaseCost />;
        case "Purchase Return":
        return <PurchaseReturn />;
      case "Departement":
        return <Departement />;
      case "Approval":
        return <Approval />;
      default:
        navigate("/Dashboard");
    }
  };

  return (
    <div>
      <div className="flex">
        <SidebarComp />
        <div className="p-6 w-[75%]">{paramsHandler()}</div>
      </div>
    </div>
  );
};
