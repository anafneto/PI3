interface Props {
  logo: string; // Path to image
}

const Logo = ({ logo }: Props) => {
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
