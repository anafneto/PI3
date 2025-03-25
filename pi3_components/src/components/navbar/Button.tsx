import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  outlined: boolean;
  onClick?: () => void;
  noColor?: boolean;
}

const Button = ({ noColor, onClick, outlined, children }: Props) => {
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
