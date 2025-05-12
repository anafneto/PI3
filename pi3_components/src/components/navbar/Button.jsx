const Button = ({ noColor, onClick, outlined, children }) => {
  return (
    <>
      {noColor ? (
        <button type="button" className="btn btn-sm" onClick={onClick}>
          {children}
        </button>
      ) : outlined ? (
        <button
          type="button"
          className="btn btn-outline-dark btn-sm"
          onClick={onClick}
        >
          {children}
        </button>
      ) : (
        <button type="button" className="btn btn-dark btn-sm" onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
