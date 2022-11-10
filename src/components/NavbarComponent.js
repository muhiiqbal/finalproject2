import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { emptyCart } from "../redux/cartSlice";
import { userLogout } from "../redux/userSlice";
import ButtonComponent from "./ButtonComponent";

const NavbarComponent = (props) => {
  const location = useLocation(); // once ready it returns the 'window.location' object
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(userLogout());
    dispatch(emptyCart());
    navigate("/login");
  };

  const NavbarType = (type) => {
    if (type === "user") {
      return (
        <>
          <nav class="navbar navbar-expand-lg bg-light">
            <div class="container">
              <a class="navbar-brand" href="#">
                BukaPedia
              </a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <Link to="/" className={"nav-link" + (url === "/" ? " active" : "")} aria-current="page" href="#">
                      Products
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/cart" className={"nav-link" + (url === "/" ? " active" : "")} href="#">
                      Cart
                    </Link>
                  </li>
                </ul>
                <div class="btnku ms-auto">
                  {isAuthenticated ? (
                    <ButtonComponent label="Logout" className="btn btn-primary text-white" OnPress={() => logoutHandler()} />
                  ) : (
                    <ButtonComponent label="Login" className="btn btn-primary text-white" OnPress={() => navigate("/login")} />
                  )}
                </div>
              </div>
            </div>
          </nav>
        </>
      );
    } else if (type === "admin") {
      return (
        <>
          <nav class="navbar navbar-expand-lg bg-light">
            <div class="container">
              <a class="navbar-brand" href="#">
                BukaPedia
              </a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <Link to="/" className={"nav-link" + (url === "/" ?" active" : "")} aria-current="page">
                      Products
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/rekap-penjualan" className={"nav-link" + (url === "/" ?" active" : "")} href="#">
                      Rekap Penjualan
                    </Link>
                  </li>
                </ul>
                <div class="btnku ms-auto">
                  <ButtonComponent label="Logout" className="btn btn-primary text-white" OnPress={() => logoutHandler()} />
                </div>
              </div>
            </div>
          </nav>
        </>
      );
    }
  };
  return <div>{NavbarType(props.type)}</div>;
};

export default NavbarComponent;
