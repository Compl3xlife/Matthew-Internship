import { useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";

function ScrollAnimations() {
  const { pathname } = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollAnimations />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author" element={<Author />} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/item-details" element={<ItemDetails />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
