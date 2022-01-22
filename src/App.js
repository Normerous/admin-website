import React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from "./view/Login";
import Main from "./view/index";
import "./App.css";
const App = () => {
  const { token } = useSelector(state => state);

  return <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
      {token ? <Route path="/app/*" element={<Main />} />: null }
  </Routes>
}

export default App;