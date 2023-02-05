import { Link } from "react-router-dom";

const Public = () => {
  return (
    <>
      <section className="public">
        <header>
          <h1>
            Welcome to <span className="nowrap">Call of Cthulhu Sheets</span>
          </h1>
        </header>
        <main className="public__main">
          <p>
            This is a site for creating and managing your Call of Cthulhu
            character sheets as well as managing sessions.
          </p>
        </main>
        <footer>
          <Link to="/register" className="public__footer__link">Register</Link>
          <Link to="/login" className="public__footer__link">Login</Link>
        </footer>
      </section>
    </>
  );
};
export default Public;
