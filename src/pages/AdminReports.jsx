import React from "react";
import AdminDataGrid from "../components/AdminDataGrid";

// -----------
import {
  deliveries,
  sampleCustomerPurchases,
  expenses,
} from "../lib/sample/data.js";
const columns = [
  { field: "id", headerName: "ID" },
  { field: "name", headerName: "Name", width: 150 },
  { field: "date", headerName: "Date", width: 150 },
  // { field: "vehicle", headerName: "Vehicle"},
  { field: "total_borrowed_gallon", headerName: "Borrowed Gallon", width: 150 },
  { field: "total_credited_gallon", headerName: "Credited Gallon", width: 150 },
  { field: "total_paid_gallon", headerName: "Paid Gallon", width: 150 },
  {
    field: "total_delivered_gallon",
    headerName: "Total Delivered Gallon",
    width: 150,
  },
  {
    field: "total_disounted_amount",
    headerName: "discounted Gallons",
    width: 150,
  },
  {
    field: "total_expected_earning",
    headerName: "Total Expected earnings",
    width: 150,
  },
];

const CustomerPurchasesColumn = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "type", headerName: "Type", width: 70 },
  { field: "contact_number", headerName: "Contact Number", width: 150 },
  { field: "address", headerName: "Address", width: 250 },
  { field: "date_order_receieved", headerName: "Date Received", width: 150 },
  { field: "time", headerName: "Time", width: 100 },
  { field: "delivery_type", headerName: "Delivery Type", width: 150 },
  { field: "service_type", headerName: "Total Delivered", width: 150 },
  { field: "total_delivered", headerName: "Total Delivered", width: 150 },
  { field: "total_paid", headerName: "Total Paid", width: 100 },
  { field: "credited", headerName: "Credited", width: 100 },
  {
    field: "total_expected_payment",
    headerName: "Total Expected Payment",
    width: 100,
  },
];
const expensesColumn = [
  { field: "id", headerName: "ID", minWidth: 150, flex:1 },
  { field: "title", headerName: "Title", minWidth: 150, flex:1 },
  { field: "amount", headerName: "Amount", minWidth: 150, flex:1 },
  { field: "description", headerName: "Description", minWidth: 350, flex:1 },
  {
    field: "Delete",
    renderCell: (cellValues) => {
      const handleClick =(e, cellValues)=>{
        e.stopPropagation();
       console.log(cellValues)
      }
      return (
        <button
          onClick={(event) => {

            handleClick(event,cellValues);
          }}
        >
          Delete
        </button>
      );
    },
  },
];
function AdminReports() {
  return (
    <div className="admin-reports">
      <div className="admin-reports--query-option">
        query by date option here
      </div>
      <div className="admin-reports--summary">
        <div className="admin-reports--summary__total-earnings">
          <span className="title">Sales Revenue</span>
          <span className="amount">P 25, 360</span>
          <span className="credits">+ ₱ 2,320 credits</span>
        </div>
        <div className="admin-reports--summary__queries">
          {[
            { title: "Deliveries", amount: 320 },
            { title: "Returned GLN", amount: 320 },
            { title: "Borrowed GLN", amount: 320 },
            { title: "Credited GLN", amount: 320 },
            { title: "Paid GLN", amount: 320 },
          ].map((item, i) => (
            <div key={i} className="item">
              <span className="title">{item.title}</span>
              <span className="amount">{item.amount}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="admin-reports--datagrid">
        <div className="admin-reports--datagrid__header">
          <span>Delivery Report</span>
        </div>
        <div>{/* query option here */}</div>
        <AdminDataGrid
          TableRows={deliveries}
          TableColumns={columns}
          allowCheckBox={false}
        />
      </div>
      <div className="admin-reports--datagrid">
        <div className="admin-reports--datagrid__header">
          <span>Customer's Purchases</span>
        </div>
        <div>
          {/* query option here: bydate, search option like: name, address etc. */}
        </div>
        <AdminDataGrid
          TableRows={sampleCustomerPurchases}
          TableColumns={CustomerPurchasesColumn}
          allowCheckBox={false}
        />
      </div>
      <div className="admin-reports--datagrid">
        <div className="admin-reports--datagrid__header">
          <span>Expenses</span>
        </div>
        <div>{/* Expenses */}</div>
        <AdminDataGrid
          TableRows={expenses}
          TableColumns={expensesColumn}
   
        />
      </div>
    </div>
  );
}

export default AdminReports;
