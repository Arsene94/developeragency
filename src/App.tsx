import { Routes, Route } from 'react-router-dom';
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
import AdminNavbar from './admin/AdminNavbar';
import AdminDashboard from './admin/AdminDashboard';
import AdminServices from './admin/AdminServices';
import Projects from './admin/Content/Portfolio/Projects';
import AdminTestimonials from './admin/AdminTestimonials';
import AdminUsers from "./admin/Users/AdminUsers.tsx";
import AdminUserCreate from "./admin/Users/AdminUserCreate.tsx";
import AdminUserEdit from "./admin/Users/AdminUserEdit.tsx";
import PrivateRoute from "./context/PrivateRoute.tsx";
import RolesList from "./admin/Roles/RolesList";
import RoleCreate from "./admin/Roles/RoleCreate";
import RoleEdit from "./admin/Roles/RoleEdit";
import ServiceList from "./admin/Content/Services/ServiceList.tsx";
import ServiceAdd from "./admin/Content/Services/ServiceAdd.tsx";
import ServiceEdit from "./admin/Content/Services/ServiceEdit.tsx";

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
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="zjadminwebarcats/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route path="/zjadminwebarcats" element={<PrivateRoute />}>
            <Route element={<AdminNavbar />}>
              <Route index element={<AdminDashboard />} />
              <Route path="content/services" element={<ServiceList />} />
              <Route path="content/services/create" element={<ServiceAdd />} />
              <Route path="content/services/edit/:id" element={<ServiceEdit />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="users/create" element={<AdminUserCreate />} />
              <Route path="users/edit/:id" element={<AdminUserEdit />} />
              <Route path="roles" element={<RolesList />} />
              <Route path="roles/create" element={<RoleCreate />} />
              <Route path="roles/edit/:id" element={<RoleEdit />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="portfolio/projects" element={<Projects />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
