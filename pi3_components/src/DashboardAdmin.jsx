import React from "react";
import Sidebar from "./components/admin/Sidebar.jsx";
import SmallBox from "./components/admin/Smallbox.jsx";
import ValidationTable from "./components/admin/ValidationTable.jsx";


const DashboardAdmin = () => {
  const validationData = [
    { id: "#219", user: "Alexander Pierce", date: "11-7-2014", status: "Aprovado", statusColor: "success", description: "Bacon ipsum dolor sit amet salami venison chicken flank fatback doner." },
    { id: "#220", user: "John Doe", date: "11-7-2014", status: "Pendente", statusColor: "warning", description: "Bacon ipsum dolor sit amet salami." },
    { id: "#222", user: "Mike Doe", date: "11-7-2014", status: "Denied", statusColor: "danger", description: "Bacon ipsum dolor sit amet salami venison chicken flank fatback doner." },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 p-0">
          <Sidebar /> 
        </div>
        <div className="col-md-9 col-lg-10">
          <div className="container mt-4">
            <div className="small-box-row row">
              <SmallBox
                color="primary"
                value="150"
                label="New Orders"
                iconPath="M2.25 2.25a.75.75 0 000 1.5h1.386..."
                link="#"
              />
              <SmallBox
                color="success"
                value="53%"
                label="Bounce Rate"
                iconPath="M18.375 2.25c-1.035 0-1.875.84-1.875..."
                link="#"
              />
              <SmallBox
                color="warning"
                value="44"
                label="User Registrations"
                iconPath="M6.25 6.375a4.125 4.125 0 118.25 0..."
                link="#"
              />
            </div>
            <ValidationTable data={validationData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;