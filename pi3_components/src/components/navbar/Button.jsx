
const Button = ({ noColor, onClick, outlined, children }) => {
  return (
    <>
      {noColor ? (
        <button type="button" className={"btn"} onClick={onClick}>
          {children}
        </button>
      ) : outlined ? (
        <button
          type="button"
          className={"btn btn-outline-dark"}
          onClick={onClick}
        >
          {children}
        </button>
      ) : (
        <button type="button" className={"btn btn-dark"} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
