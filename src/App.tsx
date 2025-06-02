import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Technologies from './components/Technologies';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServicePage from './pages/ServicePage';
import LoginPage from './pages/LoginPage';
import AdminNavbar from './admin/AdminNavbar.tsx';
import AdminDashboard from './admin/AdminDashboard';
import AdminServices from './admin/AdminServices';
import AdminPortfolio from './admin/AdminPortfolio';
import AdminTestimonials from './admin/AdminTestimonials';
import AdminLogin from "./admin/AdminLogin.tsx";
import PrivateRoute from "./context/PrivateRoute.tsx";

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Technologies />
        <Portfolio />
        <Process />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="zjadminwebarcats/login" element={<AdminLogin />} />

          {/* Admin Routes */}
          <Route path="/zjadminwebarcats" element={<PrivateRoute />}>
            <Route element={<AdminNavbar />}>
              <Route index element={<AdminDashboard />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="portfolio" element={<AdminPortfolio />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App