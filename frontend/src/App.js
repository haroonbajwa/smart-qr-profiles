import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ManageQRs from "./pages/ManageQRs";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import UserProfile from "./pages/UserProfile";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/qrs" element={<ManageQRs />} />
        <Route path="/users" element={<Users />} />
        <Route path="profile/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
