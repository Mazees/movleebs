import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MovieList from "./pages/MovieList";
import Bookmark from "./pages/Bookmark";
import SmartLeebs from "./pages/SmartLeebs";
import DetailMovie from "./pages/DetailMovie";
import Feedback from "./pages/Feedback";
import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";
import { AuthProvider } from "./contexts/AuthAdmin";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movielist" element={<MovieList />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/smartleebs" element={<SmartLeebs />} />
        <Route path="/detail-movie" element={<DetailMovie />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <AuthProvider>
              <ProtectedRouteAdmin>
                <AdminPage />
              </ProtectedRouteAdmin>
            </AuthProvider>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
