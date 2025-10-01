import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/home/Home.jsx";
import About from "./pages/about/About.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Ouvidoria from "./pages/Ouvidoria/Ouvidoria.jsx";

import NotFound from "./pages/notFound/NotFound.jsx";
import Plans from "./pages/formulario/Plans.jsx";
import Gallery from "./pages/gallery/Gallery.jsx";


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/ouvidoria" element={<Ouvidoria />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
