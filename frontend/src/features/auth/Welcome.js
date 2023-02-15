import { Link } from "react-router-dom";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("de-DE", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  return (
    <section className="welcome">
      <p>{today}</p>
      <h1>Welcome!</h1>
      <p>
        <Link to="/dash/sheets">View Sheets</Link>
      </p>
      <p>
        <Link to="/dash/users">User Settings</Link>
      </p>
      <p>
        <Link to="/dash/sessions">Sessions</Link>
      </p>
    </section>
  );
};
export default Welcome;
