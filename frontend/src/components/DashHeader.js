import { Link } from "react-router-dom";

const DashHeader = () => {
  return (
    <header className="dash-header">
      <div className="dash-header__container">
        <Link to="/dash">
          <h1 className="dash-header__title">Call of Cthulhu Tool</h1>
        </Link>
        <nav className="dash-header__nav">{/* Will be done later*/}</nav>
      </div>
    </header>
  );
};
export default DashHeader;
