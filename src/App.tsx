import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import Footer from "./footer.js";
import Header from "./header.js";
import Home from "./pages/home/index.js";
import Dashboard from "./dashboard/Dashboard.js";
import LessonPage from "./dashboard/LessonsPage.js";
import LessonDetailPage from "./dashboard/LessonDetailPage.js";
import DashboardHeader from "./DashboardHeader.js";

function DashboardRoute() {
  return (
    <>
      <DashboardHeader />
      <Outlet />
    </>
  );
}

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {isHome && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<DashboardRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subject/:slug" element={<LessonPage />} />
          <Route path="/subject/:slug/:lessonid" element={<LessonDetailPage />}
          />
        </Route>
      </Routes>
      {isHome && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
