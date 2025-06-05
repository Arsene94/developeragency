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
import ProjectList from './admin/Content/Portfolio/Project/ProjectList.tsx';
import CategoryList from './admin/Content/Portfolio/Category/CategoryList.tsx';
import CategoryAdd from './admin/Content/Portfolio/Category/CategoryAdd';
import CategoryEdit from './admin/Content/Portfolio/Category/CategoryEdit';
import TagList from './admin/Content/Portfolio/Tag/TagList.tsx';
import TagAdd from './admin/Content/Portfolio/Tag/TagAdd';
import TagEdit from './admin/Content/Portfolio/Tag/TagEdit';
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
              <Route path="content/portfolio/projects" element={<ProjectList />} />
              <Route path="content/portfolio/categories" element={<CategoryList />} />
              <Route path="content/portfolio/categories/create" element={<CategoryAdd />} />
              <Route path="content/portfolio/categories/edit/:id" element={<CategoryEdit />} />
              <Route path="content/portfolio/tags" element={<TagList />} />
              <Route path="content/portfolio/tags/create" element={<TagAdd />} />
              <Route path="content/portfolio/tags/edit/:id" element={<TagEdit />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </div>
  );
}

export default App;
