import { useEffect } from "react";
import "./App.css";
import FlatDetail from "./components/FlatDetail.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import Contact from "./components/Contact.jsx";
import About from "./components/About.jsx";
import Blog from "./components/Blog.jsx";
import BlogDetail from "./components/BlogDetail.jsx";
import SearchResults from "./components/SearchResults.jsx";
import DeveloperProjects from "./components/DeveloperProjects.jsx";
import LocationProjects from "./components/LocationProjects.jsx";
import IntroSplash from "./components/IntroSplash.jsx";
import { Routes, Route, useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.search]);

  return null;
};

function App() {
  const location = useLocation();
  const isIntroPage = location.pathname === "/";

  return (
    <div className="App">
      <ScrollToTop />
      {!isIntroPage && <Header />}
      <Routes>
        <Route path="/" element={<IntroSplash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/developer-projects" element={<DeveloperProjects />} />
        <Route path="/location-projects" element={<LocationProjects />} />
        <Route path="/flat/:slug" element={<FlatDetail />} />
      </Routes>
      {!isIntroPage && <Footer />}
    </div>
  );
}

export default App;
