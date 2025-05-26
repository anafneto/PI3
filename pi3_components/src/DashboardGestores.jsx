import React, { useState } from "react";
import Sidebar from "./components/admin/Sidebar.jsx";
import DashboardGestorTable from "./components/DashboardGestorTable.jsx";
import Breadcrumb from "./components/Breadcrumb.jsx";

const DashboardGestores = () => {
  const [gestores, setGestores] = useState([
    {
      id: 1,
      nome: "João Silva",
      status: "Denied",
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      status: "Approved",
    },
  ]);

  const handleEdit = (id, updatedData) => {
    const updatedGestores = gestores.map((gestor) =>
      gestor.id === id ? { ...gestor, ...updatedData } : gestor
    );
    setGestores(updatedGestores);
  };

  const handleApprove = (id) => {
    const updatedGestores = gestores.map((gestor) =>
      gestor.id === id ? { ...gestor, status: "Approved" } : gestor
    );
    setGestores(updatedGestores);
  };

  const handleDeny = (id) => {
    const updatedGestores = gestores.map((gestor) =>
      gestor.id === id ? { ...gestor, status: "Denied" } : gestor
    );
    setGestores(updatedGestores);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 p-0">
          <Sidebar />
        </div>

        {/* Conteúdo */}
        <div className="col-md-9 col-lg-10">
          <div className="container mt-4">
            <Breadcrumb />
            <div className="row justify-content-center">
              <div className="col-10 col-md-9 col-lg-10">
                <DashboardGestorTable
                  managers={gestores} // Dados dos gestores
                  onEdit={handleEdit} // Função de edição
                  onApprove={handleApprove} // Função para aprovar gestor
                  onDeny={handleDeny} // Função para negar gestor
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGestores;