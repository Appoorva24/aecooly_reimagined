import { Routes, Route, useParams } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Collection } from './pages/Collection';
import { ProductDetail } from './pages/ProductDetail';
import { MistingFanDetail } from './pages/MistingFanDetail';
import { CapyLuluDetail } from './pages/CapyLuluDetail';
import { About } from './pages/About';
import { BlogPage } from './pages/BlogPage';
import { ScrollToTop } from './components/ScrollToTop';

// The specific product handle for the premium misting fan page
const MISTING_FAN_HANDLE = 'portable-misting-fan-cold-air-cold-air-ultra-bbasic';
// The specific product handle for the Capy Lulu flagship page (handling typo in original JSON)
const CAPY_LULU_HANDLES = ['portable-handheld-fan-air-gimbal-capy-lulu-eidtion', 'portable-handheld-fan-air-gimbal-capy-lulu-edition'];

function ProductRouter() {
  const { handle } = useParams();
  if (handle === MISTING_FAN_HANDLE) {
    return <MistingFanDetail />;
  }
  if (handle && CAPY_LULU_HANDLES.includes(handle)) {
    return <CapyLuluDetail />;
  }
  return <ProductDetail />;
}

function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection/:id" element={<Collection />} />
        <Route path="/products/:handle" element={<ProductRouter />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <CartDrawer />
      <Footer />
    </CartProvider>
  );
}

export default App;
