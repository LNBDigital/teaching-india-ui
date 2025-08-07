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
import Dashboard from "./pages/dashboard/Dashboard.js";
import LessonPage from "./pages/dashboard/LessonsPage.js";
import LessonDetailPage from "./pages/dashboard/LessonDetailPage.js";
import DashboardHeader from "./DashboardHeader.js";
import Middleware from "./middleware/middleware.js";
import NotFound from "./pages/NotFound.js";
import EditProfile from "./pages/dashboard/EditProfile.js";

function DashboardRoute() {
  return (
    <>
      <Middleware>
        <DashboardHeader />
        <Outlet />
      </Middleware>
    </>
  );
}

function HomeRoute() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function Layout() {
  return (
    <>
      <Routes>
        <Route element={<HomeRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        {/* dashboard routes */}
        <Route element={<DashboardRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subject/:slug" element={<LessonPage />} />
          <Route
            path="/subject/:slug/:lessonid"
            element={<LessonDetailPage />}
          />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
        {/* not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
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
