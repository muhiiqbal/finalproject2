import React, { useEffect, useState } from "react";
import ButtonComponent from "../components/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authUser, saveToken, checkEmail, setPassword, resetPassword, authAdmin, resetError } from "../redux/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, password, loading, error, email, isAuthenticated, adminStatus, adminPassword } = useSelector((state) => state.user);

  const [inputEmail, setInputEmail] = useState();
  const [inputPassword, setInputPassword] = useState();

  useEffect(() => {
    dispatch(resetError());
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminStatus) {
      await dispatch(
        authUser({
          username,
          password,
        }),
      );
      dispatch(saveToken());
    } else {
      dispatch(authAdmin());
    }
  };

  return (
    <div className="mt-5">
      {loading ? (
        <div className="mb-4">
          <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-light" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-grow text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <></>
      )}
      {error ? (
        <div class="container">
          <div class="alert alert-danger" role="alert">
            Ada Kesalahan!
          </div>
        </div>
      ) : (
        <></>
      )}
      <div class="container d-flex justify-content-center">
        <div class="card shadow" style={{ width: 400 }}>
          <img src="https://images.unsplash.com/photo-1483181957632-8bda974cbc91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDN8fHNob3BwaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60" alt="image1" style={{ width: 400 }} />
          <div class="card-body">
            <form onSubmit={handleSubmit}>
              <div class="mb-3 text-start">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => dispatch(checkEmail(e.target.value))} />
              </div>
              <div class="mb-3 text-start">
                <label for="exampleInputPassword1" class="form-label">
                  Password
                </label>
                <input type="password" class="form-control" id="exampleInputPassword1" onChange={(e) => dispatch(setPassword(e.target.value))} />
              </div>
              <ButtonComponent label="Login" buttonType="submit" className="btn btn-primary w-100" />
            </form>
            {/* <form onSubmit={handleSubmit}>
              <label for="email">Email</label>
              <input type="email" id="email" onChange={(e) => dispatch(checkEmail(e.target.value))} />
              <label for="password">Password</label>
              <input type="password" id="password" onChange={(e) => dispatch(setPassword(e.target.value))} />
              <ButtonComponent label="Login" buttonType="submit" className="btn btn-primary" />
            </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
