import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import SheetsList from "./features/sheets/SheetsList";
import UsersList from "./features/users/UsersList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* Start Dash */}
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />}></Route>

          <Route path="sheets">
            <Route index element={<SheetsList />}></Route>
          </Route>

          <Route path="users">
            <Route index element={<UsersList />}></Route>
          </Route>
        </Route>
        {/* End Dash */}
      </Route>
    </Routes>
  );
}

export default App;
