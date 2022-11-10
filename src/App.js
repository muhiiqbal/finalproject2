import logo from "./logo.svg";
import "./App.css";
import NavbarComponent from "./components/NavbarComponent";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import RouteProtect from "./RouteProtect";
import RekapPage from "./pages/RekapPage";

function App() {
  const { isAuthenticated, role } = useSelector((state) => state.user);
  return (
    <div className="App">
      <header className="">
        <NavbarComponent type={role === "admin" ? "admin" : "user"} />
        <Routes>
          <Route path="/" element={<ProductsPage role={role} />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route
            path="/cart"
            element={
              <RouteProtect isAuthenticated={isAuthenticated}>
                <CartPage />
              </RouteProtect>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/rekap-penjualan" element={<RekapPage />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
