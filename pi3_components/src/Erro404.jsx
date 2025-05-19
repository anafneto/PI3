import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <h1 className="display-1 fw-bold mb-3">404</h1>
      <p className="fs-4 mb-4">Esta página não foi encontrada.</p>
      <button
        onClick={handleGoHome}
        className="btn btn-dark btn-lg"
      >
        Ir para a página Principal
      </button>
    </div>
  );
};

export default NotFoundPage;