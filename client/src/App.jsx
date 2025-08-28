import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NavBar from "../components/Navbar";
import Register from "../pages/Register";
import AvailabilityManager from "../pages/AvailabilityManager";
import BookingManagement from "../pages/BookingManagement";
import BookingForm from "../pages/BookingForm";
import TutorList from "../pages/TutorList";
import TutorDetail from "../pages/TutorDetail";

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/availability"element = { <PrivateRoute>
          <AvailabilityManager />
          </PrivateRoute> }/>
          <Route path="/tutors" element={<TutorList />} />
          <Route path="/tutors/:id" element={<TutorDetail />} />
          <Route path="/book/:id" element={
          <PrivateRoute>
          <BookingForm />
          </PrivateRoute>} />
          <Route path="/bookings" element={
          <PrivateRoute>
          <BookingManagement />
          </PrivateRoute>}/>
          <Route path="/dashboard" element={
          <PrivateRoute>
          <Dashboard />
          </PrivateRoute>}/>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

function PrivateRoute({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" />;
}
