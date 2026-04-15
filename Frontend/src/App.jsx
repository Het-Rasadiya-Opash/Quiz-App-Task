import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";
import { setCurrentUser, setCheckingAuth } from "./features/usersSlice";
import apiRequest from "./utils/apiRequest";
import Navbar from "./components/Navbar";
import CreateQuizForm from "./components/CreateQuizForm";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiRequest.get("/user");
        dispatch(setCurrentUser(res.data));
      } catch {
        dispatch(setCheckingAuth(false));
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <Login />
            </PublicRoutes>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoutes>
              <Register />
            </PublicRoutes>
          }
        />
        <Route
          path="/create-quiz"
          element={
            <ProtectedRoutes>
              <CreateQuizForm />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
};

export default App;
