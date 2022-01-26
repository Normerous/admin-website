import React from "react";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from "./view/Login";
import Main from "./view/index";
import "./App.css";
import ErrorPage from "./view/ErrorPage"
const App = () => {
  const { token } = useSelector(state => state);

  return <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/error" element={<ErrorPage />} />
    <Route path="/*" element={<Navigate to={"/error"} />} />
      {token ? <Route path="/app/*" element={<Main />} />: null }
  </Routes>
}

export default App;