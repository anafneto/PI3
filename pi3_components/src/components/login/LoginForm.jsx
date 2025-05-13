import React from "react";

const LoginForm = ({ onClick }) => {
  return (
    <>
      <div className="col-5 d-flex align-items-center px-0">
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label small">
                Email
              </label>
              <input
                type="email"
                className="form-control form-control-sm"
                id="email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label small">
                Password
              </label>
              <div className="input-group input-group-sm">
                <input
                  type="password"
                  className="form-control form-control-sm"
                  id="password"
                  required
                />
                <span className="input-group-text">
                  <i className="bi bi-eye-slash"></i>
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                />
                <label className="form-check-label small" htmlFor="rememberMe">
                  Lembrar-me
                </label>
              </div>
              <a href="#" className="link-primary small">
                Esqueci-me da Password
              </a>
            </div>
            <button type="submit" className="btn btn-dark btn-sm w-100">
              Iniciar Sessão
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
