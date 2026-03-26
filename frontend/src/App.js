import React, { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Distributors from "./pages/Distributors";
import DistributorDetail from "./pages/DistributorDetail";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PostRequirement from "./pages/PostRequirement";
import SignIn from "./pages/SignIn";
import Join from "./pages/Join";
import Categories from "./pages/Categories";
import Testimonials from "./pages/Testimonials";
import RequestCallback from "./pages/RequestCallback";
import Feedback from "./pages/Feedback";
import Sitemap from "./pages/Sitemap";
import Terms from "./pages/Terms";
import { Toaster } from "./components/ui/toaster";
import PopupModal from "./components/PopupModal";


function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/distributors" element={<Distributors />} />
          <Route path="/distributor/:id" element={<DistributorDetail />} />
          <Route path="/franchises" element={<Distributors />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/post-requirement" element={<PostRequirement />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/join" element={<Join />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/request-callback" element={<RequestCallback />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:slug" element={<Distributors />} />
        </Routes>
        <Footer />
        <Toaster />
        {showPopup && <PopupModal onClose={() => setShowPopup(false)} />}
      </BrowserRouter>
    </div>
  );
}

export default App;
