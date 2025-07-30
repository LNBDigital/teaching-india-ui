import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./footer.js";
import Header from "./header.js";
import Home from "./pages/home/index.js";
import Dashboard from "./dashboard/Dashboard.js";
import SubjectDetail from "./dashboard/SubjectDetail.js";

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {isHome && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subject/:slug" element={<SubjectDetail />} />
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
