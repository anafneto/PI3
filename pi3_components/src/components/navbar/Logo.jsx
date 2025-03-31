
const Logo = ({ logo }) => {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src={logo} width="237px" height="32px" alt="" flex-shrink="0" />
        </a>
      </nav>
    </>
  );
};

export default Logo;
