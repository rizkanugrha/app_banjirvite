import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/auth/Login";
import AdminDashboard from "./pages/auth/admin/adminDashboard";
import Banjir from "./pages/auth/admin/Banjir";
import ProtectedRoute from "./protect/protectRoute";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/banjir"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Banjir />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
